'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
    document.cookie = 'auth-token=12345; path=/';
    router.push('/dashboard');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 sm:p-6 w-full rounded-2xl font-sans shadow-sm"
    >
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold text-sm sm:text-base">Email</label>
        <div className="flex items-center h-10 sm:h-12 border border-gray-200 rounded-lg pl-2 focus-within:border-blue-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            viewBox="0 0 32 32"
            height="18"
            className="flex-shrink-0"
          >
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="ml-3 w-full h-full border-none outline-none rounded-lg placeholder:text-gray-400 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold text-sm sm:text-base">Senha</label>
        <div className="flex items-center h-10 sm:h-12 border border-gray-200 rounded-lg pl-2 focus-within:border-blue-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            viewBox="-64 0 512 512"
            height="18"
            className="flex-shrink-0"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            type="password"
            placeholder="Senha"
            className="ml-3 w-full h-full border-none outline-none rounded-lg placeholder:text-gray-400 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-[#151717] text-white text-sm sm:text-[15px] font-medium rounded-lg h-10 sm:h-12 w-full hover:bg-black transition"
      >
        Entrar
      </button>

      <p className="text-center text-xs sm:text-sm text-black my-2">Ou</p>

      <div className="flex flex-col gap-2 sm:gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg h-10 sm:h-12 w-full font-medium hover:border-blue-500 transition text-xs sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            viewBox="0 0 512 512"
            height="16"
          >
            <path
              d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
              c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
              C103.821,274.792,107.225,292.797,113.47,309.408z"
              fill="#FBBB00"
            />
            <path
              d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
              c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
              c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z"
              fill="#518EF8"
            />
            <path
              d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
              c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
              c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              fill="#28B446"
            />
            <path
              d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
              c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
              C318.115,0,375.068,22.126,419.404,58.936z"
              fill="#F14336"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg h-10 sm:h-12 w-full font-medium hover:border-blue-500 transition text-xs sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 22.773 22.773"
          >
            <path
              d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 
              c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
              fill="black"
            />
            <path
              d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655
              c-0.723,0.995-1.609,2.334-3.191,2.334c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926
              c-0.155,0-0.31,0-0.462,0c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276
              c0-0.34,0-0.679,0-1.019c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765
              c0.555,0.086,1.122,0.276,1.619,0.464c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347
              c1.116-0.403,2.21-0.865,3.652-0.648c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74
              C17.818,14.688,19.086,15.964,20.67,16.716z"
              fill="black"
            />
          </svg>
          Apple
        </button>
      </div>
    </form>
  );
}