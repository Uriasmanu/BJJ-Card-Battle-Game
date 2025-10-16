'use client';

import CardBatalha from '@/components/cardBatalha';
import CardTecnica from '@/components/cardTecnica';
import { useState, useEffect } from 'react';
import { TECNICAS, obterCorCategoria, obterCorDificuldade } from '@/lib/constants/techniques';
import Placar from '@/components/placar';

type Dificuldade = 'facil' | 'intermediario' | 'dificil';
type Categoria = 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa';

interface Carta {
  id: string;
  titulo: string;
  categoria: Categoria;
  descricao: string;
  faixa: string;
  pontos: number;
  corCategoria: string;
  dificuldade: Dificuldade;
  corDificuldade: string;
  imagemUrl?: string;
  gifUrl?: string;
}

export default function ArenaPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Carta | null>(null);
  const [playerCards, setPlayerCards] = useState<Carta[]>([]);
  const [cpuCards, setCpuCards] = useState<Carta[]>([]);
  const [opponentCard, setOpponentCard] = useState<Carta | null>(null);
  const [turno, setTurno] = useState<number>(1); // novo controle de turno

  const embaralhar = (array: Carta[]) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  const montarCarta = (tecnica: typeof TECNICAS[number]): Carta => {
    return {
      id: tecnica.id,
      titulo: tecnica.nome,
      categoria: tecnica.categoria as Categoria,
      descricao: tecnica.descricao,
      faixa: tecnica.faixa,
      pontos: tecnica.pontos ?? 0,
      corCategoria: obterCorCategoria(tecnica.categoria).cor,
      dificuldade: tecnica.dificuldade as Dificuldade,
      corDificuldade: obterCorDificuldade(tecnica.dificuldade).cor,
      imagemUrl: tecnica.imagem,
      gifUrl: tecnica.gif,
    };
  };

  useEffect(() => {
    const cartasTodas = TECNICAS.map(montarCarta);
    const categorias: Categoria[] = ['guarda', 'passagem', 'finalizacao', 'raspagem', 'queda', 'defesa'];

    const player: Carta[] = [];
    const cpu: Carta[] = [];

    categorias.forEach(categoria => {
      const cartasCategoria = cartasTodas.filter(c => c.categoria === categoria);
      const embaralhadas = embaralhar(cartasCategoria);

      const cartaPlayer = embaralhadas[0];
      const cartaCpu = embaralhadas.length > 1 ? embaralhadas[1] : embaralhadas[0];

      player.push(cartaPlayer);
      cpu.push(cartaCpu);
    });

    setPlayerCards(player);
    setCpuCards(cpu);
  }, []);

  const handleCardClick = (cardId: string) => {
    if (activeCard) return;
    setSelectedCard(cardId);
  };

  const handleConfirm = () => {
    if (!selectedCard || playerCards.length === 0 || cpuCards.length === 0) return;

    const cartaSelecionada = playerCards.find(c => c.id === selectedCard);
    if (!cartaSelecionada) return;

    setActiveCard(cartaSelecionada);

    let cpuCarta: Carta | undefined;

    // 🧠 Primeira jogada: CPU escolhe apenas "queda" ou "guarda"
    if (turno === 1) {
      const opcoesCpu = cpuCards.filter(c => c.categoria === 'queda' || c.categoria === 'guarda');
      if (opcoesCpu.length > 0) {
        cpuCarta = opcoesCpu[Math.floor(Math.random() * opcoesCpu.length)];
      } else {
        // fallback caso não tenha essas cartas
        cpuCarta = cpuCards[Math.floor(Math.random() * cpuCards.length)];
      }
    } else {
      // Jogadas seguintes: escolha aleatória normal
      cpuCarta = cpuCards[Math.floor(Math.random() * cpuCards.length)];
    }

    if (!cpuCarta) return;

    setOpponentCard(cpuCarta);
    setPlayerCards(prev => prev.filter(c => c.id !== selectedCard));
    setCpuCards(prev => prev.filter(c => c.id !== cpuCarta!.id));

    setSelectedCard(null);
    setTurno(prev => prev + 1); // avança turno
  };

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
            {cpuCards.map((_, index) => (
              <div
                key={index}
                className="w-10 h-14 sm:w-12 sm:h-16 bg-slate-900 shadow-lg rounded-md cursor-default opacity-90 flex-shrink-0"
                style={{ transform: `rotateZ(${-8 + index * 4}deg)` }}
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
                {opponentCard && (
                  <div className="transform scale-90 lg:scale-100">
                    <CardBatalha {...opponentCard} onCardClick={undefined} mostrarInformacoes={true} />
                    <div className="text-white text-sm lg:text-base font-semibold mt-1">OPONENTE</div>
                  </div>
                )}

                {activeCard && opponentCard && (
                  <div className="flex items-center justify-center">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm lg:text-base">
                      VS
                    </div>
                  </div>
                )}

                {activeCard && (
                  <div className="transform scale-90 lg:scale-100">
                    <CardBatalha {...activeCard} onCardClick={undefined} mostrarInformacoes={true} />
                    <div className="text-white text-sm lg:text-base font-semibold mt-1">VOCÊ</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand */}
        <div className="player-hand flex lg:justify-center mb-2 sm:mb-4 relative z-20 overflow-x-auto px-2 sm:px-4 min-h-[140px] sm:min-h-[160px] p-5 top-0 scroll-pl-2 sm:scroll-pl-4 scroll-pr-2 sm:scroll-pr-4">
          <div className="flex space-x-2 sm:space-x-4">
            {playerCards.map(card => (
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
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white font-bold text-xl"
                onClick={() => setSelectedCard(null)}
              >
                ×
              </button>

              {playerCards.find(card => card.id === selectedCard) && (
                <div>
                  <CardTecnica {...playerCards.find(card => card.id === selectedCard)!} />
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}