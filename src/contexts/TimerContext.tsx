'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tempo fixo: 3 minutos * 60 segundos = 180 segundos
const FIXED_FIGHT_TIME = 180; 

// Mock da estrutura Belt (já que a importação original não está disponível)
interface Belt {
    id: string;
    name: string;
    fightTime: number; 
}

interface TimerContextType {
    isRunning: boolean;
    timeLeft: number;
    currentBelt: string;
    startTimer: (beltId: string) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    toggleTimer: () => void;
    formattedTime: string;
    // O tipo foi simplificado, mas mantido para não quebrar outros componentes
    currentBeltInfo: Belt | undefined; 
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
    children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    // Inicializa com o tempo fixo
    const [timeLeft, setTimeLeft] = useState(FIXED_FIGHT_TIME); 
    const [currentBelt, setCurrentBelt] = useState('white');
    // Inicializa com o tempo fixo
    const [initialTime, setInitialTime] = useState(FIXED_FIGHT_TIME); 
    // Usamos um objeto mock simples, já que o tempo é fixo.
    const [currentBeltInfo, setCurrentBeltInfo] = useState<Belt | undefined>({ id: 'fixed', name: 'Fixed 3 Min', fightTime: 3 });

    // Função para obter o tempo de luta em segundos (agora fixo)
    const getFightTime = (): number => FIXED_FIGHT_TIME;

    // Formatar tempo para MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // A função startTimer agora ignora o beltId e usa o tempo fixo
    const startTimer = (beltId: string) => {
        const fightTime = getFightTime();
        
        setCurrentBelt(beltId);
        // Não precisamos atualizar currentBeltInfo se o tempo é fixo, mas mantemos o set para a faixa
        setCurrentBeltInfo({ id: beltId, name: `Faixa ${beltId}`, fightTime: 3 });
        setTimeLeft(fightTime);
        setInitialTime(fightTime);
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        // Usa o tempo inicial, que agora é fixo em 180
        setTimeLeft(initialTime > 0 ? initialTime : getFightTime()); 
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    // Efeito para decrementar o timer (Robusto para Vercel)
    useEffect(() => {
        // Checagem defensiva: só roda se houver tempo e estiver rodando
        if (!isRunning || timeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Limpa o intervalo
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]); // Dependências para forçar a sincronização em prod


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
