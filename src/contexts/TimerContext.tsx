// contexts/TimerContext.tsx
'use client';

import { Belt, getBeltById } from '@/lib/constants/belts'; // Presumindo que você tem este arquivo
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


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

  // Função para obter o tempo de luta em segundos baseado na faixa
  const getBeltFightTime = (beltId: string): number => {
    const belt = getBeltById(beltId);
    if (!belt) {
      // Fallback para faixa branca se não encontrar
      const defaultBelt = getBeltById('white');
      return defaultBelt ? defaultBelt.fightTime * 60 : 5 * 60;
    }
    return belt.fightTime * 60; // Converte minutos para segundos
  };

  // Formatar tempo para MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (beltId: string) => {
    const fightTime = getBeltFightTime(beltId);
    const beltInfo = getBeltById(beltId);

    setCurrentBelt(beltId);
    setCurrentBeltInfo(beltInfo);
    setTimeLeft(fightTime);
    setInitialTime(fightTime);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    // Garante que o tempo de reset seja o tempo inicial, se for válido.
    setTimeLeft(initialTime > 0 ? initialTime : getBeltFightTime(currentBelt)); 
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Efeito para decrementar o timer (Com Correção de Sincronização)
  useEffect(() => {
    // CORREÇÃO: Verifica se isRunning é TRUE E se timeLeft é maior que 0.
    // Isso garante que o timer só inicie se houver um tempo válido.
    if (!isRunning || timeLeft <= 0) {
      // Se não estiver rodando ou o tempo acabou, não faz nada e a função de limpeza
      // (return) garante que qualquer intervalo anterior seja parado.
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        // Lógica de decremento usando a forma de função (segura)
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpa o intervalo quando o componente desmonta ou quando
    // as dependências (isRunning ou timeLeft) mudam.
    return () => clearInterval(interval);
    
    // CORREÇÃO: Adicionamos 'timeLeft' para garantir que o useEffect seja reexecutado
    // quando 'startTimer' define o tempo inicial, garantindo que o setInterval
    // comece com o valor correto, especialmente no ambiente de produção (Vercel).
  }, [isRunning, timeLeft]); 


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