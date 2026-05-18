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

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

    if (error || !data.user) {
      alert("Login inválido")
      return
    }

    // 🔴 IMPORTANTE: força persistência de sessão
    await supabase.auth.setSession({
      access_token: data.session?.access_token!,
      refresh_token: data.session?.refresh_token!,
    })

    router.replace("/admin/noticias")
  } catch (err) {
    console.error(err)
    alert("Erro ao fazer login")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center p-4">
      
      {/* BG EFFECT */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-black/5 rounded-full blur-3xl" />
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-8 md:p-10">
        
        {/* ICON */}
        <div className="w-16 h-16 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg mb-8">
          <ShieldCheck size={30} />
        </div>

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Admin
          </h1>

          <p className="text-zinc-500 mt-3 text-sm leading-relaxed">
            Acesse o painel administrativo da Central Várzea
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          
          <div>
            <label className="text-sm font-medium text-zinc-700 block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                bg-zinc-50
                border border-zinc-200
                focus:border-black
                focus:ring-4
                focus:ring-black/5
                outline-none
                rounded-2xl
                px-5
                py-4
                text-sm
                transition-all
              "
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 block mb-2">
              Senha
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-zinc-50
                border border-zinc-200
                focus:border-black
                focus:ring-4
                focus:ring-black/5
                outline-none
                rounded-2xl
                px-5
                py-4
                text-sm
                transition-all
              "
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              bg-black
              hover:opacity-95
              disabled:opacity-50
              disabled:cursor-not-allowed
              text-white
              py-4
              rounded-2xl
              text-sm
              font-semibold
              transition-all
              shadow-lg
              shadow-black/10
              mt-2
            "
          >
            {loading ? "Entrando..." : "Entrar no painel"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
          <p className="text-xs text-zinc-400">
            Central Várzea © 2026
          </p>
        </div>
      </div>
    </div>
  )
}