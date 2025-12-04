"use client";
import { useRouter } from "next/navigation";

export default function Manutencoes() {
  const router = useRouter();

  // MOCK — depois substituímos pelo GET da API
  const manutencoesAgendadas = [
    { id: 1, tipo: "Troca de óleo", data: "20/01/2025", oficina: "Oficina Turbo" },
    { id: 2, tipo: "Revisão geral", data: "05/02/2025", oficina: "Mecânica Silva" },
  ];

  const manutencoesRealizadas = [
    { id: 1, tipo: "Troca de pastilhas de freio", data: "10/12/2024", oficina: "Oficina Turbo" },
    { id: 2, tipo: "Balanceamento", data: "22/11/2024", oficina: "Auto Center BR" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-8">

      {/* TÍTULO + BOTÃO */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Suas Manutenções</h1>

        <button
          onClick={() => router.push("/agendarManutencao")}
          className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition text-lg"
        >
          + Agendar nova manutenção
        </button>
      </div>

      {/* AGENDADAS */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Agendadas</h2>

        <div className="space-y-4">
          {manutencoesAgendadas.map((m) => (
            <div key={m.id} className="p-4 bg-gray-900 rounded-xl border border-purple-600/40 shadow">
              <p className="font-semibold text-purple-300">{m.tipo}</p>
              <p>Data: {m.data}</p>
              <p>Oficina: {m.oficina}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REALIZADAS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Realizadas</h2>

        <div className="space-y-4">
          {manutencoesRealizadas.map((m) => (
            <div key={m.id} className="p-4 bg-gray-900 rounded-xl border border-green-600/40 shadow">
              <p className="font-semibold text-green-300">{m.tipo}</p>
              <p>Data: {m.data}</p>
              <p>Oficina: {m.oficina}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}