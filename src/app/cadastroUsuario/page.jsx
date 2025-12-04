"use client";
import { useState } from "react";
import axios from "axios";

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: ""
  });

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        address: form.address,
        phone_number: form.phone_number
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
      <div className="w-full max-w-md p-8 text-center">

        <div className="flex justify-center mb-1">
          <img src="/images/logompt.png" alt="Meu Pitstop" className="w-40 h-40 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">Cadastro</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div>
            <label className="block text-gray-300 mb-1">Nome</label>
            <input 
              type="text"
              name="name"
              placeholder="Seu nome"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input 
              type="email"
              name="email"
              placeholder="email@email.com"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Senha</label>
            <input 
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirmar senha</label>
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Endereço (opcional)</label>
            <input 
              type="text"
              name="address"
              placeholder="Rua XPTO, 123"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Telefone (opcional)</label>
            <input 
              type="text"
              name="phone_number"
              placeholder="(00) 00000-0000"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}