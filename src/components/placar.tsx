import React from "react";

interface PlacarProps {
  timer?: string;
  leftPlayer?: { name: string; team: string; score: number };
  rightPlayer?: { name: string; team: string; score: number };
}

export default function Placar({
  timer = "05:10",
  leftPlayer = { name: "REINALDO", team: "A. ASS. BRASIL", score: 9 },
  rightPlayer = { name: "RODRIGO", team: "MMA UNIÃO", score: 7 },
}: PlacarProps) {
  return (
    <div className="relative w-[22rem] mx-auto mt-4">
      {/* Container geral do placar */}
      <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden font-inter h-32">
        {/* Pontuações verticais - esquerda */}
        <div className="flex flex-col justify-between items-center px-2 py-2 h-full">
          <span className="text-green-500 text-xl font-bold">1</span>
          <span className="text-red-600 text-xl font-bold">0</span>
        </div>

        {/* Lado esquerdo */}
        <div className="flex-1 flex flex-col items-center justify-center bg-blue-600 text-white">
          <div className="text-center">
            <h2 className="text-sm sm:text-base font-bold uppercase">{leftPlayer.name}</h2>
            <p className="text-xs sm:text-sm">{leftPlayer.team}</p>
          </div>
          <span
            className="mt-2 font-extrabold"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
          >
            {leftPlayer.score}
          </span>
        </div>

        {/* Timer central */}
        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-3">
          <span className="text-sm sm:text-base font-semibold">{timer}</span>
        </div>

        {/* Lado direito */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 text-black">
          <div className="text-center">
            <h2 className="text-sm sm:text-base font-bold uppercase">{rightPlayer.name}</h2>
            <p className="text-xs sm:text-sm">{rightPlayer.team}</p>
          </div>
          <span
            className="mt-2 font-extrabold"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
          >
            {rightPlayer.score}
          </span>
        </div>

        {/* Pontuações verticais - direita */}
        <div className="flex flex-col justify-between items-center px-2 py-2 h-full">
          <span className="text-green-500 text-xl font-bold">0</span>
          <span className="text-red-600 text-xl font-bold">0</span>
        </div>
      </div>
    </div>
  );
}
