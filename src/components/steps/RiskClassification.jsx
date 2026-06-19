import React, { useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Volume2, MapPin, FileText, RefreshCw } from 'lucide-react';

const TRANSLATIONS = {
  English: {
    safe: "SAFE - MONITOR AT HOME",
    doctor: "SEE DOCTOR - VISIT CLINIC",
    emergency: "EMERGENCY - GO TO HOSPITAL",
    playAudio: "Listen to Guidance",
    stopAudio: "Stop Guidance",
    findHospital: "Find Nearby Hospital",
    genReport: "Generate Referral Report",
    restart: "Start New Assessment"
  },
  Hindi: {
    safe: "सुरक्षित - घर पर रहें",
    doctor: "डॉक्टर को दिखाएं - क्लिनिक जाएं",
    emergency: "आपातकाल - तुरंत अस्पताल जाएं",
    playAudio: "सलाह सुनें",
    stopAudio: "सलाह रोकना",
    findHospital: "नजदीकी अस्पताल खोजें",
    genReport: "रेफरल रिपोर्ट बनाएं",
    restart: "नया आकलन शुरू करें"
  },
  Telugu: {
    safe: "సురక్షితం - ఇంట్లో గమనించండి",
    doctor: "వైద్యుడిని సంప్రదించండి",
    emergency: "అత్యవసర పరిస్థితి - ఆసుపత్రికి వెళ్ళండి",
    playAudio: "సలహా వినండి",
    stopAudio: "ఆపండి",
    findHospital: "ఆసుపత్రిని కనుగొనండి",
    genReport: "రెఫరల్ నివేదిక",
    restart: "మళ్ళీ మొదటి నుండి"
  },
  Tamil: {
    safe: "பாதுகாப்பானது - வீட்டில் இருக்கவும்",
    doctor: "மருத்துவரைப் பார்க்கவும்",
    emergency: "அவசரநிலை - மருத்துவமனைக்குச் செல்லவும்",
    playAudio: "ஆலோசனையைக் கேளுங்கள்",
    stopAudio: "நிறுத்து",
    findHospital: "மருத்துவமனையைக் கண்டறியவும்",
    genReport: "பரிந்துரை அறிக்கை",
    restart: "புதிய மதிப்பீடு"
  }
};

export default function RiskClassification({ result, language, onNextHospital, onNextReport, onReset, isLargeText }) {
  const [speaking, setSpeaking] = useState(false);
  const trans = TRANSLATIONS[language] || TRANSLATIONS.English;
  const severity = result?.severity || 'safe';

  const getSeverityStyle = () => {
    switch (severity) {
      case 'emergency':
        return {
          bg: 'bg-red-50 border-red-700 text-red-900',
          badgeBg: 'bg-red-700 text-white',
          label: trans.emergency,
          icon: <ShieldAlert className="w-12 h-12 text-red-700" />
        };
      case 'doctor':
        return {
          bg: 'bg-amber-50 border-amber-600 text-amber-900',
          badgeBg: 'bg-amber-600 text-white',
          label: trans.doctor,
          icon: <AlertTriangle className="w-12 h-12 text-amber-600" />
        };
      case 'safe':
      default:
        return {
          bg: 'bg-green-50 border-green-700 text-green-900',
          badgeBg: 'bg-green-700 text-white',
          label: trans.safe,
          icon: <CheckCircle className="w-12 h-12 text-green-700" />
        };
    }
  };

  const style = getSeverityStyle();

  const handleSpeak = (forceText) => {
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }

    if (!window.speechSynthesis) return;

    const speechText = forceText || `${style.label}. ${result.reason}. Recommended Action: ${result.action}`;
    const utterance = new SpeechSynthesisUtterance(speechText);

    const langCodes = {
      English: 'en-US',
      Hindi: 'hi-IN',
      Telugu: 'te-IN',
      Tamil: 'ta-IN'
    };
    utterance.lang = langCodes[language] || 'en-US';

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Automatically speak guidance on mount
  useEffect(() => {
    // Small delay to allow page rendering
    const timer = setTimeout(() => {
      handleSpeak();
    }, 400);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [result]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xs font-black tracking-widest text-blue-700 uppercase">Assessment Results</h2>
        <h3 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Symptom Urgency Level
        </h3>
      </div>

      <div className={`card-clinical border-l-8 p-6 space-y-5 ${style.bg}`}>
        <div className="flex items-center gap-4">
          {style.icon}
          <div>
            <span className={`px-3 py-1 rounded-full font-black text-xs uppercase ${style.badgeBg}`}>
              {style.label}
            </span>
            <h4 className={`font-black mt-2 leading-none ${isLargeText ? 'text-2xl' : 'text-xl'}`}>
              {style.label}
            </h4>
          </div>
        </div>

        <p className={`font-semibold leading-relaxed border-t border-gray-200/50 pt-4 text-gray-800 ${isLargeText ? 'text-2xl' : 'text-lg'}`}>
          {result.reason}
        </p>

        {result.action && (
          <div className="border-t border-gray-200/50 pt-4 space-y-2">
            <h5 className="text-xs font-black uppercase text-gray-500">Recommended Guidance</h5>
            <p className={`font-bold text-gray-800 leading-relaxed ${isLargeText ? 'text-xl' : 'text-base'}`}>
              {result.action}
            </p>
          </div>
        )}
      </div>

      {/* Buttons Action Grid */}
      <div className="flex flex-col gap-3">
        {window.speechSynthesis && (
          <button
            onClick={() => handleSpeak()}
            className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 font-bold transition-all ${
              speaking
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <Volume2 className={`w-6 h-6 ${speaking ? 'animate-bounce' : ''}`} />
            <span className={isLargeText ? 'text-xl' : 'text-base'}>
              {speaking ? trans.stopAudio : trans.playAudio}
            </span>
          </button>
        )}

        <button
          onClick={onNextHospital}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 font-bold flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all shadow-sm"
        >
          <MapPin className="w-5 h-5" />
          <span className={isLargeText ? 'text-xl' : 'text-base'}>{trans.findHospital}</span>
        </button>

        <button
          onClick={onNextReport}
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-800 rounded-2xl p-4 font-bold flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all"
        >
          <FileText className="w-5 h-5 text-gray-600" />
          <span className={isLargeText ? 'text-xl' : 'text-base'}>{trans.genReport}</span>
        </button>

        <button
          onClick={onReset}
          className="w-full bg-gray-150 hover:bg-gray-200 text-gray-700 rounded-2xl p-4 font-bold flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all"
        >
          <RefreshCw className="w-5 h-5 text-gray-500" />
          <span className={isLargeText ? 'text-xl' : 'text-base'}>{trans.restart}</span>
        </button>
      </div>
    </div>
  );
}
