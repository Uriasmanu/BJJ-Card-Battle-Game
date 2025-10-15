'use client';

import { useState } from "react";
import { Layers } from "lucide-react";

export default function ProfileComponent() {
  const [color, setColor] = useState("white");

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
    <div className="flex flex-col items-center gap-5 mt-20">
      {/* Card */}
      <div className="relative w-76 h-[380px] rounded-2xl overflow-hidden shadow-[0_8px_28px_-9px_rgba(0,0,0,0.45)] bg-transparent">
        {/* Waves animadas */}
        <div
          className={`absolute left-0 top-0 w-[540px] h-[700px] opacity-70 -ml-[50%] -mt-[70%] rounded-[40%] bg-gradient-to-br ${gradients[color]} animate-wave-slow`}
        />
        <div
          className={`absolute left-0 top-[210px] w-[540px] h-[700px] opacity-70 -ml-[50%] -mt-[70%] rounded-[40%] bg-gradient-to-br ${gradients[color]} animate-wave-medium`}
        />
        <div
          className={`absolute left-0 top-[210px] w-[540px] h-[700px] opacity-70 -ml-[50%] -mt-[70%] rounded-[40%] bg-gradient-to-br ${gradients[color]} animate-wave-fast`}
        />

        {/* Info */}
        <div className="absolute top-[6em] left-0 right-0 text-center text-white font-semibold text-lg flex flex-col items-center gap-3">
          {/* Ícone */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-14 mx-auto -mt-6 mb-2"
          >
            <path
              fill="currentColor"
              d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674
              4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368
              21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204
              22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651
              17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
            ></path>
          </svg>

          <p className="text-xl">UI / EX Designer</p>

          {/* Select dentro do card */}
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-4/5 mt-1"
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

          <button className="w-4/5 py-2 px-4 text-sm font-semibold rounded-md text-gray-900 bg-amber-300 flex items-center justify-center gap-2 mx-auto">
            <Layers className="w-4 h-4" />
            Gerenciar Minhas Tecnicas
          </button>
        </div>
      </div>
    </div>
  );
}
