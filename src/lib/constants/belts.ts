
export interface Belt {
  id: string;
  name: string;
  color: string;
  gradient: string;
  order: number;
  description: string;
}

export const BELTS: Belt[] = [
  {
    id: 'white',
    name: 'Faixa Branca',
    color: '#FFFFFF',
    gradient: 'from-white to-gray-100',
    order: 1,
    description: 'Iniciante - Fundamentos básicos'
  },
  {
    id: 'blue',
    name: 'Faixa Azul',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-600',
    order: 2,
    description: 'Intermediário - Técnicas intermediárias'
  },
  {
    id: 'purple',
    name: 'Faixa Roxa',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-600',
    order: 3,
    description: 'Avançado - Game pessoal'
  },
  {
    id: 'brown',
    name: 'Faixa Marrom',
    color: '#92400E',
    gradient: 'from-amber-700 to-amber-800',
    order: 4,
    description: 'Especialista - Refinamento'
  },
  {
    id: 'black',
    name: 'Faixa Preta',
    color: '#000000',
    gradient: 'from-gray-900 to-black',
    order: 5,
    description: 'Mestre - Domínio completo'
  }
];

export const getBeltById = (id: string): Belt | undefined => 
  BELTS.find(belt => belt.id === id);

export const getNextBelt = (currentBeltId: string): Belt | null => {
  const currentBelt = getBeltById(currentBeltId);
  if (!currentBelt) return null;
  
  return BELTS.find(belt => belt.order === currentBelt.order + 1) || null;
};