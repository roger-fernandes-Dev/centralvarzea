"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase/client"

import {
  Trophy,
  Search,
  MapPin,
  Shield,
  Users,
  Calendar,
  ChevronRight,
  Pencil,
} from "lucide-react"


export default function DashboardTime() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [team, setTeam] = useState<any>(null)

  const [openBannerModal, setOpenBannerModal] = useState(false)
const [bannerFile, setBannerFile] = useState<File | null>(null)
const [savingBanner, setSavingBanner] = useState(false)

async function handleBannerUpload() {
  if (!bannerFile || !team?.userid) return

  try {
    setSavingBanner(true)

    const img = document.createElement("img")
    img.src = URL.createObjectURL(bannerFile)

    await new Promise((resolve) => {
      img.onload = resolve
    })

    const canvas = document.createElement("canvas")

    const maxWidth = 1600

    const scale =
      img.width > maxWidth
        ? maxWidth / img.width
        : 1

    canvas.width = img.width * scale
    canvas.height = img.height * scale

    const ctx = canvas.getContext("2d")

    ctx?.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(
        resolve,
        "image/webp",
        0.8
      )
    )

    if (!blob) return

    const file = new File(
      [blob],
      "banner.webp",
      {
        type: "image/webp",
      }
    )

    const filePath =
      `${team.userid}/banner.webp`

    const { error } = await supabase.storage
      .from("team-banners")
      .upload(filePath, file, {
        upsert: true,
      })

    if (error) {
      alert(error.message)
      return
    }

    const { data } = supabase.storage
      .from("team-banners")
      .getPublicUrl(filePath)

    const bannerUrl =
      `${data.publicUrl}?t=${Date.now()}`

    await supabase
      .from("team_profiles")
      .update({
        fototime: bannerUrl,
      })
      .eq("userid", team.userid)

    setTeam({
      ...team,
      fototime: bannerUrl,
    })

    setOpenBannerModal(false)
    setBannerFile(null)

  } finally {
    setSavingBanner(false)
  }
}

  useEffect(() => {
    async function loadTeam() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("team_profiles")
        .select("*")
        .eq("userid", user.id)
        .maybeSingle()

      setTeam(data)
      setLoading(false)
    }

    loadTeam()
  }, [])

  if (loading) {
    return (
      <main className="flex-1 p-6">
        <div className="bg-white rounded-[32px] h-[300px] animate-pulse" />
      </main>
    )
  }

  const hasTeam = !!team

    if (!hasTeam) {
    return (
      <main className="flex-1 p-3 md:p-6">
        <section className="bg-white rounded-[32px] p-8 md:p-12 text-center shadow-sm">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] font-black text-3xl">
            CV
          </div>

          <h1 className="text-3xl font-bold mt-6 text-zinc-900">
            Crie seu time
          </h1>

          <p className="text-zinc-500 mt-3 max-w-md mx-auto">
            Complete o perfil do seu clube para aparecer nas buscas,
            campeonatos e amistosos.
          </p>

          <button
            onClick={() => router.push("/dashboard/time/editartime")}
            className="mt-8 h-12 px-8 rounded-2xl bg-[#0f3b2e] text-white font-semibold"
          >
            Criar meu time
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="flex-1 p-3 md:p-6">
      {/* DESKTOP HEADER */}
      <div className="hidden lg:flex items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-zinc-900">
            Bem-vindo de volta
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Acompanhe tudo sobre seu time.
          </p>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="lg:hidden mb-4">
        <div className="h-11 bg-white rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
          <Search className="text-zinc-400" size={16} />

          <input
            placeholder="Buscar times..."
            className="bg-transparent outline-none flex-1 text-[13px]"
          />
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <section className="relative overflow-hidden bg-white rounded-[36px] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] mb-6">

   {/** foto elenco */}

   <div className="absolute top-0 left-0 right-0 h-[320px] overflow-hidden">
    <button
  onClick={() => {
    console.log("clicou")
    setOpenBannerModal(true)
  }}
  className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white text-zinc-900 shadow-lg flex items-center justify-center hover:scale-105 transition"
>
  <Pencil size={18} />
</button>

  {team.fototime ? (
  <img
    src={team.fototime}
    alt="Foto do time"
    className="w-full h-full object-cover"
  />
) : (
  <div className="w-full h-full bg-gradient-to-r from-[#0f3b2e] to-[#1a5b46]" />
)}

  <div className="absolute inset-0 bg-black/40" />

</div>

  <div className="relative">

  {/* LOGO */}
  <div className="flex flex-col items-center">

    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white shadow-xl overflow-hidden border-4 border-white">

      {team.logo ? (
        <img
          src={team.logo}
          alt={team.nometime}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#0f3b2e] text-5xl font-black">
          {team.nometime?.charAt(0)}
        </div>
      )}

    </div>

    <h1 className="mt-5 text-3xl md:text-5xl font-black text-white text-center">
      {team.nometime}
    </h1>

    <p className="mt-2 text-white flex items-center gap-2 justify-center">
      <MapPin size={16} />
      {team.cidade} - {team.estado}
    </p>

    <button
      onClick={() => router.push("/dashboard/time/editartime")}
      className="mt-5 h-11 px-5 rounded-2xl bg-[#0f3b2e] text-white flex items-center gap-2"
    >
      <Pencil size={15} />
      Editar perfil
    </button>

  </div>

  {/* CARDS */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

    <div className="bg-[#f7f8fa] rounded-3xl p-5">
      <Shield className="text-[#0f3b2e]" />
      <p className="text-xs text-zinc-500 mt-3">
        Bairro
      </p>
      <h3 className="font-bold mt-1">
        {team.bairro || "-"}
      </h3>
    </div>

    <div className="bg-[#f7f8fa] rounded-3xl p-5">
      <Users className="text-[#0f3b2e]" />
      <p className="text-xs text-zinc-500 mt-3">
        Recrutando
      </p>
      <h3 className="font-bold mt-1">
        {team.precisajogador ? "Sim" : "Não"}
      </h3>
    </div>

    <div className="bg-[#f7f8fa] rounded-3xl p-5">
      <Trophy className="text-[#0f3b2e]" />
      <p className="text-xs text-zinc-500 mt-3">
        Patrocínio
      </p>
      <h3 className="font-bold mt-1">
        {team.precisapatrocinio ? "Procurando" : "Não"}
      </h3>
    </div>

    <div className="bg-[#f7f8fa] rounded-3xl p-5">
      <Calendar className="text-[#0f3b2e]" />
      <p className="text-xs text-zinc-500 mt-3">
        Fundação
      </p>
      <h3 className="font-bold mt-1">
        {team.fundacao || "-"}
      </h3>
    </div>

  </div>

  {team.posicaoprocurada && (
    <div className="mt-10">

      <h3 className="font-bold text-zinc-900 mb-4 text-center">
        Posições procuradas
      </h3>

      <div className="flex flex-wrap justify-center gap-2">

        {team.posicaoprocurada
          .split(",")
          .map((posicao: string) => (
            <span
              key={posicao}
              className="px-4 py-2 rounded-full bg-[#edf3ef] text-[#0f3b2e] font-medium text-sm"
            >
              {posicao.trim()}
            </span>
          ))}

      </div>

    </div>
  )}

</div>

</section>
      {/* resto do dashboard continua igual */}

      {openBannerModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-[32px] p-6">

  <h2 className="text-xl font-bold mb-5">
    Foto do Time
  </h2>

  <label className="w-full h-40 border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-[#0f3b2e] transition">

    <Pencil size={28} className="mb-3 text-zinc-500" />

    <span className="font-medium text-zinc-700">
      Selecionar imagem
    </span>

    <span className="text-sm text-zinc-500 mt-1">
      JPG, PNG ou WEBP
    </span>

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) =>
        setBannerFile(e.target.files?.[0] || null)
      }
    />

  </label>

  {bannerFile && (
    <p className="mt-4 text-sm text-green-600 font-medium">
      ✓ {bannerFile.name}
    </p>
  )}

  <div className="flex gap-3 mt-6">

    <button
      onClick={() => {
        setOpenBannerModal(false)
        setBannerFile(null)
      }}
      className="flex-1 h-12 rounded-2xl border"
    >
      Cancelar
    </button>

    <button
      onClick={handleBannerUpload}
      disabled={!bannerFile || savingBanner}
      className="flex-1 h-12 rounded-2xl bg-[#0f3b2e] text-white disabled:opacity-50"
    >
      {savingBanner ? "Salvando..." : "Salvar"}
    </button>

  </div>

</div>

  </div>
)}
    </main>
  )
}