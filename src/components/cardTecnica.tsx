interface CardProps {
  titulo: string
  categoria: string
  descricao: string
  faixa: string
  pontos: number
  corCategoria: string
}

export default function CardTecnica({
  titulo,
  categoria,
  descricao,
  faixa,
  pontos,
  corCategoria,
}: CardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border-t-4 cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: corCategoria }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">{titulo}</h3>
        <span
          className="text-xs font-semibold text-white px-2 py-1 rounded-full"
          style={{ backgroundColor: corCategoria }}
        >
          {categoria}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{descricao}</p>
      <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center text-gray-500">
          <svg
            className="w-4 h-4 mr-1 text-accent-yellow"
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
          <span>{faixa}</span>
        </div>
        <span className="font-bold text-blue-600">{pontos} Pts</span>
      </div>
    </div>
  )
}
