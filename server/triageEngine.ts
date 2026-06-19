import { AnalyzeResponse } from './types';

// Hardcoded Emergency Overrides definition
interface EmergencyTrigger {
  id: string;
  name: string;
  regexPatterns: RegExp[];
  advice: string[];
}

const EMERGENCY_TRIGGERS: EmergencyTrigger[] = [
  {
    id: 'chest_pain',
    name: 'Chest Pain',
    regexPatterns: [
      /chest.*pain/i, /pain.*chest/i, /heart.*pain/i, /crushing.*chest/i, /heart.*attack/i,
      /గుండె.*నొప్పి/i, /గుండెల్లో.*నొప్పి/i, // Telugu
      /छाती.*दर्द/i, /सीने.*दर्द/i, // Hindi
      /நெஞ்.*வலி/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Sit upright in a comfortable position and rest. Do not exert yourself.",
      "Loosen any tight clothing around your neck and chest.",
      "Unlock your main door so emergency responders can enter without delay."
    ]
  },
  {
    id: 'stroke',
    name: 'Stroke Symptoms',
    regexPatterns: [
      /stroke/i, /slurred.*speech/i, /facial.*droop/i, /numbness.*side/i, /unable.*speak/i,
      /పక్షవాతం/i, /మాట.*పడి/i, // Telugu
      /लकवा/i, /बोल.*तकलीफ/i, // Hindi
      /பக்கவாதம்/i, /பேச்சு.*குளறு/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Note the time when the symptoms first started (critical for treatment).",
      "Do not give the patient anything to eat or drink (risk of choking).",
      "Keep the patient lying down on their side if they feel nauseous."
    ]
  },
  {
    id: 'snake_bite',
    name: 'Snake Bite',
    regexPatterns: [
      /snake.*bite/i, /bitten.*snake/i, /cobra/i, /viper/i,
      /పాము.*కాటు/i, /పాము.*కరి/i, // Telugu
      /सांप.*काट/i, /साँप.*काट/i, // Hindi
      /பாம்பு.*கடி/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Keep the bitten limb completely still and positioned below the heart level.",
      "Remove tight clothing, rings, or jewelry near the bite before swelling starts.",
      "DO NOT cut the wound, apply ice, or try to suck out the venom."
    ]
  },
  {
    id: 'heavy_bleeding',
    name: 'Heavy Bleeding',
    regexPatterns: [
      /heavy.*bleeding/i, /gushing.*blood/i, /hemorrhage/i, /bleeding.*lot/i, /bleeding.*heavily/i,
      /రక్తస్రావం/i, /రక్తం.*కారు/i, // Telugu
      /रक्तस्राव/i, /खून.*बह/i, // Hindi
      /இரத்த.*போக்கு/i, /இரத்தம்.*கொட்டு/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Apply firm, direct pressure on the wound using a clean cloth or bandage.",
      "Elevate the injured limb above the level of the heart if possible.",
      "Keep the patient lying down flat and wrap them in a blanket to prevent shock."
    ]
  },
  {
    id: 'unconsciousness',
    name: 'Unconsciousness',
    regexPatterns: [
      /unconscious/i, /passed.*out/i, /fainted/i, /not.*waking.*up/i, /unresponsive/i,
      /స్పృహ.*తప్ప/i, /స్పృహ.*లేదు/i, // Telugu
      /बेहोश/i, /अचेत/i, // Hindi
      /மயக்க/i, /நினைவிழந்த/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Check if the patient is breathing. If not, begin CPR if trained.",
      "If breathing, roll the patient gently onto their side into the recovery position.",
      "Do not leave the patient unattended or try to force them to sit up."
    ]
  },
  {
    id: 'difficulty_breathing',
    name: 'Difficulty Breathing',
    regexPatterns: [
      /difficulty.*breathing/i, /cannot.*breathe/i, /short.*breath/i, /shortness.*breath/i, /struggling.*breathe/i, /suffocating/i,
      /ఊపిరి.*ఆడ/i, /శ్వాస.*కష్టం/i, // Telugu
      /सांस.*तकलीफ/i, /साँस.*तकलीफ/i, /दम.*घुट/i, // Hindi
      /மூச்சு.*திணறல்/i, /மூச்சு.*முடியவில்லை/i // Tamil
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Help the person sit upright. Leaning forward slightly can make breathing easier.",
      "Loosen any tight collars, ties, or belts.",
      "If the person has prescribed rescue medication (like an inhaler), assist them in using it."
    ]
  }
];

// Heuristic Severity Scoring Rules
const SCORING_RULES = [
  { keywords: [/excruciating/i, /unbearable/i, /worst\s*pain/i, /severe\s*pain/i, /తీవ్రమైన\s*నొప్పి/i, /கடுமையான\s*வலி/i, /अत्यधिक\s*दर्द/i], score: 3.5 },
  { keywords: [/high\s*fever/i, /102/i, /103/i, /104/i, /తేజ్\s*बुखार/i, /తీవ్రమైన\s*జ్వరం/i, /அதிக\s*காய்ச்சல்/i], score: 2.5 },
  { keywords: [/pregnant/i, /infant/i, /newborn/i, /asthma/i, /heart\s*condition/i, /గర్భవతి/i, /गर्भवती/i, /கர்ப்பிணி/i], score: 2.0 },
  { keywords: [/days/i, /weeks/i, /months/i, /persistent/i, /రోజులుగా/i, /நாட்களாக/i, /दिनों\s*से/i], score: 1.5 }
];

