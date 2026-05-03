"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"

export default function AdminNoticias() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [resumo, setResumo] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔐 proteção da página (AGORA COM EMAIL)
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()

      if (!data.user || data.user.email !== "seuemail@email.com") {
        router.push("/admin/login")
      }
    }

    checkUser()
  }, [router])

  async function salvarNoticia() {
    if (!title || !resumo || !content || !imageFile) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)

    // 🔒 validação de imagem
    if (!imageFile.type.startsWith("image/")) {
      alert("Arquivo inválido")
      setLoading(false)
      return
    }

    if (imageFile.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande (máx 2MB)")
      setLoading(false)
      return
    }

    try {
      // =========================
      // UPLOAD
      // =========================
      const safeName = imageFile.name.replace(/\s+/g, "-")
      const fileName = `${Date.now()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from("noticias")
        .upload(fileName, imageFile)

      if (uploadError) {
        console.log(uploadError)
        alert("Erro ao subir imagem")
        setLoading(false)
        return
      }

      const { data } = supabase.storage
        .from("noticias")
        .getPublicUrl(fileName)

      const imageUrl = data.publicUrl

      // =========================
      // 🔥 API SEGURA
      // =========================
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔑 importante
        body: JSON.stringify({
          title: title.trim(),
          resumo: resumo.trim(),
          content: content.trim(),
          image: imageUrl,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.error || "Erro ao salvar")
        setLoading(false)
        return
      }

      alert("Notícia salva com sucesso!")

      setTitle("")
      setResumo("")
      setContent("")
      setImageFile(null)
    } catch (err) {
      console.error(err)
      alert("Erro inesperado")
    }

    setLoading(false)
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
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
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