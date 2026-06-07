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

  const [posicoesSelecionadas, setPosicoesSelecionadas] = useState<string[]>([])
  const [fundacao, setFundacao] = useState("")

  useEffect(() => {
    async function load() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  setUserId(user.id)

  const { data: team } = await supabase
    .from("team_profiles")
    .select("*")
    .eq("userid", user.id)
    .maybeSingle()

  if (!team) return

  setNomeTime(team.nometime || "")
  setCidade(team.cidade || "")
  setBairro(team.bairro || "")
  setEstado(team.estado || "")
  setFundacao(team.fundacao || "")
  setPrecisaJogador(team.precisajogador || false)
  

  const posicoesSalvas = team.posicaoprocurada
    ? team.posicaoprocurada.split(", ").filter(Boolean)
    : []

  setPosicaoProcurada(team.posicaoprocurada || "")
  setPosicoesSelecionadas(posicoesSalvas)

  setPrecisaPatrocinio(team.precisapatrocinio || false)
  setLogoUrl(team.logo || null)
}

load()
  }, [])

  async function handleLogoUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]

  if (!file || !userId) return

  e.target.value = ""

  // Limite 2MB
  if (file.size > 2 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 2MB")
    return
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ]

  if (!allowedTypes.includes(file.type)) {
    alert("Use JPG, PNG ou WEBP")
    return
  }

  const img = document.createElement("img")
  img.src = URL.createObjectURL(file)

  await new Promise((resolve) => {
    img.onload = resolve
  })

  const canvas = document.createElement("canvas")
  canvas.width = 600
  canvas.height = 600

  const ctx = canvas.getContext("2d")

  if (!ctx) {
    alert("Erro ao processar imagem")
    return
  }

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, 600, 600)

  const scale = Math.min(
    600 / img.width,
    600 / img.height
  )

  const width = img.width * scale
  const height = img.height * scale

  const x = (600 - width) / 2
  const y = (600 - height) / 2

  ctx.drawImage(img, x, y, width, height)

  const compressedBlob = await new Promise<Blob | null>(
    (resolve) => {
      canvas.toBlob(
        resolve,
        "image/webp",
        0.8
      )
    }
  )

  if (!compressedBlob) {
    alert("Erro ao processar imagem")
    return
  }

  const optimizedFile = new File(
    [compressedBlob],
    "logo.webp",
    {
      type: "image/webp",
    }
  )

  const filePath = `${userId}/${Date.now()}.webp`

  const { data: uploadData, error: uploadError } = await supabase.storage
  .from("team-logos")
  .upload(filePath, optimizedFile, {
    upsert: false,
  })

console.log("UPLOAD DATA:", uploadData)
console.log("UPLOAD ERROR:", uploadError)

if (uploadError) {
  alert(uploadError.message)
  return
}

  const { data } = supabase.storage
    .from("team-logos")
    .getPublicUrl(filePath)

  setLogoUrl(`${data.publicUrl}?t=${Date.now()}`)
}
  function togglePosicao(posicao: string) {
  const novasPosicoes = posicoesSelecionadas.includes(posicao)
    ? posicoesSelecionadas.filter((p) => p !== posicao)
    : [...posicoesSelecionadas, posicao]

  setPosicoesSelecionadas(novasPosicoes)
  setPosicaoProcurada(novasPosicoes.join(", "))
}

function circleClass(posicao: string) {
  return `
    absolute
    w-14 h-14
    rounded-full
    text-xs
    font-bold
    transition-all
    flex items-center justify-center
    shadow-lg
    ${
      posicoesSelecionadas.includes(posicao)
        ? "bg-white text-green-700 scale-110"
        : "bg-white/20 backdrop-blur text-white hover:bg-white/30"
    }
  `
}

  async function handleSave() {
  if (!userId) return

  setLoading(true)

  console.log({
    userid: userId,
    nometime: nomeTime,
    cidade,
    bairro,
    estado,
    precisajogador: precisaJogador,
    posicaoprocurada: posicaoProcurada,
    precisapatrocinio: precisaPatrocinio,
    logo: logoUrl,
  })

  const { error } = await supabase
  .from("team_profiles")
  .update({
    nometime: nomeTime,
    cidade,
    bairro,
    estado,
    fundacao,
    precisajogador: precisaJogador,
    posicaoprocurada: posicoesSelecionadas.join(", "),
    precisapatrocinio: precisaPatrocinio,
    logo: logoUrl,
  })
  .eq("userid", userId)

setLoading(false)

  if (error) {
    console.log(error)
    alert(error.message)
    return
  }

  router.push("/dashboard/time")
}
  const inputClass =
  "w-full h-14 px-5 rounded-2xl bg-[#f7f8fa] text-zinc-800 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:shadow-md"

  return (
    <main className="flex-1 p-4 md:p-8 bg-[#f3f5f7]">

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
          className="hidden md:flex h-12 px-6 cursor-pointer rounded-full bg-[#0f3b2e] text-white items-center gap-2 text-sm font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {/* CARD */}
      <section className="bg-white rounded-[36px] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">

        {/* LOGO REDONDO */}
        <div className="flex flex-col items-center mb-10">

  <div className="relative">

    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo do time"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[#0f3b2e] text-5xl md:text-6xl font-black">
          {nomeTime?.charAt(0)?.toUpperCase() || "C"}
        </span>
      )}
    </div>

    <label className="absolute bottom-1 right-1 w-12 h-12 rounded-full bg-[#0f3b2e] text-white flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition">
      <Camera size={18} />

      <input
  type="file"
  accept="image/png,image/jpeg,image/webp"
  className="hidden"
  onChange={handleLogoUpload}
