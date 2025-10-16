'use client';
import React, { useEffect, useState } from 'react';

type Categoria = 'guarda' | 'passagem' | 'finalizacao' | 'raspagem' | 'queda' | 'defesa';

interface Tecnica {
  id: number;
  nome: string;
  categoria: Categoria;
  dificuldade: string;
  imagem: string;
  gif: string;
}

interface Carta extends Tecnica {
  corDificuldade: string;
  imagemUrl: string;
  gifUrl: string;
}

const tecnicasBase: Tecnica[] = [
  { id: 1, nome: 'Guarda Fechada', categoria: 'guarda', dificuldade: 'fácil', imagem: '/imagens/guarda.jpg', gif: '/gifs/guarda.gif' },
  { id: 2, nome: 'Passagem de Meia', categoria: 'passagem', dificuldade: 'médio', imagem: '/imagens/passagem.jpg', gif: '/gifs/passagem.gif' },
  { id: 3, nome: 'Arm Lock', categoria: 'finalizacao', dificuldade: 'difícil', imagem: '/imagens/arm.jpg', gif: '/gifs/arm.gif' },
  { id: 4, nome: 'Raspagem X', categoria: 'raspagem', dificuldade: 'médio', imagem: '/imagens/raspagem.jpg', gif: '/gifs/raspagem.gif' },
  { id: 5, nome: 'Queda Ogoshi', categoria: 'queda', dificuldade: 'fácil', imagem: '/imagens/queda.jpg', gif: '/gifs/queda.gif' },
  { id: 6, nome: 'Defesa de Montada', categoria: 'defesa', dificuldade: 'médio', imagem: '/imagens/defesa.jpg', gif: '/gifs/defesa.gif' },
  { id: 7, nome: 'Guarda Aranha', categoria: 'guarda', dificuldade: 'difícil', imagem: '/imagens/guarda2.jpg', gif: '/gifs/guarda2.gif' },
  { id: 8, nome: 'Single Leg', categoria: 'queda', dificuldade: 'médio', imagem: '/imagens/queda2.jpg', gif: '/gifs/queda2.gif' },
];

function obterCorDificuldade(dificuldade: string) {
  switch (dificuldade) {
    case 'fácil':
      return { cor: 'green' };
    case 'médio':
      return { cor: 'orange' };
    case 'difícil':
      return { cor: 'red' };
    default:
      return { cor: 'gray' };
  }
}

export default function ArenaPage() {
  const [maoJogador, setMaoJogador] = useState<Carta[]>([]);
  const [maoCPU, setMaoCPU] = useState<Carta[]>([]);
  const [primeiraJogada, setPrimeiraJogada] = useState(true);

  const baralho: Carta[] = tecnicasBase.map((tecnica) => ({
    ...tecnica,
    corDificuldade: obterCorDificuldade(tecnica.dificuldade).cor,
    imagemUrl: tecnica.imagem,
    gifUrl: tecnica.gif,
  }));

  // Distribui 1 carta de cada categoria (6 cartas por jogador)
  useEffect(() => {
    const categorias: Categoria[] = ['guarda', 'passagem', 'finalizacao', 'raspagem', 'queda', 'defesa'];

    const gerarMao = (): Carta[] => {
      return categorias.map((categoria) => {
        const tecnicasCategoria = baralho.filter((t) => t.categoria === categoria);
        return tecnicasCategoria[Math.floor(Math.random() * tecnicasCategoria.length)];
      });
    };

    setMaoJogador(gerarMao());
    setMaoCPU(gerarMao());
  }, []);

  // CPU joga carta
  const jogadaCPU = (): Carta | null => {
    if (maoCPU.length === 0) return null;

    let cartaEscolhida: Carta;

    if (primeiraJogada) {
      const opcoesPrimeira = maoCPU.filter((c) => c.categoria === 'queda' || c.categoria === 'guarda');
      cartaEscolhida =
        opcoesPrimeira.length > 0
          ? opcoesPrimeira[Math.floor(Math.random() * opcoesPrimeira.length)]
          : maoCPU[Math.floor(Math.random() * maoCPU.length)];
      setPrimeiraJogada(false);
    } else {
      cartaEscolhida = maoCPU[Math.floor(Math.random() * maoCPU.length)];
    }

    setMaoCPU((prev) => prev.filter((c) => c.id !== cartaEscolhida.id));
    return cartaEscolhida;
  };

  // Jogador joga carta
  const jogarCartaJogador = (carta: Carta) => {
    setMaoJogador((prev) => prev.filter((c) => c.id !== carta.id));
    const jogada = jogadaCPU();
    console.log('Jogador jogou:', carta.nome);
    console.log('CPU jogou:', jogada ? jogada.nome : 'sem carta');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-2xl font-bold mb-4">BJJ Card Battle</h1>
      <h2 className="text-lg mb-2">Suas Cartas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {maoJogador.map((carta) => (
          <div
            key={carta.id}
            style={{
              border: `2px solid ${carta.corDificuldade}`,
              borderRadius: '12px',
              padding: '10px',
              width: '140px',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#1a1a1a',
              color: '#fff',
            }}
            onClick={() => jogarCartaJogador(carta)}
          >
            <img src={carta.imagemUrl} alt={carta.nome} style={{ width: '100%', borderRadius: '8px' }} />
            <h3>{carta.nome}</h3>
            <p>{carta.categoria}</p>
          </div>
        ))}
      </div>
    </div>
  );
}