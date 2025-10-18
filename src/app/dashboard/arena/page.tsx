'use client';

import CardBatalha from '@/components/cardBatalha';
import CardTecnica from '@/components/cardTecnica';
import Placar from '@/components/placar';
import { useState, useEffect, useCallback } from 'react';
import { TECNICAS } from '@/lib/constants/techniques';
import { HandFist, Zap } from 'lucide-react';
import { distribuirCartasIniciais, Carta } from '@/lib/gameLogic/cardSetup';

export default function ArenaPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Carta | null>(null);
  const [playerCards, setPlayerCards] = useState<Carta[]>([]);
  const [cpuCards, setCpuCards] = useState<Carta[]>([]);
  const [opponentCard, setOpponentCard] = useState<Carta | null>(null);
  const [turno, setTurno] = useState<number>(1);
  const [startTimer, setStartTimer] = useState(false);
  const [showOpponentModal, setShowOpponentModal] = useState(false);

  // Estados de estamina e força
  const [stamina, setStamina] = useState(100);
  const [maxStamina] = useState(100);
  const [forceButtonActive, setForceButtonActive] = useState(false);
  const staminaCost = 30;

  // Estados das barras de progresso
  const [leftProgress, setLeftProgress] = useState(0);
  const [rightProgress, setRightProgress] = useState(0);

  // Funções auxiliares para verificar finalização
  const canPlayFinalizacao = (isPlayer: boolean) => {
    return isPlayer ? leftProgress === 100 : rightProgress === 100;
  };

  const isFinalizacaoCard = (carta: Carta) => {
    return carta.categoria === 'finalizacao';
  };

  // Monta cartas do jogador e CPU usando a função refatorada
  useEffect(() => {
    const { playerCards, cpuCards } = distribuirCartasIniciais();
    setPlayerCards(playerCards);
    setCpuCards(cpuCards);
    setStartTimer(true);
  }, []);

  const handleCardClick = (cardId: string) => {
    if (!selectedCard) {
      const cartaClicada = playerCards.find(card => card.id === cardId);
      if (cartaClicada) {
        // Verifica se é uma carta de finalização e se pode jogar
        if (isFinalizacaoCard(cartaClicada) && !canPlayFinalizacao(true)) {
          alert('Você só pode jogar cartas de finalização quando sua barra de progresso estiver em 100%!');
          return;
        }
        setSelectedCard(cardId);
      }
    }
  };

  const handleOpponentCardClick = () => {
    if (opponentCard) {
      setShowOpponentModal(true);
    }
  };

  const handleConfirm = useCallback(
    (cardId?: string) => {
      const chosenCardId = cardId ?? selectedCard;
      if (!chosenCardId) return;

      const cartaSelecionada = playerCards.find((c) => c.id === chosenCardId);
      if (!cartaSelecionada) return;

      let cpuCarta: Carta;

      const atualizarProgresso = (playerCard: Carta, cpuCard: Carta) => {
        // Busca a técnica original para ter acesso às vantagens
        const playerTecnica = TECNICAS.find(t => t.id === playerCard.id);
        const cpuTecnica = TECNICAS.find(t => t.id === cpuCard.id);

        if (!playerTecnica || !cpuTecnica) return;

        if (playerTecnica.vantagens.includes(cpuTecnica.id)) {
          // Jogador tem vantagem -> aumenta progresso do jogador
          setLeftProgress(prev => Math.min(prev + (playerCard.pontos || 10), 100));
        } else if (cpuTecnica.vantagens.includes(playerTecnica.id)) {
          // CPU tem vantagem -> aumenta progresso da CPU
          setRightProgress(prev => Math.min(prev + (cpuCard.pontos || 10), 100));
        } else {
          // Empate - sem alteração no progresso
        }
      };

      if (turno === 1) {
        // Lógica de restrição para Turno 1 (CPU escolhe Queda ou Chamada para Guarda)
        const categoriasPermitidas: Carta['categoria'][] = ['chamada para guarda', 'queda'];
        const opcoesCpu = cpuCards.filter((c) => categoriasPermitidas.includes(c.categoria));

        cpuCarta =
          opcoesCpu.length > 0
            ? opcoesCpu[Math.floor(Math.random() * opcoesCpu.length)]
            : cpuCards[Math.floor(Math.random() * cpuCards.length)];
      } else {
        // Demais turnos - filtra cartas que podem ser jogadas
        const cartasJogaveis = cpuCards.filter(carta => {
          if (isFinalizacaoCard(carta) && !canPlayFinalizacao(false)) {
            return false; // CPU não pode jogar finalização se progresso não estiver em 100%
          }
          return true;
        });

        // Se não há cartas jogáveis, escolhe qualquer uma (exceto finalização se não puder)
        if (cartasJogaveis.length === 0) {
          cpuCarta = cpuCards.filter(carta => !isFinalizacaoCard(carta))[0] ||
            cpuCards[Math.floor(Math.random() * cpuCards.length)];
        } else {
          cpuCarta = cartasJogaveis[Math.floor(Math.random() * cartasJogaveis.length)];
        }
      }

      // Atualiza o progresso baseado nas cartas jogadas
      atualizarProgresso(cartaSelecionada, cpuCarta);

      setActiveCard(cartaSelecionada);
      setOpponentCard(cpuCarta);

      setPlayerCards((prev) => prev.filter((c) => c.id !== cartaSelecionada.id));
      setCpuCards((prev) => prev.filter((c) => c.id !== cpuCarta.id));

      setSelectedCard(null);
      setTurno((prev) => prev + 1);
      setForceButtonActive(false);
    },
    [selectedCard, playerCards, cpuCards, turno, leftProgress, rightProgress]
  );

  // Botão de força (PULA A VEZ DO JOGADOR - JOGADA DA CPU AUTOMÁTICA)
  const useForceAbility = useCallback(() => {
    if (stamina >= staminaCost && cpuCards.length > 0) {
      setStamina((prev) => prev - staminaCost);
      setForceButtonActive(true);

      let cpuCarta: Carta;

      // RESTRIÇÃO DE TURNO 1 APLICADA AQUI TAMBÉM! 🎯
      if (turno === 1) {
        const categoriasPermitidas: Carta['categoria'][] = ['chamada para guarda', 'queda'];
        const opcoesCpu = cpuCards.filter((c) => categoriasPermitidas.includes(c.categoria));

        cpuCarta =
          opcoesCpu.length > 0
            ? opcoesCpu[Math.floor(Math.random() * opcoesCpu.length)]
            : cpuCards[Math.floor(Math.random() * cpuCards.length)];
      } else {
        // Filtra cartas que podem ser jogadas (incluindo verificação de finalização)
        const cartasJogaveis = cpuCards.filter(carta => {
          if (isFinalizacaoCard(carta) && !canPlayFinalizacao(false)) {
            return false;
          }
          return true;
        });

        if (cartasJogaveis.length === 0) {
          cpuCarta = cpuCards.filter(carta => !isFinalizacaoCard(carta))[0] ||
            cpuCards[Math.floor(Math.random() * cpuCards.length)];
        } else {
          cpuCarta = cartasJogaveis[Math.floor(Math.random() * cartasJogaveis.length)];
        }
      }

      // Oponente joga
      setOpponentCard(cpuCarta);
      setCpuCards((prev) => prev.filter((c) => c.id !== cpuCarta.id));

      // Nenhuma carta do jogador é exibida (já que ele pulou)
      setActiveCard(null);

      setTurno((prev) => prev + 1);

      setTimeout(() => setForceButtonActive(false), 2000);
    } else if (stamina < staminaCost) {
      alert('Estamina insuficiente!');
    }
  }, [stamina, staminaCost, cpuCards, turno, rightProgress]);

  // Regeneração de estamina
  useEffect(() => {
    const interval = setInterval(() => {
      setStamina((prev) => Math.min(prev + 5, maxStamina));
    }, 30000);

    return () => clearInterval(interval);
  }, [maxStamina]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Tatame */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-[95vmin] max-w-[900px] aspect-square bg-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center -translate-y-10 sm:translate-y-0">
          <div className="absolute inset-[10%] bg-blue-600 rounded-lg"></div>
        </div>
      </div>

      {/* Barras de Progresso Verticais */}
      <div className="absolute left-4 top-3/7 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-6 h-64 bg-gray-700 rounded-full overflow-hidden relative border-2 border-gray-600">
            <div
              className="w-full bg-blue-500 absolute bottom-0 transition-all duration-500 ease-out"
              style={{ height: `${leftProgress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {leftProgress}%
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-3/7 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-6 h-64 bg-gray-700 rounded-full overflow-hidden relative border-2 border-gray-600">
            <div
              className="w-full bg-green-500 absolute bottom-0 transition-all duration-500 ease-out"
              style={{ height: `${rightProgress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {rightProgress}%
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-30 flex flex-col min-h-screen justify-between p-1 sm:p-2">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
          <Placar startTimer={startTimer} />
        </div>

        {/* Área Central */}
        <div className="flex-1 flex items-center justify-center relative z-20 top-8 lg:top-0">
          <div className="text-center w-full max-w-[500px] sm:max-w-[700px]">
            <div className="rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="flex justify-center items-center space-x-4">
                {opponentCard && (
                  <div
                    className="transform scale-90 lg:scale-100 cursor-pointer"
                    onClick={handleOpponentCardClick}
                  >
                    <CardBatalha {...opponentCard} onCardClick={undefined} mostrarInformacoes />
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
                    <CardBatalha {...activeCard} onCardClick={undefined} mostrarInformacoes />
                    <div className="text-white text-sm lg:text-base font-semibold mt-1">VOCÊ</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Estamina e Botão de Força */}
        <div className="absolute bottom-52 sm:bottom-28 lg:bottom-56 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center space-y-2">
          <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden flex items-center relative">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(stamina / maxStamina) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              <Zap className="mr-1 h-3 w-3 text-yellow-300" /> {stamina}/{maxStamina}
            </div>
          </div>

          <button
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200
                    ${stamina >= staminaCost
                ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                : 'bg-gray-500 cursor-not-allowed'}
                    ${forceButtonActive ? 'ring-4 ring-yellow-400' : ''}`}
            onClick={useForceAbility}
            disabled={stamina < staminaCost}
          >
            <HandFist className="text-white text-2xl" />
          </button>
        </div>

        {/* Player Hand */}
        <div className="player-hand flex lg:justify-center mb-2 sm:mb-4 relative z-20 overflow-x-auto px-2 sm:px-4 min-h-[140px] sm:min-h-[160px] p-5 top-0 scroll-pl-2 sm:scroll-pl-4 scroll-pr-2 sm:scroll-pr-4">
          <div className="flex space-x-2 sm:space-x-4">
            {playerCards.map((card) => {
              const isFinalizacaoBloqueada = isFinalizacaoCard(card) && !canPlayFinalizacao(true);

              return (
                <div
                  key={card.id}
                  className={`transition-all duration-300 flex-shrink-0 relative ${selectedCard === card.id
                      ? 'transform -translate-y-4 sm:-translate-y-4 scale-110 z-30'
                      : isFinalizacaoBloqueada
                        ? 'opacity-60 filter grayscale-70 cursor-not-allowed'
                        : 'hover:transform hover:-translate-y-2 hover:scale-105'
                    }`}
                >
                  <CardBatalha
                    {...card}
                    onCardClick={isFinalizacaoBloqueada ? undefined : handleCardClick}
                    mostrarInformacoes
                  />
                  {isFinalizacaoBloqueada && (
                    <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs text-center py-1 rounded-t">
                      Aguarde 100%
                    </div>
                  )}
                </div>
              );
            })}
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

              {playerCards.find((card) => card.id === selectedCard) && (
                <div>
                  <CardTecnica {...playerCards.find((card) => card.id === selectedCard)!} />
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                      onClick={() => handleConfirm()}
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

        {/* Modal da carta do oponente */}
        {showOpponentModal && opponentCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setShowOpponentModal(false)}
          >
            <div
              className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white font-bold text-xl"
                onClick={() => setShowOpponentModal(false)}
              >
                ×
              </button>

              <div>
                <CardTecnica {...opponentCard} />
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                    onClick={() => setShowOpponentModal(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}