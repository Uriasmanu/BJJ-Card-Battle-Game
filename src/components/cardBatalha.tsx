// CardBatalha.tsx - VERSÃO SUPER COMPACTA
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CardProps {
  id: string
  titulo: string
  categoria: string
  descricao: string
  faixa: string
  pontos?: number
  corCategoria: string
  dificuldade: 'facil' | 'intermediario' | 'dificil'
  corDificuldade?: string
  imagemUrl?: string
  gifUrl?: string
  onCardClick?: (tecnicaId: string) => void
  className?: string
}

export default function CardBatalha({
  id,
  titulo,
  categoria,
  descricao,
  faixa,
  pontos,
  corCategoria,
  dificuldade,
  corDificuldade,
  imagemUrl,
  gifUrl,
  onCardClick,
  className = ''
}: CardProps) {
  const [imagemErro, setImagemErro] = useState(false);
  const [gifErro, setGifErro] = useState(false);
  const [mostrarGif, setMostrarGif] = useState(false);
  const [conteudoCarregado, setConteudoCarregado] = useState(false);
  
  const handleClick = () => {
    onCardClick?.(id)
  }

  const handleImageError = () => {
    setImagemErro(true);
    setConteudoCarregado(true);
  }

  const handleGifError = () => {
    setGifErro(true);
    setConteudoCarregado(true);
  }

  const handleImageLoad = () => {
    setConteudoCarregado(true);
  }

  const toggleImagemGif = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMostrarGif(!mostrarGif);
    setConteudoCarregado(false);
  }

  // Verifica se tem GIF disponível
  const temGif = gifUrl && !gifErro;
  const temImagem = imagemUrl && !imagemErro;
  const temConteudoVisual = temGif || temImagem;

  // Mapeamento de ícones para dificuldade
  const iconesDificuldade = {
    facil: '🟢',
    intermediario: '🟡', 
    dificil: '🔴'
  }

  // Texto formatado para dificuldade
  const textoDificuldade = {
    facil: 'Fácil',
    intermediario: 'Médio',
    dificil: 'Difícil'
  }

  // Eager loading para a primeira imagem
  useEffect(() => {
    if (imagemUrl && !mostrarGif) {
      setConteudoCarregado(false);
      const img = document.createElement('img');
      img.src = imagemUrl;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }
  }, [imagemUrl, mostrarGif]);

  // Eager loading para o GIF quando selecionado
  useEffect(() => {
    if (gifUrl && mostrarGif) {
      setConteudoCarregado(false);
      const img = document.createElement('img');
      img.src = gifUrl;
      img.onload = handleImageLoad;
      img.onerror = handleGifError;
    }
  }, [gifUrl, mostrarGif]);

  return (
    <div 
      className={`
        bg-white rounded-md shadow-sm border-t-2 cursor-pointer 
        transition-all duration-200 hover:-translate-y-1 hover:shadow-md
        flex flex-col relative overflow-hidden w-24 sm:w-28
        ${className}
      `} 
      style={{ borderColor: corCategoria }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      {/* Controles de imagem/GIF - Removido para economizar espaço */}

      {/* Área da imagem/GIF - Tamanho mínimo */}
      {temConteudoVisual && (
        <div className="relative bg-gray-100">
          {/* Loading skeleton */}
          {!conteudoCarregado && (
            <div className="w-full h-16 bg-gray-200 animate-pulse" />
          )}
          
          <div className={`transition-opacity duration-300 ${conteudoCarregado ? 'opacity-100' : 'opacity-0'}`}>
            {mostrarGif && temGif ? (
              <Image 
                src={gifUrl} 
                alt={`GIF da técnica ${titulo}`}
                onError={handleGifError}
                onLoad={handleImageLoad}
                width={112}
                height={64}
                className="w-full object-contain max-h-16"
                priority={true}
                unoptimized={true}
              />
            ) : temImagem ? (
              <Image 
                src={imagemUrl} 
                alt={`Imagem da técnica ${titulo}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                width={112}
                height={64}
                className="w-full object-contain max-h-16"
                priority={true}
              />
            ) : null}
          </div>
        </div>
      )}

      {/* Conteúdo textual do card - Ultra compacto */}
      <div className="p-1.5 flex flex-col flex-1">
        {/* Cabeçalho com título e categoria */}
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="text-[10px] font-bold text-gray-800 flex-1 mr-1 line-clamp-1 leading-tight">
            {titulo.split(' ')[0]}
          </h3>
          <span
            className="text-[8px] font-semibold text-white px-1 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: corCategoria }}
          >
            {categoria.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Descrição ultra compacta */}
        <p className="text-[9px] text-gray-600 mb-1 line-clamp-2 flex-grow leading-tight">
          {descricao.length > 30 ? descricao.slice(0, 30) + '...' : descricao}
        </p>

        {/* Metadados - Dificuldade e Faixa */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center text-[9px]">
            <span className="mr-0.5 text-[8px]">{iconesDificuldade[dificuldade]}</span>
            <span 
              className="font-medium"
              style={{ color: corDificuldade }}
            >
              {textoDificuldade[dificuldade].slice(0, 3)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-500 text-[9px]">
            <span className="capitalize">{faixa.slice(0, 2)}</span>
          </div>
        </div>

        {/* Rodapé com pontos */}
        <div className="flex justify-between items-center text-[8px] pt-1 border-t border-gray-100 mt-auto">
          <span className="text-gray-500">ID:{id.slice(0, 3)}</span>
          
          {/* Mostrar pontos apenas se for maior que 0 */}
          {pontos && pontos > 0 ? (
            <span className="font-bold text-blue-600">{pontos}</span>
          ) : (
            <span className="text-gray-400 italic">Fin</span>
          )}
        </div>
      </div>

      {/* Placeholder quando não há conteúdo visual */}
      {!temConteudoVisual && (
        <div className="p-1 bg-gray-100 flex items-center justify-center min-h-12">
          <span className="text-gray-400 text-[8px]">
            Sem img
          </span>
        </div>
      )}
    </div>
  )
}