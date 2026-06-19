import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { AnalyzeRequest, AnalyzeResponse, ErrorResponse } from './types';
import { validateSymptomInput, processTriageRules, applySafetyGuardrails } from './triageEngine';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Gemini SDK
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY environment variable is not defined. Calls to /api/analyze will fail.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Strict schema mapping to force Gemini to return valid JSON with types
const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    severity: {
      type: SchemaType.STRING,
      enum: ['safe', 'doctor', 'emergency'],
      description: 'The triage severity category. "safe" for mild issues that can be monitored at home. "doctor" for issues needing clinic visit or prescription. "emergency" for life-threatening symptoms requiring immediate ER care.'
    },
    reason: {
      type: SchemaType.STRING,
      description: 'A clinical explanation of why this severity was assigned, translated into clear English.'
    },
    action: {
      type: SchemaType.STRING,
      description: 'A list of 3-4 simple, numbered, elderly-friendly instructions on what the patient should do next.'
    },
    hospitalRequired: {
      type: SchemaType.BOOLEAN,
      description: 'Set to true only if the patient must go to an Emergency Room or hospital.'
    }
  },
  required: ['severity', 'reason', 'action', 'hospitalRequired']
};

/**
 * Helper utility implementing exponential backoff retry logic for calling Gemini
 */
async function generateContentWithRetry(
  prompt: string,
  retries = 3,
  delay = 500
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API client is not initialized. Check GEMINI_API_KEY.');
  }

  const model = genAI.getGenerativeModel({ model: modelName });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Gemini API] Requesting analysis (Attempt ${attempt}/${retries})...`);
      const response = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
          temperature: 0.2
        }
      });

      const responseText = response.response.text();
      if (!responseText) {
        throw new Error('Gemini returned an empty response.');
      }
      return responseText;
    } catch (err: any) {
      console.error(`[Gemini API] Attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) {
        throw err;
      }
      const backoff = delay * Math.pow(2, attempt - 1);
      console.log(`[Gemini API] Retrying in ${backoff}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }
  throw new Error('Exhausted all retries for Gemini content generation.');
}

/**
 * Route: POST /api/analyze
 */
app.post(
  '/api/analyze',
  async (
    req: Request<{}, {}, AnalyzeRequest>,
    res: Response<AnalyzeResponse | ErrorResponse>
  ): Promise<void> => {
    try {
      const { symptomText, language } = req.body;

      // 1. Validation Layer
      const validation = validateSymptomInput(symptomText);
      if (!validation.isValid) {
        res.status(400).json({ error: 'Validation Error', details: validation.error || 'Invalid input.' });
        return;
      }

      if (!language || typeof language !== 'string' || language.trim() === '') {
        res.status(400).json({ error: 'Validation Error', details: 'language is required and must be a non-empty string.' });
        return;
      }

      // 2. Rule Engine Override Check (Safety First - scans for hardcoded triggers)
      const ruleCheck = processTriageRules(symptomText, language);
      if (ruleCheck.isOverridden && ruleCheck.result) {
        console.log('[Server API] Bypassing Gemini API due to safety override trigger.');
        res.status(200).json(ruleCheck.result);
        return;
      }

      // 3. Fallback check for Gemini API key
      if (!genAI) {
        res.status(503).json({
          error: 'Configuration Error',
          details: 'Gemini API Key is not set on the server. Please add GEMINI_API_KEY to your .env file.'
        });
        return;
      }

      // 4. Build instruction prompt
      const prompt = `
You are an advanced clinical triage AI.
A patient has reported the following symptoms:
- Language Spoken: ${language}
- Symptoms Reported: "${symptomText}"

Please perform the following steps:
1. Translate the symptoms into English if they are in a different language (e.g. Hindi, Tamil, Telugu).
2. Classify the symptom severity into one of: 'safe', 'doctor', or 'emergency'.
3. Formulate a simple explanation of what these symptoms might indicate, written in clear laymans terms.
4. Draft 3-4 numbered action steps that are extremely clear, direct, and easy to read for an elderly person.
5. Flag whether a hospital or Emergency Room visit is required.

Return the results strictly adhering to the JSON schema requested.
`;

      // 5. Request analysis with retry wrapper
      const jsonResponseText = await generateContentWithRetry(prompt);
      
      // 6. Parse response
      const parsedData: AnalyzeResponse = JSON.parse(jsonResponseText);
      
      // 7. Safety Guardrails post-processing
      const finalGuardedData = applySafetyGuardrails(parsedData, symptomText);
      
      res.status(200).json(finalGuardedData);
      
    } catch (error: any) {
      console.error('[Server Error] Error in /api/analyze handler:', error);
      
      if (error instanceof SyntaxError) {
        res.status(500).json({ error: 'JSON Parsing Error', details: 'AI model returned invalid JSON syntax.' });
      } else if (error.status === 429) {
        res.status(429).json({ error: 'Rate Limit Exceeded', details: 'Too many requests. Please try again in a moment.' });
      } else {
        const isDev = process.env.NODE_ENV === 'development';
        res.status(500).json({ 
          error: 'Internal Server Error', 
          details: isDev ? (error.message || 'An unexpected error occurred.') : 'An unexpected error occurred on the server. Please try again.'
        });
      }
    }
  }
);

// Global Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Unhandled Rejection]', err);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(500).json({ 
    error: 'Fatal Server Error', 
    details: isDev ? (err.message || 'Unhandled server error occurred.') : 'A fatal server error occurred.' 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] MediVoice AI Backend running at http://localhost:${PORT}`);
  console.log(`[Server] Target model: ${modelName}`);
});
