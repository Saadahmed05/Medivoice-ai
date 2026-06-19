/**
 * Expected request body for the /api/analyze endpoint
 */
export interface AnalyzeRequest {
  symptomText: string;
  language: string;
}

/**
 * Enforced JSON response structure from Gemini API
 */
export interface AnalyzeResponse {
  severity: 'safe' | 'doctor' | 'emergency';
  reason: string;
  action: string;
  hospitalRequired: boolean;
}

/**
 * Uniform error response structure returned by the server
 */
export interface ErrorResponse {
  error: string;
  details?: string;
}
