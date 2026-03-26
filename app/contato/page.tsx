"use client"

import { useState } from "react"

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    const res = await fetch("/api/contato", {
      method: "POST",
      body: JSON.stringify(form),
    })

    const data = await res.json()

    setLoading(false)
    setStatus(data.message)

    if (res.ok) {
      setForm({ nome: "", email: "", mensagem: "" })
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fale Conosco
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4"
      >
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="mensagem"
          placeholder="Sua mensagem"
          value={form.mensagem}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 transition"
        >
          {loading ? "Enviando..." : "Enviar mensagem"}
        </button>

        {status && (
          <p className="text-center text-sm mt-2">{status}</p>
        )}
      </form>
    </div>
  )
}