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

// Monta uma carta a partir da técnica
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

// Categorias disponíveis
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

// Todas as cartas
export const TODAS_AS_CARTAS: Carta[] = TECNICAS.map(montarCarta);

/**
 * Distribui 2 cartas de cada categoria para o jogador e CPU.
 * Total: 16 cartas (8 categorias × 2 cartas cada)
 */
export const distribuirCartasIniciais = (): { playerCards: Carta[]; cpuCards: Carta[] } => {
  const cartasPorCategoria: Record<Categoria, Carta[]> = {} as Record<Categoria, Carta[]>;

  // Agrupa por categoria
  CATEGORIAS_TECNICAS.forEach((categoria) => {
    cartasPorCategoria[categoria] = TODAS_AS_CARTAS.filter(
      (carta) => carta.categoria.toLowerCase() === categoria.toLowerCase()
    );
  });

  const player: Carta[] = [];
  const cpu: Carta[] = [];

  // Seleciona 2 cartas por categoria (1 para player e 1 para CPU)
  CATEGORIAS_TECNICAS.forEach((categoria) => {
    const cartas = embaralhar(cartasPorCategoria[categoria]);

    // Garante que não estoure caso tenha poucas cartas
    const cartaPlayer = cartas[0];
    const cartaCPU = cartas[1] ?? cartas[0];

    if (cartaPlayer) player.push(cartaPlayer);
    if (cartaCPU) cpu.push(cartaCPU);
  });

  // Duplica para garantir 2 de cada categoria (16 cartas totais)
  const playerCards = embaralhar([...player, ...player]).slice(0, 16);
  const cpuCards = embaralhar([...cpu, ...cpu]).slice(0, 16);

  // Cada jogador começa com 8 cartas (2 de cada categoria)
  return {
    playerCards: embaralhar(playerCards).slice(0, 16),
    cpuCards: embaralhar(cpuCards).slice(0, 16),
  };
};
