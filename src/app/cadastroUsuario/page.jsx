"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CadastroUsuario() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmarSenha: "", address: "", phone_number: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmarSenha) {
      setError("As senhas não conferem!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { confirmarSenha, ...registerData } = form;
      await register(registerData);
      alert("Usuário cadastrado com sucesso! Faça login para continuar.");
      router.push("/login");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erro ao cadastrar";
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
          <img src="/images/logompt.png" alt="Meu Pitstop" className="w-58 h-58 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Cadastro</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Telefone (Opcional)</label>
            <input
              type="tel"
              name="phone_number"
              placeholder="(11) 99999-9999"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Endereço (Opcional)</label>
            <input
              type="text"
              name="address"
              placeholder="Seu endereço"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-full transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar!"}
          </button>
        </form>
      </div>
    </div>
  );
}