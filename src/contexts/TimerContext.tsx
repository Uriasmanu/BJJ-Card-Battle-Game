// contexts/TimerContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos em segundos
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Garantir que estamos no cliente
  useEffect(() => {
    setIsClient(true);
    console.log('✅ TimerProvider inicializado no cliente');
  }, []);

  // Formatar tempo para MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    console.log('🚀 startTimer chamado');
    
    // Limpar qualquer intervalo existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Sempre usar 3 minutos (180 segundos)
    const threeMinutes = 180;
    setTimeLeft(threeMinutes);
    setIsRunning(true);
    
    console.log('⏱️ Timer iniciado com 3 minutos');
  };

  const stopTimer = () => {
    console.log('⏸️ stopTimer chamado');
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    console.log('🔄 resetTimer chamado');
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(180); // Reset para 3 minutos
  };

  const toggleTimer = () => {
    console.log('🔀 toggleTimer chamado, estado atual:', isRunning);
    if (isRunning) {
      stopTimer();
    } else {
      setIsRunning(true);
    }
  };

  // Efeito principal do timer - CORRIGIDO
  useEffect(() => {
    console.log('🔄 useEffect executado', {
      isRunning,
      timeLeft,
      isClient,
      hasInterval: !!intervalRef.current
    });

    // Não fazer nada se não estiver no cliente
    if (!isClient) {
      console.log('⏳ Aguardando inicialização do cliente');
      return;
    }

    // Limpar intervalo anterior
    if (intervalRef.current) {
      console.log('🧹 Limpando intervalo anterior');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Se não está rodando ou tempo acabou, não fazer nada
    if (!isRunning || timeLeft <= 0) {
      console.log('❌ Timer não deve rodar:', { isRunning, timeLeft });
      if (timeLeft <= 0 && isRunning) {
        setIsRunning(false);
      }
      return;
    }

    console.log('✅ Iniciando novo intervalo de timer');

    // Criar novo intervalo
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        console.log('⏰ Tick - tempo restante:', newTime);
        
        if (newTime <= 0) {
          console.log('🏁 Timer finalizado!');
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
  }, [isRunning, isClient]); // IMPORTANTE: removido timeLeft das dependências

  const value: TimerContextType = {
    isRunning,
    timeLeft,
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