import React, { useState, useEffect, useRef } from 'react';
import LanguageSelect from './components/steps/LanguageSelect';
import VoiceRecorder from './components/steps/VoiceRecorder';
import AnalysisProgress from './components/steps/AnalysisProgress';
import RiskClassification from './components/steps/RiskClassification';
import NearestHospital from './components/steps/NearestHospital';
import ReferralReport from './components/steps/ReferralReport';
import { Compass, Home, Sun, Eye } from 'lucide-react';

const EMERGENCY_TRIGGERS = [
  {
    id: 'chest_pain',
    name: 'Chest Pain',
    regexPatterns: [
      /chest.*pain/i, /pain.*chest/i, /heart.*pain/i, /crushing.*chest/i, /heart.*attack/i,
      /గుండె.*నొప్పి/i, /గుండెల్లో.*నొప్పి/i,
      /छाती.*दर्द/i, /सीने.*दर्द/i,
      /நெஞ்.*வலி/i
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
      /పక్షవాతం/i, /మాట.*పడి/i,
      /लकवा/i, /बोल.*तकलीफ/i,
      /பக்கவாதம்/i, /பேச்சு.*குளறு/i
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Note the time when the symptoms first started.",
      "Do not give the patient anything to eat or drink.",
      "Keep the patient lying down on their side if they feel nauseous."
    ]
  },
  {
    id: 'snake_bite',
    name: 'Snake Bite',
    regexPatterns: [
      /snake.*bite/i, /bitten.*snake/i, /cobra/i, /viper/i,
      /పాము.*కాటు/i, /పాము.*కరి/i,
      /सांप.*काट/i, /साँप.*काट/i,
      /பாம்பு.*கடி/i
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
      /రక్తస్రావం/i, /రక్తం.*కారు/i,
      /रक्तस्राव/i, /खून.*बह/i,
      /இரத்த.*போக்கு/i, /இரத்தம்.*கொட்டு/i
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Apply firm, direct pressure on the wound using a clean cloth or bandage.",
      "Elevate the injured limb above the level of the heart if possible.",
      "Keep the patient lying down flat and wrap them in a blanket."
    ]
  },
  {
    id: 'unconsciousness',
    name: 'Unconsciousness',
    regexPatterns: [
      /unconscious/i, /passed.*out/i, /fainted/i, /not.*waking.*up/i, /unresponsive/i,
      /స్పృహ.*తప్ప/i, /స్పృహ.*లేదు/i,
      /बेहोश/i, /अचेत/i,
      /மயக்க/i, /நினைவிழந்த/i
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Check if the patient is breathing. If not, begin CPR.",
      "If breathing, roll the patient gently onto their side into the recovery position.",
      "Do not leave the patient unattended."
    ]
  },
  {
    id: 'difficulty_breathing',
    name: 'Difficulty Breathing',
    regexPatterns: [
      /difficulty.*breathing/i, /cannot.*breathe/i, /short.*breath/i, /shortness.*breath/i, /struggling.*breathe/i, /suffocating/i,
      /ఊపిరి.*ఆడ/i, /శ్వాస.*కష్టం/i,
      /सांस.*तकलीफ/i, /साँस.*तकलीफ/i, /दम.*घुट/i,
      /மூச்சு.*திணறல்/i, /மூச்சு.*முடியவில்லை/i
    ],
    advice: [
      "CALL EMERGENCY SERVICES (108 / 911) IMMEDIATELY.",
      "Help the person sit upright. Leaning forward slightly can make breathing easier.",
      "Loosen any tight collars, ties, or belts.",
      "If the person has prescribed rescue medication, assist them in using it."
    ]
  }
];

