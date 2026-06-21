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
  Pencil,
  Bell,
  Check,
  X,
  Eye,
} from "lucide-react"
import {
  TeamProfileModal,
  type TeamProfile,
} from "./components/TeamProfileModal"

type FriendlyInvitation = {
  id: string
  playerid?: string | null
  teamid?: string | null
  status?: string | null
  createdat?: string | null
  sender?: TeamProfile | null
}

export default function DashboardTime() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [team, setTeam] = useState<TeamProfile | null>(null)
  const [convitesRecebidos, setConvitesRecebidos] = useState<
    FriendlyInvitation[]
  >([])
  const [conviteSelecionado, setConviteSelecionado] =
    useState<FriendlyInvitation | null>(null)
  const [perfilSelecionado, setPerfilSelecionado] =
    useState<TeamProfile | null>(null)
  const [atualizandoConvite, setAtualizandoConvite] = useState<string | null>(
    null
  )

  const [openBannerModal, setOpenBannerModal] = useState(false)
const [bannerFile, setBannerFile] = useState<File | null>(null)
const [savingBanner, setSavingBanner] = useState(false)

async function loadConvitesRecebidos(userId: string) {
  const response = await fetch(
    `/api/team/invitations?direction=received&userId=${userId}`
  )

  if (!response.ok) {
    console.log("ERRO AO BUSCAR CONVITES")
    return
  }

  const { invitations } = await response.json()
  const data = invitations || []

  const senderIds = Array.from(
    new Set(
      (data || [])
        .map((convite: FriendlyInvitation) => convite.playerid)
        .filter(Boolean)
    )
  )

  const { data: senders } = senderIds.length
    ? await supabase.from("team_profiles").select("*").in("userid", senderIds)
    : { data: [] }

  const senderByUserId = (senders || []).reduce(
    (acc: Record<string, TeamProfile>, sender: TeamProfile) => {
      if (sender.userid) {
        acc[sender.userid] = sender
      }

      return acc
    },
    {}
  )

  setConvitesRecebidos(
    (data || []).map((convite: FriendlyInvitation) => ({
      ...convite,
      sender: convite.playerid ? senderByUserId[convite.playerid] : null,
    }))
  )
}

