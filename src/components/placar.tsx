<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Placar de Lutas (Scoreboard)</title>
    <!-- Carrega o Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Carrega ícones Font Awesome para o símbolo de power/logout e checkboxes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Define a fonte Inter (padrão) e remove margens padrão */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden; /* Evita a rolagem indesejada */
        }

        /* Classe customizada para os placares gigantes (ajustando para telas menores) */
        .huge-score {
            /* Tamanho de fonte responsivo: 10rem no mínimo, 25vw, 20rem no máximo */
            font-size: clamp(10rem, 25vw, 20rem); 
            line-height: 1;
            font-weight: 900;
        }

        /* Classe para os painéis de controle laterais */
        .sidebar-control-panel {
            width: 30px; /* Largura fina como na imagem */
            background-color: #e5e7eb; /* Cor de fundo cinza claro */
            padding-top: 5rem; /* Espaçamento superior para alinhar com a área de pontuação */
            border-left: 1px solid #d1d5db;
        }

        /* Classes para os botões laterais (simulando a interface de rolagem/botões) */
        .sidebar-button {
            width: 100%;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #d1d5db;
            color: #6b7280;
            cursor: pointer;
            transition: background-color 0.15s;
        }
        .sidebar-button:hover {
            background-color: #d1d5db;
        }
    </style>
</head>
<body class="bg-gray-100">

    <!-- 1. CABEÇALHO SUPERIOR (Timer e Logo) -->
    <header class="h-20 flex items-center justify-between px-6 bg-white shadow-md border-b">
        <!-- Controles de Menu (Canto Superior Esquerdo) -->
        <div class="flex justify-start">
            <div class="text-sm border rounded-lg p-1 bg-gray-50 flex flex-col space-y-1 shadow-inner">
                <button class="text-xs text-gray-700 hover:text-blue-600 transition">tempo</button>
                <button class="text-xs text-gray-700 hover:text-blue-600 transition">zerar pontos</button>
                <button class="text-xs text-gray-700 hover:text-blue-600 transition">iniciar</button>
            </div>
        </div>
        
        <!-- Timer Central -->
        <div class="text-center">
            <span class="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">05:10</span>
        </div>

        <!-- Logo e Power (Canto Superior Direito) -->
        <div class="flex justify-end items-center space-x-4">
            <div class="flex items-center p-1 border-2 border-yellow-300 rounded-full bg-black shadow-lg cursor-pointer transform rotate-[-5deg]">
                <!-- Simulação do logo 'O MARCA LUTAS' -->
                <div class="text-yellow-400 font-extrabold text-xs px-2 py-1 transform rotate-[5deg]">O MARCA LUTAS</div>
            </div>
            <button class="text-gray-600 hover:text-red-600 transition">
                <i class="fas fa-power-off text-xl"></i>
            </button>
        </div>
    </header>

    <!-- 2. LAYOUT PRINCIPAL (Scoreboard e Barras Laterais) -->
    <main class="flex flex-1 relative">
        
        <!-- BARRA LATERAL ESQUERDA (Controles de Pontuação) -->
        <div class="sidebar-control-panel flex flex-col items-center justify-start absolute left-0 top-0 bottom-0 z-10">
            <div class="space-y-0.5 w-full">
                <div class="sidebar-button">+V</div>
                <div class="sidebar-button">+4</div>
                <div class="sidebar-button">+2</div>
                <div class="sidebar-button"></div>
                <div class="sidebar-button">-2</div>
                <div class="sidebar-button">-3</div>
                <div class="sidebar-button">-V</div>
            </div>
        </div>

        <!-- PLACAR CENTRAL -->
        <div class="flex flex-1 ml-[30px] mr-[30px] relative">
            
            <!-- PONTUAÇÃO FLUTUANTE ESQUERDA (1 e 0) -->
            <div class="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-[30px] text-center text-3xl font-bold z-20">
                <span class="text-green-500 block leading-none mb-16">1</span>
                <span class="text-red-600 block leading-none mt-16">0</span>
            </div>

            <!-- LADO ESQUERDO (REINALDO - AZUL) -->
            <div class="flex flex-col w-1/2 bg-blue-600 text-white border-r-2 border-white relative">
                <!-- Barra de Nome (Azul Escuro) -->
                <div class="flex items-center justify-between bg-blue-900 h-10 md:h-12 px-4 shadow-xl">
                    <i class="far fa-check-square text-blue-300 text-lg"></i>
                    <div class="text-center">
                        <h2 class="text-base md:text-lg font-bold uppercase tracking-wider">REINALDO</h2>
                        <p class="text-xs text-blue-300">A. ASS. BRASIL</p>
                    </div>
                    <i class="far fa-square text-blue-300 text-lg"></i>
                </div>
                <!-- Placar Principal -->
                <div class="flex-1 flex items-center justify-center">
                    <span class="huge-score text-white">9</span>
                </div>
            </div>

            <!-- LADO DIREITO (RODRIGO - BRANCO) -->
            <div class="flex flex-col w-1/2 bg-white text-black">
                <!-- Barra de Nome (Cinza Claro) -->
                <div class="flex items-center justify-between bg-gray-200 h-10 md:h-12 px-4 shadow-xl">
                    <i class="far fa-square text-gray-500 text-lg"></i>
                    <div class="text-center">
                        <h2 class="text-base md:text-lg font-bold uppercase tracking-wider">RODRIGO</h2>
                        <p class="text-xs text-gray-600">MMA UNIÃO</p>
                    </div>
                    <i class="far fa-check-square text-gray-500 text-lg"></i>
                </div>
                <!-- Placar Principal -->
                <div class="flex-1 flex items-center justify-center">
                    <span class="huge-score text-gray-900">7</span>
                </div>
            </div>

            <!-- PONTUAÇÃO FLUTUANTE DIREITA (0 e 0) -->
            <div class="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-[30px] text-center text-3xl font-bold z-20">
                <span class="text-green-500 block leading-none mb-16">0</span>
                <span class="text-red-600 block leading-none mt-16">0</span>
            </div>
        </div>

        <!-- BARRA LATERAL DIREITA (Controles de Pontuação) -->
        <div class="sidebar-control-panel flex flex-col items-center justify-start absolute right-0 top-0 bottom-0 z-10">
            <div class="space-y-0.5 w-full">
                <div class="sidebar-button">+V</div>
                <div class="sidebar-button">+4</div>
                <div class="sidebar-button">+2</div>
                <div class="sidebar-button"></div>
                <div class="sidebar-button">-2</div>
                <div class="sidebar-button">-3</div>
                <div class="sidebar-button">-V</div>
            </div>
        </div>

    </main>
</body>
</html>
