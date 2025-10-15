'use client';

import ProfileComponent from "@/components/profileComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const [color, setColor] = useState("white");
  const router = useRouter();

  const gradients: Record<string, string> = {
    gray: "from-gray-200 via-gray-400 to-gray-600",
    yellow: "from-yellow-300 via-yellow-400 to-yellow-500",
    orange: "from-orange-400 via-orange-500 to-orange-600",
    green: "from-green-400 via-green-500 to-green-600",
    white: "from-gray-100 via-gray-200 to-gray-300",
    blue: "from-blue-400 via-blue-500 to-blue-600",
    purple: "from-purple-500 via-purple-600 to-purple-700",
    brown: "from-amber-700 via-amber-800 to-amber-900",
    black: "from-gray-800 via-gray-900 to-black",
  };


  return (
    <div className="w-full min-h-screen flex items-center justify-cente">

      <main className="flex flex-col">
        <header>
          <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-2">Informações do Jogador</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie seu perfil, veja seu progresso e acesse suas ferramentas.</p>
        </header>

        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-5/5 my-5"
        >
          <optgroup label="Faixas Infantis">
            <option value="gray">Faixa Cinza</option>
            <option value="yellow">Faixa Amarela</option>
            <option value="orange">Faixa Laranja</option>
            <option value="green">Faixa Verde</option>
          </optgroup>
          <optgroup label="Faixas Adultas">
            <option value="white">Faixa Branca</option>
            <option value="blue">Faixa Azul</option>
            <option value="purple">Faixa Roxa</option>
            <option value="brown">Faixa Marrom</option>
            <option value="black">Faixa Preta</option>
          </optgroup>
        </select>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          <section className="lg:col-span-2 space-y-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0 shadow-inner">
                  <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>

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

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalhes da Faixa Branca</h3>
              <p className="text-gray-600 mb-4">Esta é a sua faixa inicial. O foco principal é aprender os **fundamentos** e completar os 10 desafios básicos de introdução ao sistema.</p>

              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M7 19h10" /><path d="M5 21h14" /></svg>
                  $10$ Desafios Requeridos
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /></svg>
                  $80\%$ de Conclusão
                </span>
              </div>
            </div>
          </section>


          <aside className="lg:col-span-1 space-y-8">


            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Seu Arsenal</h3>
              <p className="text-sm text-gray-600 mb-6">Acesse e organize seu conjunto de técnicas e habilidades.</p>


              <button onClick={() => router.push("/dashboard/tecnicas")}className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl text-sidebar-dark bg-accent-yellow bg-yellow-500 shadow-md">
                <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10s2.6 1.1 8 0c4.4-1 8-2 8 0 0 2-4 3-8 4-4 1-8 2-8 4v2c0 2 3 3 8 3s8-1 8-3" /></svg>
                Gerenciar Minhas Tecnicas
              </button>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Estatísticas Rápidas</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-sm font-medium text-gray-500">Técnicas Aprendidas</dt>
                  <dd className="text-lg font-semibold text-gray-900">$23 / 50$</dd>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <dt className="text-sm font-medium text-gray-500">Batalhas Vencidas</dt>
                  <dd className="text-lg font-semibold text-green-600">$12$</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-sm font-medium text-gray-500">Pontuação de Habilidade</dt>
                  <dd className="text-lg font-semibold text-gray-900">$1,450$</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

      </main>

    </div>
  );
}