import { useState, useEffect, useCallback } from 'react';
import { Clock, Users, PlayCircle, PauseCircle, RotateCcw, DollarSign } from 'lucide-react';
import { InfoTooltip } from './components/InfoTooltip';
import { IntroScreens } from './components/IntroScreens';

const MeetingTimer = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'cost'
  const [isRunning, setIsRunning] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [realElapsedTime, setRealElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);
  const [hourlyRate, setHourlyRate] = useState(50); // Default hourly rate

  // Format time in HH:MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Update the elapsed time based on current participants and time passed
  const updateElapsedTime = useCallback(() => {
    if (!isRunning || !lastUpdateTime) return;
    
    const now = Date.now();
    const realTimePassed = now - lastUpdateTime;
    const acceleratedTimePassed = realTimePassed * participants;
    
    setElapsedTime(prevElapsed => prevElapsed + acceleratedTimePassed);
    setRealElapsedTime(prevReal => prevReal + realTimePassed);
    setLastUpdateTime(now);
  }, [isRunning, participants, lastUpdateTime]);

  // Start or stop the timer
  const toggleTimer = () => {
    if (!isRunning) {
      // Start the timer
      setStartTime(prev => prev || Date.now());
      setLastUpdateTime(Date.now());
      setIsRunning(true);
    } else {
      // Stop the timer
      setIsRunning(false);
    }
  };

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setRealElapsedTime(0);
    setStartTime(null);
    setLastUpdateTime(null);
  };

  // Update participants count
  const updateParticipants = (delta: number) => {
    const newCount = Math.max(1, participants + delta);
    
    // If timer is running, we need to capture the current elapsed time before changing speed
    if (isRunning) {
      updateElapsedTime();
      setLastUpdateTime(Date.now());
    }
    
    setParticipants(newCount);
  };

  // Calculate the real-world time duration
  const calculateRealTime = () => {
    if (!startTime && realElapsedTime === 0) return '00:00:00';
    return formatTime(realElapsedTime);
  };
  
  // Calculate meeting cost
  const calculateCost = () => {
    const hours = elapsedTime / (1000 * 60 * 60);
    return (hourlyRate * hours * participants).toFixed(2);
  };

  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        updateElapsedTime();
      }, 100); // Update every 100ms for smooth UI
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, updateElapsedTime]);

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white rounded-lg overflow-hidden font-sans">
      {showIntro && (
        <IntroScreens
          onComplete={() => setShowIntro(false)}
          onSkip={() => setShowIntro(false)}
        />
      )}
      
      <h1 className="text-2xl font-bold mb-1 text-center flex items-center justify-center gap-2">
        <Clock size={28} className="text-blue-600" />
        MeetingMeter
      </h1>
      <p className="text-gray-600 italic mb-4 text-center">The clock ticks differently when we gather</p>
      
      {/* Tabs */}
      <div className="flex w-full mb-4 border-b">
        <button 
          className={`flex-1 py-2 font-medium ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Timer
        </button>
        <button 
          className={`flex-1 py-2 font-medium ${activeTab === 'cost' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('cost')}
        >
          Cost Calculator
        </button>
      </div>
      
      <div className="w-full mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        {/* Main Timer Display */}
        <div className="flex flex-col items-center max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="text-xl font-semibold text-blue-600 mb-4">Adjusted Time</div>
            <div className="text-5xl tracking-wider font-bold text-gray-800 font-timer mb-3">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-base text-gray-600">
              ({participants}x real time)
              <InfoTooltip
                title="Understanding Time Rate"
                content={
                  <div className="space-y-2">
                    <p>• Each participant multiplies the time rate</p>
                    <p>• Example: 5 people = 5x faster</p>
                    <p>• Helps visualize total time investment</p>
                  </div>
                }
              />
            </div>
          </div>
          
          <div className="text-center w-full">
            <div className="text-xl font-semibold text-blue-600 mb-4">Actual Time</div>
            <div className="text-3xl tracking-wider font-medium text-gray-600 font-timer">
              {calculateRealTime()}
            </div>
          </div>
        </div>
        
        {activeTab === 'cost' && (
          <div className="text-center border-t border-gray-200 pt-4 mt-8">
            <div className="text-lg text-green-600 font-bold flex items-center justify-center mb-2">
              <DollarSign size={20} />
              <span className="text-2xl">{calculateCost()}</span>
            </div>
            
            <div className="flex items-center justify-center mb-2">
              <label className="text-sm mr-2">Hourly rate: $</label>
              <input 
                type="number" 
                min="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 border rounded px-2 py-1 text-center"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4 mb-6 w-full">
        <div className="text-xl font-bold text-center flex items-center justify-center gap-2">
          <Users size={24} className="text-blue-600" />
          Participants
        </div>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => updateParticipants(-1)}
            disabled={participants <= 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            −
          </button>
          
          <div className="flex items-center justify-center w-16 h-10 bg-white rounded-lg border border-gray-200">
            <span className="text-xl font-light text-gray-800 font-timer">
              {participants}
            </span>
          </div>
          
          <button 
            onClick={() => updateParticipants(1)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button 
          onClick={toggleTimer}
          className={`p-3 rounded-md w-28 flex justify-center ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? (
            <PauseCircle size={28} color="white" />
          ) : (
            <PlayCircle size={28} color="white" />
          )}
        </button>
        
        <button 
          onClick={resetTimer}
          className="p-3 bg-gray-300 hover:bg-gray-400 rounded-md w-28 flex justify-center"
        >
          <RotateCcw size={28} color="#444" />
        </button>
      </div>
      
      {/* Buy Me a Coffee Link */}
      <a 
        href="https://www.buymeacoffee.com/tomaszte" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-8 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
      >
        ☕ Buy me a coffee
      </a>
    </div>
  );
};

export default MeetingTimer;
