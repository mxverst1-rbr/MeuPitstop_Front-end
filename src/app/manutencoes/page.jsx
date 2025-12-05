"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { maintenanceScheduleService } from "@/services/maintenanceScheduleService";
import { mechanicShopsService } from "@/services/mechanicShopsService";

export default function Manutencoes() {
  const router = useRouter();
  const [manutencoes, setManutencoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadManutencoes();
  }, []);

  async function loadManutencoes() {
    try {
      setLoading(true);
      setError("");
      
      const response = await maintenanceScheduleService.getAll(1, 100);
      const schedulesData = response.data || [];
    
      setManutencoes(schedulesData);
    } catch (err) {
      console.error("Erro ao carregar manutenções:", err);
      setError("Não foi possível carregar as manutenções. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  function getStatusColor(dateString) {
    const scheduledDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    scheduledDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.ceil((scheduledDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "border-gray-600/40";
    if (diffDays <= 3) return "border-yellow-500/60";
    return "border-purple-600/40";
  }

  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) {
      return;
    }

    try {
      await maintenanceScheduleService.delete(id);
      alert("Agendamento cancelado com sucesso!");
      loadManutencoes();
    } catch (err) {
      alert("Erro ao cancelar agendamento: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Suas Manutenções</h1>
          <p className="text-gray-400 text-sm mt-1">
            Gerencie seus agendamentos de manutenção
          </p>
        </div>

        <button
          onClick={() => router.push("/manutencoes/nova")}
          className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition text-lg font-semibold shadow-lg shadow-purple-500/30"
        >
          + Agendar nova manutenção
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando manutenções...</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <section className="mb-10">
          {manutencoes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔧</div>
              <h2 className="text-2xl font-bold mb-2">Nenhuma manutenção agendada</h2>
              <p className="text-gray-400 mb-6">
                Comece agendando sua primeira manutenção!
              </p>
              <button
                onClick={() => router.push("/manutencoes/nova")}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition font-semibold"
              >
                Agendar agora
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Agendadas ({manutencoes.length})
                </h2>
                <button
                  onClick={loadManutencoes}
                  className="text-sm text-purple-400 hover:text-purple-300 transition"
                >
                  🔄 Atualizar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manutencoes.map((m) => (
                  <div 
                    key={m.id} 
                    className={`p-5 bg-gray-900 rounded-xl border ${getStatusColor(m.scheduled_date)} shadow-lg hover:shadow-xl transition-all`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="font-bold text-lg text-purple-300 mb-1">
                          {m.service_type}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: #{m.id}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-red-400 hover:text-red-300 transition text-sm"
                        title="Cancelar agendamento"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">🚗</span>
                        <span className="font-medium">{m.vehicle_model}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">🔖</span>
                        <span className="font-mono font-semibold">{m.vehicle_plate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 p-2 bg-gray-800 rounded-lg">
                      <span className="text-gray-400">📅</span>
                      <span className="font-semibold">{formatDate(m.scheduled_date)}</span>
                    </div>
         
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <span className="text-gray-400">🏁</span>
                      <span>
                        {m.mechanic_shop_name}
                      </span>
                    </div>

                    {m.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <p className="text-xs text-gray-400 mb-1">Observações:</p>
                        <p className="text-sm text-gray-300">{m.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Botão Voltar */}
      <div className="mt-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-gray-400 hover:text-purple-400 transition"
        >
          ← Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
}