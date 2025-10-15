// src/lib/constants/techniques.ts
export interface Tecnica {
  id: string;
  nome: string;
  categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda';
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  pontos: 2 | 3 | 4;
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

export const TECNICAS: Tecnica[] = [
  // Faixa Branca - Técnicas Básicas
  {
    id: 'chave-braco',
    nome: 'Chave de Braço',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 3,
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: 'branca'
  },
  {
    id: 'americana',
    nome: 'Americana',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 2,
    descricao: 'Finalização de ombro a partir do controle lateral',
    faixa: 'branca'
  },
  {
    id: 'mata-leao',
    nome: 'Mata Leão',
    categoria: 'finalizacao',
    dificuldade: 'iniciante',
    pontos: 4,
    descricao: 'Finalização por estrangulamento pelas costas',
    faixa: 'branca'
  },
  {
    id: 'tesoura',
    nome: 'Tesoura',
    categoria: 'raspagem',
    dificuldade: 'iniciante',
    pontos: 2,
    descricao: 'Arraste básico da guarda fechada',
    faixa: 'branca'
  },
  {
    id: 'queda-duas-pernas',
    nome: 'Queda de Duas Pernas',
    categoria: 'queda',
    dificuldade: 'iniciante',
    pontos: 3,
    descricao: 'Queda básica de agarrão nas duas pernas',
    faixa: 'branca'
  },

  // Faixa Azul - Técnicas Intermediárias
  {
    id: 'triangulo',
    nome: 'Triângulo',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    pontos: 4,
    descricao: 'Finalização com as pernas a partir da guarda',
    faixa: 'azul'
  },
  {
    id: 'omoplata',
    nome: 'Omoplata',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    pontos: 3,
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

  // Faixa Roxa - Técnicas Avançadas
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
    pontos: 4,
    descricao: 'Chave de braço com movimento de rotação',
    faixa: 'roxa'
  },

  // Faixa Marrom - Técnicas de Especialista
  {
    id: 'gogoplata',
    nome: 'Gogoplata',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Estrangulamento usando a canela no pescoço',
    faixa: 'marrom'
  },
  {
    id: 'cortador-panturrilha',
    nome: 'Cortador de Panturrilha',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 4,
    descricao: 'Finalização de compressão na panturrilha',
    faixa: 'marrom'
  },

  // Faixa Preta - Técnicas de Mestre
  {
    id: 'voo-macaco',
    nome: 'Voo do Macaco',
    categoria: 'finalizacao',
    dificuldade: 'avancado',
    pontos: 4,
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