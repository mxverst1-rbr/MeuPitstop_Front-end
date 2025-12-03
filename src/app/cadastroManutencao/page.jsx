"use client";

import { useState, useEffect } from "react";
import { maintenanceScheduleService } from "@/services/maintenanceScheduleService";
import { mechanicShopsService } from "@/services/mechanicShopsService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CadastroManutencao() {
  const [form, setForm] = useState({
    mechanic_shop_id: "",
    vehicle_model: "",
    vehicle_plate: "",
    service_type: "",
    scheduled_date: new Date(),
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
      setError("Não foi possível carregar as oficinas");
    } finally {
      setLoadingShops(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleDateChange = (date) => {
    setForm({ ...form, scheduled_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formattedDate = form.scheduled_date.toISOString().split('T')[0];
      
      await maintenanceScheduleService.create({
        mechanic_shop_id: Number(form.mechanic_shop_id),
        vehicle_model: form.vehicle_model,
        vehicle_plate: form.vehicle_plate,
        service_type: form.service_type,
        scheduled_date: formattedDate,
        notes: form.notes || undefined
      });
      
      alert("Manutenção cadastrada com sucesso!");
      
      // Reset form
      setForm({
        mechanic_shop_id: "",
        vehicle_model: "",
        vehicle_plate: "",
        service_type: "",
        scheduled_date: new Date(),
        notes: ""
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erro ao cadastrar manutenção";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
      <div className="w-full max-w-md p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-1">
          <img
            src="/images/logompt.png"
            alt="Meu Pitstop"
            className="w-58 h-58 mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Novo Agendamento</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div>
            <label className="block text-gray-300 mb-1">Modelo do Veículo *</label>
            <input
              type="text"
              name="vehicle_model"
              placeholder="Ex: Honda Civic 2020"
              value={form.vehicle_model}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Placa do Veículo *</label>
            <input
              type="text"
              name="vehicle_plate"
              placeholder="ABC-1234"
              value={form.vehicle_plate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Tipo de Serviço *</label>
            <select
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecione o serviço</option>
              <option value="Troca de óleo">Troca de óleo</option>
              <option value="Revisão geral">Revisão geral</option>
              <option value="Problemas no motor">Problemas no motor</option>
              <option value="Problemas elétricos">Problemas elétricos</option>
              <option value="Freios">Freios</option>
              <option value="Suspensão">Suspensão</option>
              <option value="Alinhamento e balanceamento">Alinhamento e balanceamento</option>
              <option value="Ar condicionado">Ar condicionado</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Oficina *</label>
            <select
              name="mechanic_shop_id"
              value={form.mechanic_shop_id}
              onChange={handleChange}
              required
              disabled={loadingShops}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            >
              <option value="">
                {loadingShops ? "Carregando oficinas..." : "Selecione a oficina"}
              </option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name} - {shop.city}/{shop.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Data do Agendamento *</label>
            <DatePicker
              selected={form.scheduled_date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Observações (Opcional)</label>
            <textarea
              name="notes"
              placeholder="Descreva detalhes sobre o serviço ou problemas específicos..."
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || loadingShops}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-full transition"
          >
            {loading ? "Agendando..." : "Agendar!"}
          </button>
        </form>
      </div>
    </div>
  );
}
