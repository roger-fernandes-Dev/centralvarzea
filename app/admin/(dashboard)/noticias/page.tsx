"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Eye,
  Calendar,
  LogOut,
  Newspaper,
} from "lucide-react"

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
      alert("Imagem muito grande")
      setLoading(false)
      return
    }

    try {
      const safeName = imageFile.name.replace(/\s+/g, "-")

      const fileName = `${Date.now()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from("noticias")
        .upload(fileName, imageFile)

      if (uploadError) {
        alert("Erro ao subir imagem")
        setLoading(false)
        return
      }

      const { data } = supabase.storage
        .from("noticias")
        .getPublicUrl(fileName)

      const imageUrl = data.publicUrl

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

  async function logout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
              <Newspaper size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Notícias
              </h1>

              <p className="text-zinc-500 mt-1">
                Gerencie as notícias do portal
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-2xl shadow-lg shadow-red-600/20"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-[0_10px_50px_rgba(0,0,0,0.06)] p-6 md:p-8 space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Nova notícia
          </h2>

          <p className="text-zinc-500 text-sm mt-1">
            Publique conteúdo para a plataforma
          </p>
        </div>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-100 border border-transparent focus:border-black focus:bg-white transition rounded-2xl px-5 py-4 outline-none"
        />

        <input
          placeholder="Resumo"
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          className="w-full bg-zinc-100 border border-transparent focus:border-black focus:bg-white transition rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files?.[0] || null)
          }
          className="w-full bg-zinc-100 rounded-2xl px-5 py-4"
        />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-zinc-100 border border-transparent focus:border-black focus:bg-white transition rounded-2xl px-5 py-4 outline-none h-44 resize-none"
        />

        <button
          onClick={salvarNoticia}
          disabled={loading}
          className="bg-black hover:opacity-90 transition text-white px-6 py-4 rounded-2xl font-medium shadow-xl shadow-black/10 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Publicar notícia"}
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Notícias publicadas
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              {news.length} notícias cadastradas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-4 md:p-5 flex flex-col md:flex-row gap-5"
            >
              {/* IMAGE */}
              <div className="relative w-full md:w-48 h-48 md:h-28 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {item.title}
                </h3>

                <p className="text-zinc-500 mt-2 line-clamp-2">
                  {item.resumo}
                </p>

                <div className="flex flex-wrap gap-5 mt-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Eye size={15} />
                    {item.views || 0}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={15} />
                    {item.data
                      ? new Date(item.data).toLocaleDateString("pt-BR")
                      : "Sem data"}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex md:flex-col gap-2">
                <button className="bg-zinc-100 hover:bg-zinc-200 transition px-4 py-3 rounded-2xl text-sm font-medium">
                  Editar
                </button>

                <button className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-3 rounded-2xl text-sm font-medium">
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {news.length === 0 && (
            <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-14 text-center">
              <p className="text-zinc-500">
                Nenhuma notícia publicada ainda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}