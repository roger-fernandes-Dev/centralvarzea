"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/src/lib/supabase"

type News = {
  id: string
  title: string
  resumo: string
  image: string
  data?: string
  views?: number
}

export default function AdminNoticias() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [resumo, setResumo] = useState("")
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<News[]>([])

  // =========================
  // BUSCAR NOTÍCIAS
  // =========================
  async function fetchNews() {
    const { data, error } = await supabase
      .from("News")
      .select("*")
      .order("data", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setNews(data || [])
  }

  // =========================
  // REALTIME
  // =========================
  useEffect(() => {
    fetchNews()

    const channel = supabase
      .channel("news-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "News",
        },
        () => {
          fetchNews()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // =========================
  // SALVAR
  // =========================
  async function salvarNoticia() {
    if (!title || !resumo || !content || !imageFile) {
      alert("Preencha todos os campos")
      return
    }

    setLoading(true)

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
      // API
      // =========================
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

      fetchNews()
    } catch (err) {
      console.error(err)
      alert("Erro inesperado")
    }

    setLoading(false)
  }

  // =========================
  // LOGOUT
  // =========================
  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Notícias
          </h1>

          <p className="text-zinc-500 mt-1">
            Gerencie as notícias do portal
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Nova notícia
        </h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          placeholder="Resumo"
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
          className="w-full border rounded-lg p-3"
        />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-3 h-40"
        />

        <button
          onClick={salvarNoticia}
          disabled={loading}
          className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Publicar notícia"}
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Notícias publicadas
          </h2>

          <span className="text-zinc-500">
            {news.length} notícias
          </span>
        </div>

        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-3 flex items-center gap-4"
            >
              {/* IMAGEM */}
              <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-500 truncate">
                  {item.resumo}
                </p>

                <div className="flex gap-4 mt-2 text-xs text-zinc-400">
                  <span>
                    👁 {item.views || 0}
                  </span>

                  <span>
                    📅{" "}
                    {item.data
                      ? new Date(item.data).toLocaleDateString("pt-BR")
                      : "Sem data"}
                  </span>
                </div>
              </div>

              {/* AÇÕES */}
              <div className="flex gap-2">
                <button className="bg-zinc-200 px-3 py-2 rounded-lg text-sm">
                  Editar
                </button>

                <button className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm">
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {news.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-zinc-500">
              Nenhuma notícia publicada ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}