// src/lib/constants/techniques.ts
export interface Tecnica {
  id: string;
  nome: string;
  categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa';
  dificuldade: 'facil' | 'intermediario' | 'dificil';
  pontos?: 2 | 3 | 4;
  descricao: string;
  faixa: 'branca' | 'azul' | 'roxa' | 'marrom' | 'preta' | 'Todas';
  defesas: string[];
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
    cor: '#8B5CF6', // Roxo
    classe: 'text-purple-600 bg-purple-100 border-purple-300',
    gradiente: 'from-purple-500 to-purple-600',
    icone: '🛡️'
  },
  passagem: {
    cor: '#3B82F6', // Azul
    classe: 'text-blue-600 bg-blue-100 border-blue-300',
    gradiente: 'from-blue-500 to-blue-600',
    icone: '➡️'
  },
  finalizacao: {
    cor: '#DC2626', // Vermelho escuro
    classe: 'text-red-700 bg-red-100 border-red-300',
    gradiente: 'from-red-600 to-red-700',
    icone: '⚡'
  },
  raspagem: {
    cor: '#059669', // Verde escuro
    classe: 'text-green-700 bg-green-100 border-green-300',
    gradiente: 'from-green-600 to-green-700',
    icone: '🔄'
  },
  queda: {
    cor: '#D97706', // Âmbar
    classe: 'text-amber-600 bg-amber-100 border-amber-300',
    gradiente: 'from-amber-500 to-amber-600',
    icone: '⬇️'
  },
  defesa: {
    cor: '#475569', // Slate
    classe: 'text-slate-600 bg-slate-100 border-slate-300',
    gradiente: 'from-slate-500 to-slate-600',
    icone: '🛡️'
  }
};

// Caminho base para os assets (ajuste conforme a estrutura do seu projeto)
const ASSET_PATH = '/tecnicas/';

// Função auxiliar para gerar os caminhos dos assets
const getAssetPaths = (id: string) => ({
  gif: `${ASSET_PATH}${id}.gif`,
  imagem: `${ASSET_PATH}${id}.png`,
});


export const TECNICAS: Tecnica[] = [
  // TÉCNICAS PERMITIDAS PARA FAIXA BRANCA
  {
    id: 'armlock-da-montada',
    nome: 'Armlock da montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: 'branca',
    defesas: ['defesa-armlock-da-montada'],
    ...getAssetPaths('armlock'),
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

// Nova função para obter defesas de uma técnica
export const obterDefesasDaTecnica = (tecnicaId: string): Tecnica[] => {
  const tecnica = obterTecnicaPorId(tecnicaId);
  if (!tecnica || !tecnica.defesas.length) return [];

  return tecnica.defesas
    .map(defesaId => obterTecnicaPorId(defesaId))
    .filter((tecnica): tecnica is Tecnica => tecnica !== undefined);
};