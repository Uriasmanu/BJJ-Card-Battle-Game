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
  // TÉCNICAS BÁSICAS E FUNDAMENTOS
  {
    id: 'rolamento-de-frente',
    nome: 'Rolamento de Frente',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Rolamento básico para frente usado como defesa e transição',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['fuga-de-quadril', 'ponte-sobre-ombro'],
    ...getAssetPaths('rolamento-frente'),
  },
  {
    id: 'rolamento-de-costa',
    nome: 'Rolamento de Costa',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Rolamento para trás usado para recuperar posição',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['levantada-tecnica'],
    ...getAssetPaths('rolamento-costa'),
  },
  {
    id: 'rolamento-lateral',
    nome: 'Rolamento Lateral',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Rolamento lateral para escapar de pressões',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['fuga-de-quadril'],
    ...getAssetPaths('rolamento-lateral'),
  },
  {
    id: 'fuga-de-quadril',
    nome: 'Fuga de Quadril',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Movimento fundamental para criar espaço e escapar',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['guarda-fechada', 'meia-guarda'],
    ...getAssetPaths('fuga-quadril'),
  },
  {
    id: 'ponte-sobre-ombro',
    nome: 'Ponte sobre o Ombro',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Técnica de ponte para escapar da montada',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['tirando-adversario-montada'],
    ...getAssetPaths('ponte-ombro'),
  },
  {
    id: 'levantada-tecnica',
    nome: 'Levantada Técnica',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Levantada controlada para recuperar a posição em pé',
    faixa: 'azul',
    defesas: [],
    proximosMovimentos: ['double-leg-em-pe', 'single-leg'],
    ...getAssetPaths('levantada-tecnica'),
  },

  // GUARDAS
  {
    id: 'guarda-fechada',
    nome: 'Guarda Fechada',
    categoria: 'guarda',
    dificuldade: 'facil',
    descricao: 'Guarda básica com pernas cruzadas na cintura do adversário',
    faixa: 'branca',
    defesas: ['passagem-guarda-emborcado'],
    proximosMovimentos: ['raspagem-guarda-fechada-1', 'kimura-guarda-fechada'],
    ...getAssetPaths('guarda-fechada'),
  },
  {
    id: 'guarda-aranha',
    nome: 'Guarda Aranha',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Guarda aberta com controle de mangas e pés no bíceps',
    faixa: 'azul',
    defesas: ['passagem-guarda-toreando'],
    proximosMovimentos: ['raspagem-guarda-aranha-1', 'raspagem-guarda-aranha-2'],
    ...getAssetPaths('guarda-aranha'),
  },
  {
    id: 'meia-guarda',
    nome: 'Meia Guarda',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Posição com controle de uma perna do adversário',
    faixa: 'azul',
    defesas: ['passagem-meia-guarda'],
    proximosMovimentos: ['raspagem-meia-guarda-1', 'raspagem-meia-guarda-2'],
    ...getAssetPaths('meia-guarda'),
  },

  // RASPAGENS - GUARDA FECHADA
  {
    id: 'raspagem-guarda-fechada-1',
    nome: 'Raspagem Guarda Fechada I',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Raspagem básica com pegada na manga e joelho',
    faixa: 'branca',
    defesas: ['defesa-raspagem-basica'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('raspagem-fechada-1'),
  },
  {
    id: 'raspagem-guarda-fechada-2',
    nome: 'Raspagem Guarda Fechada II',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Raspagem com fuga de quadril e movimento de tesoura',
    faixa: 'branca',
    defesas: ['defesa-raspagem-tesoura'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('raspagem-fechada-2'),
  },
  {
    id: 'raspagem-guarda-fechada-3',
    nome: 'Raspagem Guarda Fechada III',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com defesa do joelho adversário',
    faixa: 'azul',
    defesas: ['defesa-raspagem-joelho'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('raspagem-fechada-3'),
  },
  {
    id: 'raspagem-guarda-fechada-4',
    nome: 'Raspagem Guarda Fechada IV',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com pegada na faixa e movimento circular',
    faixa: 'azul',
    defesas: ['defesa-raspagem-circular'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths('raspagem-fechada-4'),
  },

  // RASPAGENS - GUARDA ARANHA
  {
    id: 'raspagem-guarda-aranha-1',
    nome: 'Raspagem Guarda Aranha I (Chicote)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem chicote com pé no bíceps e galeio',
    faixa: 'azul',
    defesas: ['defesa-chicote'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('raspagem-aranha-1'),
  },
  {
    id: 'raspagem-guarda-aranha-2',
    nome: 'Raspagem Guarda Aranha II',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com giro de 180 graus e queda na lateral',
    faixa: 'azul',
    defesas: ['defesa-giro-180'],
    proximosMovimentos: ['lateral', 'joelho-barriga'],
    ...getAssetPaths('raspagem-aranha-2'),
  },
  {
    id: 'raspagem-guarda-aranha-3',
    nome: 'Raspagem Guarda Aranha III',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Raspagem com giro de 360 graus contra adversário ajoelhado',
    faixa: 'roxa',
    defesas: ['defesa-giro-360'],
    proximosMovimentos: ['lateral', 'joelho-barriga'],
    ...getAssetPaths('raspagem-aranha-3'),
  },
  {
    id: 'raspagem-guarda-aranha-4',
    nome: 'Raspagem Guarda Aranha IV',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com ambos pés no bíceps e pegada nas pernas',
    faixa: 'azul',
    defesas: ['defesa-pegada-pernas'],
    proximosMovimentos: ['guarda', 'lateral'],
    ...getAssetPaths('raspagem-aranha-4'),
  },

  // RASPAGENS - MEIA GUARDA
  {
    id: 'raspagem-meia-guarda-1',
    nome: 'Raspagem Meia Guarda I (Joga Fora no Lixo)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com fuga de quadril para dentro na meia guarda',
    faixa: 'azul',
    defesas: ['defesa-joga-fora'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths('raspagem-meia-1'),
  },
  {
    id: 'raspagem-meia-guarda-2',
    nome: 'Raspagem Meia Guarda II (Fuga para as Costas)',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 4,
    descricao: 'Raspagem saindo por debaixo do braço para chegar nas costas',
    faixa: 'roxa',
    defesas: ['defesa-fuga-costas'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths('raspagem-meia-2'),
  },
  {
    id: 'raspagem-meia-guarda-3',
    nome: 'Raspagem Meia Guarda III (Fio Dental)',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Raspagem usando a lapela por debaixo das pernas',
    faixa: 'roxa',
    defesas: ['defesa-fio-dental'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('raspagem-meia-3'),
  },
  {
    id: 'raspagem-meia-guarda-4',
    nome: 'Raspagem Meia Guarda IV (Adversário em Pé)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com levantada técnica contra adversário em pé',
    faixa: 'azul',
    defesas: ['defesa-levantada'],
    proximosMovimentos: ['lateral', 'meia-guarda'],
    ...getAssetPaths('raspagem-meia-4'),
  },

  // QUEDAS
  {
    id: 'double-leg-em-pe',
    nome: 'Double Leg Em Pé (Baiana)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda agarrando ambas as pernas do adversário em pé',
    faixa: 'branca',
    defesas: ['defesa-double-leg-em-pe'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('double-leg-em-pe'),
  },
  {
    id: 'double-leg-ajoelhado',
    nome: 'Double Leg Ajoelhado (Baiana)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda agarrando ambas as pernas do adversário ajoelhado',
    faixa: 'branca',
    defesas: ['defesa-double-leg-ajoelhado'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('double-leg-ajoelhado'),
  },
  {
    id: 'single-leg',
    nome: 'Single Leg (Baiana em uma perna)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda agarrando apenas uma perna do adversário',
    faixa: 'branca',
    defesas: ['defesa-single-leg'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('single-leg'),
  },

  // PASSAGENS DE GUARDA
  {
    id: 'passagem-guarda-emborcado',
    nome: 'Passagem de Guarda Emborcado (Guarda Fechada)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem forçando abertura da guarda e emborcando adversário',
    faixa: 'azul',
    defesas: ['defesa-passagem-emborcado'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths('passagem-emborcado'),
  },
  {
    id: 'passagem-guarda-toreando',
    nome: 'Passagem de Guarda Toreando (Guarda Aranha)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem empurrando pernas para o chão na guarda aranha',
    faixa: 'azul',
    defesas: ['defesa-passagem-toreando'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths('passagem-toreando'),
  },
  {
    id: 'passagem-guarda-empurrando-joelho',
    nome: 'Passagem Empurrando Joelho (Guarda de Gancho)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem usando cotovelo para empurrar joelho na guarda borboleta',
    faixa: 'azul',
    defesas: ['defesa-passagem-joelho'],
    proximosMovimentos: ['joelho-barriga', 'lateral'],
    ...getAssetPaths('passagem-joelho'),
  },

  // FINALIZAÇÕES
  {
    id: 'triangulo',
    nome: 'Triângulo',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento com as pernas aplicado da guarda',
    faixa: 'azul',
    defesas: ['defesa-triangulo'],
    proximosMovimentos: ['armlock-guarda-fechada'],
    ...getAssetPaths('triangulo'),
  },
  {
    id: 'estrangulamento-montada',
    nome: 'Estrangulamento na Montada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento cruzado aplicado da montada',
    faixa: 'azul',
    defesas: ['defesa-estrangulamento-montada'],
    proximosMovimentos: ['armlock-montada'],
    ...getAssetPaths('estrangulamento-montada'),
  },
  {
    id: 'armlock-montada',
    nome: 'Chave de Braço na Montada (Armlock)',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: 'branca',
    defesas: ['defesa-armlock-montada'],
    proximosMovimentos: ['estrangulamento-montada'],
    ...getAssetPaths('armlock-montada'),
  },
  {
    id: 'americana-montada',
    nome: 'Americana na Montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Chave de ombro aplicada da montada',
    faixa: 'branca',
    defesas: ['defesa-americana-montada'],
    proximosMovimentos: ['estrangulamento-montada'],
    ...getAssetPaths('americana-montada'),
  },
  {
    id: 'estrangulamento-armlock-montada',
    nome: 'Estrangulamento seguido de Armlock',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Combinação de estrangulamento e armlock da montada',
    faixa: 'azul',
    defesas: ['defesa-combinacao-montada'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('estrangulamento-armlock'),
  },
  {
    id: 'kimura-guarda-fechada',
    nome: 'Kimura na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Chave de ombro Kimura aplicada da guarda fechada',
    faixa: 'azul',
    defesas: ['defesa-kimura-guarda'],
    proximosMovimentos: ['estrangulamento-reto-guarda'],
    ...getAssetPaths('kimura-guarda'),
  },
  {
    id: 'estrangulamento-reto-guarda',
    nome: 'Estrangulamento Reto na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento em X aplicado da guarda fechada',
    faixa: 'azul',
    defesas: ['defesa-estrangulamento-reto'],
    proximosMovimentos: ['armlock-guarda-fechada'],
    ...getAssetPaths('estrangulamento-reto-guarda'),
  },
  {
    id: 'armlock-guarda-fechada',
    nome: 'Armlock na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Chave de braço aplicada da guarda fechada',
    faixa: 'azul',
    defesas: ['defesa-armlock-guarda'],
    proximosMovimentos: ['triangulo'],
    ...getAssetPaths('armlock-guarda'),
  },
  {
    id: 'americana-lateral',
    nome: 'Americana na Lateral',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Chave de ombro americana aplicada da lateral',
    faixa: 'branca',
    defesas: ['defesa-americana-lateral'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('americana-lateral'),
  },
  {
    id: 'americana-invertida-lateral',
    nome: 'Americana Invertida ou Kimura na Lateral',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Kimura aplicada da posição lateral',
    faixa: 'azul',
    defesas: ['defesa-kimura-lateral'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths('kimura-lateral'),
  },
  {
    id: 'estrangulamento-costas',
    nome: 'Estrangulamento pelas Costas',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento cruzado aplicado pelas costas',
    faixa: 'azul',
    defesas: ['defesa-estrangulamento-costas'],
    proximosMovimentos: ['mata-leao'],
    ...getAssetPaths('estrangulamento-costas'),
  },
  {
    id: 'mata-leao',
    nome: 'Mata Leão pelas Costas',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Estrangulamento sanguíneo aplicado pelas costas',
    faixa: 'branca',
    defesas: ['defesa-mata-leao'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths('mata-leao'),
  },
  {
    id: 'estrangulamento-relogio',
    nome: 'Estrangulamento Relógio (4 Apoios)',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Estrangulamento aplicado com adversário em tartaruga',
    faixa: 'roxa',
    defesas: ['defesa-estrangulamento-relogio'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths('estrangulamento-relogio'),
  },

  // DEFESAS E SAÍDAS
  {
    id: 'tirando-adversario-montada',
    nome: 'Tirando o Adversário da Montada',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Defesa básica da montada usando UPA',
    faixa: 'branca',
    defesas: [],
    proximosMovimentos: ['guarda-fechada'],
    ...getAssetPaths('defesa-montada'),
  },
  {
    id: 'tirando-adversario-lateral',
    nome: 'Tirando o Adversário da Lateral',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa da lateral com elevação e fuga de quadril',
    faixa: 'azul',
    defesas: [],
    proximosMovimentos: ['guarda', 'meia-guarda'],
    ...getAssetPaths('defesa-lateral'),
  },
  {
    id: 'tirando-adversario-costas',
    nome: 'Tirando o Adversário das Costas',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Defesa da posição de costas removendo ganchos',
    faixa: 'roxa',
    defesas: [],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths('defesa-costas'),
  },
  {
    id: 'defesa-estrangulamento-guarda',
    nome: 'Defesa de Estrangulamento na Guarda Fechada',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa contra estrangulamento reto na guarda',
    faixa: 'azul',
    defesas: [],
    proximosMovimentos: ['raspagem-guarda-fechada-1'],
    ...getAssetPaths('defesa-estrangulamento-guarda'),
  },
  {
    id: 'defesa-armlock-montada',
    nome: 'Defesa do Armlock Saindo da Montada',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa do armlock com giro do corpo',
    faixa: 'azul',
    defesas: [],
    proximosMovimentos: ['guarda'],
    ...getAssetPaths('defesa-armlock-montada'),
  },
  {
    id: 'defesa-kimura-guarda',
    nome: 'Defesa da Kimura Dentro da Guarda',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa da kimura com base firme e empurrão no ombro',
    faixa: 'azul',
    defesas: [],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('defesa-kimura-guarda'),
  },

  // TÉCNICAS EXISTENTES (mantidas para compatibilidade)
  {
    id: 'armlock-da-montada',
    nome: 'Armlock da montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: '( Todas )',
    defesas: [],
    proximosMovimentos: [],
    ...getAssetPaths('armlock'),
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
    descricao: 'Defesa contra entrada de single leg',
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