"use client";

import { useRouter } from "next/navigation";

// Oficinas “fake” só pra UI e apresentação
const oficinasSugeridas = [
  {
    id: 1,
    nome: "Auto Peças Cavalinho",
    responsavel: "Charles Leclerc",
    telefone: "(61) 4002-8922",
    local: "Asa Sul",
    rating: 5,
    slogan: "Evitando 'incidents' desde 1950",
    servicos: [
      "Revisões completas",
      "Manutenções preventivas",
      "Venda de peças originais",
      "Estratégias nada erradas 😅",
    ],
    logoBg: "from-yellow-400 to-red-500",
  },
  {
    id: 2,
    nome: "Auto Peças Egler",
    responsavel: "Clara Egler",
    telefone: "(61) 4123-4567",
    local: "Asa Norte",
    rating: 5,
    slogan: "Tô aqui só pelo meme, já tenho muito dinheiro",
    servicos: [
      "Revisões",
      "Manutenções",
      "Lives todos os dias",
      "Gatinhos fofos no feed",
    ],
    logoBg: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    nome: "Vitão do Grave",
    responsavel: "Vitão Boombox",
    telefone: "(61) 4989-5171",
    local: "Ceilândia",
    rating: 5,
    slogan: "Se for pra escutar som baixo, usa fone",
    servicos: [
      "Instalação e manutenção de som automotivo",
      "Venda de equipamentos",
      "Top 10 do forró boys 🔊",
      "Rei delas e do som",
    ],
    logoBg: "from-blue-500 to-indigo-500",
  },
];

export default function OficinasPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex bg-[#050511] text-white">
      {/* SIDEBAR – igual a do dashboard */}
      <aside className="w-20 bg-[#050511] border-r border-gray-800 flex flex-col items-center py-6 gap-6">
        {/* Logo reduzida */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <span className="text-xl font-extrabold">M</span>
        </button>

        {/* Ícones de navegação */}
        <nav className="flex flex-col gap-4 mt-4">
          {/* DASHBOARD */}
          <div className="relative group">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 rounded-xl bg-[#101021] flex items-center justify-center text-lg hover:bg-purple-500 transition"
            >
              ⛽
            </button>
            <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#181830] text-xs text-gray-100 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
              Dashboard
            </span>
          </div>

          {/* MANUTENÇÕES */}
          <div className="relative group">
            <button
              onClick={() => router.push("/manutencoes")}
              className="w-10 h-10 rounded-xl bg-[#101021] flex items-center justify-center text-lg hover:bg-purple-500 transition"
            >
              🛠️
            </button>
            <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#181830] text-xs text-gray-100 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
              Manutenções
            </span>
          </div>

          {/* OFICINAS (ativo) */}
          <div className="relative group">
            <button
              onClick={() => router.push("/oficinas")}
              className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-lg hover:bg-purple-500 transition"
            >
              🏁
            </button>
            <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#181830] text-xs text-gray-100 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
              Oficinas
            </span>
          </div>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-[#050511] to-[#050518]">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-semibold">Oficinas sugeridas</h1>
            <p className="text-gray-400 text-sm mt-1">
              Escolha a melhor opção para o seu próximo pit stop.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Voltar
          </button>
        </header>

        {/* Banner */}
        <div className="px-8 pt-6">
          <div className="w-full h-40 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 flex flex-col md:flex-row items-center justify-between px-8 shadow-lg overflow-hidden">
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200 mb-1">
                Meu Pitstop
              </p>
              <h2 className="text-xl md:text-2xl font-bold">
                Encontre a oficina certa
              </h2>
              <p className="text-sm text-purple-100 mt-1">
                Sugestões personalizadas para o seu veículo e o seu bolso.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-black/20 flex items-center justify-center">
                <span className="text-3xl">🚗</span>
              </div>
              <div className="text-sm text-purple-100">
                <p className="font-semibold">Dica rápida</p>
                <p className="text-xs text-purple-200">
                  Compare avaliações, serviços e localização antes de marcar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LISTA DE OFICINAS */}
        <div className="flex-1 px-8 pb-8 pt-6 overflow-y-auto">
          <div className="grid gap-5">
            {oficinasSugeridas.map((oficina) => (
              <div
                key={oficina.id}
                className="bg-[#090919] border border-purple-800/40 rounded-2xl p-5 shadow-md hover:border-purple-400/60 hover:shadow-purple-500/20 transition"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Coluna esquerda: logo + info básica */}
                  <div className="md:w-1/3 flex gap-4 items-center">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${oficina.logoBg} flex items-center justify-center text-2xl font-bold shadow-lg`}
                    >
                      {/* “Logo” simplão com iniciais */}
                      {oficina.nome
                        .split(" ")
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {oficina.nome}
                      </h3>
                      <p className="text-xs text-gray-300">
                        Responsável: {oficina.responsavel}
                      </p>
                      <p className="text-xs text-gray-400">
                        Telefone: {oficina.telefone}
                      </p>
                      <p className="text-xs text-gray-400">
                        Local: {oficina.local}
                      </p>
                      <div className="mt-1 text-yellow-400 text-sm">
                        {"★".repeat(oficina.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Coluna direita: slogan + serviços */}
                  <div className="md:flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold text-sm mb-2">
                        {oficina.slogan}
                      </p>
                      <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
                        {oficina.servicos.map((servico, index) => (
                          <li key={index}>{servico}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3 mt-4 flex-wrap">
                      <button className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-xs font-semibold">
                        Ver detalhes
                      </button>
                      <button
                        onClick={() => router.push("/manutencoes")}
                        className="px-4 py-2 rounded-full border border-purple-500 text-purple-200 hover:bg-purple-500/10 text-xs font-semibold"
                      >
                        Agendar manutenção
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}