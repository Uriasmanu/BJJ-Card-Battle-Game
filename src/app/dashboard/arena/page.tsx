'use client';

export default function ArenaPage() {
  return (
    <div>
      <div className="game-arena flex flex-col justify-between items-center p-4 min-h-screen">
        {/* Opponent Hand */}
        <div className="opponent-hand flex justify-center mt-2 p-2 relative z-10">
          <div 
            className="opponent-card w-20 h-28 bg-slate-900 shadow-xl rounded-xl cursor-default opacity-90"
            style={{ transform: 'rotateZ(-8deg)' }}
          >
            <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700"></div>
          </div>
          <div 
            className="opponent-card w-20 h-28 bg-slate-900 shadow-xl rounded-xl cursor-default opacity-90 mx-[-8px]"
            style={{ transform: 'rotateZ(-4deg)' }}
          >
            <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700"></div>
          </div>
          <div 
            className="opponent-card w-20 h-28 bg-slate-900 shadow-xl rounded-xl cursor-default opacity-90 mx-[-8px]"
            style={{ transform: 'rotateZ(0deg)' }}
          >
            <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700"></div>
          </div>
          <div 
            className="opponent-card w-20 h-28 bg-slate-900 shadow-xl rounded-xl cursor-default opacity-90 mx-[-8px]"
            style={{ transform: 'rotateZ(4deg)' }}
          >
            <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700"></div>
          </div>
          <div 
            className="opponent-card w-20 h-28 bg-slate-900 shadow-xl rounded-xl cursor-default opacity-90 mx-[-8px]"
            style={{ transform: 'rotateZ(8deg)' }}
          >
            <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700"></div>
          </div>
          <span className="absolute top-[-40px] text-sm text-gray-400 font-semibold">
            OPONENTE - 5 Cartas
          </span>
        </div>

        {/* Game Board */}
        <div 
          className="game-board flex justify-center items-center flex-grow w-full max-w-4xl my-8"
          style={{ transform: 'rotateX(5deg) translateZ(0)' }}
        >
          <div className="w-full h-96 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center p-4 rounded-md shadow-2xl border-4 border-green-600">
            <div className="text-center">
              <div className="mt-6 flex space-x-8">
                <div className="w-24 h-36 bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-sm text-gray-400">
                  Pilha/Deck
                </div>
                <div className="w-24 h-36 bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-sm text-gray-400">
                  Descarte
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand */}
        <div className="player-hand flex justify-center mb-4 relative z-20">
          {/* Card 1 - Estrangulamento */}
          <div 
            className="player-card w-24 h-36 shadow-2xl hover:shadow-indigo-500/50 rounded-xl cursor-pointer select-none mx-[-12px] transition-all duration-300 hover:transform hover:translate-y-[-20px]"
            data-name="Estrangulamento"
          >
            <div className="card-inner relative w-full h-full">
              <div className="card-back absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"></div>
              <div className="card-face absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-red-400/90 text-red-900 flex-col border-2 border-red-300">
                <div className="text-2xl mb-1">🥋</div>
                <span className="font-bold text-sm text-center">Estrangulamento</span>
                <span className="text-xs text-center mt-2">Dano: 3</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Defesa Postural */}
          <div 
            className="player-card w-24 h-36 shadow-2xl hover:shadow-indigo-500/50 rounded-xl cursor-pointer select-none mx-[-12px] transition-all duration-300 hover:transform hover:translate-y-[-20px]"
            data-name="Defesa Postural"
          >
            <div className="card-inner relative w-full h-full">
              <div className="card-back absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"></div>
              <div className="card-face absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-blue-300/90 text-blue-900 flex-col border-2 border-blue-300">
                <div className="text-2xl mb-1">🛡️</div>
                <span className="font-bold text-sm text-center">Defesa Postural</span>
                <span className="text-xs text-center mt-2">Defesa: 5</span>
              </div>
            </div>
          </div>

          {/* Card 3 - Raspagem Rápida */}
          <div 
            className="player-card w-24 h-36 shadow-2xl hover:shadow-indigo-500/50 rounded-xl cursor-pointer select-none mx-[-12px] transition-all duration-300 hover:transform hover:translate-y-[-20px]"
            data-name="Raspagem Rápida"
          >
            <div className="card-inner relative w-full h-full">
              <div className="card-back absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"></div>
              <div className="card-face absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-green-300/90 text-green-900 flex-col border-2 border-green-300">
                <div className="text-2xl mb-1">⚡</div>
                <span className="font-bold text-sm text-center">Raspagem Rápida</span>
                <span className="text-xs text-center mt-2">Efeito: +1 Ação</span>
              </div>
            </div>
          </div>

          {/* Card 4 - Guarda Fechada */}
          <div 
            className="player-card w-24 h-36 shadow-2xl hover:shadow-indigo-500/50 rounded-xl cursor-pointer select-none mx-[-12px] transition-all duration-300 hover:transform hover:translate-y-[-20px]"
            data-name="Guarda Fechada"
          >
            <div className="card-inner relative w-full h-full">
              <div className="card-back absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"></div>
              <div className="card-face absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-yellow-400/90 text-yellow-900 flex-col border-2 border-yellow-300">
                <div className="text-2xl mb-1">🤝</div>
                <span className="font-bold text-sm text-center">Guarda Fechada</span>
                <span className="text-xs text-center mt-2">Bloqueio: 4</span>
              </div>
            </div>
          </div>

          {/* Card 5 - Bônus de Faixa */}
          <div 
            className="player-card w-24 h-36 shadow-2xl hover:shadow-indigo-500/50 rounded-xl cursor-pointer select-none mx-[-12px] transition-all duration-300 hover:transform hover:translate-y-[-20px]"
            data-name="Bônus de Faixa"
          >
            <div className="card-inner relative w-full h-full">
              <div className="card-back absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"></div>
              <div className="card-face absolute w-full h-full flex items-center justify-center rounded-xl p-1 bg-purple-400/90 text-purple-900 flex-col border-2 border-purple-300">
                <div className="text-2xl mb-1">🏅</div>
                <span className="font-bold text-sm text-center">Bônus de Faixa</span>
                <span className="text-xs text-center mt-2">Custo: 1</span>
              </div>
            </div>
          </div>

          <span className="absolute bottom-[-50px] text-lg font-semibold text-indigo-400">
            VOCÊ - Sua Mão
          </span>
        </div>
      </div>
    </div>
  );
}