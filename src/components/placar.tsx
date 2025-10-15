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
    <div className="flex flex-col bg-gray-100 font-inter overflow-hidden w-[20rem] px-4">
      {/* Cabeçalho */}
      <header className="flex items-center justify-center bg-white shadow-md border-b relative p-5">
        {/* Timer centralizado */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-3xl md:text-1xl font-extrabold tracking-tight text-gray-900">
            {timer}
          </span>
        </div>
      </header>

      {/* Layout principal */}
      <main className="flex relative px-2">
        {/* Placar central */}
        <div className="flex flex-1 mx-2 sm:mx-4 relative">
          {/* Pontuação flutuante esquerda */}
          <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-6 text-center text-2xl font-bold z-20">
            <span className="text-green-500 block leading-none mb-8">1</span>
            <span className="text-red-600 block leading-none mt-8">0</span>
          </div>

          {/* Lado esquerdo */}
          <div className="flex flex-col w-1/2 bg-blue-600 text-white border-r-2 border-white relative">
            <div className="flex items-center justify-between bg-blue-900 h-10 px-3 shadow-xl">
              <i className="far fa-check-square text-blue-300 text-base"></i>
              <div className="text-center">
                <h2 className="text-1xl md:text-1xl font-bold uppercase tracking-wider">{leftPlayer.name}</h2>
                <p className="text-xs text-blue-300">{leftPlayer.team}</p>
              </div>
              <i className="far fa-square text-blue-300 text-base"></i>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="text-white font-black leading-none"
                style={{ fontSize: "clamp(2rem, 1vw, 1rem)" }}
              >
                {leftPlayer.score}
              </span>
            </div>
          </div>

          {/* Lado direito */}
          <div className="flex flex-col w-1/2 bg-white text-black">
            <div className="flex items-center justify-between bg-gray-200 h-10 px-3 shadow-xl">
              <i className="far fa-square text-gray-500 text-base"></i>
              <div className="text-center">
                <h2 className="text-1xl md:text-1xl font-bold uppercase tracking-wider">{rightPlayer.name}</h2>
                <p className="text-xs text-gray-600">{rightPlayer.team}</p>
              </div>
              <i className="far fa-check-square text-gray-500 text-base"></i>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="text-gray-900 font-black leading-none p-4"
                style={{ fontSize: "clamp(2rem, 1vw, 1rem)" }}
              >
                {rightPlayer.score}
              </span>
            </div>
          </div>

          {/* Pontuação flutuante direita */}
          <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-6 text-center text-2xl font-bold z-20">
            <span className="text-green-500 block leading-none mb-8">0</span>
            <span className="text-red-600 block leading-none mt-8">0</span>
          </div>
        </div>
      </main>
    </div>
  );
}
