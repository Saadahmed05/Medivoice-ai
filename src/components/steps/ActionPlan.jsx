import React, { useEffect, useState } from 'react';
import { ClipboardList, Volume2, ArrowRight } from 'lucide-react';

const TRANSLATIONS = {
  English: { title: "What You Should Do Now", playAudio: "Listen to Steps", stopAudio: "Stop Listening" },
  Hindi: { title: "अब आपको क्या करना चाहिए", playAudio: "निर्देश सुनें", stopAudio: "निर्देश रोकना" },
  Telugu: { title: "మీరు ఇప్పుడు ఏమి చేయాలి", playAudio: "సూచనలు వినండి", stopAudio: "ఆపండి" },
  Tamil: { title: "நீங்கள் இப்போது செய்ய வேண்டியது", playAudio: "வழிமுறைகளைக் கேளுங்கள்", stopAudio: "நிறுத்து" }
};

export default function ActionPlan({ result, language, onNext, isLargeText }) {
  const [speaking, setSpeaking] = useState(false);
  const trans = TRANSLATIONS[language] || TRANSLATIONS.English;
  
  const adviceLines = result?.action
    ? result.action.split('\n')
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(line => line !== '')
    : [];

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }

    if (!window.speechSynthesis) return;

    const speechText = `${trans.title}. ` + adviceLines.map((line, idx) => `Step ${idx + 1}: ${line}`).join('. ');
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

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h2 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          {trans.title}
        </h2>
      </div>

      <div className="space-y-4">
        {adviceLines.map((line, idx) => (
          <div key={idx} className="p-5 bg-white border border-gray-200 rounded-2xl flex items-start gap-4 shadow-sm">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-extrabold text-sm shrink-0">
              {idx + 1}
            </span>
            <p className={`font-bold text-gray-800 leading-relaxed ${isLargeText ? 'text-2xl' : 'text-lg'}`}>
              {line}
            </p>
          </div>
        ))}
      </div>

      {window.speechSynthesis && adviceLines.length > 0 && (
        <button
          onClick={handleSpeak}
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
        onClick={onNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl btn-large shadow-md active:scale-95"
      >
        Find Nearest Hospital
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}
