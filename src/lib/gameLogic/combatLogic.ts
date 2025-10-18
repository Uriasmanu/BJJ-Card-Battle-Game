// src/lib/gameLogic/combatLogic.ts

import { Carta } from './cardSetup'; // Assumindo que a interface/tipo Carta está em cardSetup
import { TECNICAS } from '../constants/techniques'; // Importa a lista de técnicas para as regras de vantagem

// Define o resultado do processamento do turno
export interface TurnoResultado {
  playerCard: Carta;
  cpuCard: Carta;
  novoLeftProgress: number;
  novoRightProgress: number;
}

/**
 * Verifica se a carta é de finalização.
 * @param carta A carta a ser verificada.
 */
const isFinalizacaoCard = (carta: Carta) => {
  return carta.categoria === 'finalizacao';
};

/**
 * Verifica se o progresso atingiu 100% para permitir a finalização.
 * @param isPlayer True se for o jogador (progresso esquerdo), False se for a CPU (progresso direito).
 * @param leftProgress O progresso atual do jogador.
 * @param rightProgress O progresso atual da CPU.
 */
const canPlayFinalizacao = (isPlayer: boolean, leftProgress: number, rightProgress: number) => {
  return isPlayer ? leftProgress === 100 : rightProgress === 100;
};


/**
 * Atualiza o progresso baseado na comparação das cartas.
 * @param playerCard Carta jogada pelo jogador.
 * @param cpuCard Carta jogada pela CPU.
 * @param currentLeftProgress Progresso atual do jogador.
 * @param currentRightProgress Progresso atual da CPU.
 * @returns O novo progresso do jogador e da CPU.
 */
const atualizarProgresso = (
  playerCard: Carta,
  cpuCard: Carta,
  currentLeftProgress: number,
  currentRightProgress: number
): { novoLeftProgress: number, novoRightProgress: number } => {
  // Busca a técnica original para ter acesso às vantagens
  const playerTecnica = TECNICAS.find(t => t.id === playerCard.id);
  const cpuTecnica = TECNICAS.find(t => t.id === cpuCard.id);

  if (!playerTecnica || !cpuTecnica) {
    return { novoLeftProgress: currentLeftProgress, novoRightProgress: currentRightProgress };
  }

  let novoLeftProgress = currentLeftProgress;
  let novoRightProgress = currentRightProgress;

  if (playerTecnica.vantagens.includes(cpuTecnica.id)) {
    // Jogador tem vantagem -> aumenta progresso do jogador
    novoLeftProgress = Math.min(currentLeftProgress + 20, 100);
  } else if (cpuTecnica.vantagens.includes(playerTecnica.id)) {
    // CPU tem vantagem -> aumenta progresso da CPU
    novoRightProgress = Math.min(currentLeftProgress + 20, 100);
  } else {
    // Empate - sem alteração no progresso
  }

  return { novoLeftProgress, novoRightProgress };
};

/**
 * Lógica para selecionar a carta da CPU (incluindo restrição de Turno 1 e verificação de finalização).
 * @param cpuCards Cartas atuais da CPU.
 * @param turno O turno atual do jogo.
 * @param rightProgress Progresso atual da CPU.
 * @returns A carta escolhida pela CPU.
 */
const selecionarCartaCpu = (cpuCards: Carta[], turno: number, rightProgress: number): Carta => {
  if (turno === 1) {
    // Turno 1: CPU escolhe Queda ou Chamada para Guarda
    const categoriasPermitidas: Carta['categoria'][] = ['chamada para guarda', 'queda'];
    const opcoesCpu = cpuCards.filter((c) => categoriasPermitidas.includes(c.categoria));

    return opcoesCpu.length > 0
      ? opcoesCpu[Math.floor(Math.random() * opcoesCpu.length)]
      : cpuCards[Math.floor(Math.random() * cpuCards.length)];

  } else {
    // Demais turnos: filtra cartas que podem ser jogadas
    const cartasJogaveis = cpuCards.filter(carta => {
      // CPU não pode jogar finalização se progresso não estiver em 100%
      if (isFinalizacaoCard(carta) && !canPlayFinalizacao(false, 0, rightProgress)) {
        return false;
      }
      return true;
    });

    // Se não há cartas jogáveis, escolhe qualquer uma (exceto finalização se não puder)
    if (cartasJogaveis.length === 0) {
      // Tenta uma carta que não seja finalização, ou qualquer uma se não houver
      return cpuCards.filter(carta => !isFinalizacaoCard(carta))[0] ||
        cpuCards[Math.floor(Math.random() * cpuCards.length)];
    } else {
      // Escolhe aleatoriamente entre as jogáveis
      return cartasJogaveis[Math.floor(Math.random() * cartasJogaveis.length)];
    }
  }
};

/**
 * Processa um turno completo (escolha da CPU e atualização de progresso).
 * @param playerCard Carta selecionada pelo jogador.
 * @param cpuCards Cartas atuais da CPU.
 * @param turno O turno atual do jogo.
 * @param leftProgress Progresso atual do jogador.
 * @param rightProgress Progresso atual da CPU.
 * @returns Um objeto TurnoResultado.
 */
export const processarTurno = (
  playerCard: Carta,
  cpuCards: Carta[],
  turno: number,
  leftProgress: number,
  rightProgress: number
): TurnoResultado => {

  const cpuCarta = selecionarCartaCpu(cpuCards, turno, rightProgress);

  const { novoLeftProgress, novoRightProgress } = atualizarProgresso(
    playerCard,
    cpuCarta,
    leftProgress,
    rightProgress
  );

  return {
    playerCard,
    cpuCard: cpuCarta,
    novoLeftProgress,
    novoRightProgress
  };
};

/**
 * Processa uma jogada da CPU (como no uso do botão de Força).
 * @param cpuCards Cartas atuais da CPU.
 * @param turno O turno atual do jogo.
 * @param rightProgress Progresso atual da CPU.
 * @returns A carta escolhida pela CPU.
 */
export const processarJogadaCpu = (
    cpuCards: Carta[],
    turno: number,
    rightProgress: number
): Carta => {
    return selecionarCartaCpu(cpuCards, turno, rightProgress);
};

// Exporta também as funções auxiliares que são usadas fora (handleCardClick no ArenaPage)
export { isFinalizacaoCard, canPlayFinalizacao };