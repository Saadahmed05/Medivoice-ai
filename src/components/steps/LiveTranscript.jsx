import React from 'react';
import { Type, ArrowRight } from 'lucide-react';

export default function LiveTranscript({ text, onTextChange, onSubmit, isLargeText }) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
          <Type className="w-6 h-6" />
        </div>
        <h2 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Review Your Symptoms
        </h2>
        <p className={`text-gray-600 ${isLargeText ? 'text-xl' : 'text-base'}`}>
          Check the text below. You can tap on it to correct any mistakes.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className={`w-full p-6 border-2 border-gray-300 rounded-2xl bg-white text-gray-900 focus:border-blue-600 focus:outline-none min-h-[180px] leading-relaxed font-semibold shadow-inner ${
            isLargeText ? 'text-2xl' : 'text-xl'
          }`}
          placeholder="Speak or type your symptoms here..."
        />

        <button
          onClick={onSubmit}
          disabled={!text.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl btn-large shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          Confirm & Analyze
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
