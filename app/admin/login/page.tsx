"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleLogin() {
    try {
      setLoading(true)

      const emailSafe = email.trim().toLowerCase()

      if (!emailSafe || !password) {
        alert("Preencha os campos")
        return
      }

      // 🔥 NÃO forçar signOut aqui (isso quebra refresh token em produção)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailSafe,
        password,
      })

      if (error || !data.user) {
        console.log("LOGIN ERROR:", error)
        alert("Login inválido")
        return
      }

      // garante sessão persistida
      await supabase.auth.getSession()

      router.replace("/admin/dashboard")
    } catch (err) {
      console.error(err)
      alert("Erro inesperado no login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-4">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-black/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 md:p-10">
        
        <div className="w-16 h-16 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg mb-8">
          <ShieldCheck size={30} />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Admin
          </h1>

          <p className="text-zinc-500 mt-3 text-sm">
            Acesse o painel administrativo da Central Várzea
          </p>
        </div>

        <div className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none rounded-2xl px-5 py-4 text-sm"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none rounded-2xl px-5 py-4 text-sm"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar no painel"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
          <p className="text-xs text-zinc-400">
            Central Várzea © 2026
          </p>
        </div>
      </div>
    </div>
  )
}