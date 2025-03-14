import React, { useState, useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';

interface InfoTooltipProps {
  title: string;
  content: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Information"
      >
        <Info size={16} className="text-blue-600" />
      </button>

      {isOpen && (
        <div className="fixed transform -translate-x-1/2 left-1/2 z-50 w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-200 mt-2 sm:absolute sm:transform-none sm:left-auto sm:-right-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-blue-600">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}; 