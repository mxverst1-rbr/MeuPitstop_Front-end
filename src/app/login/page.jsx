"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(form);
      router.push("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Erro ao fazer login";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
      <div className="w-full max-w-md p-8 text-center">
        
        <div className="flex justify-center mb-6">
          <img src="/images/logompt.png" alt="Meu Pitstop" className="w-58 h-58 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-gray-300 mb-1">Email</label>
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
            <label className="block text-left text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-right text-sm text-purple-400">
            <button
              type="button"
              onClick={() => alert("Função em desenvolvimento")}
              className="hover:underline"
            >
              Esqueceu a senha? Redefinir
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-full transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Divisor */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-2 text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Botão Cadastro */}
        <button
          onClick={() => router.push("/cadastroUsuario")}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-full transition"
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
