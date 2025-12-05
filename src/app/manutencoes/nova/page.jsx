"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { maintenanceScheduleService } from "@/services/maintenanceScheduleService";
import { mechanicShopsService } from "@/services/mechanicShopsService";

export default function NovaManutencao() {
  const router = useRouter();
  const [form, setForm] = useState({
    mechanic_shop_id: "",
    vehicle_model: "",
    vehicle_plate: "",
    service_type: "",
    scheduled_date: "",
    notes: ""
  });
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingShops, setLoadingShops] = useState(true);

  useEffect(() => {
    loadMechanicShops();
  }, []);

  async function loadMechanicShops() {
    try {
      const response = await mechanicShopsService.getAll(1, 100);
      setShops(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar oficinas:", err);
      setError("Não foi possível carregar as oficinas. Verifique se você está autenticado.");
    } finally {
      setLoadingShops(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const validateForm = () => {
    // Validação de placa (padrão Mercosul ou antigo)
    const plateRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i;
    if (!plateRegex.test(form.vehicle_plate.replace(/\s/g, ""))) {
      setError("Placa inválida. Use o formato ABC-1234 ou ABC1D23");
      return false;
    }

    // Validação de data
    const selectedDate = new Date(form.scheduled_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("A data do agendamento não pode ser anterior a hoje");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await maintenanceScheduleService.create({
        mechanic_shop_id: Number(form.mechanic_shop_id),
        vehicle_model: form.vehicle_model,
        vehicle_plate: form.vehicle_plate.toUpperCase(),
        service_type: form.service_type,
        scheduled_date: form.scheduled_date,
        notes: form.notes || undefined
      });
      
      alert("Manutenção agendada com sucesso!");
      router.push("/manutencoes");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erro ao agendar manutenção";
      const errors = err.response?.data?.errors;
      
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(", ");
        setError(`${message}: ${errorMessages}`);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const servicosSugeridos = [
    "Troca de óleo",
    "Troca de óleo e filtro",
    "Revisão geral",
    "Alinhamento e balanceamento",
    "Troca de pastilhas de freio",
    "Revisão de freios",
    "Suspensão",
    "Troca de pneus",
    "Revisão do motor",
    "Problemas elétricos",
    "Ar condicionado",
    "Troca de bateria",
    "Limpeza de bicos injetores",
    "Outros"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] p-4">
      <div className="w-full max-w-2xl p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/images/logompt.png" alt="Meu Pitstop" className="w-48 h-48 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Agendar Manutenção</h1>
        <p className="text-gray-400 text-sm mb-6">
          Preencha os dados abaixo para agendar um novo serviço
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm text-left">
            <strong>❌ Erro:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          
          {/* Modelo do Veículo */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Modelo do Veículo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="vehicle_model"
              placeholder="Ex: Honda Civic 2020, Fiat Uno 2018"
              value={form.vehicle_model}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Placa do Veículo */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Placa do Veículo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="vehicle_plate"
              placeholder="ABC-1234 ou ABC1D23"
              value={form.vehicle_plate}
              onChange={handleChange}
              maxLength={8}
              required
              className="w-full px-5 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 uppercase focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1 ml-4">
              Formato: ABC-1234 (antigo) ou ABC1D23 (Mercosul)
            </p>
          </div>

          {/* Tipo de Serviço */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Tipo de Serviço <span className="text-red-500">*</span>
            </label>
            <select
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
            >
              <option value="">Selecione o tipo de serviço</option>
              {servicosSugeridos.map((servico) => (
                <option key={servico} value={servico}>
                  {servico}
                </option>
              ))}
            </select>
          </div>

          {/* Oficina */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Oficina Mecânica <span className="text-red-500">*</span>
            </label>
            <select
              name="mechanic_shop_id"
              value={form.mechanic_shop_id}
              onChange={handleChange}
              required
              disabled={loadingShops || shops.length === 0}
              className="w-full px-5 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {loadingShops 
                  ? "Carregando oficinas..." 
                  : shops.length === 0 
                  ? "Nenhuma oficina cadastrada" 
                  : "Selecione a oficina"}
              </option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name} - {shop.city}/{shop.state}
                  {shop.rating && ` ⭐ ${shop.rating}`}
                </option>
              ))}
            </select>
            {!loadingShops && shops.length === 0 && (
              <p className="text-xs text-yellow-500 mt-2 ml-4">
                ⚠️ Cadastre uma oficina antes de agendar manutenções.{" "}
                <button
                  type="button"
                  onClick={() => router.push("/cadastroOficina")}
                  className="underline hover:text-yellow-400"
                >
                  Cadastrar agora
                </button>
              </p>
            )}
          </div>

          {/* Data do Agendamento */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Data do Agendamento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="scheduled_date"
              value={form.scheduled_date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-5 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
            />
          </div>

          {/* Observações */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Observações (Opcional)
            </label>
            <textarea
              name="notes"
              placeholder="Descreva detalhes sobre o serviço, problemas específicos ou pedidos especiais..."
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/manutencoes")}
              disabled={loading}
              className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || loadingShops || shops.length === 0}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition shadow-lg shadow-purple-500/30"
            >
              {loading ? "Agendando..." : "✓ Agendar Manutenção"}
            </button>
          </div>
        </form>

        {/* Link voltar */}
        <div className="mt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-400 hover:text-purple-400 transition"
          >
            ← Voltar para o Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
