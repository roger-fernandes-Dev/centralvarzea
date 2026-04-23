"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"

export default function AdminNoticias() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [resumo, setResumo] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function salvarNoticia() {
    if (!title || !resumo || !content || !imageFile) {
      alert("Preencha todos os campos")
      return
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")

    // =========================
    // UPLOAD DA IMAGEM
    // =========================
    const fileName = `${Date.now()}-${imageFile.name}`

    const { error: uploadError } = await supabase.storage
      .from("noticias")
      .upload(fileName, imageFile)

    if (uploadError) {
      console.log(uploadError)
      alert("Erro ao subir imagem")
      return
    }

    const { data } = supabase.storage
      .from("noticias")
      .getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    // =========================
    // SALVAR NO BANCO
    // =========================
    const { error } = await supabase.from("News").insert([
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        resumo: resumo.trim(),
        image: imageUrl,
        content: content.trim(),
        slug,
        categoria: "geral",
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
    setContent("")
    setImageFile(null)
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
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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