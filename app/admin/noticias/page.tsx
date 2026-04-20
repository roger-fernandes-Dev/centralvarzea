"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"

export default function AdminNoticias() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [resumo, setResumo] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")

  async function salvarNoticia() {
  if (!title || !resumo || !image || !content) {
    alert("Preencha todos os campos antes de salvar")
    return
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

  const { error } = await supabase.from("News").insert([
    {
      title: title.trim(),
      resumo: resumo.trim(),
      image: image.trim(),
      content: content.trim(),
      slug,
      data: new Date(),
    },
  ])

  if (error) {
    console.log(error)
    alert("Erro ao salvar notícia")
    return
  }

  alert("Notícia salva com sucesso!")

  setTitle("")
  setResumo("")
  setImage("")
  setContent("")
}
  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">

      <h1 className="text-2xl font-bold">Painel Admin</h1>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2"
      />

      <input
        placeholder="Resumo"
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
        className="w-full border p-2"
      />

      <input
        placeholder="Imagem (caminho)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2"
      />

      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 h-40"
      />

      <div className="flex gap-3">
        <button
          onClick={salvarNoticia}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

    </div>
  )
}