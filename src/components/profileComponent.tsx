interface ProfileComponentProps {
  nome: string;
  titulo: string;
  faixaAtual: string;
  progresso: number;
  xpAtual: number;
  xpProximaFaixa: number;
  onEditarPerfil?: () => void;
}

export default function ProfileComponent({
  nome,
  titulo,
  faixaAtual,
  progresso,
  xpAtual,
  xpProximaFaixa,
  onEditarPerfil
}: ProfileComponentProps) {
  return (
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-4xl font-bold text-gray-900">{nome}</h2>
      <p className="text-lg text-accent-orange font-semibold mt-1">{titulo}</p>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Faixa Atual: {faixaAtual}
        </label>
        <div className="w-full bg-gray-200 rounded-full h-3.5">
          <div 
            className="bg-accent-yellow h-3.5 rounded-full transition-all duration-300"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{progresso}% para Próxima Faixa</span>
          <span>XP: {xpAtual} / {xpProximaFaixa}</span>
        </div>
      </div>

      <button 
        onClick={onEditarPerfil}
        className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-100 transition shadow-sm"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Editar Perfil
      </button>
    </div>
  );
}