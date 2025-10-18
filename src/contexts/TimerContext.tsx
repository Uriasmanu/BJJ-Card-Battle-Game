// contexts/TimerContext.tsx
'use client';

import { Belt, getBeltById } from '@/lib/constants/belts';
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';

interface TimerContextType {
  isRunning: boolean;
  timeLeft: number;
  currentBelt: string;
  startTimer: (beltId: string) => void;
  stopTimer: () => void;
  resetTimer: () => void;
  toggleTimer: () => void;
  formattedTime: string;
  currentBeltInfo: Belt | undefined;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentBelt, setCurrentBelt] = useState('white');
  const [initialTime, setInitialTime] = useState(0);
  const [currentBeltInfo, setCurrentBeltInfo] = useState<Belt | undefined>(getBeltById('white'));
  
  // Usar useRef para valores que não devem trigger re-renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef(timeLeft);

  // Atualizar o ref sempre que timeLeft mudar
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Função para obter o tempo de luta em segundos baseado na faixa
  const getBeltFightTime = useCallback((beltId: string): number => {
    const belt = getBeltById(beltId);
    if (!belt) {
      const defaultBelt = getBeltById('white');
      return defaultBelt ? defaultBelt.fightTime * 60 : 5 * 60;
    }
    return belt.fightTime * 60;
  }, []);

  // Formatar tempo para MM:SS
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback((beltId: string) => {
    console.log('🟢 startTimer chamado com faixa:', beltId);
    
    // Parar qualquer timer existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const fightTime = getBeltFightTime(beltId);
    const beltInfo = getBeltById(beltId);

    console.log('⏱️ Tempo definido:', fightTime, 'segundos');

    setCurrentBelt(beltId);
    setCurrentBeltInfo(beltInfo);
    setTimeLeft(fightTime);
    setInitialTime(fightTime);
    setIsRunning(true);
  }, [getBeltFightTime]);

  const stopTimer = useCallback(() => {
    console.log('🛑 stopTimer chamado');
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    console.log('🔄 resetTimer chamado');
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(initialTime > 0 ? initialTime : getBeltFightTime(currentBelt));
  }, [initialTime, currentBelt, getBeltFightTime]);

  const toggleTimer = useCallback(() => {
    console.log('🔀 toggleTimer chamado, estado atual:', isRunning);
    if (isRunning) {
      stopTimer();
    } else {
      setIsRunning(true);
    }
  }, [isRunning, stopTimer]);

  // Efeito principal do timer - CORRIGIDO
  useEffect(() => {
    console.log('🔄 useEffect executado, isRunning:', isRunning, 'timeLeft:', timeLeft);

    // Limpar intervalo anterior sempre que o efeito rodar
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Se não está rodando ou tempo acabou, não fazer nada
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && isRunning) {
        setIsRunning(false);
      }
      return;
    }

    // Criar novo intervalo
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;
        console.log('⏰ Tick - tempo restante:', newTime);
        
        if (newTime <= 0) {
          console.log('🏁 Timer finalizado');
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        console.log('🧹 Cleanup do intervalo');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]); // REMOVIDA dependência do timeLeft - isso é crucial!

  const value: TimerContextType = {
    isRunning,
    timeLeft,
    currentBelt,
    currentBeltInfo,
    startTimer,
    stopTimer,
    resetTimer,
    toggleTimer,
    formattedTime: formatTime(timeLeft),
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};