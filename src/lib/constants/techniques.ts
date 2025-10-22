export interface Tecnica {
  id: string;
  nome: string;
  categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa' | 'chamada para guarda' | 'estabilização';
  dificuldade: 'facil' | 'intermediario' | 'dificil';
  pontos?: 2 | 3 | 4;
  descricao: string;
  faixa: 'branca' | 'azul' | 'roxa' | '(Todas)';
  vantagens: string[];
  defesas: string[];
  proximosMovimentos?: string[];
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
  },
  // NOVAS CATEGORIAS ADICIONADAS
  'chamada para guarda': {
    cor: '#9CA3AF',
    classe: 'text-gray-500 bg-gray-100 border-gray-300',
    gradiente: 'from-gray-400 to-gray-500',
    icone: '🪂'
  },
  'estabilização': {
    cor: '#0891B2',
    classe: 'text-cyan-600 bg-cyan-100 border-cyan-300',
    gradiente: 'from-cyan-500 to-cyan-600',
    icone: '🛑'
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
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['fuga-de-quadril', 'ponte-sobre-ombro'],
    ...getAssetPaths(''),
  },
  {
    id: 'cem-quilos',
    nome: 'Cem Quilos',
    categoria: 'estabilização',
    dificuldade: 'intermediario',
    descricao: 'Técnica de controle por cima, mantendo o peso sobre o oponente para limitar seus movimentos e preparar transições ou finalizações.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [
      'Escape de quadril',
      'Subida de guarda',
      'Empurrar para criar espaço'
    ],
    proximosMovimentos: [
      'mata-leão',
      'arm-lock',
      'raspagem-lateral'
    ],
    ...getAssetPaths('cem-quilos'),
  },
  {
    id: 'chamada-de-guarda',
    nome: 'Chamada de Guarda',
    categoria: 'chamada para guarda',
    dificuldade: 'intermediario',
    descricao: 'Movimento usado para puxar o oponente para dentro da guarda, controlando sua postura e iniciando o jogo por baixo.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [
      'Base baixa',
      'Postura firme',
      'Quebra de pegada'
    ],
    proximosMovimentos: [
      'guarda-fechada',
      'guarda-aberta',
      'raspagem-básica'
    ],
    ...getAssetPaths('chamada-de-guarda'),
  },

  {
    id: 'rolamento-de-costa',
    nome: 'Rolamento de Costa',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Rolamento para trás usado para recuperar posição',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['levantada-tecnica'],
    ...getAssetPaths(''),
  },
  {
    id: 'rolamento-lateral',
    nome: 'Rolamento Lateral',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Rolamento lateral para escapar de pressões',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['fuga-de-quadril'],
    ...getAssetPaths(''),
  },
  {
    id: 'fuga-de-quadril',
    nome: 'Fuga de Quadril',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Movimento fundamental para criar espaço e escapar',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['guarda-fechada', 'meia-guarda'],
    ...getAssetPaths(''),
  },
  {
    id: 'ponte-sobre-ombro',
    nome: 'Ponte sobre o Ombro',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Técnica de ponte para escapar da montada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['tirando-adversario-montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'levantada-tecnica',
    nome: 'Levantada Técnica',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Levantada controlada para recuperar a posição em pé',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['double-leg-em-pe', 'single-leg'],
    ...getAssetPaths(''),
  },

  // GUARDAS
  {
    id: 'guarda-fechada',
    nome: 'Guarda Fechada',
    categoria: 'guarda',
    dificuldade: 'facil',
    descricao: 'Guarda básica com pernas cruzadas na cintura do adversário',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['passagem-guarda-emborcado'],
    proximosMovimentos: ['raspagem-guarda-fechada-1', 'kimura-guarda-fechada'],
    ...getAssetPaths(''),
  },
  {
    id: 'guarda-aranha',
    nome: 'Guarda Aranha',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Guarda aberta com controle de mangas e pés no bíceps',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['passagem-guarda-toreando'],
    proximosMovimentos: ['raspagem-guarda-aranha-1', 'raspagem-guarda-aranha-2'],
    ...getAssetPaths(''),
  },
  {
    id: 'meia-guarda',
    nome: 'Meia Guarda',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Posição com controle de uma perna do adversário',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['passagem-meia-guarda'],
    proximosMovimentos: ['raspagem-meia-guarda-1', 'raspagem-meia-guarda-2'],
    ...getAssetPaths(''),
  },

  // RASPAGENS - GUARDA FECHADA
  {
    id: 'raspagem-guarda-fechada-1',
    nome: 'Raspagem Guarda Fechada I',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Raspagem básica com pegada na manga e joelho',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-raspagem-basica'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-fechada-2',
    nome: 'Raspagem Guarda Fechada II',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Raspagem com fuga de quadril e movimento de tesoura',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-raspagem-tesoura'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-fechada-3',
    nome: 'Raspagem Guarda Fechada III',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com defesa do joelho adversário',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-raspagem-joelho'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-fechada-4',
    nome: 'Raspagem Guarda Fechada IV',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com pegada na faixa e movimento circular',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-raspagem-circular'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths(''),
  },

  // RASPAGENS - GUARDA ARANHA
  {
    id: 'raspagem-guarda-aranha-1',
    nome: 'Raspagem Guarda Aranha I (Chicote)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem chicote com pé no bíceps e galeio',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-chicote'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-aranha-2',
    nome: 'Raspagem Guarda Aranha II',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com giro de 180 graus e queda na lateral',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-giro-180'],
    proximosMovimentos: ['lateral', 'joelho-barriga'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-aranha-3',
    nome: 'Raspagem Guarda Aranha III',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Raspagem com giro de 360 graus contra adversário ajoelhado',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-giro-360'],
    proximosMovimentos: ['lateral', 'joelho-barriga'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-guarda-aranha-4',
    nome: 'Raspagem Guarda Aranha IV',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com ambos pés no bíceps e pegada nas pernas',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-pegada-pernas'],
    proximosMovimentos: ['guarda', 'lateral'],
    ...getAssetPaths(''),
  },

  // RASPAGENS - MEIA GUARDA
  {
    id: 'raspagem-meia-guarda-1',
    nome: 'Raspagem Meia Guarda I (Joga Fora no Lixo)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com fuga de quadril para dentro na meia guarda',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-joga-fora'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-meia-guarda-2',
    nome: 'Raspagem Meia Guarda II (Fuga para as Costas)',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 4,
    descricao: 'Raspagem saindo por debaixo do braço para chegar nas costas',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-fuga-costas'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-meia-guarda-3',
    nome: 'Raspagem Meia Guarda III (Fio Dental)',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Raspagem usando a lapela por debaixo das pernas',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-fio-dental'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'raspagem-meia-guarda-4',
    nome: 'Raspagem Meia Guarda IV (Adversário em Pé)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Raspagem com levantada técnica contra adversário em pé',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-levantada'],
    proximosMovimentos: ['lateral', 'meia-guarda'],
    ...getAssetPaths(''),
  },

  // QUEDAS
  {
    id: 'double-leg-em-pe',
    nome: 'Double Leg Em Pé (Baiana)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda agarrando ambas as pernas do adversário em pé',
    faixa: '(Todas)',
    vantagens: ['chamada-de-guarda, guarda-aranha, meia-guarda, guarda-fechada'],
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
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-double-leg-ajoelhado', 'chamada-de-guarda', 'guarda-aranha', 'meia-guarda', 'guarda-fechada'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths(''),
  },
  {
    id: 'single-leg',
    nome: 'Single Leg (Baiana em uma perna)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda agarrando apenas uma perna do adversário',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-double-leg-ajoelhado', 'chamada-de-guarda', 'guarda-aranha', 'meia-guarda', 'guarda-fechada'],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths('single-leg'),
  },
  {
    id: 'passagem-guarda-emborcado',
    nome: 'Passagem de Guarda Emborcado (Guarda Fechada)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem forçando abertura da guarda e emborcando adversário',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-passagem-emborcado'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths(''),
  },
  {
    id: 'passagem-guarda-toreando',
    nome: 'Passagem de Guarda Toreando (Guarda Aranha)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem empurrando pernas para o chão na guarda aranha',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-passagem-toreando'],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths(''),
  },
  {
    id: 'passagem-guarda-empurrando-joelho',
    nome: 'Passagem Empurrando Joelho (Guarda de Gancho)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem usando cotovelo para empurrar joelho na guarda borboleta',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-passagem-joelho'],
    proximosMovimentos: ['joelho-barriga', 'lateral'],
    ...getAssetPaths(''),
  },

  // FINALIZAÇÕES
  {
    id: 'triangulo',
    nome: 'Triângulo',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento com as pernas aplicado da guarda',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-triangulo'],
    proximosMovimentos: ['armlock-guarda-fechada'],
    ...getAssetPaths(''),
  },
  {
    id: 'joelho-barriga',
    nome: 'Joelho na Barriga',
    categoria: 'estabilização',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Posição de controle com um joelho sobre o abdômen do oponente e outro afastado para equilíbrio.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-joelho-barriga'],
    proximosMovimentos: ['montada', 'americana-lateral'],
    ...getAssetPaths(''),
  },

  {
    id: 'montada',
    nome: 'Montada',
    categoria: 'estabilização',
    dificuldade: 'facil',
    pontos: 4,
    descricao: 'Posição dominante sentada sobre o tórax do adversário com controle dos quadris e ombros.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['tirando-adversario-montada'],
    proximosMovimentos: ['americana-montada', 'estrangulamento-montada'],
    ...getAssetPaths(''),
  },

  {
    id: 'costas',
    nome: 'Pegada de Costas com Ganchos',
    categoria: 'estabilização',
    dificuldade: 'intermediario',
    pontos: 4,
    descricao: 'Controle total das costas do adversário com ambos os ganchos e controle do tronco.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['tirando-adversario-costas'],
    proximosMovimentos: ['mata-leao', 'estrangulamento-costas'],
    ...getAssetPaths(''),
  },
  {
    id: 'estrangulamento-com-gola',
    nome: 'Estrangulamento com Gola (Lapel Choke)',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento com o uso da gola do kimono, realizado de várias posições de controle.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-com-gola'],
    proximosMovimentos: ['montada', 'costas'],
    ...getAssetPaths(''),
  },

  {
    id: 'estrangulamento-cruzado',
    nome: 'Estrangulamento Cruzado (Cross Collar Choke)',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento com as mãos cruzadas na gola do adversário, aplicando pressão lateral no pescoço.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-cruzado'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },

  {
    id: 'estrangulamento-lapeira',
    nome: 'Estrangulamento de Lapeira (Bow and Arrow Choke)',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Estrangulamento aplicado pelas costas puxando a gola e estendendo o corpo como um arco.',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-lapeira'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths(''),
  },

  {
    id: 'estrangulamento-montada',
    nome: 'Estrangulamento na Montada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento cruzado aplicado da montada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-montada'],
    proximosMovimentos: ['armlock-montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'armlock-montada',
    nome: 'Chave de Braço na Montada (Armlock)',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: '(Todas)',
    vantagens: [],
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
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-americana-montada'],
    proximosMovimentos: ['estrangulamento-montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'estrangulamento-armlock-montada',
    nome: 'Estrangulamento seguido de Armlock',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Combinação de estrangulamento e armlock da montada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-combinacao-montada'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'kimura-guarda-fechada',
    nome: 'Kimura na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Chave de ombro Kimura aplicada da guarda fechada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-kimura-guarda'],
    proximosMovimentos: ['estrangulamento-reto-guarda'],
    ...getAssetPaths(''),
  },
  {
    id: 'estrangulamento-reto-guarda',
    nome: 'Estrangulamento Reto na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento em X aplicado da guarda fechada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-reto'],
    proximosMovimentos: ['armlock-guarda-fechada'],
    ...getAssetPaths(''),
  },
  {
    id: 'armlock-guarda-fechada',
    nome: 'Armlock na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Chave de braço aplicada da guarda fechada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-armlock-guarda'],
    proximosMovimentos: ['triangulo'],
    ...getAssetPaths(''),
  },
  {
    id: 'americana-lateral',
    nome: 'Americana na Lateral',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Chave de ombro americana aplicada da lateral',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-americana-lateral'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'americana-invertida-lateral',
    nome: 'Americana Invertida ou Kimura na Lateral',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Kimura aplicada da posição lateral',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-kimura-lateral'],
    proximosMovimentos: ['montada'],
    ...getAssetPaths(''),
  },
  {
    id: 'estrangulamento-costas',
    nome: 'Estrangulamento pelas Costas',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento cruzado aplicado pelas costas',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-costas'],
    proximosMovimentos: ['mata-leao'],
    ...getAssetPaths(''),
  },
  {
    id: 'mata-leao',
    nome: 'Mata Leão pelas Costas',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Estrangulamento sanguíneo aplicado pelas costas',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-mata-leao'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths(''),
  },
  {
    id: 'estrangulamento-relogio',
    nome: 'Estrangulamento Relógio (4 Apoios)',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Estrangulamento aplicado com adversário em tartaruga',
    faixa: '(Todas)',
    vantagens: [],
    defesas: ['defesa-estrangulamento-relogio'],
    proximosMovimentos: ['costas'],
    ...getAssetPaths(''),
  },

  {
    id: 'tirando-adversario-montada',
    nome: 'Tirando o Adversário da Montada',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Defesa básica da montada usando UPA',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['guarda-fechada'],
    ...getAssetPaths(''),
  },
  {
    id: 'tirando-adversario-lateral',
    nome: 'Tirando o Adversário da Lateral',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa da lateral com elevação e fuga de quadril',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['guarda', 'meia-guarda'],
    ...getAssetPaths(''),
  },
  {
    id: 'tirando-adversario-costas',
    nome: 'Tirando o Adversário das Costas',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Defesa da posição de costas removendo ganchos',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['lateral'],
    ...getAssetPaths(''),
  },
  {
    id: 'defesa-estrangulamento-guarda',
    nome: 'Defesa de Estrangulamento na Guarda Fechada',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa contra estrangulamento reto na guarda',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['raspagem-guarda-fechada-1'],
    ...getAssetPaths(''),
  },
  {
    id: 'defesa-armlock-montada',
    nome: 'Defesa do Armlock Saindo da Montada',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa do armlock com giro do corpo',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['guarda'],
    ...getAssetPaths(''),
  },
  {
    id: 'defesa-kimura-guarda',
    nome: 'Defesa da Kimura Dentro da Guarda',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Defesa da kimura com base firme e empurrão no ombro',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['passagem-de-guarda'],
    ...getAssetPaths(''),
  },

  {
    id: 'armlock-da-montada',
    nome: 'Armlock da montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: [],
    ...getAssetPaths(''),
  },
  {
    id: 'defesa-double-leg-em-pe',
    nome: 'Defesa Double leg em pé',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Bloqueio e contra-ataque contra tentativa de Double Leg',
    faixa: '(Todas)',
    vantagens: [],
    defesas: [],
    proximosMovimentos: ['guarda-fechada'],
    ...getAssetPaths('defesa-double-leg-em-pe'),
  },
  {
    id: 'jacare-banguela',
    nome: 'Jacare Banguela (Uki waza)',
    categoria: 'queda',
    pontos: 2,
    dificuldade: 'facil',
    descricao: 'Técnica de queda utilizando alavanca e controle do quadril',
    faixa: '(Todas)',
    vantagens: ['double-leg-em-pe', 'single-leg', 'defesa-double-leg-ajoelhado', 'chamada-de-guarda', 'guarda-aranha', 'meia-guarda', 'guarda-fechada'],
    defesas: ['defesa-jacare-banguela'],
    proximosMovimentos: ['joelho-barriga'],
    ...getAssetPaths('jacare-banguela'),
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

export const obterCorCategoria = (categoria: 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa' | 'chamada para guarda' | 'estabilização') =>
  CORES_CATEGORIA[categoria];

// Nova função para obter defesas
export const obterDefesasDaTecnica = (tecnicaId: string): Tecnica[] => {
  const tecnica = obterTecnicaPorId(tecnicaId);
  if (!tecnica || !tecnica.defesas.length) return [];
  return tecnica.defesas
    .map(defesaId => obterTecnicaPorId(defesaId))
    .filter((tecnica): tecnica is Tecnica => tecnica !== undefined);
};

// Nova função para obter os próximos movimentos possíveis
export const obterProximosMovimentos = (tecnicaId: string): Tecnica[] => {
  const tecnica = obterTecnicaPorId(tecnicaId);
  if (!tecnica || !tecnica.proximosMovimentos?.length) return [];
  return tecnica.proximosMovimentos
    .map(movId => obterTecnicaPorId(movId))
    .filter((tecnica): tecnica is Tecnica => tecnica !== undefined);
};