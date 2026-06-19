import React from 'react';
import { Activity } from 'lucide-react';

export default function AIAnalysis({ isLargeText }) {
  return (
    <div className="w-full max-w-xl mx-auto py-12 flex flex-col items-center justify-center text-center space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-20"></div>
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <Activity className="w-10 h-10 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Analyzing Symptoms...
        </h3>
        <p className={`text-gray-600 max-w-md mx-auto ${isLargeText ? 'text-xl' : 'text-base'}`}>
          Evaluating your description against medical safety guidelines. Please wait.
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs overflow-hidden">
        <div className="bg-blue-600 h-2 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
}
