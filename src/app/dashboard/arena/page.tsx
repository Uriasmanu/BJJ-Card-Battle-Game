'use client';

import CardBatalha from '@/components/cardBatalha';
import CardTecnica from '@/components/cardTecnica';
import Placar from '@/components/placar';
import { useState, useEffect, useCallback } from 'react';
import { HandFist, Zap, ArrowLeft, Grid3X3 } from 'lucide-react';
import {
  distribuirCartasIniciais,
  Carta,
  Categoria,
  CATEGORIAS_TECNICAS,
  TODAS_AS_CARTAS
} from '@/lib/gameLogic/cardSetup';
import {
  isFinalizacaoCard as isFinalizacaoCardLogic,
  canPlayFinalizacao as canPlayFinalizacaoLogic
} from '@/lib/gameLogic/combatLogic';
import { handleConfirmTurn } from '@/lib/gameLogic/arenaHandlers';
import { forceAbilityLogic } from '@/lib/gameLogic/forceAbilityLogic';

export default function ArenaPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Carta | null>(null);
  const [playerCards, setPlayerCards] = useState<Carta[]>([]);
  const [cpuCards, setCpuCards] = useState<Carta[]>([]);
  const [opponentCard, setOpponentCard] = useState<Carta | null>(null);
  const [turno, setTurno] = useState<number>(1);
  const [startTimer, setStartTimer] = useState(false);
  const [showOpponentModal, setShowOpponentModal] = useState(false);

  // Estados para o navegador de técnicas
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);
  const [showTechniqueSelector, setShowTechniqueSelector] = useState(false);

  // Estados de estamina e força
  const [stamina, setStamina] = useState(100);
  const [maxStamina] = useState(100);
  const [forceButtonActive, setForceButtonActive] = useState(false);
  const staminaCost = 30;

  // Barras de progresso
  const [leftProgress, setLeftProgress] = useState(0);
  const [rightProgress, setRightProgress] = useState(0);

  const canPlayFinalizacao = useCallback(
    (isPlayer: boolean) => canPlayFinalizacaoLogic(isPlayer, leftProgress, rightProgress),
    [leftProgress, rightProgress]
  );

  const isFinalizacaoCard = (carta: Carta) => isFinalizacaoCardLogic(carta);

  // Distribui cartas iniciais (mão de jogo)
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
        if (isFinalizacaoCard(cartaClicada) && !canPlayFinalizacao(true)) {
          alert('Você só pode jogar cartas de finalização quando sua barra de progresso estiver em 100%!');
          return;
        }
        setSelectedCard(cardId);
      }
    }
  };

  // Selecionar carta do catálogo
  const handleCatalogCardClick = (carta: Carta) => {
    if (isFinalizacaoCard(carta) && !canPlayFinalizacao(true)) {
      alert('Você só pode jogar cartas de finalização quando sua barra de progresso estiver em 100%!');
      return;
    }
    setSelectedCard(carta.id);
    setShowTechniqueSelector(false);
    setSelectedCategory(null);
  };

  const handleOpponentCardClick = () => {
    if (opponentCard) setShowOpponentModal(true);
  };

  const handleConfirm = useCallback(
    (cardId?: string) => {
      const chosenCardId = cardId ?? selectedCard;
      if (!chosenCardId) return;

      const cartaParaJogar =
        playerCards.find(card => card.id === chosenCardId) ||
        TODAS_AS_CARTAS.find(card => card.id === chosenCardId);
      if (!cartaParaJogar) return;

      handleConfirmTurn({
        selectedCardId: chosenCardId,
        playerCards,
        cpuCards,
        turno,
        leftProgress,
        rightProgress,
        setPlayerCards,
        setCpuCards,
        setActiveCard,
        setOpponentCard,
        setLeftProgress,
        setRightProgress,
        setSelectedCard,
        setTurno,
        setForceButtonActive,
      });
    },
    [selectedCard, playerCards, cpuCards, turno, leftProgress, rightProgress]
  );

  const useForceAbility = useCallback(() => {
    useForceAbilityLogic({
      stamina,
      staminaCost,
      cpuCards,
      turno,
      rightProgress,
      setStamina,
      setForceButtonActive,
      setOpponentCard,
      setCpuCards,
      setActiveCard,
      setTurno,
    });
  }, [
    stamina,
    staminaCost,
    cpuCards,
    turno,
    rightProgress,
    setStamina,
    setForceButtonActive,
    setOpponentCard,
    setCpuCards,
    setActiveCard,
    setTurno,
  ]);

  // Regeneração de estamina
  useEffect(() => {
    const interval = setInterval(() => {
      setStamina(prev => Math.min(prev + 5, maxStamina));
    }, 30000);
    return () => clearInterval(interval);
  }, [maxStamina]);

  // =========================================================================
  // RENDERIZAÇÃO DO SELETOR DE TÉCNICAS 
  // =========================================================================

  const renderTechniqueSelector = () => {
    // 1. Visão das Categorias (Inicial)
    if (!selectedCategory) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-yellow-400">Catálogo de Técnicas</h2>
            <button
              onClick={() => setShowTechniqueSelector(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 w-full">
            {CATEGORIAS_TECNICAS.map((category) => {
              const quantidade = TODAS_AS_CARTAS.filter(
                carta => carta.categoria.toLowerCase() === category.toLowerCase()
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-gray-700 hover:bg-yellow-600 text-white p-3 rounded-lg text-center capitalize transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center min-h-[80px]"
                >
                  <span className="font-semibold text-sm">{category}</span>
                  <span className="text-xs text-gray-300 mt-1">{quantidade} técnicas</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // 2. Visão do Carrossel de Cartas de uma Categoria
    const cartasDaCategoria = TODAS_AS_CARTAS.filter(
      (carta) => carta.categoria.toLowerCase() === selectedCategory.toLowerCase()
    );

    return (
      <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/30 shadow-2xl w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <h2 className="text-xl font-bold text-yellow-400 capitalize">
              {selectedCategory} <span className="text-gray-300">({cartasDaCategoria.length})</span>
            </h2>
          </div>
          <button
            onClick={() => {
              setShowTechniqueSelector(false);
              setSelectedCategory(null);
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        {/* Carrossel de Cartas */}
        <div className="overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          <div className="flex space-x-4 pb-4 min-w-max px-2">
            {cartasDaCategoria.map((carta) => {
              const isFinalizacaoBloqueada = isFinalizacaoCard(carta) && !canPlayFinalizacao(true);
              const naMao = playerCards.some(card => card.id === carta.id);

              return (
                <div
                  key={carta.id}
                  className={`transition-all duration-300 flex-shrink-0 relative ${
                    isFinalizacaoBloqueada
                      ? 'opacity-60 filter grayscale-70 cursor-not-allowed'
                      : 'hover:transform hover:-translate-y-2 hover:scale-105 cursor-pointer'
                  } ${naMao ? 'ring-2 ring-green-500 rounded-lg' : ''}`}
                  onClick={isFinalizacaoBloqueada ? undefined : () => handleCatalogCardClick(carta)}
                >
                  <CardBatalha
                    {...carta}
                    onCardClick={undefined} // Não usar o handleCardClick padrão
                    mostrarInformacoes
                  />
                  {isFinalizacaoBloqueada && (
                    <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs text-center py-1 rounded-t">
                      Aguarde 100%
                    </div>
                  )}
                  {naMao && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-1 rounded-b">
                      Na sua mão
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // Fim da Renderização do Seletor de Técnicas
  // =========================================================================

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Tatame */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-[95vmin] max-w-[900px] aspect-square bg-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center -translate-y-10 sm:translate-y-0">
          <div className="absolute inset-[10%] bg-blue-600 rounded-lg"></div>
        </div>
      </div>

      {/* Barras de Progresso */}
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

      {/* Conteúdo Principal */}
      <div className="relative z-30 flex flex-col min-h-screen justify-between p-1 sm:p-2">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
          <Placar startTimer={startTimer} />
        </div>

        {/* Área Central */}
        <div className="flex-1 flex items-center justify-center relative z-20 top-8 lg:top-0">
          <div className="text-center w-full max-w-[500px] sm:max-w-[700px]">
            <div className="rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="flex justify-center items-center space-x-4">
                {activeCard && (
                  <div className="transform scale-90 lg:scale-100">
                    <CardBatalha {...activeCard} onCardClick={undefined} mostrarInformacoes />
                    <div className="text-white text-sm lg:text-base font-semibold mt-1">VOCÊ</div>
                  </div>
                )}

                {activeCard && opponentCard && (
                  <div className="flex items-center justify-center">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm lg:text-base">
                      VS
                    </div>
                  </div>
                )}

                {opponentCard && (
                  <div className="transform scale-90 lg:scale-100 cursor-pointer" onClick={handleOpponentCardClick}>
                    <CardBatalha {...opponentCard} onCardClick={undefined} mostrarInformacoes />
                    <div className="text-white text-sm lg:text-base font-semibold mt-1">OPONENTE</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal do Catálogo de Técnicas */}
        {showTechniqueSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-6xl max-h-[80vh] overflow-y-auto">
              {renderTechniqueSelector()}
            </div>
          </div>
        )}

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
              ${stamina >= staminaCost ? 'bg-red-600 hover:bg-red-700 active:scale-95' : 'bg-gray-500 cursor-not-allowed'}
              ${forceButtonActive ? 'ring-4 ring-yellow-400' : ''}`}
            onClick={useForceAbility}
            disabled={stamina < staminaCost}
          >
            <HandFist className="text-white text-2xl" />
          </button>
        </div>

        {/* Player Hand */}
        <div className="player-hand flex lg:justify-center mb-2 sm:mb-4 relative z-20 overflow-x-auto px-2 sm:px-4 min-h-[140px] sm:min-h-[160px] p-5 top-0 scroll-pl-2 sm:scroll-pl-4 scroll-pr-2 sm:scroll-pr-4">
          {/* Botão para abrir catálogo */}
          <div className="absolute top-4 z-40">
            <button
              onClick={() => setShowTechniqueSelector(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
              title="Abrir Catálogo de Técnicas"
            >
              <Grid3X3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal da carta selecionada */}
        {selectedCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-white font-bold text-xl" onClick={() => setSelectedCard(null)}>×</button>
              {(playerCards.find(card => card.id === selectedCard) || TODAS_AS_CARTAS.find(card => card.id === selectedCard)) && (
                <div>
                  <CardTecnica {...(playerCards.find(card => card.id === selectedCard) || TODAS_AS_CARTAS.find(card => card.id === selectedCard))!} />
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
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-white font-bold text-xl" onClick={() => setShowOpponentModal(false)}>×</button>
              <div>
                <CardTecnica {...opponentCard} />
                <div className="mt-4 flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold" onClick={() => setShowOpponentModal(false)}>Fechar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
