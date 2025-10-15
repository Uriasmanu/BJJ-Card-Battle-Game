// src/lib/constants/techniques.ts
export interface Tecnica {
  id: string;
  nome: string;
  categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'controle';
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  pontos: number; // Removemos a restrição de 2 | 3 | 4 para ser mais flexível
  descricao: string;
  faixa: 'branca' | 'azul' | 'roxa' | 'marrom' | 'preta'; 
}

// Cores para cada nível de dificuldade
export const CORES_DIFICULDADE = {
  iniciante: {
    cor: '#22C55E', // Verde
    classe: 'text-green-600 bg-green-100 border-green-300',
    gradiente: 'from-green-500 to-green-600'
  },
  intermediario: {
    cor: '#F97316', // Laranja
    classe: 'text-orange-600 bg-orange-100 border-orange-300',
    gradiente: 'from-orange-500 to-orange-600'
  },
  avancado: {
    cor: '#EF4444', // Vermelho
    classe: 'text-red-600 bg-red-100 border-red-300',
    gradiente: 'from-red-500 to-red-600'
  }
};

// Cores para cada categoria
export const CORES_CATEGORIA = {
  guarda: {
    cor: '#3B82F6', // Azul
    classe: 'text-blue-600 bg-blue-100 border-blue-300',
    gradiente: 'from-blue-500 to-blue-600'
  },
  passagem: {
    cor: '#8B5CF6', // Roxo
    classe: 'text-purple-600 bg-purple-100 border-purple-300',
    gradiente: 'from-purple-500 to-purple-600'
  },
  finalizacao: {
    cor: '#DC2626', // Vermelho
    classe: 'text-red-600 bg-red-100 border-red-300',
    gradiente: 'from-red-500 to-red-600'
  },
  raspagem: {
    cor: '#059669', // Verde
    classe: 'text-emerald-600 bg-emerald-100 border-emerald-300',
    gradiente: 'from-emerald-500 to-emerald-600'
  },
  queda: {
    cor: '#D97706', // Amarelo
    classe: 'text-amber-600 bg-amber-100 border-amber-300',
    gradiente: 'from-amber-500 to-amber-600'
  },
  controle: {
    cor: '#6B7280', // Cinza
    classe: 'text-gray-600 bg-gray-100 border-gray-300',
    gradiente: 'from-gray-500 to-gray-600'
  }
};

