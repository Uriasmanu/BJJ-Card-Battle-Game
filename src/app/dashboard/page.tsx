import { HandFist, Layers } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white pt-16 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-center text-4xl font-bold text-amber-300 mb-12">
          BJJ Batalha de Cartas
        </h1>

        <div className="max-w-md mx-auto space-y-6">
          <button className="w-full py-4 px-6 text-lg font-bold rounded-lg text-gray-900 border-2 border-amber-300 flex items-center justify-center gap-3 bg-amber-300 hover:bg-amber-400 transition-all duration-300">
            <HandFist className="w-6 h-6" />
            Iniciar Nova Luta
          </button>

          <button className="w-full py-4 px-6 text-lg font-semibold rounded-lg text-amber-300 border-2 border-amber-300 hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3 bg-transparent">
            <Layers className="w-5 h-5" />
            Gerenciar Meu Deck
          </button>
        </div>
      </div>

      <div className="mt-auto py-8">
        <div className="text-center text-xs text-gray-500">
          © 2024 BJJ Card Battle App
        </div>
      </div>
    </div>
  );
}