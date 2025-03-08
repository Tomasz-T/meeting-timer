import { useState, useEffect, useCallback } from 'react'

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [participants, setParticipants] = useState(1)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [realElapsedTime, setRealElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null)

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':')
  }

  const updateElapsedTime = useCallback(() => {
    if (!isRunning || !lastUpdateTime) return
    
    const now = Date.now()
    const realTimePassed = now - lastUpdateTime
    const acceleratedTimePassed = realTimePassed * participants
    
    setElapsedTime(prev => prev + acceleratedTimePassed)
    setRealElapsedTime(prev => prev + realTimePassed)
    setLastUpdateTime(now)
  }, [isRunning, participants, lastUpdateTime])

  const toggleTimer = () => {
    if (!isRunning) {
      setStartTime(prev => prev || Date.now())
      setLastUpdateTime(Date.now())
      setIsRunning(true)
    } else {
      setIsRunning(false)
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setRealElapsedTime(0)
    setStartTime(null)
    setLastUpdateTime(null)
  }

  useEffect(() => {
    let intervalId: number
    
    if (isRunning) {
      intervalId = window.setInterval(updateElapsedTime, 100)
    }
    
    return () => clearInterval(intervalId)
  }, [isRunning, updateElapsedTime])

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">MeetingMeter</h1>
        <p className="text-gray-600 italic">The clock ticks differently when we gather</p>
      </header>

      <div className="flex gap-4 border-b w-full">
        <button className="flex-1 py-2 text-blue-500 border-b-2 border-blue-500">
          Basic Timer
        </button>
        <button className="flex-1 py-2 text-gray-500">
          Cost Calculator
        </button>
      </div>

      <div className="w-full p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <div className="text-6xl font-mono text-center mb-4">
          {formatTime(elapsedTime)}
        </div>
        <div className="text-center text-blue-500">
          Real time: {formatTime(realElapsedTime)}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Participants</h2>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => setParticipants(p => Math.max(1, p - 1))}
            className="w-12 h-12 rounded-xl bg-gray-100"
            disabled={participants <= 1}
          >
            −
          </button>
          <div className="w-16 h-12 flex items-center justify-center border rounded-xl">
            {participants}
          </div>
          <button 
            onClick={() => setParticipants(p => p + 1)}
            className="w-12 h-12 rounded-xl bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`w-32 h-12 rounded-xl text-white ${
            isRunning ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="w-32 h-12 rounded-xl bg-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App 