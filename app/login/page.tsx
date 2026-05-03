"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase/client"

function Card({ tipo }: { tipo: "jogador" | "time" }) {
  const isJogador = tipo === "jogador"
  const router = useRouter()

  const [tab, setTab] = useState<"login" | "cadastro">("login")

  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // =========================
  // LOGIN
  // =========================
  async function handleLogin() {
  if (!email || !password) {
    alert("Preencha os campos")
    return
  }

  setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    setLoading(false)
    alert(error?.message || "Erro no login")
    return
  }

  const profileRes = await fetch("/api/profile/me", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: data.user.id }),
  })

  const profile = await profileRes.json()

  setLoading(false)

  router.replace(
    profile.tipo === "jogador"
      ? "/dashboard/jogador"
      : "/dashboard/time"
  )
}

  // =========================
  // CADASTRO
  // =========================
  async function handleRegister() {
    if (!nome || !telefone || !email || !password) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        nome,
        telefone,
        email,
        password,
      }),
    })

    const data = await res.json()

    setLoading(false)

    if (!res.ok) {
      alert(data.error || "Erro no cadastro")
      return
    }

    alert("Conta criada com sucesso")
    setTab("login")
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-8 w-full max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-3 text-xl">
          {isJogador ? "👤" : "🛡️"}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          {isJogador ? "Acesso do Jogador" : "Acesso do Time"}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {isJogador
            ? "Entre e mostre seu futebol"
            : "Gerencie seu time com facilidade"}
        </p>
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 text-sm rounded-md transition ${
            tab === "login"
              ? "bg-white shadow-sm text-gray-900 font-medium"
              : "text-gray-500"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setTab("cadastro")}
          className={`flex-1 py-2 text-sm rounded-md transition ${
            tab === "cadastro"
              ? "bg-white shadow-sm text-gray-900 font-medium"
              : "text-gray-500"
          }`}
        >
          Cadastro
        </button>
      </div>

      {/* LOGIN */}
      {tab === "login" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email ou telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      )}

      {/* CADASTRO */}
      {tab === "cadastro" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder={isJogador ? "Nome completo" : "Nome do time"}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none rounded-lg px-4 py-2.5 text-sm"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Criando..." : `Criar conta como ${isJogador ? "jogador" : "time"}`}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-black text-white flex justify-between items-center px-6 py-4 shadow-sm">
        <span className="font-semibold tracking-wide">
          Central Várzea
        </span>

        <span className="hidden md:block text-sm text-gray-300">
          Futebol de várzea em destaque
        </span>
      </div>

      <div className="text-center mt-10 px-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Faça parte da Central Várzea
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Escolha como deseja acessar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mt-4 max-w-5xl mx-auto">
        <Card tipo="jogador" />
        <Card tipo="time" />
      </div>
    </div>
  )
}