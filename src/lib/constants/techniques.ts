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
    id: 'armlock',
    nome: 'Armlock',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização articular do cotovelo a partir da montada',
    faixa: 'branca',
    defesas: ['defesa-armlock'],
    ...getAssetPaths('armlock'),
  },
  {
    id: 'americana',
    nome: 'Americana',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização de ombro a partir do controle lateral',
    faixa: 'branca',
    defesas: ['defesa-americana'],
    ...getAssetPaths('americana'),
  },
  {
    id: 'mata-leao',
    nome: 'Mata Leão',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Finalização por estrangulamento pelas costas',
    faixa: 'branca',
    defesas: ['defesa-mata-leao'],
    ...getAssetPaths('mata-leao'),
  },
  // NOVAS TÉCNICAS FAIXA BRANCA (FINALIZAÇÃO)
  {
    id: 'estrangulamento-montada',
    nome: 'Estrangulamento na Montada',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Cruzando as pegadas na gola do adversário, pressione o pulso no pescoço e desça o peso sobre ele[cite: 123].',
    faixa: 'branca',
    defesas: ['defesa-tirando-montada'],
    ...getAssetPaths('estrangulamento-montada'),
  },
  {
    id: 'estrangulamento-reto-guarda',
    nome: 'Estrangulamento Reto (Guarda Fechada)',
    categoria: 'finalizacao',
    dificuldade: 'facil',
    descricao: 'Fazer pegadas cruzadas em "X" na gola a partir da guarda fechada e puxar o adversário com as pernas para quebrar a postura e aplicar a pressão[cite: 136, 137].',
    faixa: 'branca',
    defesas: ['defesa-estrangulamento-guarda'],
    ...getAssetPaths('estrangulamento-reto-guarda'),
  },
  // NOVAS TÉCNICAS FAIXA BRANCA (GUARDA)
  {
    id: 'guarda-fechada-posicao',
    nome: 'Guarda Fechada',
    categoria: 'guarda',
    dificuldade: 'facil',
    descricao: 'Posição fundamental onde o lutador envolve a cintura do oponente com as duas pernas e cruza os pés[cite: 46, 47].',
    faixa: 'branca',
    defesas: ['passagem-emborcando', 'defesa-guarda-fechada'],
    ...getAssetPaths('guarda-fechada-posicao'),
  },
  {
    id: 'tesoura',
    nome: 'Tesoura',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Arraste básico da guarda fechada',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('tesoura'),
  },
  // NOVAS TÉCNICAS FAIXA BRANCA (RASPAGEM)
  {
    id: 'raspagem-gf-balanco',
    nome: 'Raspagem Balanço (Guarda Fechada I)',
    categoria: 'raspagem',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Pegada na manga e joelho, abrir a guarda, fazer balanço lateral e empurrar na axila com a perna para cair na montada[cite: 57, 58].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('raspagem-gf-balanco'),
  },
  {
    id: 'queda-duas-pernas',
    nome: 'Queda de Duas Pernas',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Queda básica de agarrão nas duas pernas',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('queda-duas-pernas'),
  },
  // NOVAS TÉCNICAS FAIXA BRANCA (QUEDA)
  {
    id: 'double-leg-em-pe',
    nome: 'Double Leg (Baiana) Em Pé',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Na curta distância, agarrar as duas pernas do adversário e projetá-lo ao solo[cite: 95, 96].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('double-leg-em-pe'),
  },
  {
    id: 'single-leg',
    nome: 'Single Leg (Baiana em uma das pernas)',
    categoria: 'queda',
    dificuldade: 'facil',
    pontos: 2,
    descricao: 'Na curta distância, agarrar uma das pernas do adversário desequilibrando e projetando-o ao solo[cite: 99, 100].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('single-leg'),
  },
  // NOVAS TÉCNICAS FAIXA BRANCA (PASSAGEM)
  {
    id: 'passagem-emborcando',
    nome: 'Passagem Emborcando (Guarda Fechada)',
    categoria: 'passagem',
    dificuldade: 'facil',
    pontos: 3,
    descricao: 'Abrir a guarda forçando os cotovelos, esgrimar as pernas, emborcar o adversário e cair na lateral (100k)[cite: 103, 104, 105, 106].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('passagem-emborcando'),
  },

  // DEFESAS DA FAIXA BRANCA
  {
    id: 'defesa-armlock',
    nome: 'Defesa de Chave de Braço',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Una as mãos firmemente, faça ponte com os quadris e gire na direção do braço preso para aliviar a pressão',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-armlock'),
  },
  {
    id: 'defesa-americana',
    nome: 'Defesa de Americana',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Role na direção do braço preso, passe a cabeça por baixo do braço do oponente e escape pela lateral',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-americana'),
  },
  {
    id: 'defesa-mata-leao',
    nome: 'Defesa de Mata Leão',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Proteja o pescoço com as duas mãos, vire o queixo para o lado mais fraco e gire o corpo para escapar',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-mata-leao'),
  },
  // NOVAS DEFESAS FAIXA BRANCA
  {
    id: 'defesa-tirando-montada',
    nome: 'Defesa: Tirando o Adversário da Montada',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Técnica de escape da posição de montada, geralmente utilizando a ponte e a rotação (Upa)[cite: 150].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-tirando-montada'),
  },
  {
    id: 'defesa-tirando-lateral',
    nome: 'Defesa: Tirando o Adversário da Lateral (100kg)',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Técnica de escape da posição de controle lateral (100kg), geralmente com fuga de quadril e reposição de guarda[cite: 151].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-tirando-lateral'),
  },
  {
    id: 'defesa-estrangulamento-guarda',
    nome: 'Defesa de Estrangulamento (Guarda Fechada)',
    categoria: 'defesa',
    dificuldade: 'facil',
    descricao: 'Técnica básica para neutralizar o estrangulamento aplicado de dentro da guarda fechada[cite: 153].',
    faixa: 'branca',
    defesas: [],
    ...getAssetPaths('defesa-estrangulamento-guarda'),
  },

  // TÉCNICAS PERMITIDAS A PARTIR DA FAIXA AZUL
  {
    id: 'triangulo',
    nome: 'Triângulo',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Finalização com as pernas a partir da guarda',
    faixa: 'azul',
    defesas: ['defesa-triangulo'],
    ...getAssetPaths('triangulo'),
  },
  {
    id: 'omoplata',
    nome: 'Omoplata',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Finalização de ombro usando as pernas',
    faixa: 'azul',
    defesas: ['defesa-omoplata'],
    ...getAssetPaths('omoplata'),
  },
  // NOVAS TÉCNICAS FAIXA AZUL (FINALIZAÇÃO)
  {
    id: 'kimura-guarda-fechada',
    nome: 'Kimura na Guarda Fechada',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'A partir da guarda fechada, aplicar a alavanca da Kimura, voltando as costas no chão e empurrando o braço do oponente para as costas[cite: 133, 134, 135].',
    faixa: 'azul',
    defesas: ['defesa-kimura-guarda'],
    ...getAssetPaths('kimura-guarda-fechada'),
  },
  {
    id: 'estrangulamento-relogio',
    nome: 'Estrangulamento Relógio',
    categoria: 'finalizacao',
    dificuldade: 'intermediario',
    descricao: 'Estrangulamento aplicado usando a lapela com o adversário em quatro apoios (posição de tartaruga)[cite: 149].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('estrangulamento-relogio'),
  },
  // NOVAS TÉCNICAS FAIXA AZUL (GUARDA)
  {
    id: 'guarda-aranha',
    nome: 'Guarda Aranha',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Guarda aberta dominando as mangas e usando os pés no bíceps, quadril ou laçando o braço do oponente[cite: 49].',
    faixa: 'azul',
    defesas: ['passagem-toreando'],
    ...getAssetPaths('guarda-aranha'),
  },
  {
    id: 'meia-guarda-posicao',
    nome: 'Meia Guarda (Posição)',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Onde o guardeiro domina uma das pernas do passador com ambas as pernas, com variações tradicional, profunda ou invertida[cite: 52, 53, 54].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('meia-guarda-posicao'),
  },
  {
    id: 'guarda-borboleta',
    nome: 'Guarda Borboleta',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Guarda com ganchos nos braços do oponente',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('guarda-borboleta'),
  },
  {
    id: 'guarda-x',
    nome: 'Guarda X',
    categoria: 'guarda',
    dificuldade: 'intermediario',
    descricao: 'Guarda com entrelaçamento de pernas',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('guarda-x'),
  },
  // NOVAS TÉCNICAS FAIXA AZUL (RASPAGEM)
  {
    id: 'raspagem-aranha-chicote',
    nome: 'Raspagem Chicote (Guarda Aranha I)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Com o pé no bíceps, esticar a perna e puxar o braço oposto, fazendo um galeio com a outra perna para cair na montada[cite: 70, 71].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('raspagem-aranha-chicote'),
  },
  {
    id: 'raspagem-mg-joga-fora',
    nome: 'Raspagem "Joga Fora" (Meia Guarda I)',
    categoria: 'raspagem',
    dificuldade: 'intermediario',
    pontos: 2,
    descricao: 'Na meia guarda, esgrimar o braço, fugir o quadril para entrar por baixo e desequilibrar o oponente para cair na lateral (100k)[cite: 81, 82, 83].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('raspagem-mg-joga-fora'),
  },
  {
    id: 'passagem-joelho',
    nome: 'Passagem de Joelho',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Passagem de guarda com corte de joelho',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('passagem-joelho'),
  },
  // NOVAS TÉCNICAS FAIXA AZUL (PASSAGEM)
  {
    id: 'passagem-toreando',
    nome: 'Passagem Toreando (Guarda Aranha)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Em pé, pegar as barras da calça, afastar empurrando as pernas para o chão, distribuir o peso e passar pela lateral[cite: 107, 108, 109, 110].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('passagem-toreando'),
  },
  {
    id: 'passagem-empurrando-joelho',
    nome: 'Passagem Empurrando o Joelho (Guarda Gancho)',
    categoria: 'passagem',
    dificuldade: 'intermediario',
    pontos: 3,
    descricao: 'Em pé, empurrar o joelho do oponente para a lateral e estabilizar com joelho na barriga ou lateral (100k)[cite: 111, 113, 114].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('passagem-empurrando-joelho'),
  },

  // DEFESAS DA FAIXA AZUL
  {
    id: 'defesa-triangulo',
    nome: 'Defesa de Triângulo',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Mantenha postura ereta, controle um dos braços do oponente, passe a perna por cima da cabeça e escape pela lateral',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('defesa-triangulo'),
  },
  {
    id: 'defesa-omoplata',
    nome: 'Defesa de Omoplata',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Rode o corpo inteiro para frente, passe a cabeça por baixo das pernas e finalize na montada ou side control',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('defesa-omoplata'),
  },
  {
    id: 'defesa-chave-pé',
    nome: 'Defesa de Chave de Pé',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Una as pernas pressionando os joelhos, gire o corpo na direção oposta e puxe o pé para fora do encaixe',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('defesa-chave-pé'),
  },
  // NOVAS DEFESAS FAIXA AZUL
  {
    id: 'defesa-kimura-guarda',
    nome: 'Defesa de Kimura na Guarda',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Técnica para neutralizar a finalização Kimura a partir da guarda fechada[cite: 155].',
    faixa: 'azul',
    defesas: [],
    ...getAssetPaths('defesa-kimura-guarda'),
  },

  // TÉCNICAS PERMITIDAS A PARTIR DA FAIXA ROXA
  {
    id: 'berimbolo',
    nome: 'Berimbolo',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Rolamento invertido para pegar as costas',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('berimbolo'),
  },
  // NOVAS TÉCNICAS FAIXA ROXA (RASPAGEM)
  {
    id: 'raspagem-mg-fuga-costas',
    nome: 'Raspagem Fuga para as Costas (Meia Guarda II)',
    categoria: 'raspagem',
    dificuldade: 'dificil',
    pontos: 2,
    descricao: 'Na meia guarda, passar por debaixo do braço do adversário até chegar nas costas e concluir com os dois ganchos[cite: 84, 85].',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('raspagem-mg-fuga-costas'),
  },
  {
    id: 'guarda-de-la-riva',
    nome: 'Guarda De La Riva',
    categoria: 'guarda',
    dificuldade: 'dificil',
    descricao: 'Guarda com gancho externo na perna',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('guarda-de-la-riva'),
  },
  {
    id: 'guarda-minhoca',
    nome: 'Guarda Minhoca',
    categoria: 'guarda',
    dificuldade: 'dificil',
    descricao: 'Guarda usando o kimono para enrolar o oponente',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('guarda-minhoca'),
  },
  {
    id: 'chave-braco-helicoptero',
    nome: 'Chave de Braço Helicóptero',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Chave de braço com movimento de rotação',
    faixa: 'roxa',
    defesas: ['defesa-armlock'],
    ...getAssetPaths('chave-braco-helicoptero'),
  },

  // DEFESAS DA FAIXA ROXA
  {
    id: 'defesa-berimbolo',
    nome: 'Defesa de Berimbolo',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Mantenha distância com as mãos no quadril do oponente, sente para trás e bloqueie o gancho com a mão',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('defesa-berimbolo'),
  },
  {
    id: 'defesa-guarda-fechada',
    nome: 'Defesa de Guarda Fechada',
    categoria: 'defesa',
    dificuldade: 'intermediario',
    descricao: 'Estabeleça base ampla, mantenha postura ereta, abra a guarda com as mãos nos quadris e passe',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('defesa-guarda-fechada'),
  },
  {
    id: 'defesa-triangulo-invertido',
    nome: 'Defesa de Triângulo Invertido',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Controle a cabeça do oponente, passe a perna por cima dos ombros e escape mantendo a postura',
    faixa: 'roxa',
    defesas: [],
    ...getAssetPaths('defesa-triangulo-invertido'),
  },

  // TÉCNICAS PERMITIDAS A PARTIR DA FAIXA MARROM
  {
    id: 'gogoplata',
    nome: 'Gogoplata',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Estrangulamento usando a canela no pescoço',
    faixa: 'marrom',
    defesas: ['defesa-gogoplata'],
    ...getAssetPaths('gogoplata'),
  },
  {
    id: 'cortador-panturrilha',
    nome: 'Cortador de Panturrilha',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Finalização de compressão na panturrilha',
    faixa: 'marrom',
    defesas: ['defesa-chave-pé'],
    ...getAssetPaths('cortador-panturrilha'),
  },

  // DEFESAS DA FAIXA MARROM
  {
    id: 'defesa-gogoplata',
    nome: 'Defesa de Gogoplata',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Previne puxando o braço para trás antes do encaixe, escapa rolando para frente e controlando o ombro',
    faixa: 'marrom',
    defesas: [],
    ...getAssetPaths('defesa-gogoplata'),
  },
  {
    id: 'defesa-calcanhar',
    nome: 'Defesa de Calcanhar',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Gire o corpo na direção do pé preso, empurre o joelho do oponente e escape controlando a perna',
    faixa: 'marrom',
    defesas: [],
    ...getAssetPaths('defesa-calcanhar'),
  },
  {
    id: 'defesa-dupla',
    nome: 'Defesa Dupla',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Priorize a defesa do estrangulamento primeiro, depois ataque a chave de articulação com movimentos coordenados',
    faixa: 'marrom',
    defesas: [],
    ...getAssetPaths('defesa-dupla'),
  },

  // TÉCNICAS PERMITIDAS A PARTIR DA FAIXA PRETA
  {
    id: 'voo-macaco',
    nome: 'Voo do Macaco',
    categoria: 'finalizacao',
    dificuldade: 'dificil',
    descricao: 'Chave de braço em movimento aéreo',
    faixa: 'preta',
    defesas: ['defesa-voo-macaco'],
    ...getAssetPaths('voo-macaco'),
  },
  {
    id: 'guarda-invertida',
    nome: 'Guarda Invertida',
    categoria: 'guarda',
    dificuldade: 'dificil',
    descricao: 'Guarda com as pernas invertidas para controle',
    faixa: 'preta',
    defesas: [],
    ...getAssetPaths('guarda-invertida'),
  },
  {
    id: 'passagem-torre',
    nome: 'Passagem da Torre',
    categoria: 'passagem',
    dificuldade: 'dificil',
    pontos: 3,
    descricao: 'Passagem avançada com levantamento do oponente',
    faixa: 'preta',
    defesas: [],
    ...getAssetPaths('passagem-torre'),
  },

  // DEFESAS DA FAIXA PRETA
  {
    id: 'defesa-voo-macaco',
    nome: 'Defesa do Voo do Macaco',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Antecipa o movimento aéreo encostando o cotovelo no joelho, baixa o centro de gravidade e contra-ataca',
    faixa: 'preta',
    defesas: [],
    ...getAssetPaths('defesa-voo-macaco'),
  },
  {
    id: 'defesa-guarda-invertida',
    nome: 'Defesa de Guarda Invertida',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Mantém pressão constante para baixo, controla os quadris e passa pela lateral com base sólida',
    faixa: 'preta',
    defesas: [],
    ...getAssetPaths('defesa-guarda-invertida'),
  },
  {
    id: 'defesa-sequencia',
    nome: 'Defesa em Sequência',
    categoria: 'defesa',
    dificuldade: 'dificil',
    descricao: 'Reage a múltiplos ataques em cadeia, priorizando defesas que quebram a sequência e criam oportunidades de contra-ataque',
    faixa: 'preta',
    defesas: [],
    ...getAssetPaths('defesa-sequencia'),
  }
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