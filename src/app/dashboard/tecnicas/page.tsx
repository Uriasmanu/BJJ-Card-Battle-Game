'use client';

import React, { useState } from "react";
import CardTecnica from "@/components/cardTecnica";
import { TECNICAS, obterCorCategoria, obterCorDificuldade } from "@/lib/constants/techniques";
import { Plus, Search, Filter } from "lucide-react";

export default function TecnicasPage() {
  const [tecnicas, setTecnicas] = useState(TECNICAS);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tecnicaSelecionada, setTecnicaSelecionada] = useState<string>("");
  const [busca, setBusca] = useState("");
  const [filtroFaixa, setFiltroFaixa] = useState("todas");
  const [filtroCategoria, setFiltroCategoria] = useState("todas"); // ← filtro categoria

  // Filtrar técnicas baseado na busca, faixa e categoria
  const tecnicasFiltradas = tecnicas.filter((tecnica) => {
    const matchesBusca =
      tecnica.nome.toLowerCase().includes(busca.toLowerCase()) ||
      tecnica.descricao.toLowerCase().includes(busca.toLowerCase());
    const matchesFaixa =
      filtroFaixa === "todas" || tecnica.faixa === filtroFaixa.toLowerCase();
    const matchesCategoria =
      filtroCategoria === "todas" || tecnica.categoria === filtroCategoria.toLowerCase();

    return matchesBusca && matchesFaixa && matchesCategoria;
  });

  const handleAdd = () => {
    if (!tecnicaSelecionada) return;

    const encontrada = TECNICAS.find((t) => t.id === tecnicaSelecionada);
    if (!encontrada) return;

    const jaExiste = tecnicas.some(t => t.id === encontrada.id);
    if (jaExiste) {
      alert("Esta técnica já está no seu deck!");
      setTecnicaSelecionada("");
      setMostrarModal(false);
      return;
    }

    setTecnicas((prev) => [encontrada, ...prev]);
    setTecnicaSelecionada("");
    setMostrarModal(false);
  };

  const handleRemoverTecnica = (id: string) => {
    setTecnicas(prev => prev.filter(t => t.id !== id));
  };

  const totalPontos = tecnicas.reduce((sum, t) => sum + (t.pontos || 0), 0);
  const totalFinalizacoes = tecnicas.filter(t => t.categoria === 'finalizacao').length;

  return (
    <main className="flex-1 transition-all duration-300 p-6 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-2">
          Gerenciar Meu Deck de Técnicas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Aqui você pode ver, filtrar e organizar suas técnicas de Jiu-Jitsu aprendidas.
        </p>
      </header>

      {/* Painel de informações e ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100 gap-4">
        {/* Informações do Deck */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm">
          <div className="text-center md:text-left">
            <p className="text-gray-600">Total no Deck</p>
            <p className="font-bold text-gray-900 text-xl">{tecnicas.length}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-gray-600">Pontuação Total</p>
            <p className="font-bold text-blue-600 text-xl">{totalPontos} pts</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-gray-600">Finalizações</p>
            <p className="font-bold text-red-600 text-xl">{totalFinalizacoes}</p>
          </div>
        </div>

        {/* Buscar, filtrar e adicionar */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Busca */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar técnica..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-full focus:ring-yellow-500 focus:border-yellow-500 transition"
            />
          </div>

          {/* Filtro de faixa */}
          <div className="relative w-full md:w-40">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filtroFaixa}
              onChange={(e) => setFiltroFaixa(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-white w-full focus:ring-yellow-500 focus:border-yellow-500 transition appearance-none"
            >
              <option value="todas">Todas as Faixas</option>
              <option value="branca">Branca</option>
              <option value="azul">Azul</option>
              <option value="roxa">Roxa</option>
              <option value="marrom">Marrom</option>
              <option value="preta">Preta</option>
            </select>
          </div>

          {/* Filtro de categoria */}
          <div className="relative w-full md:w-40">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-white w-full focus:ring-yellow-500 focus:border-yellow-500 transition appearance-none"
            >
              <option value="todas">Todas as Categorias</option>
              <option value="ataque">Ataque</option>
              <option value="defesa">Defesa</option>
              <option value="finalizacao">Finalização</option>
            </select>
          </div>

          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition w-full md:w-auto shadow-md"
          >
            <Plus size={18} /> Adicionar Técnica
          </button>
        </div>
      </div>

      {/* Mensagem quando não há técnicas */}
      {tecnicasFiltradas.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <p className="text-gray-500 text-lg">
            {tecnicas.length === 0 ? "Seu deck está vazio." : "Nenhuma técnica encontrada com os filtros atuais."}
          </p>
          <button
            onClick={() => setMostrarModal(true)}
            className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition"
          >
            Adicionar Primeira Técnica
          </button>
        </div>
      )}

      {/* Lista de técnicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tecnicasFiltradas.map((t) => (
          <div key={t.id} className="relative group">
            <CardTecnica
              id={t.id}
              titulo={t.nome}
              categoria={t.categoria}
              descricao={t.descricao}
              faixa={`Faixa ${t.faixa.charAt(0).toUpperCase() + t.faixa.slice(1)}`}
              pontos={t.pontos}
              corCategoria={obterCorCategoria(t.categoria).cor}
              dificuldade={
                t.dificuldade === 'facil' ? 'facil' :
                t.dificuldade === 'intermediario' ? 'intermediario' :
                'dificil'
              }
              corDificuldade={obterCorDificuldade(t.dificuldade).cor}
              imagemUrl={t.imagem}
              gifUrl={t.gif}
              onCardClick={(id) => console.log('Técnica clicada:', id)}
            />
            <button
              onClick={() => handleRemoverTecnica(t.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              title="Remover técnica"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Selecionar Técnica para Adicionar
            </h2>

            <div className="flex-1 overflow-y-auto">
              <label className="text-sm text-gray-600 mb-2 block">Técnicas disponíveis</label>
              <select
                className="border rounded-lg p-3 w-full mb-4 focus:ring-yellow-500 focus:border-yellow-500"
                value={tecnicaSelecionada}
                onChange={(e) => setTecnicaSelecionada(e.target.value)}
              >
                <option value="">-- Escolha uma técnica --</option>
                {TECNICAS.filter(t => !tecnicas.some(deckT => deckT.id === t.id))
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome} — Faixa {t.faixa.charAt(0).toUpperCase() + t.faixa.slice(1)} ({t.pontos ? `${t.pontos} pts` : 'Finalização'})
                    </option>
                  ))}
              </select>

              {tecnicaSelecionada && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-gray-800 mb-2">Prévia:</h3>
                  {(() => {
                    const tecnica = TECNICAS.find(t => t.id === tecnicaSelecionada);
                    return tecnica ? (
                      <div className="text-sm text-gray-600">
                        <p><strong>Nome:</strong> {tecnica.nome}</p>
                        <p><strong>Categoria:</strong> {tecnica.categoria}</p>
                        <p><strong>Dificuldade:</strong> {tecnica.dificuldade}</p>
                        <p><strong>Pontos:</strong> {tecnica.pontos ? `${tecnica.pontos} pts` : 'Finalização'}</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t">
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
                className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Adicionar ao Deck
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}