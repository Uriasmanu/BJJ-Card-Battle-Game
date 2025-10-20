import React, { JSX, useState } from 'react';
import { Trophy, Clock, Swords, Shield, AlertTriangle, ChevronDown, ChevronUp, User } from 'lucide-react';

interface Fighter {
  name: string;
  rank: string;
  score: number;
  advantages: number;
  penalties: number;
  winner: boolean;
  color: string;
  bg: string;
}

interface TimelineItem {
  minute: string;
  description: string;
  fighter: number;
  icon: JSX.Element;
}

interface MatchData {
  event: string;
  division: string;
  winner: string;
  method: string;
  duration: string;
  fighters: Fighter[];
  timeline: TimelineItem[];
}


// Dados fictícios da luta (Mock Data)
const matchData = {
  division: "Adulto / Peso Leve / Faixa Roxa",
  winner: "João 'Ameaça' Silva",
  method: "Finalização (Estrangulamento)",
  duration: "6:45",
  fighters: [
    {
      name: "João 'Ameaça' Silva",
      rank: "Roxa",
      score: 8,
      advantages: 2,
      penalties: 0,
      winner: true,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      name: "Pedro 'Rocha' Santos",
      rank: "Roxa",
      score: 2,
      advantages: 0,
      penalties: 1,
      winner: false,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
  ],
  timeline: [
    { minute: "1:10", description: "Queda (Takedown) - João Silva (2 Pontos)", fighter: 0, icon: <Swords className="w-4 h-4" /> },
    { minute: "2:45", description: "Vantagem - Pedro Santos (Tentativa de Raspagem)", fighter: 1, icon: <Shield className="w-4 h-4" /> },
    { minute: "3:30", description: "Passagem de Guarda - João Silva (3 Pontos)", fighter: 0, icon: <Swords className="w-4 h-4" /> },
    { minute: "4:00", description: "Punição (Falta de Combate) - Pedro Santos (1 Punição)", fighter: 1, icon: <AlertTriangle className="w-4 h-4" /> },
    { minute: "5:50", description: "Raspagem (Sweep) - Pedro Santos (2 Pontos)", fighter: 1, icon: <Swords className="w-4 h-4" /> },
    { minute: "6:45", description: "Finalização (Estrangulamento) - João Silva (Vitória)", fighter: 0, icon: <Trophy className="w-4 h-4" /> },
  ]
};

// Componente de Faixa (Rank Badge)
const RankBadge = ({ rank }: { rank: string }) => {
  let color = 'bg-gray-300 text-gray-800';
  if (rank === 'Branca') color = 'bg-gray-100 text-gray-800 border-gray-400 border';
  else if (rank === 'Azul') color = 'bg-blue-600 text-white';
  else if (rank === 'Roxa') color = 'bg-purple-600 text-white';
  else if (rank === 'Marrom') color = 'bg-yellow-800 text-white';
  else if (rank === 'Preta') color = 'bg-black text-white border-white border';

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${color}`}>
      {rank}
    </span>
  );
};

// Componente Principal
const MatchSummary = () => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(true);

  const fighter1 = matchData.fighters[0];
  const fighter2 = matchData.fighters[1];

  const timelineReversed = [...matchData.timeline].reverse();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex justify-center font-inter">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">

        {/* Cabeçalho e Resultado */}
        <header className="p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl">
          <h1 className="text-3xl font-bold mt-1 flex items-center">
            <Swords className="w-6 h-6 mr-2 text-yellow-400" />
            Resumo da Luta
          </h1>
          <p className="text-sm mt-1 opacity-80">{matchData.division}</p>

          <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-gray-800 rounded-md shadow-inner flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="text-lg font-semibold text-yellow-400 flex items-center">
                <Trophy className="w-5 h-5 mr-2" /> Vencedor: {matchData.winner}
              </p>
              <p className="text-sm opacity-90 ml-7">
                Método: {matchData.method}
              </p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0 text-sm opacity-90">
              <Clock className="w-4 h-4 mr-1" /> Duração: {matchData.duration}
            </div>
          </div>
        </header>

        {/* Seção dos Lutadores/Scoreboard */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Placar Final</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Cartão do Lutador 1 */}
            <FighterCard fighter={fighter1} isWinner={fighter1.winner} />

            {/* Cartão do Lutador 2 */}
            <FighterCard fighter={fighter2} isWinner={fighter2.winner} />
          </div>
        </div>

        {/* Linha do Tempo da Luta */}
        <section className="p-6 border-t border-gray-200">
          <button
            onClick={() => setIsTimelineOpen(!isTimelineOpen)}
            className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800 p-3 -m-3 rounded-lg hover:bg-gray-100 transition duration-150"
          >
            Linha do Tempo dos Eventos ({matchData.timeline.length})
            {isTimelineOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          <div className={`mt-4 transition-all duration-500 ease-in-out ${isTimelineOpen ? 'grid opacity-100' : 'grid opacity-0'}`} style={{ gridTemplateRows: isTimelineOpen ? '1fr' : '0fr' }}>
            <div className="overflow-hidden">
              <ol className="relative border-l border-gray-300 ml-4 sm:ml-0">
                {timelineReversed.map((item, index) => (
                  <li key={index} className={`mb-6 ml-6 ${item.fighter === 0 ? fighter1.color : fighter2.color}`}>
                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white shadow-md ${item.fighter === 0 ? fighter1.bg : fighter2.bg}`}>
                      {item.icon}
                    </span>
                    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                      <time className="block mb-1 text-xs font-normal leading-none text-gray-500">
                        {item.minute}
                      </time>
                      <p className="text-base font-medium text-gray-900">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Componente do Cartão do Lutador (Fighter Card)
const FighterCard = ({ fighter, isWinner }: { fighter: Fighter; isWinner: boolean }) => {
  return (
    <div className={`p-5 rounded-xl border-2 transition-all duration-300 ${isWinner ? 'border-yellow-400 bg-yellow-50 shadow-lg' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xl font-bold flex items-center ${isWinner ? 'text-yellow-600' : 'text-gray-800'}`}>
          <User className="w-5 h-5 mr-2" />
          {fighter.name}
          {isWinner && <Trophy className="w-5 h-5 ml-2 text-yellow-500 animate-pulse" />}
        </h3>
        <RankBadge rank={fighter.rank} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center border-t pt-3 mt-3">
        <ScoreItem label="Pontos" value={fighter.score} color="text-green-600" />
        <ScoreItem label="Vantagens" value={fighter.advantages} color="text-blue-600" />
        <ScoreItem label="Punições" value={fighter.penalties} color="text-red-600" />
      </div>
    </div>
  );
};

// Componente de Item de Placar
const ScoreItem = ({ label, value, color }: { label: string; value: number; color: string }) => {
  return (
    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
};

export default MatchSummary;
