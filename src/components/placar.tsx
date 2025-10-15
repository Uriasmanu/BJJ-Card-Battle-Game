interface PlacarProps {
  timer?: string;
  leftPlayer?: { name: string; score: number };
  rightPlayer?: { name: string; score: number };
}

export default function Placar({
  timer = "05:10",
  leftPlayer = { name: "REINALDO", score: 9 },
  rightPlayer = { name: "RODRIGO", score: 7 },
}: PlacarProps) {
  return (
    <div className="relative w-[14rem] max-w-full mx-auto">
      {/* Container geral do placar */}
      <div className="relative flex bg-white rounded-xl shadow-lg overflow-hidden font-inter h-20">

        {/* Pontuações verticais - esquerda */}
        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-l-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">1</span>
          <span className="text-red-600 text-lg font-bold">0</span>
        </div>

        {/* Lado esquerdo */}
        <div className="flex flex-col items-center justify-center bg-blue-600 text-white py-1 w-20">
          <div className="text-center">
            <h2 className="text-[10px] font-bold uppercase">{leftPlayer.name}</h2>
          </div>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {leftPlayer.score}
          </span>
        </div>

        {/* Timer central */}
        <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-1 w-14">
          <span className="text-sm font-semibold">{timer}</span>
        </div>

        {/* Lado direito */}
        <div className="flex flex-col items-center justify-center bg-gray-200 text-black py-1 w-20">
          <div className="text-center">
            <h2 className="text-[10px] font-bold uppercase">{rightPlayer.name}</h2>
          </div>
          <span
            className="mt-1 font-extrabold px-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {rightPlayer.score}
          </span>
        </div>

        {/* Pontuações verticais - direita */}
        <div className="flex flex-col justify-between items-center px-1 py-1 h-full rounded-r-xl bg-white/20 shadow-inner w-10">
          <span className="text-green-500 text-lg font-bold">0</span>
          <span className="text-red-600 text-lg font-bold">0</span>
        </div>

      </div>
    </div>
  );
}
