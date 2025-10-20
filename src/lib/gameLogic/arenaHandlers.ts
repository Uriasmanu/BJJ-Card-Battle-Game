// src/lib/gameLogic/arenaHandlers.ts

import { Carta } from './cardSetup';
import { processarTurno, TurnoResultado } from './combatLogic';

interface HandleConfirmTurnParams {
  selectedCardId: string;
  playerCards: Carta[];
  cpuCards: Carta[];
  turno: number;
  leftProgress: number;
  rightProgress: number;
  setPlayerCards: (cards: Carta[]) => void;
  setCpuCards: (cards: Carta[]) => void;
  setActiveCard: (card: Carta | null) => void;
  setOpponentCard: (card: Carta | null) => void;
  setLeftProgress: (progress: number) => void;
  setRightProgress: (progress: number) => void;
  setSelectedCard: (cardId: string | null) => void;
  setTurno: (turno: number) => void;
  setForceButtonActive: (active: boolean) => void;
  // NOVOS PARÂMETROS PARA PONTUAÇÃO
  setPontosPlayer?: (pontos: number) => void;
  setPontosCpu?: (pontos: number) => void;
  pontosPlayer?: number;
  pontosCpu?: number;
}

export const handleConfirmTurn = ({
  selectedCardId,
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
  // Novos parâmetros
  setPontosPlayer,
  setPontosCpu,
  pontosPlayer = 0,
  pontosCpu = 0
}: HandleConfirmTurnParams) => {
  const cartaParaJogar = playerCards.find(card => card.id === selectedCardId);
  if (!cartaParaJogar) return;

  // Processa o turno (AGORA RETORNA PONTUAÇÃO)
  const resultado: TurnoResultado = processarTurno(
    cartaParaJogar,
    cpuCards,
    turno,
    leftProgress,
    rightProgress
  );

  // Atualiza estados com base no resultado
  setActiveCard(resultado.playerCard);
  setOpponentCard(resultado.cpuCard);
  setLeftProgress(resultado.novoLeftProgress);
  setRightProgress(resultado.novoRightProgress);
  
  // ATUALIZA PONTUAÇÃO - se as funções foram fornecidas
  if (setPontosPlayer && setPontosCpu) {
    const novoPontosPlayer = pontosPlayer + resultado.pontosPlayer;
    const novoPontosCpu = pontosCpu + resultado.pontosCpu;
    
    setPontosPlayer(novoPontosPlayer);
    setPontosCpu(novoPontosCpu);
    
    console.log(`Pontuação atualizada - Player: ${novoPontosPlayer}, CPU: ${novoPontosCpu}`);
  }

  // Remove a carta jogada da mão do jogador
  const novasCartasPlayer = playerCards.filter(card => card.id !== selectedCardId);
  setPlayerCards(novasCartasPlayer);

  // Remove a carta jogada da mão da CPU
  const novasCartasCpu = cpuCards.filter(card => card.id !== resultado.cpuCard.id);
  setCpuCards(novasCartasCpu);

  // Prepara próximo turno
  setSelectedCard(null);
  setTurno(turno + 1);
  setForceButtonActive(false);

  console.log(`Turno ${turno} finalizado. Pontos: Player ${resultado.pontosPlayer}, CPU ${resultado.pontosCpu}`);
};