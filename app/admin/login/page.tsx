"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleLogin() {
    try {
      setLoading(true)

      // limpa sessão antiga
      await supabase.auth.signOut()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        console.error(error)
        alert("Login inválido")
        return
      }

      console.log("LOGIN:", data)

      // força pegar sessão atualizada
      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log("SESSION:", session)

      if (!session) {
        alert("Sessão não criada")
        return
      }

      // espera cookies sincronizarem
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.replace("/admin/noticias")
    } catch (err) {
      console.error(err)
      alert("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 flex flex-col gap-3">
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-black text-white p-2 disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  )
}