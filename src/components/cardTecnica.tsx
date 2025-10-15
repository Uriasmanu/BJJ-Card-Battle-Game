interface CardProps {
  id: string
  titulo: string
  categoria: string
  descricao: string
  faixa: string
  pontos: number
  corCategoria: string
  dificuldade: 'iniciante' | 'intermediario' | 'avancado'
  corDificuldade?: string // Opcional para flexibilidade
  onCardClick?: (tecnicaId: string) => void // Callback para cliques
  className?: string // Classes adicionais
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
  onCardClick,
  className = ''
}: CardProps) {
  const handleClick = () => {
    onCardClick?.(id)
  }

  // Mapeamento de ícones para dificuldade
  const iconesDificuldade = {
    iniciante: '🟢',
    intermediario: '🟠', 
    avancado: '🔴'
  }

  // Texto formatado para dificuldade
  const textoDificuldade = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  }

  return (
    <div 
      className={`
        bg-white p-4 rounded-xl shadow-lg border-t-4 cursor-pointer 
        transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
        ${className}
      `} 
      style={{ borderColor: corCategoria }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      {/* Cabeçalho com título e categoria */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex-1 mr-2">{titulo}</h3>
        <span
          className="text-xs font-semibold text-white px-2 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: corCategoria }}
        >
          {categoria.toUpperCase()}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{descricao}</p>

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
      <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">ID: {id.slice(0, 8)}...</span>
        
        {/* Mostrar pontos apenas se for maior que 0 */}
        {pontos > 0 ? (
          <span className="font-bold text-blue-600">{pontos} Pts</span>
        ) : (
          <span className="text-xs text-gray-400 italic">Finalização</span>
        )}
      </div>
    </div>
  )
}