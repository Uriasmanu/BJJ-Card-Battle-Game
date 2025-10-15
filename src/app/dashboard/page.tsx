import { HandFist } from "lucide-react";
import Image from "next/image";
import banner from '../../../public/image/inicial.png'
import ProfileComponent from "@/components/profileComponent";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
          <h1 className="text-center text-4xl font-bold text-amber-300 mb-8">
            BJJ Batalha de Cartas
          </h1>

          <div className="flex justify-center">
            <Image
              src={banner}
              alt="BJJ Battle Arena"
              width={500}
              height={100}
            />
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <button className="w-full py-4 px-6 text-lg font-bold rounded-lg text-gray-900 border-2 border-amber-300 flex items-center justify-center gap-3 bg-amber-300 hover:bg-amber-400 transition-all duration-300">
              <HandFist className="w-6 h-6" />
              Iniciar Nova Luta
            </button>
          </div>
        </div>

        <div className="py-4">
          <div className="text-center text-xs text-gray-500">
            © 2024 BJJ Card Battle App
          </div>
        </div>
      </div>

      {/* Profile - aparece apenas em telas grandes */}
      <div className="hidden lg:block w-70 xl:w-76 bg-gray-50 border-l border-gray-200">
        <ProfileComponent
          nome="Maria Santos"
          titulo="Faixa Azul (Intermediário)"
          faixaAtual="Faixa Azul"
          progresso={65}
          xpAtual={650}
          xpProximaFaixa={1000}
          onEditarPerfil={() => console.log('Editar perfil clicado')}
        />
      </div>
    </div>
  );
}