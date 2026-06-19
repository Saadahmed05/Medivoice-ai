import React from 'react';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { id: 'English', label: 'English', native: 'English' },
  { id: 'Hindi', label: 'Hindi', native: 'हिंदी' },
  { id: 'Telugu', label: 'Telugu', native: 'తెలుగు' },
  { id: 'Tamil', label: 'Tamil', native: 'தமிழ்' }
];

export default function LanguageSelect({ onSelect, isLargeText }) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center min-h-[70vh] py-2 space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-blue-50 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center border border-blue-100">
          <Globe className="w-7 h-7" />
        </div>
        <h2 className={`font-black text-gray-900 tracking-tight leading-tight ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Select Language / भाषा / భాష
        </h2>
        <p className={`text-gray-500 font-semibold ${isLargeText ? 'text-lg' : 'text-sm'}`}>
          Tap your language to begin voice assessment
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="flex flex-col items-center justify-center p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-600 active:bg-gray-50 active:scale-[0.98] transition-all min-h-[110px] text-center focus:outline-none focus:border-blue-600"
            aria-label={`Select ${lang.label}`}
          >
            <span className={`font-black text-gray-900 leading-none ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
              {lang.native}
            </span>
            <span className={`text-gray-400 font-bold mt-1.5 ${isLargeText ? 'text-lg' : 'text-xs'}`}>
              {lang.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
