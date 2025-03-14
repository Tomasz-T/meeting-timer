import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface IntroScreensProps {
  onComplete: () => void;
  onSkip: () => void;
}

const screens = [
  {
    title: "Welcome to MeetingMeter",
    description: "The clock ticks differently when we gather. Let's see how it works.",
  },
  {
    title: "Participant Impact",
    description: "More participants = faster time counting. Each person multiplies the meeting time rate.",
  },
  {
    title: "Real-time Calculation",
    description: "Watch as the timer accelerates based on the number of participants. Try adding or removing people to see the effect.",
  }
];

export const IntroScreens: React.FC<IntroScreensProps> = ({ onComplete, onSkip }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen === screens.length - 1) {
      onComplete();
    } else {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const prevScreen = () => {
    setCurrentScreen(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center">
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Skip intro"
      >
        <X size={24} className="text-gray-600" />
      </button>

      <div className="max-w-md w-full mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {screens[currentScreen].title}
        </h2>
        <p className="text-gray-600 mb-8">
          {screens[currentScreen].description}
        </p>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={prevScreen}
            disabled={currentScreen === 0}
            className={`p-2 rounded-full ${
              currentScreen === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentScreen ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextScreen}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}; 