// src/lib/constants/techniques.ts
export interface Tecnica {
  id: string;
  nome: string;
  categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa';
  dificuldade: 'facil' | 'intermediario' | 'dificil';
  pontos?: 2 | 3 | 4;
  descricao: string;
  faixa: 'branca' | 'azul' | 'roxa' | 'marrom' | 'preta' | '( Todas )';
  defesas: string[];
  proximosMovimentos?: string[]; // ✅ novo atributo
  gif?: string;
  imagem?: string;
}

// Cores para cada nível de dificuldade
export const CORES_DIFICULDADE = {
  facil: {
    cor: '#22C55E', // Verde
    classe: 'text-green-600 bg-green-100 border-green-300',
    gradiente: 'from-green-500 to-green-600'
  },
  intermediario: {
    cor: '#F97316', // Laranja
    classe: 'text-orange-600 bg-orange-100 border-orange-300',
    gradiente: 'from-orange-500 to-orange-600'
  },
  dificil: {
    cor: '#EF4444', // Vermelho
    classe: 'text-red-600 bg-red-100 border-red-300',
    gradiente: 'from-red-500 to-red-600'
  }
};

// Cores para cada categoria
export const CORES_CATEGORIA = {
  guarda: {
    cor: '#8B5CF6',
    classe: 'text-purple-600 bg-purple-100 border-purple-300',
    gradiente: 'from-purple-500 to-purple-600',
    icone: '🛡️'
  },
  passagem: {
    cor: '#3B82F6',
    classe: 'text-blue-600 bg-blue-100 border-blue-300',
    gradiente: 'from-blue-500 to-blue-600',
    icone: '➡️'
  },
  finalizacao: {
    cor: '#DC2626',
    classe: 'text-red-700 bg-red-100 border-red-300',
    gradiente: 'from-red-600 to-red-700',
    icone: '⚡'
  },
  raspagem: {
    cor: '#059669',
    classe: 'text-green-700 bg-green-100 border-green-300',
    gradiente: 'from-green-600 to-green-700',
    icone: '🔄'
  },
  queda: {
    cor: '#D97706',
    classe: 'text-amber-600 bg-amber-100 border-amber-300',
    gradiente: 'from-amber-500 to-amber-600',
    icone: '⬇️'
  },
  defesa: {
    cor: '#475569',
    classe: 'text-slate-600 bg-slate-100 border-slate-300',
    gradiente: 'from-slate-500 to-slate-600',
    icone: '🛡️'
  }
};

const ASSET_PATH = '/tecnicas/';

const getAssetPaths = (id: string) => ({
  gif: `${ASSET_PATH}${id}.gif`,
  imagem: `${ASSET_PATH}${id}.png`,
});

export const TECNICAS: Tecnica[] = [
  {
    id: 'armlock-da-montada',
    nome: 'Armlock da montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: '( Todas )',
    defesas: [],
    proximosMovimentos: [], // ✅ pode evoluir pra outra finalização, por ex.
    ...getAssetPaths('armlock'),
  },
  {
    id: 'double-leg-em-pe',
    nome: 'Double Leg Em Pé (Baiana)',
    categoria: 'queda',
    dificuldade: 'facil',
    descricao: 'Entrada clássica de queda levando o oponente ao chão',
    faixa: '( Todas )',
    defesas: ['defesa-double-leg-em-pe'],
    proximosMovimentos: ['passagem-de-guarda'], // ✅ exemplo de sequência
    ...getAssetPaths('double-leg-em-pe'),
  },
  {
    id: 'single-leg',
    nome: 'Single Leg',
    categoria: 'queda',
    dificuldade: 'facil',
    descricao: 'Entrada de queda controlando apenas uma perna do oponente',
    faixa: '( Todas )',
    defesas: ['defesa-single-leg'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('single-leg'),
  },
  {
    id: 'jacare-banguela',
    nome: 'Jacare Banguela',
    categoria: 'queda',
    dificuldade: 'facil',
    descricao: 'Técnica de queda utilizando alavanca e controle do quadril',
    faixa: '( Todas )',
    defesas: ['defesa-jacare-banguela'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('jacare-banguela'),
  },
  {
    id: 'defesa-double-leg-em-pe',
    nome: 'Defesa Double leg em pé',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Bloqueio e contra-ataque contra tentativa de Double Leg',
    faixa: '( Todas )',
    defesas: [],
    proximosMovimentos: ['guarda-fechada'],
    ...getAssetPaths('defesa-double-leg-em-pe'),
  },
  {
    id: 'defesa-single-leg',
    nome: 'Defesa Single Leg',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Entrada de queda controlando apenas uma perna do oponente',
    faixa: '( Todas )',
    defesas: [],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('defesa-single-leg'),
  },
];

// Funções auxiliares
export const obterTecnicasPorFaixa = (faixa: string): Tecnica[] =>
  TECNICAS.filter(tecnica => tecnica.faixa === faixa);

export const obterTecnicaPorId = (id: string): Tecnica | undefined =>
  TECNICAS.find(tecnica => tecnica.id === id);

export const obterTecnicasPorCategoria = (categoria: string): Tecnica[] =>
  TECNICAS.filter(tecnica => tecnica.categoria === categoria);

export const obterCorDificuldade = (dificuldade: 'facil' | 'intermediario' | 'dificil') =>
  CORES_DIFICULDADE[dificuldade];

export const obterCorCategoria = (categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa') =>
  CORES_CATEGORIA[categoria];

// Nova função para obter defesas
export const obterDefesasDaTecnica = (tecnicaId: string): Tecnica[] => {
  const tecnica = obterTecnicaPorId(tecnicaId);
  if (!tecnica || !tecnica.defesas.length) return [];
  return tecnica.defesas
    .map(defesaId => obterTecnicaPorId(defesaId))
    .filter((tecnica): tecnica is Tecnica => tecnica !== undefined);
};

// ✅ Nova função para obter os próximos movimentos possíveis
export const obterProximosMovimentos = (tecnicaId: string): Tecnica[] => {
  const tecnica = obterTecnicaPorId(tecnicaId);
  if (!tecnica || !tecnica.proximosMovimentos?.length) return [];
  return tecnica.proximosMovimentos
    .map(movId => obterTecnicaPorId(movId))
    .filter((tecnica): tecnica is Tecnica => tecnica !== undefined);
};
