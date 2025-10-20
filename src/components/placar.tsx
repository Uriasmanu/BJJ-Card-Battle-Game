// src/components/Placar.tsx

'use client';
import { useState, useEffect } from 'react';

interface PlacarProps {
  leftPlayer?: string;
  rightPlayer?: string;
  initialTime?: number;
  startTimer?: boolean;
  onScoreChange?: (leftScore: number, rightScore: number) => void;
  // NOVAS PROPS PARA PONTUAÇÃO
  leftScore?: number;       // Pontuação total do jogador
  rightScore?: number;      // Pontuação total da CPU
  leftAdvantages?: number;  // Vantagens do jogador
  rightAdvantages?: number; // Vantagens da CPU
  leftPenalties?: number;   // Penalidades do jogador  
  rightPenalties?: number;  // Penalidades da CPU
  // CALLBACKS PARA ATUALIZAÇÃO (opcional)
  onLeftScoreChange?: (score: number) => void;
  onRightScoreChange?: (score: number) => void;
}

export default function Placar({
  leftPlayer = 'Você',
  rightPlayer = 'CPU',
  initialTime = 180,
  startTimer = false,
  onScoreChange,
  // Novas props com valores padrão
  leftScore: externalLeftScore = 0,
  rightScore: externalRightScore = 0,
  leftAdvantages: externalLeftAdvantages = 0,
  rightAdvantages: externalRightAdvantages = 0,
  leftPenalties: externalLeftPenalties = 0,
  rightPenalties: externalRightPenalties = 0,
  onLeftScoreChange,
  onRightScoreChange,
}: PlacarProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  // Estados internos para pontuação (podem ser controlados externamente via props)
  const [leftScore, setLeftScore] = useState(externalLeftScore);
  const [leftAdvantages, setLeftAdvantages] = useState(externalLeftAdvantages);
  const [leftPenalties, setLeftPenalties] = useState(externalLeftPenalties);
  const [rightScore, setRightScore] = useState(externalRightScore);
  const [rightAdvantages, setRightAdvantages] = useState(externalRightAdvantages);
  const [rightPenalties, setRightPenalties] = useState(externalRightPenalties);

  // Sincroniza com props externas
  useEffect(() => {
    setLeftScore(externalLeftScore);
  }, [externalLeftScore]);

  useEffect(() => {
    setRightScore(externalRightScore);
  }, [externalRightScore]);

  useEffect(() => {
    setLeftAdvantages(externalLeftAdvantages);
  }, [externalLeftAdvantages]);

  useEffect(() => {
    setRightAdvantages(externalRightAdvantages);
  }, [externalRightAdvantages]);

  useEffect(() => {
    setLeftPenalties(externalLeftPenalties);
  }, [externalLeftPenalties]);

  useEffect(() => {
    setRightPenalties(externalRightPenalties);
  }, [externalRightPenalties]);

  // Notificar mudanças no placar
  useEffect(() => {
    onScoreChange?.(leftScore, rightScore);
  }, [leftScore, rightScore, onScoreChange]);

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

        {/* Barra lateral esquerda */}
        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-l-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">{leftAdvantages}</span>
          <span className="text-red-600 text-lg font-bold">{leftPenalties}</span>
        </div>

        {/* Placar esquerdo */}
        <div className="flex flex-col items-center justify-center bg-blue-600 text-white py-1 w-20">
          <h2 className="text-[10px] font-bold uppercase text-center">{leftPlayer}</h2>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {leftScore}
          </span>
        </div>

        {/* Timer central */}
        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-1 w-14 relative">
          <span className={`text-sm font-semibold ${isRunning ? 'text-green-600' : 'text-gray-900'}`}>
            {formattedTime}
          </span>
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`} />
        </div>

        {/* Placar direito */}
        <div className="flex flex-col items-center justify-center bg-green-500 text-black py-1 w-20">
          <h2 className="text-[10px] font-bold uppercase text-center">{rightPlayer}</h2>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {rightScore}
          </span>
        </div>

        {/* Barra lateral direita */}
        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-r-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">{rightAdvantages}</span>
          <span className="text-red-600 text-lg font-bold">{rightPenalties}</span>
        </div>

      </div>
    </div>
  );
}