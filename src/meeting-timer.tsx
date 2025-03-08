import React, { useState, useEffect } from 'react'

export function MeetingTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: number

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTime(0)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h1>Meeting Timer</h1>
      <div style={{ fontSize: '2em', margin: '20px' }}>{formatTime(time)}</div>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
} 