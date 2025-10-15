'use client';

import React, { useState } from "react";
import CardTecnica from "@/components/cardTecnica";
import { TECNICAS } from "@/lib/constants/techniques";
import { Plus } from "lucide-react";

export default function TecnicasPage() {
  const [tecnicas, setTecnicas] = useState(TECNICAS);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tecnicaSelecionada, setTecnicaSelecionada] = useState<string>("");

  const handleAdd = () => {
    if (!tecnicaSelecionada) return;

    const encontrada = TECNICAS.find((t) => t.id === tecnicaSelecionada);
    if (!encontrada) return;

    // Clona a técnica encontrada e cria um novo id para o deck
    const nova = {
      ...encontrada,
      id: Date.now().toString(),
    };

    setTecnicas((prev) => [nova, ...prev]);
    setTecnicaSelecionada("");
    setMostrarModal(false);
  };

  return (
    <main className="flex-1 transition-all duration-300">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-2">
          Gerenciar Meu Deck de Técnicas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Aqui você pode ver, filtrar e organizar suas técnicas de Jiu-Jitsu aprendidas.
        </p>
      </header>

      {/* Painel de informações e ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl shadow-md mb-8 border border-gray-100 gap-4">
        {/* Informações do Deck */}
        <div className="flex flex-col md:flex-row mb-4 md:mb-0 gap-4 md:gap-6 text-sm">
          <p className="text-gray-600">
            Total no Deck: <span className="font-bold text-gray-900">{tecnicas.length}</span>
          </p>
        </div>

        {/* Buscar, filtrar e adicionar */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar técnica..."
            className="p-2 border border-gray-300 rounded-xl w-full md:w-64 focus:ring-accent-yellow focus:border-accent-yellow transition"
          />
          <select className="p-2 border border-gray-300 rounded-xl bg-white w-full md:w-40 focus:ring-accent-yellow focus:border-accent-yellow transition">
            <option>Filtrar por Faixa</option>
            <option>Branca</option>
            <option>Azul</option>
            <option>Roxa</option>
            <option>Marrom</option>
            <option>Preta</option>
          </select>
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition w-full md:w-auto"
          >
            <Plus /> Adicionar Técnica
          </button>
        </div>
      </div>

      {/* Lista de técnicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tecnicas.map((t) => (
          <CardTecnica
            key={t.id}
            titulo={t.nome}
            categoria={t.categoria}
            descricao={t.descricao}
            faixa={`Faixa ${t.faixa.charAt(0).toUpperCase() + t.faixa.slice(1)}`}
            pontos={t.pontos}
            corCategoria="#3b82f6"
          />
        ))}
      </div>

      {/* Modal: selecionar técnica existente */}
      {mostrarModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Selecionar Técnica para Adicionar
            </h2>

            <label className="text-sm text-gray-600 mb-2 block">Técnicas disponíveis</label>
            <select
              className="border rounded-lg p-2 w-full mb-4"
              value={tecnicaSelecionada}
              onChange={(e) => setTecnicaSelecionada(e.target.value)}
            >
              <option value="">-- Escolha uma técnica --</option>
              {TECNICAS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome} — {t.faixa.charAt(0).toUpperCase() + t.faixa.slice(1)} ({t.pontos} pts)
                </option>
              ))}
            </select>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-2">
              <button
                onClick={() => {
                  setMostrarModal(false);
                  setTecnicaSelecionada("");
                }}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                disabled={!tecnicaSelecionada}
                className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
