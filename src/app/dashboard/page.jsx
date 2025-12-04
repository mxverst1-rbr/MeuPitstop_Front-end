"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#101021] border border-gray-800 rounded-xl p-4 shadow-md hover:border-purple-500/60 transition">
      <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Motorista");

  useEffect(() => {
    // Se no futuro vocês salvarem o nome do usuário no localStorage, ele aparece aqui
    const storedName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#050515] text-white">
      {/* SIDEBAR */}
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
          <button
            onClick={() => router.push("/dashboard")}
            className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-lg hover:bg-purple-500 transition"
            title="Dashboard"
          >
            ⛽
          </button>

          <button
            onClick={() => router.push("/manutencoes")}
            className="w-10 h-10 rounded-xl bg-[#101021] flex items-center justify-center text-lg hover:bg-purple-500 transition"
            title="Manutenções"
          >
            🛠️
          </button>

          <button
            onClick={() => router.push("/oficinas")}
            className="w-10 h-10 rounded-xl bg-[#101021] flex items-center justify-center text-lg hover:bg-purple-500 transition"
            title="Oficinas"
          >
            🏁
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-[#050518]/80 backdrop-blur">
          <div>
            <p className="text-xs text-gray-400">Painel geral</p>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">Conta Meu Pitstop</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold shadow-md"
            >
              Sair
            </button>
          </div>
        </header>

        {/* Conteúdo scrollável */}
        <div className="flex-1 px-8 py-6 space-y-6">

          {/* BANNER PRINCIPAL */}
          <section className="w-full bg-[#0d0d1a] rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
            <div className="relative w-full h-40 md:h-44 flex items-center">
              {/* Imagem de fundo do banner */}
              <img
                src="/images/bannerCarro.jpg" 
                alt="Banner Meu Pitstop"
                className="absolute inset-0 w-full h-full object-cover opacity-45"
              />

              {/* Gradiente por cima pra ajudar na leitura */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050515] via-transparent to-[#050515]/60" />

              {/* Textos */}
              <div className="relative z-10 ml-6 md:ml-10">
                <p className="text-xs md:text-sm text-purple-300 font-semibold mb-1">
                  Bem-vindo ao seu painel, {userName}!
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-lg">
                  Seu carro, sua oficina, seu tempo.
                </h2>
                <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-xl drop-shadow">
                  Acompanhe manutenções, organize suas oficinas favoritas e nunca mais perca o timing do próximo pit stop.
                </p>
              </div>
            </div>
          </section>

          {/* CARDS DE STATUS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Manutenções Pendentes"
              value="3"
              subtitle="Troca de óleo, alinhamento e revisão geral"
            />
            <StatCard
              title="Oficinas Registradas"
              value="1"
              subtitle="Sua oficina de confiança está a um clique"
            />
            <StatCard
              title="Veículos Ativos"
              value="1"
              subtitle="Gerencie todos os seus carros em um só lugar"
            />
          </section>

          {/* AÇÕES RÁPIDAS + RESUMO DE MANUTENÇÕES */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ações rápidas */}
            <div className="bg-[#101021] border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="text-lg font-semibold mb-1">Ações rápidas</h3>
              <p className="text-xs text-gray-400 mb-3">
                Use os atalhos abaixo pra navegar mais rápido pelo sistema.
              </p>

              <button
                onClick={() => router.push("/manutencoes/nova")}
                className="w-full py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-sm font-semibold transition"
              >
                ➕ Agendar nova manutenção
              </button>

              <button
                onClick={() => router.push("/manutencoes")}
                className="w-full py-2 rounded-full bg-[#181830] hover:bg-[#22224a] text-sm font-semibold transition"
              >
                📋 Ver todas as manutenções
              </button>

              <button
                onClick={() => router.push("/oficinas")}
                className="w-full py-2 rounded-full bg-[#181830] hover:bg-[#22224a] text-sm font-semibold transition"
              >
                🏁 Gerenciar oficinas
              </button>
            </div>

            {/* Listas de manutenções */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Próximas manutenções */}
              <div className="bg-[#101021] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-lg font-semibold mb-3">Próximas manutenções</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Troca de óleo</p>
                      <p className="text-xs text-gray-400">Oficina TurboCar • 10/12/2025</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                      Agendada
                    </span>
                  </li>

                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Alinhamento e balanceamento</p>
                      <p className="text-xs text-gray-400">Oficina PneuCenter • 15/12/2025</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      Planejada
                    </span>
                  </li>
                </ul>
              </div>

              {/* Histórico recente */}
              <div className="bg-[#101021] border border-gray-800 rounded-2xl p-5">
                <h3 className="text-lg font-semibold mb-3">Histórico recente</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Revisão de 10.000 km</p>
                      <p className="text-xs text-gray-400">Oficina MeuPitstop • 20/11/2025</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                      Concluída
                    </span>
                  </li>

                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Troca de pastilha de freio</p>
                      <p className="text-xs text-gray-400">Oficina RodaLivre • 05/11/2025</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/40">
                      Concluída
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}