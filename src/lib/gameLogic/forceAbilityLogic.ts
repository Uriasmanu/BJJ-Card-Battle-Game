// src/lib/gameLogic/forceAbilityLogic.ts

import { processarJogadaCpu } from './combatLogic';
import { Carta } from './cardSetup';
import { Dispatch, SetStateAction } from 'react';

interface ForceAbilityParams {
  stamina: number;
  staminaCost: number;
  cpuCards: Carta[];
  turno: number;
  rightProgress: number;
  setStamina: Dispatch<SetStateAction<number>>;
  setForceButtonActive: Dispatch<SetStateAction<boolean>>;
  setOpponentCard: Dispatch<SetStateAction<Carta | null>>;
  setCpuCards: Dispatch<SetStateAction<Carta[]>>;
  setActiveCard: Dispatch<SetStateAction<Carta | null>>;
  setTurno: Dispatch<SetStateAction<number>>;
}

export const useForceAbilityLogic = ({
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
}: ForceAbilityParams) => {
  if (stamina >= staminaCost && cpuCards.length > 0) {
    setStamina(prev => prev - staminaCost);
    setForceButtonActive(true);

    // Lógica da CPU
    const cpuCarta = processarJogadaCpu(cpuCards, turno, rightProgress);

    setOpponentCard(cpuCarta);
    setCpuCards(prev => prev.filter(c => c.id !== cpuCarta.id));
    setActiveCard(null); // Assegura que o ActiveCard do jogador é nulo quando se usa Força (se for o caso)
    setTurno(prev => prev + 1);

    // Timeout para desativar o indicador visual
    setTimeout(() => setForceButtonActive(false), 2000);
  } else if (stamina < staminaCost) {
    alert('Estamina insuficiente!');
  }
};