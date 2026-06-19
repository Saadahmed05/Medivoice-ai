import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function AnalysisProgress({ onComplete, isLargeText }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Listening" },
    { label: "Understanding Symptoms" },
    { label: "Assessing Risk" },
    { label: "Preparing Guidance" }
  ];

  useEffect(() => {
    const intervals = [500, 1000, 1500, 2000];
    const timers = [];

    intervals.forEach((delay, index) => {
      const t = setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === steps.length - 1) {
          // Add a short delay to display final checklist state before transitioning
          setTimeout(onComplete, 500);
        }
      }, delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto py-8 space-y-6 flex flex-col justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h3 className={`font-black text-gray-900 tracking-tight ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Assessing Health Profile
        </h3>
        <p className="text-gray-500 font-semibold text-sm">Please wait while we evaluate symptom urgency.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isActive = currentStep === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-blue-50 border border-blue-100' : 'opacity-70'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
              ) : isActive ? (
                <div className="w-6 h-6 rounded-full border-4 border-blue-600 border-t-transparent animate-spin shrink-0"></div>
              ) : (
                <Circle className="w-6 h-6 text-gray-300 shrink-0" />
              )}

              <span className={`font-bold text-gray-800 transition-colors ${
                isActive ? 'text-blue-900 font-black' : ''
              } ${isLargeText ? 'text-xl' : 'text-base'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
