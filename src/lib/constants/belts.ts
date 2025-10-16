export interface Belt {
  id: string;
  name: string;
  color: string;
  gradient: string;
  order: number;
  fightTime: number; // Tempo de luta em minutos
  minAge?: number; // Idade mínima (opcional)
}

export const BELTS: Belt[] = [
  {
    id: 'white',
    name: 'Faixa Branca',
    color: '#FFFFFF',
    gradient: 'from-white to-gray-100',
    order: 1,
    fightTime: 5, // 5 minutos
    minAge: 16
  },
  {
    id: 'blue',
    name: 'Faixa Azul',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    order: 2,
    fightTime: 6, // 6 minutos
    minAge: 16
  },
  {
    id: 'purple',
    name: 'Faixa Roxa',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    order: 3,
    fightTime: 7, // 7 minutos
    minAge: 18
  },
  {
    id: 'brown',
    name: 'Faixa Marrom',
    color: '#92400E',
    gradient: 'from-amber-700 to-amber-800',
    order: 4,
    fightTime: 8, // 8 minutos
    minAge: 19
  },
  {
    id: 'black',
    name: 'Faixa Preta',
    color: '#000000',
    gradient: 'from-gray-900 to-black',
    order: 5,
    fightTime: 10, // 10 minutos
    minAge: 19
  }
];

export const getBeltById = (id: string): Belt | undefined => 
  BELTS.find(belt => belt.id === id);

export const getNextBelt = (currentBeltId: string): Belt | null => {
  const currentBelt = getBeltById(currentBeltId);
  if (!currentBelt) return null;
  
  return BELTS.find(belt => belt.order === currentBelt.order + 1) || null;
};

// Nova função para obter o tempo de luta formatado
export const getFormattedFightTime = (beltId: string): string => {
  const belt = getBeltById(beltId);
  if (!belt) return 'Tempo não definido';
  
  return `${belt.fightTime} min`;
};

// Função para obter todas as faixas com tempo de luta
export const getBeltsWithFightTime = (): Array<Belt & { formattedTime: string }> => {
  return BELTS.map(belt => ({
    ...belt,
    formattedTime: `${belt.fightTime} min`
  }));
};