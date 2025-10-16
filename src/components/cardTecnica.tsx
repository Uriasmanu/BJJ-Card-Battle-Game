// CardTecnica.tsx - VERSÃO CORRIGIDA
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

export default function CardTecnica({
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
    intermediario: '🟠', 
    dificil: '🔴'
  }

  // Texto formatado para dificuldade
  const textoDificuldade = {
    facil: 'Fácil',
    intermediario: 'Intermediário',
    dificil: 'Difícil'
  }

  // Eager loading para a primeira imagem - CORREÇÃO AQUI
  useEffect(() => {
    if (imagemUrl && !mostrarGif) {
      setConteudoCarregado(false);
      // Pré-carregamento usando Image nativo do browser
      const img = document.createElement('img');
      img.src = imagemUrl;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }
  }, [imagemUrl, mostrarGif]);

  // Eager loading para o GIF quando selecionado - CORREÇÃO AQUI
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
        bg-white rounded-xl shadow-lg border-t-4 cursor-pointer 
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
        flex flex-col relative overflow-hidden
        ${className}
      `} 
      style={{ borderColor: corCategoria }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      {/* Controles de imagem/GIF */}
      {temGif && temImagem && (
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={toggleImagemGif}
            className="bg-black/70 text-white rounded-full p-1.5 text-xs hover:bg-black/90 transition-colors backdrop-blur-sm"
            title={mostrarGif ? "Mostrar imagem" : "Mostrar GIF"}
          >
            {mostrarGif ? '🖼️' : '🎬'}
          </button>
        </div>
      )}

      {/* Área da imagem/GIF - Altura automática */}
      {temConteudoVisual && (
        <div className="relative bg-gray-100">
          {/* Loading skeleton */}
          {!conteudoCarregado && (
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
          )}
          
          <div className={`transition-opacity duration-300 ${conteudoCarregado ? 'opacity-100' : 'opacity-0'}`}>
            {mostrarGif && temGif ? (
              // Mostrar GIF - Altura automática
              <Image 
                src={gifUrl} 
                alt={`GIF animado da técnica ${titulo}`}
                onError={handleGifError}
                onLoad={handleImageLoad}
                width={400}
                height={256}
                className="w-full object-contain max-h-64"
                priority={true} // ← IMPORTANTE: Carregamento prioritário
                unoptimized={true} // Para GIFs animados
              />
            ) : temImagem ? (
              // Mostrar imagem estática - Altura automática
              <Image 
                src={imagemUrl} 
                alt={`Imagem da técnica ${titulo}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                width={400}
                height={256}
                className="w-full object-contain max-h-64 transition-transform duration-200 hover:scale-105"
                priority={true} // ← IMPORTANTE: Carregamento prioritário
              />
            ) : null}
          </div>

          {/* Indicador de que tem GIF disponível */}
          {temGif && !mostrarGif && conteudoCarregado && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              GIF disponível
            </div>
          )}
        </div>
      )}

      {/* Conteúdo textual do card */}
      <div className="p-4 flex flex-col flex-1">
        {/* Indicador de slide (pontos) */}
        {temGif && temImagem && (
          <div className="flex justify-center mb-3">
            <div className="flex space-x-1">
              <div 
                className={`w-2 h-2 rounded-full transition-colors ${!mostrarGif ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
              <div 
                className={`w-2 h-2 rounded-full transition-colors ${mostrarGif ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            </div>
          </div>
        )}

        {/* Cabeçalho com título e categoria */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1 mr-2 break-words">{titulo}</h3>
          <span
            className="text-xs font-semibold text-white px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: corCategoria }}
          >
            {categoria.toUpperCase()}
          </span>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-3 flex-grow whitespace-normal">{descricao}</p>

        {/* Metadados - Dificuldade e Faixa */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm">
            <span className="mr-1">{iconesDificuldade[dificuldade]}</span>
            <span 
              className="font-medium"
              style={{ color: corDificuldade }}
            >
              {textoDificuldade[dificuldade]}
            </span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <svg
              className="w-4 h-4 mr-1 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9H17.5Z" />
            </svg>
            <span className="capitalize">{faixa}</span>
          </div>
        </div>

        {/* Rodapé com pontos */}
        <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100 mt-auto">
          <span className="text-xs text-gray-500">ID: {id.slice(0, 8)}...</span>
          
          {/* Mostrar pontos apenas se for maior que 0 */}
          {pontos && pontos > 0 ? (
            <span className="font-bold text-blue-600">{pontos} Pts</span>
          ) : (
            <span className="text-xs text-gray-400 italic">Finalização</span>
          )}
        </div>
      </div>

      {/* Placeholder quando não há conteúdo visual */}
      {!temConteudoVisual && (
        <div className="p-4 bg-gray-100 flex items-center justify-center min-h-32">
          <span className="text-gray-400 text-sm">
            {imagemErro || gifErro ? 'Mídia não disponível' : 'Sem imagem'}
          </span>
        </div>
      )}
    </div>
  )
}