// lib/gameLogic/cardSetup.ts

import { TECNICAS } from '@/lib/constants/techniques';
import { obterCorCategoria, obterCorDificuldade } from '@/lib/constants/techniques';

type Dificuldade = 'facil' | 'intermediario' | 'dificil';
export type Categoria = 
  | 'guarda'
  | 'passagem'
  | 'finalizacao'
  | 'raspagem'
  | 'queda'
  | 'defesa'
  | 'chamada para guarda'
  | 'estabilização';

export interface Carta {
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

// Função para embaralhar array
export const embaralhar = <T>(array: T[]): T[] => {
  const novoArray = [...array];
  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }
  return novoArray;
};

// Função para montar uma carta a partir da técnica
export const montarCarta = (tecnica: typeof TECNICAS[number]): Carta => ({
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
});

// --- EXPORTAÇÕES PARA O CATÁLOGO ---
export const CATEGORIAS_TECNICAS: Categoria[] = [
    'guarda',
    'passagem',
    'finalizacao',
    'raspagem',
    'queda',
    'defesa',
    'chamada para guarda',
    'estabilização',
];

export const TODAS_AS_CARTAS: Carta[] = TECNICAS.map(montarCarta);
// ------------------------------------------

// lib/gameLogic/cardSetup.ts

// ... imports e interfaces existentes

// Nova função para distribuir cartas sem limitação por categoria
export const distribuirCartasIniciais = (): { playerCards: Carta[]; cpuCards: Carta[] } => {
  const cartasTodas = TODAS_AS_CARTAS;
  
  // Embaralha todas as cartas
  const cartasEmbaralhadas = embaralhar([...cartasTodas]);
  
  // Distribui 8 cartas para cada jogador (ou ajuste conforme necessário)
  const player = cartasEmbaralhadas.slice(0, 8);
  const cpu = cartasEmbaralhadas.slice(8, 16);
  
  return { playerCards: player, cpuCards: cpu };
};

// Função alternativa se quiser manter alguma variedade de categorias
export const distribuirCartasBalanceadas = (): { playerCards: Carta[]; cpuCards: Carta[] } => {
  const cartasPorCategoria: Record<Categoria, Carta[]> = {} as Record<Categoria, Carta[]>;
  
  // Agrupa cartas por categoria
  CATEGORIAS_TECNICAS.forEach(categoria => {
    cartasPorCategoria[categoria] = TODAS_AS_CARTAS.filter(c => c.categoria === categoria);
  });
  
  const player: Carta[] = [];
  const cpu: Carta[] = [];
  
  // Para cada categoria, pega 1-2 cartas aleatórias para cada jogador
  CATEGORIAS_TECNICAS.forEach(categoria => {
    const cartasCategoria = [...cartasPorCategoria[categoria]];
    const embaralhadas = embaralhar(cartasCategoria);
    
    // Adiciona até 2 cartas para o jogador desta categoria
    const cartasPlayer = embaralhadas.slice(0, 2);
    player.push(...cartasPlayer);
    
    // Adiciona até 2 cartas para a CPU desta categoria
    const cartasCPU = embaralhadas.slice(2, 4);
    cpu.push(...cartasCPU);
  });
  
  // Embaralha as mãos finais para misturar as categorias
  return {
    playerCards: embaralhar(player).slice(0, 8),
    cpuCards: embaralhar(cpu).slice(0, 8)
  };
};