export const TECNICAS: Tecnica[] = [
  // === FAIXA BRANCA - TÉCNICAS BÁSICAS ===
  {
    id: 'montada',
    nome: 'Montada',
    categoria: 'controle',
    dificuldade: 'iniciante',
    pontos: 4,
    descricao: 'Posição de controle superior no peito do oponente',
    faixa: 'branca'
  },
  {
    id: 'controle-lateral',
    nome: 'Controle Lateral',
    categoria: 'controle',
    dificuldade: 'iniciante',
    pontos: 3,
    descricao: 'Controle pela lateral do corpo do oponente',
    faixa: 'branca'
  },
  {
    id: 'guarda-fechada',
    nome: 'Guarda Fechada',
    categoria: 'guarda',
    dificuldade: 'iniciante',
    pontos: 3,
    descricao: 'Posição defensiva com as pernas em torno do tronco do oponente',
    faixa: 'branca'
  },
  {
    id: 'americana',
    nome: 'Americana',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 0, // Finalização não tem pontuação
    descricao: 'Finalização de ombro a partir do controle lateral',
    faixa: 'branca'
  },
  {
    id: 'chave-braco-montada',
    nome: 'Chave de Braço da Montada',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 0,
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: 'branca'
  },
  {
    id: 'mata-leao',
    nome: 'Mata Leão',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 0,
    descricao: 'Finalização por estrangulamento pelas costas',
    faixa: 'branca'
  },
  {
    id: 'tesoura',
    nome: 'Tesoura',
    categoria: 'raspagem',
    dificuldade: 'iniciante',
    pontos: 2,
    descricao: 'Raspagem básica da guarda fechada',
    faixa: 'branca'
  },
  {
    id: 'queda-duas-pernas',
    nome: 'Queda de Duas Pernas',
    categoria: 'queda',
    dificuldade: 'iniciante',
    pontos: 2,
    descricao: 'Queda básica de agarrão nas duas pernas',
    faixa: 'branca'
  },

  // === FAIXA AZUL - TÉCNICAS INTERMEDIÁRIAS ===
  {
    id: 'triangulo',
    nome: 'Triângulo',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    pontos: 0,
    descricao: 'Finalização com as pernas a partir da guarda',
    faixa: 'azul'
  },
  {
    id: 'omoplata',
    nome: 'Omoplata',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    pontos: 0,
    descricao: 'Finalização de ombro usando as pernas',
    faixa: 'azul'
  },
  {
    id: 'guarda-borboleta',
    nome: 'Guarda Borboleta',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Guarda com ganchos nos braços do oponente',
    faixa: 'azul'
  },
  {
    id: 'guarda-x',
    nome: 'Guarda X',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    pontos: 4,
    descricao: 'Guarda com entrelaçamento de pernas',
    faixa: 'azul'
  },
  {
    id: 'passagem-joelho',
    nome: 'Passagem de Joelho',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem de guarda com corte de joelho',
    faixa: 'azul'
  },
  {
    id: 'costas',
    nome: 'Pegar as Costas',
    categoria: 'controle',
    dificuldade: 'intermediario',
    pontos: 4,
    descricao: 'Controle pelas costas do oponente',
    faixa: 'azul'
  },

  // === FAIXA ROXA - TÉCNICAS AVANÇADAS ===
  {
    id: 'berimbolo',
    nome: 'Berimbolo',
    categoria: 'raspagem',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Rolamento invertido para pegar as costas',
    faixa: 'roxa'
  },
  {
    id: 'guarda-de-la-riva',
    nome: 'Guarda De La Riva',
    categoria: 'guarda',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Guarda com gancho externo na perna',
    faixa: 'roxa'
  },
  {
    id: 'guarda-minhoca',
    nome: 'Guarda Minhoca',
    categoria: 'guarda',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Guarda usando o kimono para enrolar o oponente',
    faixa: 'roxa'
  },
  {
    id: 'chave-braco-helicoptero',
    nome: 'Chave de Braço Helicóptero',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Chave de braço com movimento de rotação',
    faixa: 'roxa'
  },
  {
    id: 'estr-angulo',
    nome: 'Estrangulamento do Ângulo',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Estrangulamento usando a gola do kimono',
    faixa: 'roxa'
  },

  // === FAIXA MARROM - TÉCNICAS DE ESPECIALISTA ===
  {
    id: 'gogoplata',
    nome: 'Gogoplata',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Estrangulamento usando a canela no pescoço',
    faixa: 'marrom'
  },
  {
    id: 'cortador-panturrilha',
    nome: 'Cortador de Panturrilha',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Finalização de compressão na panturrilha',
    faixa: 'marrom'
  },
  {
    id: 'passagem-toreando',
    nome: 'Passagem Toreando',
    categoria: 'passagem',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Passagem em movimento contornando a guarda',
    faixa: 'marrom'
  },
  {
    id: 'guarda-caramelo',
    nome: 'Guarda Caramelo',
    categoria: 'guarda',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Guarda com controle de perna invertido',
    faixa: 'marrom'
  },

  // === FAIXA PRETA - TÉCNICAS DE MESTRE ===
  {
    id: 'voo-macaco',
    nome: 'Voo do Macaco',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Chave de braço em movimento aéreo',
    faixa: 'preta'
  },
  {
    id: 'guarda-invertida',
    nome: 'Guarda Invertida',
    categoria: 'guarda',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Guarda com as pernas invertidas para controle',
    faixa: 'preta'
  },
  {
    id: 'passagem-torre',
    nome: 'Passagem da Torre',
    categoria: 'passagem',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Passagem avançada com levantamento do oponente',
    faixa: 'preta'
  },
  {
    id: 'calcanhar',
    nome: 'Chave de Calcanhar',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 0,
    descricao: 'Finalização de tornozelo em rotação',
    faixa: 'preta'
  }
];

// Funções auxiliares
export const obterTecnicasPorFaixa = (faixa: string): Tecnica[] => 
  TECNICAS.filter(tecnica => tecnica.faixa === faixa);

export const obterTecnicaPorId = (id: string): Tecnica | undefined => 
  TECNICAS.find(tecnica => tecnica.id === id);

export const obterTecnicasPorCategoria = (categoria: string): Tecnica[] => 
  TECNICAS.filter(tecnica => tecnica.categoria === categoria);

export const obterCorDificuldade = (dificuldade: 'iniciante' | 'intermediario' | 'avancado') => 
  CORES_DIFICULDADE[dificuldade];

export const obterCorCategoria = (categoria: string) => 
  CORES_CATEGORIA[categoria as keyof typeof CORES_CATEGORIA] || CORES_CATEGORIA.controle;

// Filtra técnicas que dão pontos (exclui finalizações)
export const obterTecnicasComPontos = (): Tecnica[] => 
  TECNICAS.filter(tecnica => tecnica.pontos > 0);

// Filtra apenas finalizações
export const obterFinalizacoes = (): Tecnica[] => 
  TECNICAS.filter(tecnica => tecnica.categoria === 'finalizacao');

// Calcula pontuação total de um conjunto de técnicas
export const calcularPontuacaoTotal = (tecnicas: Tecnica[]): number => 
  tecnicas.reduce((total, tecnica) => total + tecnica.pontos, 0);