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

// Função principal para distribuir cartas entre jogador e CPU
export const distribuirCartasIniciais = (): { playerCards: Carta[]; cpuCards: Carta[] } => {
  const cartasTodas = TODAS_AS_CARTAS;
  const categorias = CATEGORIAS_TECNICAS;

  const player: Carta[] = [];
  const cpu: Carta[] = [];

  categorias.forEach((categoria) => {
    const cartasCategoria = cartasTodas.filter((c) => c.categoria === categoria);
    const embaralhadas = embaralhar(cartasCategoria);

    if (embaralhadas.length > 0) {
      const cartaPlayer = embaralhadas[0];
      const cartaCpu = embaralhadas.length > 1 ? embaralhadas[1] : null;

      player.push(cartaPlayer);
      if (cartaCpu) cpu.push(cartaCpu);
    }
  });

  return { playerCards: player, cpuCards: cpu };
};