export default function App() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const [symptomText, setSymptomText] = useState('');
  const [apiResult, setApiResult] = useState(null);

  // Accessibility States
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    const SpeechLib = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechLib) {
      const rec = new SpeechLib();
      rec.continuous = true;
      rec.interimResults = true;
      recognitionRef.current = rec;
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStep(2);
  };

  const startRecording = () => {
    setSymptomText('');
    setIsRecording(true);
    const recognition = recognitionRef.current;

    if (recognition) {
      const langCodes = {
        English: 'en-US',
        Hindi: 'hi-IN',
        Telugu: 'te-IN',
        Tamil: 'ta-IN'
      };

      recognition.lang = langCodes[language] || 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setSymptomText(transcript);
      };

      recognition.onerror = (err) => {
        console.error('Speech Recognition Error', err);
        setIsRecording(false);
      };

      try {
        recognition.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      setSymptomText("Running browser microphone fallback. Please type your symptoms manually below.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  // Fast emergency bypass rule evaluation
  const evaluateLocalEmergency = (text) => {
    const cleaned = text.trim();
    for (const trigger of EMERGENCY_TRIGGERS) {
      const matches = trigger.regexPatterns.some((pattern) => pattern.test(cleaned));
      if (matches) {
        return {
          severity: 'emergency',
          reason: `CRITICAL DETECTED: ${trigger.name}. Local emergency bypass activated.`,
          action: trigger.advice.map((line, idx) => `${idx + 1}. ${line}`).join('\n'),
          hospitalRequired: true
        };
      }
    }
    return null;
  };

  const handleEmergencyShortcut = (shortcutId) => {
    const sc = EMERGENCY_TRIGGERS.find(t => t.id === shortcutId);
    if (sc) {
      const bypassResult = {
        severity: 'emergency',
        reason: `CRITICAL DETECTED: ${sc.name}. Direct emergency bypass routing selected.`,
        action: sc.advice.map((line, idx) => `${idx + 1}. ${line}`).join('\n'),
        hospitalRequired: true
      };
      setSymptomText(sc.name);
      setApiResult(bypassResult);
      setStep(4); // Skips progress bar and goes to Risk Screen immediately
    }
  };

  const handleAssessmentSubmit = () => {
    setStep(3); // Moves to progress animation step
  };

  const executeTriageAnalysis = async () => {
    // 1. Evaluate local emergency rules first (Bypasses remote AI)
    const localEmergency = evaluateLocalEmergency(symptomText);
    if (localEmergency) {
      setApiResult(localEmergency);
      setStep(4);
      return;
    }

    // 2. Call backend /api/analyze if no local emergency match
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomText, language })
      });

      if (!response.ok) throw new Error('API server issue');

      const result = await response.json();
      setApiResult(result);
      setStep(4);
    } catch (err) {
      console.warn('Backend failed, running emergency/doctor fallback');
      setApiResult({
        severity: 'doctor',
        reason: 'Temporary offline backup assessment. Clinic visit is recommended.',
        action: "1. Visit your local Primary Health Center (PHC).\n2. Rest and stay hydrated.",
        hospitalRequired: false
      });
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setLanguage('English');
    setSymptomText('');
    setApiResult(null);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${isHighContrast ? 'high-contrast' : ''} ${isLargeText ? 'text-scale-large' : ''}`}>
      {/* Header bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 leading-none text-lg">HealthCompass</h1>
            <span className="text-xs text-blue-700 font-extrabold">Find the Right Direction for Your Health</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`p-2.5 rounded-xl border-2 transition-all ${
              isHighContrast
                ? 'bg-yellow-400 border-yellow-400 text-black'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            title="Toggle Contrast"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          {/* Large Text Toggle */}
          <button
            onClick={() => setIsLargeText(!isLargeText)}
            className={`px-3.5 py-2.5 rounded-xl text-sm font-extrabold border-2 transition-all ${
              isLargeText
                ? 'bg-blue-800 border-blue-800 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            A+
          </button>

          {step > 1 && (
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl text-gray-600 focus:outline-none"
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-gray-100 border-b border-gray-200 px-6 py-2">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <span className="text-xs font-black text-gray-500 uppercase">Assessment Status</span>
          <span className="text-xs font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
            Screen {step} of 6
          </span>
        </div>
        <div className="max-w-xl mx-auto mt-1 bg-gray-250 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }}></div>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 py-8 px-4 flex items-center justify-center max-w-4xl mx-auto w-full">
        {step === 1 && (
          <LanguageSelect
            onSelect={handleLanguageSelect}
            isLargeText={isLargeText}
          />
        )}
        {step === 2 && (
          <VoiceRecorder
            language={language}
            isRecording={isRecording}
            symptomText={symptomText}
            onStart={startRecording}
            onStop={stopRecording}
            onEmergencySelect={handleEmergencyShortcut}
            onSubmit={handleAssessmentSubmit}
            isLargeText={isLargeText}
          />
        )}
        {step === 3 && (
          <AnalysisProgress
            onComplete={executeTriageAnalysis}
            isLargeText={isLargeText}
          />
        )}
        {step === 4 && (
          <RiskClassification
            result={apiResult}
            language={language}
            onNextHospital={() => setStep(5)}
            onNextReport={() => setStep(6)}
            onReset={handleReset}
            isLargeText={isLargeText}
          />
        )}
        {step === 5 && (
          <NearestHospital
            severity={apiResult?.severity}
            onNext={() => setStep(6)}
            isLargeText={isLargeText}
          />
        )}
        {step === 6 && (
          <ReferralReport
            result={apiResult}
            language={language}
            symptomText={symptomText}
            onReset={handleReset}
            isLargeText={isLargeText}
          />
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center">
        <p className="text-[10px] font-semibold text-gray-400 max-w-md mx-auto leading-relaxed">
          HealthCompass is not an AI doctor. We help you understand the urgency of your symptoms, receive guidance, and find the next appropriate healthcare action.
        </p>
      </footer>
    </div>
  );
}
