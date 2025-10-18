// lib/gameLogic/arenaHandlers.ts
import { Dispatch, SetStateAction } from 'react';
import { Carta } from './cardSetup';
import { processarTurno } from './combatLogic';

interface HandleConfirmParams {
  selectedCardId: string;
  playerCards: Carta[];
  cpuCards: Carta[];
  turno: number;
  leftProgress: number;
  rightProgress: number;
  setPlayerCards: Dispatch<SetStateAction<Carta[]>>;
  setCpuCards: Dispatch<SetStateAction<Carta[]>>;
  setActiveCard: Dispatch<SetStateAction<Carta | null>>;
  setOpponentCard: Dispatch<SetStateAction<Carta | null>>;
  setLeftProgress: Dispatch<SetStateAction<number>>;
  setRightProgress: Dispatch<SetStateAction<number>>;
  setSelectedCard: Dispatch<SetStateAction<string | null>>;
  setTurno: Dispatch<SetStateAction<number>>;
  setForceButtonActive: Dispatch<SetStateAction<boolean>>;
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
}: HandleConfirmParams) => {
  const cartaSelecionada = playerCards.find((c) => c.id === selectedCardId);
  if (!cartaSelecionada) return;

  const resultado = processarTurno(
    cartaSelecionada,
    cpuCards,
    turno,
    leftProgress,
    rightProgress
  );

  setLeftProgress(resultado.novoLeftProgress);
  setRightProgress(resultado.novoRightProgress);

  setActiveCard(cartaSelecionada);
  setOpponentCard(resultado.cpuCard);

  setPlayerCards((prev) => prev.filter((c) => c.id !== cartaSelecionada.id));
  setCpuCards((prev) => prev.filter((c) => c.id !== resultado.cpuCard.id));

  setSelectedCard(null);
  setTurno(turno + 1);
  setForceButtonActive(false);
};