/>
    </label>

  </div>

  <h2 className="mt-5 text-2xl md:text-3xl font-bold text-zinc-900 text-center">
    {nomeTime || "Seu Clube"}
  </h2>

  <p className="text-zinc-500 mt-1 text-center">
    {cidade || "Cidade"} {estado ? `• ${estado}` : ""}
  </p>

</div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
  value={nomeTime}
  onChange={(e) => setNomeTime(e.target.value)}
  placeholder="Nome do time"
  className={inputClass}
/>

          <input
  value={cidade}
  onChange={(e) => setCidade(e.target.value)}
  placeholder="Cidade"
  className={inputClass}
/>

          <input
  value={bairro}
  onChange={(e) => setBairro(e.target.value)}
  placeholder="Bairro"
  className={inputClass}
/>

          <input
  value={estado}
  onChange={(e) => setEstado(e.target.value)}
  placeholder="Estado"
  className={inputClass}
/>
<input
  type="number"
  value={fundacao}
  onChange={(e) => setFundacao(e.target.value)}
  placeholder="Ano de fundação"
  className={inputClass}
/>

 <div className="md:col-span-2">
  <h3 className="text-sm font-semibold text-zinc-700 mb-4">
    Posições procuradas
  </h3>

  <div className="relative mx-auto max-w-[500px] h-[420px] rounded-[32px] overflow-hidden bg-gradient-to-b from-green-500 to-green-700 shadow-lg">

    {/* Campo */}
    <div className="absolute inset-3 border-2 border-white/60 rounded-3xl" />
    <div className="absolute left-3 right-3 top-1/2 border-t-2 border-white/60" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/60" />

    <button
      type="button"
      onClick={() => togglePosicao("Goleiro")}
      className={circleClass("Goleiro")}
      style={{ bottom: "15px", left: "50%", transform: "translateX(-50%)" }}
    >
      GOL
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Zagueiro")}
      className={circleClass("Zagueiro")}
      style={{ bottom: "90px", left: "50%", transform: "translateX(-50%)" }}
    >
      ZAG
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Lateral Esquerdo")}
      className={circleClass("Lateral Esquerdo")}
      style={{ bottom: "90px", left: "15%" }}
    >
      LE
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Lateral Direito")}
      className={circleClass("Lateral Direito")}
      style={{ bottom: "90px", right: "15%" }}
    >
      LD
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Volante")}
      className={circleClass("Volante")}
      style={{ bottom: "170px", left: "50%", transform: "translateX(-50%)" }}
    >
      VOL
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Meia")}
      className={circleClass("Meia")}
      style={{ bottom: "240px", left: "28%" }}
    >
      MEI
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Meia")}
      className={circleClass("Meia")}
      style={{ bottom: "240px", right: "28%" }}
    >
      MEI
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Ponta Esquerda")}
      className={circleClass("Ponta Esquerda")}
      style={{ top: "70px", left: "12%" }}
    >
      PE
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Ponta Direita")}
      className={circleClass("Ponta Direita")}
      style={{ top: "70px", right: "12%" }}
    >
      PD
    </button>

    <button
      type="button"
      onClick={() => togglePosicao("Atacante")}
      className={circleClass("Atacante")}
      style={{ top: "15px", left: "50%", transform: "translateX(-50%)" }}
    >
      ATA
    </button>
  </div>

  {posicaoProcurada && (
    <div className="mt-4 bg-[#f7f8fa] rounded-2xl p-4 text-sm text-zinc-700">
      <span className="font-semibold">Selecionadas:</span>{" "}
      {posicaoProcurada}
    </div>
  )}
</div>

          <label className="md:col-span-2 flex items-center gap-3 text-sm font-medium text-zinc-700">
  <input
    type="checkbox"
    checked={precisaJogador}
    onChange={(e) => setPrecisaJogador(e.target.checked)}
    className="w-5 h-5 accent-[#0f3b2e]"
  />
  Recrutando jogadores
</label>

<label className="md:col-span-2 flex items-center gap-3 text-sm font-medium text-zinc-700">
  <input
    type="checkbox"
    checked={precisaPatrocinio}
    onChange={(e) => setPrecisaPatrocinio(e.target.checked)}
    className="w-5 h-5 accent-[#0f3b2e]"
  />
  Procurando patrocinadores
</label>

        </div>

        {/* MOBILE SAVE */}
        <button
  onClick={handleSave}
  disabled={loading}
  className="md:hidden mt-8 w-full h-14 rounded-2xl bg-[#0f3b2e] text-white font-semibold"
>
  {loading ? "Salvando..." : "Salvar alterações"}
</button>

      </section>
    </main>
  )
}