/**
 * Validation Layer
 * Rejects empty strings, script tags, or unsafe inputs
 */
export function validateSymptomInput(text: string): { isValid: boolean; error?: string } {
  if (!text || typeof text !== 'string') {
    return { isValid: false, error: 'Symptom input must be a valid string.' };
  }
  
  const trimmed = text.trim();
  if (trimmed.length < 5) {
    return { isValid: false, error: 'Symptom input is too short. Please provide a description of at least 5 characters.' };
  }

  // Cross-site script tag, event handler, and frame injection check
  if (
    /<script/i.test(trimmed) || 
    /javascript:/i.test(trimmed) || 
    /on\w+\s*=/i.test(trimmed) || // Blocks events like onload=, onerror=, onclick=
    /<\s*iframe/i.test(trimmed) || // Blocks frame injection
    /<\s*object/i.test(trimmed) || // Blocks plug-in components
    /<\s*embed/i.test(trimmed) // Blocks embedded component wrappers
  ) {
    return { isValid: false, error: 'Security alert: Unsafe HTML or script patterns detected.' };
  }

  return { isValid: true };
}

/**
 * Heuristic Severity Score Calculator (0 - 10 scale)
 */
export function calculateSeverityScore(text: string): number {
  let score = 0;
  for (const rule of SCORING_RULES) {
    const matches = rule.keywords.some((pat) => pat.test(text));
    if (matches) {
      score += rule.score;
    }
  }
  return Math.min(score, 10);
}

/**
 * Deterministic Rule Engine
 * Performs validation, checks hardcoded emergency triggers, and checks heuristic overrides
 */
export function processTriageRules(
  symptomText: string,
  language: string
): { isOverridden: boolean; result?: AnalyzeResponse } {
  
  const cleanedText = symptomText.trim();

  // 1. Scan for hardcoded emergency triggers
  for (const trigger of EMERGENCY_TRIGGERS) {
    const matches = trigger.regexPatterns.some((pattern) => pattern.test(cleanedText));
    if (matches) {
      console.log(`[Triage Rule Engine] Override triggered: ${trigger.name}. Forcing Severity: EMERGENCY.`);
      return {
        isOverridden: true,
        result: {
          severity: 'emergency',
          reason: `CRITICAL FLAG DETECTED: ${trigger.name}. The symptoms entered indicate a potential life-threatening emergency.`,
          action: trigger.advice.map((line, idx) => `${idx + 1}. ${line}`).join('\n'),
          hospitalRequired: true
        }
      };
    }
  }

  // 2. Perform score-based deterministic checks (e.g. extreme scores force emergency)
  const score = calculateSeverityScore(cleanedText);
  if (score >= 7.0) {
    console.log(`[Triage Rule Engine] Heuristic Score-based override triggered (${score}/10). Forcing Severity: EMERGENCY.`);
    return {
      isOverridden: true,
      result: {
        severity: 'emergency',
        reason: `CRITICAL ALERT: Heuristic safety analysis indicates high symptom severity (Score: ${score}/10).`,
        action: "1. CONTACT EMERGENCY MEDICAL HELP IMMEDIATELY.\n2. Do not attempt strenuous physical tasks.\n3. Prepare a list of current medications for paramedics.",
        hospitalRequired: true
      }
    };
  }

  return { isOverridden: false };
}

/**
 * Safety post-processing filter
 * Adjusts AI classification if it breaches safety limits
 */
export function applySafetyGuardrails(
  aiResponse: AnalyzeResponse,
  symptomText: string
): AnalyzeResponse {
  const score = calculateSeverityScore(symptomText);
  const durationCheck = /days/i.test(symptomText) || /weeks/i.test(symptomText) || /రోజులుగా/i.test(symptomText) || /நாட்களாக/i.test(symptomText) || /दिनों\s*से/i.test(symptomText);
  
  const guarded = { ...aiResponse };

  // Rule 1: High score upgrades safe to doctor
  if (score >= 3.0 && guarded.severity === 'safe') {
    console.log(`[Triage Guardrails] Upgrading severity from safe -> doctor due to high symptom score (${score}/10).`);
    guarded.severity = 'doctor';
    guarded.reason = `${guarded.reason} (Note: Safety overrides upgraded this case from safe to clinic assessment due to severity parameters.)`;
  }

  // Rule 2: Persistent symptoms (duration check) upgrades safe to doctor
  if (durationCheck && guarded.severity === 'safe') {
    console.log(`[Triage Guardrails] Upgrading severity from safe -> doctor due to persistent duration.`);
    guarded.severity = 'doctor';
    guarded.reason = `${guarded.reason} (Note: Upgraded from safe to doctor as symptoms have persisted over multiple days.)`;
  }

  return guarded;
}
