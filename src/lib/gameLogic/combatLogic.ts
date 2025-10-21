// src/lib/gameLogic/combatLogic.ts

import { Carta } from './cardSetup'; // Assumindo que a interface/tipo Carta está em cardSetup
import { TECNICAS } from '../constants/techniques'; // Importa a lista de técnicas para as regras de vantagem

// Define o resultado do processamento do turno
export interface TurnoResultado {
  playerCard: Carta;
  cpuCard: Carta;
  novoLeftProgress: number;
  novoRightProgress: number;
  pontosPlayer: number;
  pontosCpu: number;
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
 * Lógica para calcular o roubo de dominação (progresso).
 * @param barraOrigem O progresso do jogador que está sendo roubado.
 * @returns O valor roubado e o novo valor da barra de origem.
 */
const calcularRoubo = (barraOrigem: number): { valorRoubado: number, novoBarraOrigem: number } => {
  // Rouba até 20% da barra de origem
  const maxRoubo = 20;
  const valorRoubado = Math.min(barraOrigem, maxRoubo);

  // Novo valor da barra de origem (mínimo 0)
  const novoBarraOrigem = Math.max(0, barraOrigem - valorRoubado);

  return { valorRoubado, novoBarraOrigem };
};

/**
 * Atualiza o progresso baseado na comparação das cartas, incluindo a lógica de finalização.
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
): { 
  novoLeftProgress: number, 
  novoRightProgress: number,
  pontosPlayer: number,
  pontosCpu: number 
} => {

  let novoLeftProgress = currentLeftProgress;
  let novoRightProgress = currentRightProgress;
  let pontosPlayer = 0;
  let pontosCpu = 0;

  const playerIsFinalizando = isFinalizacaoCard(playerCard);
  const cpuIsFinalizando = isFinalizacaoCard(cpuCard);
  const playerPodeFinalizar = canPlayFinalizacao(true, currentLeftProgress, currentRightProgress);
  const cpuPodeFinalizar = canPlayFinalizacao(false, currentLeftProgress, currentRightProgress);

  // 1. LÓGICA DE FINALIZAÇÃO (Roubo de Dominação)

  // Prioridade 1: Jogador finaliza
  if (playerIsFinalizando && playerPodeFinalizar) {
    // Jogador finaliza, rouba da CPU
    const { valorRoubado, novoBarraOrigem } = calcularRoubo(currentRightProgress);
    novoRightProgress = novoBarraOrigem; // CPU perde
    novoLeftProgress = Math.min(currentLeftProgress + valorRoubado, 100); // Jogador ganha
    pontosPlayer = playerCard.pontos || 0; // Jogador ganha pontos da sua carta
    return { novoLeftProgress, novoRightProgress, pontosPlayer, pontosCpu };
  }

  // Prioridade 2: CPU finaliza
  if (cpuIsFinalizando && cpuPodeFinalizar) {
    // CPU finaliza, rouba do Jogador
    const { valorRoubado, novoBarraOrigem } = calcularRoubo(currentLeftProgress);
    novoLeftProgress = novoBarraOrigem; // Jogador perde
    novoRightProgress = Math.min(currentRightProgress + valorRoubado, 100); // CPU ganha
    pontosCpu = cpuCard.pontos || 0; // CPU ganha pontos da sua carta
    return { novoLeftProgress, novoRightProgress, pontosPlayer, pontosCpu };
  }

  // 2. LÓGICA DE EMPATE ESPECIAL (Ambos perdem 5% de dominação)
  // Isso acontece se A carta de finalização foi jogada mas a condição de 100% não foi atendida, 
  // OU se o jogador jogou uma carta forte o suficiente (por exemplo, outra finalização) para "anular" 
  // o efeito de roubo da CPU, resultando num empate.
  // Por simplicidade, aplicamos a regra de empate se ambos jogaram finalização e nenhuma das regras de roubo acima se aplicou.
  if (playerIsFinalizando && cpuIsFinalizando) {
    // Empate especial (Ambos perdem 5% de dominação - de acordo com a regra no prompt)
    novoLeftProgress = Math.max(0, currentLeftProgress - 5);
    novoRightProgress = Math.max(0, currentRightProgress - 5);
    // Empate: nenhum ponto para ninguém
    return { novoLeftProgress, novoRightProgress, pontosPlayer, pontosCpu };
  }

  // 3. LÓGICA PADRÃO (Vantagem / Empate de 5%)
  // Busca a técnica original para ter acesso às vantagens
  const playerTecnica = TECNICAS.find(t => t.id === playerCard.id);
  const cpuTecnica = TECNICAS.find(t => t.id === cpuCard.id);

  if (!playerTecnica || !cpuTecnica) {
    return { 
      novoLeftProgress: currentLeftProgress, 
      novoRightProgress: currentRightProgress, 
      pontosPlayer: 0, 
      pontosCpu: 0 
    };
  }

  if (playerTecnica.vantagens.includes(cpuTecnica.id)) {
    // Jogador tem vantagem -> aumenta progresso do jogador
    novoLeftProgress = Math.min(currentLeftProgress + 20, 100);
    pontosPlayer = playerCard.pontos || 0; // Jogador ganha pontos da sua carta
  } else if (cpuTecnica.vantagens.includes(playerTecnica.id)) {
    // CPU tem vantagem -> aumenta progresso da CPU
    novoRightProgress = Math.min(currentRightProgress + 20, 100);
    pontosCpu = cpuCard.pontos || 0; // CPU ganha pontos da sua carta
  } else {
    // Empate normal (Ambos ganham 5% de dominação)
    novoLeftProgress = Math.min(currentLeftProgress + 5, 100);
    novoRightProgress = Math.min(currentRightProgress + 5, 100);
    // Empate: nenhum ponto para ninguém
  }

  return { novoLeftProgress, novoRightProgress, pontosPlayer, pontosCpu };
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
      // A condição canPlayFinalizacao(false, 0, rightProgress) está correta para verificar o lado da CPU.
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

  const { 
    novoLeftProgress, 
    novoRightProgress, 
    pontosPlayer, 
    pontosCpu 
  } = atualizarProgresso(
    playerCard,
    cpuCarta,
    leftProgress,
    rightProgress
  );

  return {
    playerCard,
    cpuCard: cpuCarta,
    novoLeftProgress,
    novoRightProgress,
    pontosPlayer,
    pontosCpu
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

let ultimaCpuCard: Carta | null = null; // variável para armazenar o último movimento da CPU

const selecionarCartaCpu = (
  cpuCards: Carta[],
  turno: number,
  rightProgress: number
): Carta => {
  if (turno === 1) {
    // Turno 1: CPU escolhe Queda ou Chamada para Guarda
    const categoriasPermitidas: Carta['categoria'][] = ['chamada para guarda', 'queda'];
    const opcoesCpu = cpuCards.filter((c) => categoriasPermitidas.includes(c.categoria));

    const escolhida =
      opcoesCpu.length > 0
        ? opcoesCpu[Math.floor(Math.random() * opcoesCpu.length)]
        : cpuCards[Math.floor(Math.random() * cpuCards.length)];

    ultimaCpuCard = escolhida; // guarda a carta escolhida
    return escolhida;
  } else {
    // Depois do primeiro turno, CPU tenta seguir a sequência
    if (ultimaCpuCard?.proximosMovimentos?.length) {
      const opcoesSeguintes = cpuCards.filter((c) =>
        ultimaCpuCard!.proximosMovimentos!.includes(c.id)
      );

      if (opcoesSeguintes.length > 0) {
        const escolhida = opcoesSeguintes[Math.floor(Math.random() * opcoesSeguintes.length)];
        ultimaCpuCard = escolhida;
        return escolhida;
      }
    }

    // Se não tiver próximos movimentos ou não encontrar as cartas listadas, usa a lógica padrão
    const cartasJogaveis = cpuCards.filter(carta => {
      if (isFinalizacaoCard(carta) && !canPlayFinalizacao(false, 0, rightProgress)) {
        return false;
      }
      return true;
    });

    const escolhida =
      cartasJogaveis.length > 0
        ? cartasJogaveis[Math.floor(Math.random() * cartasJogaveis.length)]
        : cpuCards.filter(carta => !isFinalizacaoCard(carta))[0] ||
          cpuCards[Math.floor(Math.random() * cpuCards.length)];

    ultimaCpuCard = escolhida; // atualiza a última jogada
    return escolhida;
  }
};

// Exporta também as funções auxiliares que são usadas fora (handleCardClick no ArenaPage)
export { isFinalizacaoCard, canPlayFinalizacao };