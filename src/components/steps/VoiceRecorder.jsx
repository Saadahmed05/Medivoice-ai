import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

const GUIDES = {
  English: {
    title: "What health problem are you experiencing today?",
    instructions: "Tap the microphone below and describe your symptoms.",
    label: "Tap to Speak",
    bypass: "Or select an emergency shortcut below:"
  },
  Hindi: {
    title: "आज आपको क्या स्वास्थ्य समस्या है?",
    instructions: "नीचे दिए गए माइक्रोफोन को दबाएं और अपनी बीमारी बताएं।",
    label: "बोलने के लिए दबाएं",
    bypass: "या नीचे दिए गए आपातकालीन लक्षणों में से चुनें:"
  },
  Telugu: {
    title: "ఈ రోజు మీరు ఏ ఆరోగ్య సమస్యను ఎదుర్కొంటున్నారు?",
    instructions: "క్రింది మైక్రోఫోన్ బటన్‌ను నొక్కి మీ లక్షణాలను చెప్పండి.",
    label: "మాట్లాడటానికి నొక్కండి",
    bypass: "లేదా అత్యవసర విభాగాన్ని ఎంచుకోండి:"
  },
  Tamil: {
    title: "இன்று நீங்கள் என்ன சுகாதார பிரச்சினையை எதிர்கொள்கிறீர்கள்?",
    instructions: "கீழே உள்ள மைக்ரோஃபோனைத் தட்டி உங்கள் அறிகுறிகளைப் பேசவும்.",
    label: "பேச தட்டவும்",
    bypass: "அல்லது கீழே உள்ள அவசர நிலைகளில் இருந்து தேர்ந்தெடுக்கவும்:"
  }
};

const EMERGENCY_SHORTCUTS = [
  { id: 'chest_pain', label: 'Chest Pain', labelTe: 'గుండె నొప్పి', labelHi: 'सीने में दर्द', labelTa: 'நெஞ்சு வலி' },
  { id: 'difficulty_breathing', label: 'Breathing Difficulty', labelTe: 'శ్వాస కష్టం', labelHi: 'सांस की तकलीफ', labelTa: 'மூச்சு திணறல்' },
  { id: 'snake_bite', label: 'Snake Bite', labelTe: 'పాము కాటు', labelHi: 'सांप काटना', labelTa: 'பாம்பு கடி' },
  { id: 'stroke', label: 'Stroke Symptoms', labelTe: 'పక్షవాతం', labelHi: 'लकवा के लक्षण', labelTa: 'பக்கவாதம்' }
];

export default function VoiceRecorder({ language, isRecording, symptomText, onStart, onStop, onEmergencySelect, onSubmit, isLargeText }) {
  const guide = GUIDES[language] || GUIDES.English;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 flex flex-col justify-between py-2">
      <div className="text-center space-y-2">
        <h2 className={`font-black text-gray-900 leading-tight tracking-tight ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          {guide.title}
        </h2>
        <p className={`text-gray-500 font-semibold ${isLargeText ? 'text-lg' : 'text-sm'}`}>
          {guide.instructions}
        </p>
      </div>

      {/* Voice Mic and Waveform Container */}
      <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-4">
        {/* Simulated Waveform Visuals */}
        <div className="waveform-container">
          {[...Array(9)].map((_, idx) => (
            <div
              key={idx}
              className={`waveform-bar ${isRecording ? 'waveform-bar-active' : ''}`}
              style={{
                animationDelay: `${idx * 0.1}s`,
                height: isRecording ? undefined : '8px'
              }}
            />
          ))}
        </div>

        <button
          onClick={isRecording ? onStop : onStart}
          className={`w-28 h-28 rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 ${
            isRecording
              ? 'bg-red-600 animate-voice-pulse text-white shadow-lg shadow-red-200'
              : 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95'
          }`}
          aria-label={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
        </button>

        <span className={`font-black uppercase tracking-wider ${isRecording ? 'text-red-600 animate-pulse' : 'text-blue-700'} ${isLargeText ? 'text-lg' : 'text-xs'}`}>
          {isRecording ? "Listening... Tap to stop" : guide.label}
        </span>
      </div>

      {/* Real-time Inline Transcription Box */}
      {symptomText && (
        <div className="space-y-3 bg-white p-5 border border-gray-200 rounded-3xl shadow-sm">
          <label className="block text-xs font-black uppercase text-gray-500">Live Transcript</label>
          <p className={`font-bold text-gray-850 leading-relaxed min-h-[48px] ${isLargeText ? 'text-xl' : 'text-base'}`}>
            {symptomText}
          </p>
          {!isRecording && symptomText.trim().length > 3 && (
            <button
              onClick={onSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-bold active:scale-[0.98] transition-all"
            >
              Analyze Symptoms
            </button>
          )}
        </div>
      )}

      {/* Emergency Bypass Shortcuts */}
      <div className="border-t border-gray-200 pt-5 space-y-3">
        <p className={`font-semibold text-gray-500 flex items-center justify-center gap-2 ${isLargeText ? 'text-lg' : 'text-xs'}`}>
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          {guide.bypass}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {EMERGENCY_SHORTCUTS.map((sc) => {
            let label = sc.label;
            if (language === 'Telugu') label = sc.labelTe;
            else if (language === 'Hindi') label = sc.labelHi;
            else if (language === 'Tamil') label = sc.labelTa;

            return (
              <button
                key={sc.id}
                onClick={() => onEmergencySelect(sc.id)}
                className="p-3.5 bg-red-50 border-2 border-red-100 rounded-xl hover:bg-red-100 text-red-800 font-extrabold text-sm active:scale-[0.98] transition-all text-center focus:outline-none"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
