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
  // VALIDAÇÕES
  // =========================
  function validarEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function limparTelefone(valor: string) {
    return valor.replace(/\D/g, "")
  }

  // =========================
  // LOGIN
  // =========================
  async function handleLogin() {
    const emailSeguro = email.trim().toLowerCase()

    if (!emailSeguro || !password) {
      alert("Preencha os campos")
      return
    }

    if (!validarEmail(emailSeguro)) {
      alert("Email inválido")
      return
    }

    if (password.length < 6) {
      alert("Senha inválida")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailSeguro,
      password,
    })

    if (error || !data.user) {
      setLoading(false)
      alert("Credenciais inválidas")
      return
    }

    // 🔴 IMPORTANTE: sincroniza cookies com o server
    await supabase.auth.getSession()

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
    const nomeSeguro = nome.trim()
    const emailSeguro = email.trim().toLowerCase()
    const telefoneSeguro = limparTelefone(telefone)

    if (!nomeSeguro || !telefoneSeguro || !emailSeguro || !password) {
      alert("Preencha todos os campos")
      return
    }

    if (nomeSeguro.length < 3 || nomeSeguro.length > 60) {
      alert("Nome inválido")
      return
    }

    if (!validarEmail(emailSeguro)) {
      alert("Email inválido")
      return
    }

    if (telefoneSeguro.length < 10 || telefoneSeguro.length > 11) {
      alert("Telefone inválido")
      return
    }

    if (password.length < 6 || password.length > 100) {
      alert("Senha inválida")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        nome: nomeSeguro,
        telefone: telefoneSeguro,
        email: emailSeguro,
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
    <div className="relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-10 w-full max-w-xl mx-auto">
      
      {/* glow */}
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-yellow-400/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="relative mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black text-xl shadow-lg shadow-yellow-400/20">
            {isJogador ? "👤" : "🛡️"}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {isJogador ? "Área do Jogador" : "Área do Time"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {isJogador
                ? "Entre para acessar seu perfil"
                : "Gerencie seu time com facilidade"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100/80 p-1 rounded-2xl">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              tab === "login"
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("cadastro")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              tab === "cadastro"
                ? "bg-white shadow-md text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cadastro
          </button>
        </div>
      </div>

      {/* LOGIN */}
      {tab === "login" && (
        <div className="space-y-4 relative">
          <input
            type="email"
            autoComplete="email"
            maxLength={100}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <input
            type="password"
            autoComplete="current-password"
            maxLength={100}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 rounded-2xl text-sm font-semibold transition-all shadow-lg shadow-yellow-400/20"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      )}

      {/* CADASTRO */}
      {tab === "cadastro" && (
        <div className="space-y-4 relative">
          <input
            type="text"
            maxLength={60}
            placeholder={isJogador ? "Nome completo" : "Nome do time"}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={15}
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <input
            type="email"
            autoComplete="email"
            maxLength={100}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <input
            type="password"
            autoComplete="new-password"
            maxLength={100}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none rounded-2xl px-5 py-4 text-sm transition-all"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 rounded-2xl text-sm font-semibold transition-all shadow-lg shadow-yellow-400/20"
          >
            {loading
              ? "Criando..."
              : `Criar conta como ${isJogador ? "jogador" : "time"}`}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex justify-between items-center px-6 py-4">
        <span className="font-bold tracking-tight text-gray-900">
          Central Várzea
        </span>

        <span className="hidden md:block text-sm text-gray-500">
          Futebol de várzea em destaque
        </span>
      </div>

      <div className="text-center mt-14 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Faça parte da Central Várzea
        </h1>

        <p className="text-gray-500 text-sm md:text-base mt-3">
          Escolha como deseja acessar a plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mt-8 max-w-6xl mx-auto">
        <Card tipo="jogador" />
        <Card tipo="time" />
      </div>
    </div>
  )
}