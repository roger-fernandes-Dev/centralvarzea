"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert("Login inválido")
    return
  }

  // login deu certo
  console.log(data)
  router.push("/admin/noticias")
}

  return (
    <div className="max-w-sm mx-auto mt-20 flex flex-col gap-3">
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />

      <button onClick={handleLogin} className="bg-black text-white p-2">
        Entrar
      </button>
    </div>
  )
}