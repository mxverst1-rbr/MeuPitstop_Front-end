"use client";
import { useState, useEffect } from "react";
import { mechanicShopsService } from "@/services/mechanicShopsService";
import { useAuth } from "@/context/AuthContext";

export default function CadastroOficina() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    user_id: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    registration_number: "",
    opening_hours: "",
    rating: 0
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm(prev => ({ ...prev, user_id: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await mechanicShopsService.create({
        ...form,
        user_id: Number(form.user_id),
        rating: form.rating ? Number(form.rating) : undefined
      });
      alert("Oficina cadastrada com sucesso!");
      setForm({
        name: "",
        user_id: user?.id || "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        registration_number: "",
        opening_hours: "",
        rating: 0
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erro ao cadastrar oficina";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
      <div className="w-full max-w-md p-8 text-center">

        <div className="flex justify-center mb-1">
          <img
            src="/images/logompt.png"
            alt="Meu Pitstop"
            className="w-58 h-58 mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Cadastro de Oficina</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-300 mb-1">Nome da Oficina *</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Auto Peças Cavalinho"
              value={form.name}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="contato@oficina.com"
              value={form.email}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Telefone *</label>
            <input
              type="text"
              name="phone"
              placeholder="(61) 4002-8922"
              value={form.phone}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Endereço *</label>
            <input
              type="text"
              name="address"
              placeholder="Rua, Número, Bairro"
              value={form.address}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Cidade *</label>
              <input
                type="text"
                name="city"
                placeholder="Brasília"
                value={form.city}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-2 
                  rounded-full 
                  bg-gray-800 text-white 
                  placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                "
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Estado *</label>
              <input
                type="text"
                name="state"
                placeholder="DF"
                maxLength={2}
                value={form.state}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-2 
                  rounded-full 
                  bg-gray-800 text-white 
                  placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                "
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">CEP *</label>
            <input
              type="text"
              name="zip_code"
              placeholder="70000-000"
              value={form.zip_code}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Número de Registro *</label>
            <input
              type="text"
              name="registration_number"
              placeholder="CNPJ ou Registro"
              value={form.registration_number}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Horário de Funcionamento *</label>
            <input
              type="text"
              name="opening_hours"
              placeholder="Seg-Sex: 8h-18h, Sáb: 8h-12h"
              value={form.opening_hours}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Avaliação (0-5, opcional)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
              value={form.rating}
              onChange={handleChange}
              className="
                w-full px-4 py-2 
                rounded-full 
                bg-gray-800 text-white 
                placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full 
              bg-purple-600 hover:bg-purple-700 
              disabled:bg-gray-600 disabled:cursor-not-allowed
              text-white font-semibold 
              py-2 rounded-full 
              transition
            "
          >
            {loading ? "Cadastrando..." : "Cadastrar Oficina"}
          </button>
        </form>
      </div>
    </div>
  );
}
