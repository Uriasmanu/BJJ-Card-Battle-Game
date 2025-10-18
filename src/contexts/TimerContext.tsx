'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimerContextType {
  isRunning: boolean;
  timeLeft: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  toggleTimer: () => void;
  formattedTime: string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // Sempre 3 minutos
  const [initialTime] = useState(180);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };
  const toggleTimer = () => setIsRunning(prev => !prev);

  // Timer — intervalo só depende de isRunning
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const value: TimerContextType = {
    isRunning,
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer,
    toggleTimer,
    formattedTime: formatTime(timeLeft),
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimer must be used within a TimerProvider');
  return context;
};