async function responderConvite(convite: FriendlyInvitation, status: string) {
  setAtualizandoConvite(status)

  const response = await fetch("/api/team/invitations", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: convite.id,
      status,
    }),
  })

  setAtualizandoConvite(null)

  if (!response.ok) {
    alert("Nao foi possivel responder o convite agora.")
    return
  }

  setConvitesRecebidos((current) =>
    current.map((item) => (item.id === convite.id ? { ...item, status } : item))
  )
  setConviteSelecionado((current) =>
    current?.id === convite.id ? { ...current, status } : current
  )
}

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
      await loadConvitesRecebidos(user.id)
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
          alt={team.nometime || "Logo do time"}
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
      <section className="bg-white rounded-[32px] p-5 md:p-6 border border-zinc-200 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center">
              <Bell size={18} />
            </span>

            <div>
              <h2 className="text-xl font-black text-zinc-900">
                Notificacoes
              </h2>
              <p className="text-sm text-zinc-500">
                Convites de amistosos recebidos
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-sm font-bold">
            {
              convitesRecebidos.filter(
                (convite) => (convite.status || "pendente") === "pendente"
              ).length
            }
          </span>
        </div>

        {convitesRecebidos.length === 0 ? (
          <div className="rounded-[24px] bg-[#f7f8fa] p-5 text-sm text-zinc-500">
            Nenhum convite recebido por enquanto.
          </div>
        ) : (
          <div className="space-y-3">
            {convitesRecebidos.slice(0, 5).map((convite) => {
              const sender = convite.sender
              const status = convite.status || "pendente"

              return (
                <div
                  key={convite.id}
                  className="rounded-[24px] border border-zinc-200 p-4 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center font-black overflow-hidden">
                      {sender?.logo ? (
                        <span
                          aria-label={`Logo do ${sender.nometime}`}
                          role="img"
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${sender.logo})` }}
                        />
                      ) : (
                        sender?.nometime?.charAt(0) || "C"
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-900">
                        {sender?.nometime || "Time convidante"}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        Enviou um convite para amistoso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "aceito"
                          ? "bg-green-100 text-green-700"
                          : status === "recusado"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {status === "aceito"
                        ? "Aceito"
                        : status === "recusado"
                          ? "Recusado"
                          : "Pendente"}
                    </span>

                    <button
                      type="button"
                      onClick={() => setConviteSelecionado(convite)}
                      className="h-9 px-4 rounded-full bg-[#0f3b2e] text-white text-sm font-semibold hover:opacity-90 transition"
                    >
                      Abrir
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* resto do dashboard continua igual */}

      {conviteSelecionado && (
        <ConviteModal
          convite={conviteSelecionado}
          updating={atualizandoConvite}
          onClose={() => setConviteSelecionado(null)}
          onAccept={() => responderConvite(conviteSelecionado, "aceito")}
          onReject={() => responderConvite(conviteSelecionado, "recusado")}
          onViewProfile={() => {
            if (conviteSelecionado.sender) {
              setPerfilSelecionado(conviteSelecionado.sender)
            }
          }}
        />
      )}

      {perfilSelecionado && (
        <TeamProfileModal
          time={perfilSelecionado}
          onClose={() => setPerfilSelecionado(null)}
        />
      )}

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

function ConviteModal({
  convite,
  updating,
  onClose,
  onAccept,
  onReject,
  onViewProfile,
}: {
  convite: FriendlyInvitation
  updating: string | null
  onClose: () => void
  onAccept: () => void
  onReject: () => void
  onViewProfile: () => void
}) {
  const sender = convite.sender
  const status = convite.status || "pendente"
  const localizacao = [sender?.cidade, sender?.estado].filter(Boolean).join("/")
  const canRespond = status === "pendente"

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Convite de amistoso"
    >
      <div className="bg-white w-full max-w-lg rounded-[32px] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center font-black text-2xl overflow-hidden">
              {sender?.logo ? (
                <span
                  aria-label={`Logo do ${sender.nometime}`}
                  role="img"
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${sender.logo})` }}
                />
              ) : (
                sender?.nometime?.charAt(0) || "C"
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[2px] text-[#0f3b2e] font-bold">
                Convite
              </p>
              <h2 className="text-xl font-black text-zinc-900">
                {sender?.nometime || "Time convidante"}
              </h2>
              <p className="text-sm text-zinc-500">
                {localizacao || "Localizacao nao informada"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar convite"
            className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 rounded-[24px] bg-[#f7f8fa] p-5">
          <p className="text-zinc-700 leading-relaxed">
            Esse time enviou um convite para marcar um amistoso com voce.
            Analise o perfil antes de aceitar ou recusar.
          </p>

          <span
            className={`inline-flex mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
              status === "aceito"
                ? "bg-green-100 text-green-700"
                : status === "recusado"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
            }`}
          >
            {status === "aceito"
              ? "Convite aceito"
              : status === "recusado"
                ? "Convite recusado"
                : "Aguardando resposta"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <button
            type="button"
            onClick={onViewProfile}
            disabled={!sender}
            className="h-12 rounded-2xl border border-zinc-200 font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 transition disabled:opacity-50"
          >
            <Eye size={16} />
            Ver perfil
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={!canRespond || updating === "recusado"}
            className="h-12 rounded-2xl border border-red-200 text-red-700 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition disabled:opacity-50"
          >
            <X size={16} />
            {updating === "recusado" ? "..." : "Rejeitar"}
          </button>

          <button
            type="button"
            onClick={onAccept}
            disabled={!canRespond || updating === "aceito"}
            className="h-12 rounded-2xl bg-[#0f3b2e] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          >
            <Check size={16} />
            {updating === "aceito" ? "..." : "Aceitar"}
          </button>
        </div>
      </div>
    </div>
  )
}
