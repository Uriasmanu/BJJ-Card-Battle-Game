'use client';

import CardBatalha from '@/components/cardBatalha';
import CardTecnica from '@/components/cardTecnica';
import { useState, useEffect } from 'react';
import { TECNICAS, obterCorCategoria, obterCorDificuldade } from '@/lib/constants/techniques';
import Placar from '@/components/placar';

type Carta = {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  faixa: string;
  pontos: number;
  corCategoria: string;
  dificuldade: string;
  corDificuldade: string;
  imagemUrl?: string;
  gifUrl?: string;
};

export default function ArenaPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [playerCards, setPlayerCards] = useState<Carta[]>([]);
  const [cpuCards, setCpuCards] = useState<Carta[]>([]);
  const [opponentCard, setOpponentCard] = useState<Carta | null>(null);

  // Função para embaralhar cartas
  const embaralhar = (array: Carta[]): Carta[] => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  // Monta carta do formato TECNICAS
  const montarCarta = (tecnica: typeof TECNICAS[number]): Carta => ({
    id: tecnica.id,
    titulo: tecnica.nome,
    categoria: tecnica.categoria,
    descricao: tecnica.descricao,
    faixa: tecnica.faixa,
    pontos: tecnica.pontos ?? 0,
    corCategoria: obterCorCategoria(tecnica.categoria).cor,
    dificuldade: tecnica.dificuldade,
    corDificuldade: obterCorDificuldade(tecnica.dificuldade).cor,
    imagemUrl: tecnica.imagem,
    gifUrl: tecnica.gif,
  });

  // Distribui 5 cartas para cada jogador no início
  useEffect(() => {
    const embaralhadas = embaralhar(TECNICAS.map(montarCarta));
    setPlayerCards(embaralhadas.slice(0, 5));
    setCpuCards(embaralhadas.slice(5, 10));
  }, []);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleConfirm = () => {
    if (!selectedCard) return;

    setActiveCard(selectedCard);

    // CPU escolhe carta aleatória
    const cpuCardAleatoria = cpuCards[Math.floor(Math.random() * cpuCards.length)];
    setOpponentCard(cpuCardAleatoria);

    // Remove cartas escolhidas dos baralhos
    setPlayerCards(prev => prev.filter(c => c.id !== selectedCard));
    setCpuCards(prev => prev.filter(c => c.id !== cpuCardAleatoria.id));

    setSelectedCard(null);
    console.log('Você escolheu:', selectedCard, '| CPU escolheu:', cpuCardAleatoria.id);
  };

  // Carta do jogador no centro
  const currentPlayerCard = activeCard ? playerCards.find(c => c.id === activeCard) || null : null;

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Tatame */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-[95vmin] max-w-[900px] aspect-square bg-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center -translate-y-10 sm:translate-y-0">
          <div className="absolute inset-[10%] bg-blue-600 rounded-lg"></div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between p-1 sm:p-2">
        {/* Opponent Hand */}
        <div className="opponent-hand flex justify-center mt-1 sm:mt-2 relative z-20 overflow-x-auto">
          <div className="flex space-x-[-8px] sm:space-x-[-12px] px-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="w-10 h-14 sm:w-12 sm:h-16 bg-slate-900 shadow-lg rounded-md cursor-default opacity-90 flex-shrink-0"
                style={{ transform: `rotateZ(${-8 + (index - 1) * 4}deg)` }}
              >
                <div className="card-back absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-md border border-gray-700"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Área Central */}
        <div className="flex-1 flex items-center justify-center relative z-20 top-8 lg:top-0">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
            <Placar />
          </div>

          <div className="text-center w-full max-w-[500px] sm:max-w-[700px]">
            <div className="rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="flex justify-center items-center space-x-4">
                {/* Carta do Oponente */}
                <div className="transform scale-90 lg:scale-100">
                  {opponentCard ? (
                    <CardBatalha {...opponentCard} mostrarInformacoes={false} />
                  ) : (
                    <div className="w-28 h-40 bg-slate-800 rounded-lg border border-gray-600 shadow-lg"></div>
                  )}
                  <div className="text-white text-sm lg:text-base font-semibold mt-1">OPONENTE</div>
                </div>

                {/* VS */}
                <div className="flex items-center justify-center">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm lg:text-base">
                    VS
                  </div>
                </div>

                {/* Carta do Jogador */}
                <div className="transform scale-90 lg:scale-100">
                  {currentPlayerCard ? (
                    <CardBatalha {...currentPlayerCard} mostrarInformacoes={false} />
                  ) : (
                    <div className="w-28 h-40 bg-slate-800 rounded-lg border border-gray-600 shadow-lg"></div>
                  )}
                  <div className="text-white text-sm lg:text-base font-semibold mt-1">VOCÊ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand */}
        <div className="player-hand flex lg:justify-center mb-2 sm:mb-4 relative z-20 overflow-x-auto px-2 sm:px-4 min-h-[140px] sm:min-h-[160px] p-5 top-10 scroll-pl-2 sm:scroll-pl-4 scroll-pr-2 sm:scroll-pr-4">
          <div className="flex space-x-2 sm:space-x-4">
            {playerCards.map((card) => (
              <div
                key={card.id}
                className={`transition-all duration-300 flex-shrink-0 ${
                  selectedCard === card.id
                    ? 'transform -translate-y-4 sm:-translate-y-4 scale-110 z-30'
                    : 'hover:transform hover:-translate-y-2 hover:scale-105'
                }`}
              >
                <CardBatalha {...card} onCardClick={handleCardClick} mostrarInformacoes={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Modal da carta selecionada */}
        {selectedCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white font-bold text-xl"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </button>

              {playerCards
                .filter((card) => card.id === selectedCard)
                .map((card) => (
                  <div key={card.id}>
                    <CardTecnica {...card} />
                    <div className="mt-4 flex justify-center space-x-4">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={handleConfirm}
                      >
                        Selecionar para o Centro
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                        onClick={() => setSelectedCard(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}