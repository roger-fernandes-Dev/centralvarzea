"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Camera, Save } from "lucide-react"
import { supabase } from "@/src/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function EditarTimePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [nomeTime, setNomeTime] = useState("")
  const [cidade, setCidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [estado, setEstado] = useState("")
  const [precisaJogador, setPrecisaJogador] = useState(false)
  const [posicaoProcurada, setPosicaoProcurada] = useState("")
  const [precisaPatrocinio, setPrecisaPatrocinio] = useState(false)

  const [userId, setUserId] = useState<string | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      const { data: team } = await supabase
        .from("team_profiles")
        .select("*")
        .eq("userid", user.id)
        .maybeSingle()

      if (!team) return

      setNomeTime(team.nome_time || "")
      setCidade(team.cidade || "")
      setBairro(team.bairro || "")
      setEstado(team.estado || "")
      setPrecisaJogador(team.precisa_jogador || false)
      setPosicaoProcurada(team.posicao_procurada || "")
      setPrecisaPatrocinio(team.precisa_patrocinio || false)
      setLogoUrl(team.logo || null)
    }

    load()
  }, [])

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userId) return

    e.target.value = ""

    const filePath = `${userId}/${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("team-logos")
      .upload(filePath, file, { upsert: true })

    if (error) {
      alert("Erro ao enviar imagem")
      return
    }

    const { data } = supabase.storage
      .from("team-logos")
      .getPublicUrl(filePath)

    setLogoUrl(data.publicUrl)
  }

  async function handleSave() {
    if (!userId) return

    setLoading(true)

    const { error } = await supabase.from("team_profiles").upsert({
      userid: userId,
      nome_time: nomeTime,
      cidade,
      bairro,
      estado,
      precisa_jogador: precisaJogador,
      posicao_procurada: posicaoProcurada,
      precisa_patrocinio: precisaPatrocinio,
      logo: logoUrl,
    })

    setLoading(false)

    if (error) {
      alert("Erro ao salvar")
      return
    }

    router.push("/dashboard/time")
  }

  return (
    <main className="flex-1 p-3 md:p-6 bg-[#f6f7f9]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900">
              Editar time
            </h1>
            <p className="text-sm text-zinc-500">
              Atualize as informações do seu clube
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="hidden md:flex h-10 px-4 rounded-full bg-[#0f3b2e] text-white items-center gap-2 text-sm"
        >
          <Save size={16} />
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {/* CARD */}
      <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">

        {/* LOGO REDONDO */}
        <div className="relative mb-8 w-fit">

          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#edf3ef] overflow-hidden flex items-center justify-center">
            {logoUrl ? (
              <img src={logoUrl} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#0f3b2e] text-3xl font-bold">
                CV
              </span>
            )}
          </div>

          <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#0f3b2e] text-white flex items-center justify-center cursor-pointer shadow-md">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </label>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            value={nomeTime}
            onChange={e => setNomeTime(e.target.value)}
            placeholder="Nome do time"
            className="h-12 px-4 rounded-xl bg-[#f5f6f8] outline-none focus:bg-white"
          />

          <input
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            placeholder="Cidade"
            className="h-12 px-4 rounded-xl bg-[#f5f6f8] outline-none focus:bg-white"
          />

          <input
            value={bairro}
            onChange={e => setBairro(e.target.value)}
            placeholder="Bairro"
            className="h-12 px-4 rounded-xl bg-[#f5f6f8] outline-none focus:bg-white"
          />

          <input
            value={estado}
            onChange={e => setEstado(e.target.value)}
            placeholder="Estado"
            className="h-12 px-4 rounded-xl bg-[#f5f6f8] outline-none focus:bg-white"
          />

          <input
            value={posicaoProcurada}
            onChange={e => setPosicaoProcurada(e.target.value)}
            placeholder="Posição procurada"
            className="md:col-span-2 h-12 px-4 rounded-xl bg-[#f5f6f8] outline-none focus:bg-white"
          />

          <label className="md:col-span-2 flex items-center gap-3 text-sm text-zinc-600">
            <input
              type="checkbox"
              checked={precisaJogador}
              onChange={e => setPrecisaJogador(e.target.checked)}
            />
            Recrutando jogadores
          </label>

          <label className="md:col-span-2 flex items-center gap-3 text-sm text-zinc-600">
            <input
              type="checkbox"
              checked={precisaPatrocinio}
              onChange={e => setPrecisaPatrocinio(e.target.checked)}
            />
            Procurando patrocinadores
          </label>

        </div>

        {/* MOBILE SAVE */}
        <button
          onClick={handleSave}
          className="md:hidden mt-8 w-full h-12 rounded-xl bg-[#0f3b2e] text-white"
        >
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>

      </section>
    </main>
  )
}