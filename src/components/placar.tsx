'use client';
import { useState, useEffect } from 'react';

interface PlacarProps {
  leftPlayer?: { name: string; score: number };
  rightPlayer?: { name: string; score: number };
  initialTime?: number; // tempo inicial em segundos
  startTimer?: boolean; // controla quando iniciar
}

export default function Placar({
  leftPlayer = { name: "REINALDO", score: 9 },
  rightPlayer = { name: "RODRIGO", score: 7 },
  initialTime = 180, // 3 minutos = 180 segundos
  startTimer = false,
}: PlacarProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // Formata o tempo em mm:ss
  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  useEffect(() => {
    if (!startTimer) return;

    setIsRunning(true);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimer]);

  return (
    <div className="relative w-[14rem] max-w-full mx-auto">
      <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden font-inter h-20">

        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-l-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">1</span>
          <span className="text-red-600 text-lg font-bold">0</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-blue-600 text-white py-1 w-20">
          <div className="text-center">
            <h2 className="text-[10px] font-bold uppercase">{leftPlayer.name}</h2>
          </div>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {leftPlayer.score}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-1 w-14 relative">
          <span className={`text-sm font-semibold ${isRunning ? 'text-green-600' : 'text-gray-900'}`}>
            {formattedTime}
          </span>
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
            isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`} />
        </div>

        <div className="flex flex-col items-center justify-center bg-green-500 text-black py-1 w-20">
          <div className="text-center">
            <h2 className="text-[10px] font-bold uppercase">{rightPlayer.name}</h2>
          </div>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {rightPlayer.score}
          </span>
        </div>

        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-r-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">0</span>
          <span className="text-red-600 text-lg font-bold">0</span>
        </div>

      </div>
    </div>
  );
}
