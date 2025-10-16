'use client';

import CardBatalha from '@/components/cardBatalha';
import CardTecnica from '@/components/cardTecnica';
import { useState, useEffect } from 'react';
import { TECNICAS, obterCorCategoria, obterCorDificuldade } from '@/lib/constants/techniques';
import Placar from '@/components/placar';

type Dificuldade = 'facil' | 'intermediario' | 'dificil';

interface Carta {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  faixa: string;
  pontos: number;
  corCategoria: string;
  dificuldade: Dificuldade;
  corDificuldade: string;
  imagemUrl?: string;
  gifUrl?: string;
}

export default function ArenaPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [playerCards, setPlayerCards] = useState<Carta[]>([]);
  const [cpuCards, setCpuCards] = useState<Carta[]>([]);
  const [opponentCard, setOpponentCard] = useState<Carta | null>(null);

  // Embaralhar cartas
  const embaralhar = (array: Carta[]) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  // Converte TECNICAS para cartas
  const montarCarta = (tecnica: typeof TECNICAS[number]): Carta => ({
    id: tecnica.id,
    titulo: tecnica.nome,
    categoria: tecnica.categoria,
    descricao: tecnica.descricao,
    faixa: tecnica.faixa,
    pontos: tecnica.pontos ?? 0,
    corCategoria: obterCorCategoria(tecnica.categoria).cor,
    dificuldade: tecnica.dificuldade as Dificuldade,
    corDificuldade: obterCorDificuldade(tecnica.dificuldade).cor,
    imagemUrl: tecnica.imagem,
    gifUrl: tecnica.gif
  });

  // Distribuir 5 cartas aleatórias para cada jogador no início
  useEffect(() => {
    const embaralhadas = embaralhar(TECNICAS.map(montarCarta));
    setPlayerCards(embaralhadas.slice(0, 5));
    setCpuCards(embaralhadas.slice(5, 10));
  }, []);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleConfirm = () => {
    if (!selectedCard) return;

    setActiveCard(selectedCard);

    // CPU escolhe carta aleatória
    const cpuCarta = cpuCards[Math.floor(Math.random() * cpuCards.length)];
    setOpponentCard(cpuCarta);

    // Remove cartas usadas
    setPlayerCards(prev => prev.filter(c => c.id !== selectedCard));
    setCpuCards(prev => prev.filter(c => c.id !== cpuCarta.id));

    setSelectedCard(null);
    console.log('Você escolheu:', selectedCard, '| CPU escolheu:', cpuCarta.id);
  };

  const currentPlayerCard = activeCard
    ? playerCards.find(card => card.id === activeCard) || playerCards[0]
    : playerCards[0];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* ... todo seu JSX continua igual ... */}
    </div>
  );
}