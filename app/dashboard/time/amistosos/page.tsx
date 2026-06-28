"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  MapPin,
  MessageCircle,
  Shield,
  Users,
  Send,
  CalendarDays,
  Clock3,
  X,
} from "lucide-react"
import { supabase } from "@/src/lib/supabase/client"
import {
  TeamProfileModal,
  type TeamProfile,
} from "../components/TeamProfileModal"

type FriendlyInvitation = {
  receiver_team_id?: string | null
  status?: string | null
}

type Category = {
  id: string
  name: string
}

type TeamCategoryRef = {
  team_id: string
  category_id: string
}

type InviteFormData = {
  categoryId: string
  proposedDate: string
  proposedTime: string
  location: string
  message: string
}

export default function BuscarTimesPage() {
  const [times, setTimes] = useState<TeamProfile[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [teamCategoryRefs, setTeamCategoryRefs] = useState<TeamCategoryRef[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nomeBusca, setNomeBusca] = useState("")
  const [cidadeBusca, setCidadeBusca] = useState("")
  const [categoriaBusca, setCategoriaBusca] = useState("Todas categorias")

  const [timeSelecionado, setTimeSelecionado] = useState<TeamProfile | null>(
    null
  )
  const [timeConvite, setTimeConvite] = useState<TeamProfile | null>(null)

  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null)

  const [convites, setConvites] = useState<Record<string, string>>({})
  const [enviandoConvite, setEnviandoConvite] = useState<string | null>(null)

  useEffect(() => {
    async function loadTimes() {
      setLoading(true)
      setError(null)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setCurrentUserId(user?.id || null)

      let loggedTeamId: string | null = null

      if (user) {
        const { data: myTeam, error: myTeamError } = await supabase
          .from("team_profiles")
          .select("id")
          .eq("userid", user.id)
          .maybeSingle()

        if (myTeamError) {
          console.log("ERRO AO BUSCAR TIME LOGADO:", myTeamError)
          setError("Nao foi possivel identificar seu time.")
          setLoading(false)
          return
        }

        loggedTeamId = myTeam?.id || null
        setCurrentTeamId(loggedTeamId)
      }

      const { data: teamsData, error: teamsError } = await supabase
        .from("team_profiles")
        .select("*")
        .order("nometime", { ascending: true })

      if (teamsError) {
        console.log("ERRO AO BUSCAR TIMES:", teamsError)
        setError("Nao foi possivel carregar os times agora.")
        setLoading(false)
        return
      }

      setTimes(teamsData || [])

      const metaResponse = await fetch("/api/team/search-meta")
      const metaResult = metaResponse.ok
        ? await metaResponse.json()
        : { categories: [], teamCategories: [] }

      setCategories(metaResult.categories || [])
      setTeamCategoryRefs(metaResult.teamCategories || [])

      if (loggedTeamId) {
        const response = await fetch(
          `/api/team/invitations?direction=sent&teamId=${loggedTeamId}`
        )

        const result = response.ok ? await response.json() : { invitations: [] }

        const statusPorTime = (result.invitations || []).reduce(
          (acc: Record<string, string>, convite: FriendlyInvitation) => {
            if (convite.receiver_team_id) {
              acc[convite.receiver_team_id] = convite.status || "pending"
            }

            return acc
          },
          {}
        )

        setConvites(statusPorTime)
      }

      setLoading(false)
    }

    loadTimes()
  }, [])

  const teamCategoriesMap = useMemo(() => {
    const map: Record<string, string[]> = {}

    teamCategoryRefs.forEach((item) => {
      if (!map[item.team_id]) {
        map[item.team_id] = []
      }

      map[item.team_id].push(item.category_id)
    })

    return map
  }, [teamCategoryRefs])

  const currentTeamInviteCategories = useMemo(() => {
    if (!currentTeamId) return []

    const currentCategoryIds = teamCategoriesMap[currentTeamId] || []

    return categories.filter((category) =>
      currentCategoryIds.includes(category.id)
    )
  }, [categories, currentTeamId, teamCategoriesMap])

  function getTeamCategories(teamId?: string | null) {
    if (!teamId) return []

    const categoryIds = teamCategoriesMap[teamId] || []

    return categories.filter((category) => categoryIds.includes(category.id))
  }

  function abrirModalConvite(time: TeamProfile) {
    if (!currentUserId) {
      alert("Entre na sua conta de time para enviar convites.")
      return
    }

    if (!currentTeamId) {
      alert("Nao foi possivel identificar o seu time.")
      return
    }

    if (!time.id) {
      alert("Este time ainda nao pode receber convites.")
      return
    }

    if (time.id === currentTeamId) {
      alert("Voce nao pode enviar convite para o proprio time.")
      return
    }

    if (convites[time.id]) return

    if (currentTeamInviteCategories.length === 0) {
      alert("Cadastre pelo menos uma categoria no seu time antes de enviar convite.")
      return
    }

    setTimeConvite(time)
  }

  async function enviarConvite(time: TeamProfile, form: InviteFormData) {
    if (!currentTeamId) {
      alert("Nao foi possivel identificar o seu time.")
      return
    }

    if (!time.id) {
      alert("Este time ainda nao pode receber convites.")
      return
    }

    if (
      !form.categoryId ||
      !form.proposedDate ||
      !form.proposedTime ||
      !form.location.trim()
    ) {
      alert("Preencha categoria, data, horario e local.")
      return
    }

    setEnviandoConvite(time.id)

    const response = await fetch("/api/team/invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderTeamId: currentTeamId,
        receiverTeamId: time.id,
        categoryId: form.categoryId,
        proposedDate: form.proposedDate,
        proposedTime: form.proposedTime,
        location: form.location.trim(),
        message: form.message.trim() || null,
      }),
    })

    setEnviandoConvite(null)

    if (!response.ok) {
      alert("Nao foi possivel enviar o convite agora.")
      return
    }

    setConvites((current) => ({
      ...current,
      [time.id as string]: "pending",
    }))

    setTimeConvite(null)
  }

  const timesFiltrados = useMemo(() => {
    const nome = nomeBusca.trim().toLowerCase()
    const cidade = cidadeBusca.trim().toLowerCase()

    return times.filter((item) => {
      const nomeTime = item.nometime?.toLowerCase() || ""
      const cidadeTime = item.cidade?.toLowerCase() || ""
      const estadoTime = item.estado?.toLowerCase() || ""
      const categoryIds = item.id ? teamCategoriesMap[item.id] || [] : []

      const matchNome = !nome || nomeTime.includes(nome)
      const matchCidade =
        !cidade || cidadeTime.includes(cidade) || estadoTime.includes(cidade)
      const matchCategoria =
        categoriaBusca === "Todas categorias" ||
        categoryIds.includes(categoriaBusca)

      return matchNome && matchCidade && matchCategoria
    })
  }, [categoriaBusca, cidadeBusca, nomeBusca, teamCategoriesMap, times])

  return (
    <main className="flex-1 p-3 md:p-6">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0f3b2e] via-[#14503d] to-[#0f3b2e] p-8 md:p-10 text-white mb-8">
        <span className="text-xs uppercase tracking-[3px] text-green-200">
          CENTRAL VARZEA
        </span>

        <h1 className="mt-3 text-4xl md:text-5xl font-black">
          Buscar Times
        </h1>

        <p className="mt-3 text-green-100 max-w-2xl">
          Descubra clubes, visualize perfis completos e envie convites para
          marcar amistosos.
        </p>
      </section>

      <section className="bg-white rounded-[32px] p-5 border border-zinc-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="h-14 bg-[#f5f7f9] rounded-2xl px-4 flex items-center gap-3">
            <Search size={18} className="text-zinc-400" />

            <input
              value={nomeBusca}
              onChange={(e) => setNomeBusca(e.target.value)}
              placeholder="Nome do clube"
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <div className="h-14 bg-[#f5f7f9] rounded-2xl px-4 flex items-center gap-3">
            <MapPin size={18} className="text-zinc-400" />

            <input
              value={cidadeBusca}
              onChange={(e) => setCidadeBusca(e.target.value)}
              placeholder="Cidade"
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <select
            value={categoriaBusca}
            onChange={(e) => setCategoriaBusca(e.target.value)}
            className="h-14 bg-[#f5f7f9] rounded-2xl px-4 outline-none"
          >
            <option value="Todas categorias">Todas categorias</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setNomeBusca("")
              setCidadeBusca("")
              setCategoriaBusca("Todas categorias")
            }}
            className="h-14 rounded-2xl bg-[#0f3b2e] text-white font-semibold hover:opacity-90 transition"
          >
            Limpar busca
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading && (
          <div className="md:col-span-2 xl:col-span-3 bg-white rounded-[28px] p-8 border border-zinc-200 text-center text-zinc-500">
            Carregando times...
          </div>
        )}

        {!loading && error && (
          <div className="md:col-span-2 xl:col-span-3 bg-white rounded-[28px] p-8 border border-red-100 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && timesFiltrados.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 bg-white rounded-[28px] p-8 border border-zinc-200 text-center text-zinc-500">
            Nenhum time encontrado.
          </div>
        )}

        {!loading &&
          !error &&
          timesFiltrados.map((item) => {
            const nomeTime = item.nometime || "Time sem nome"
            const localizacao = [item.cidade, item.estado]
              .filter(Boolean)
              .join("/")
            const iniciais = nomeTime
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((parte) => parte[0])
              .join("")
              .toUpperCase()
            const whatsappUrl = item.whatsapp
              ? `https://wa.me/${item.whatsapp.replace(/\D/g, "")}`
              : null

            const conviteStatus = convites[item.id || ""]
            const conviteEnviando = enviandoConvite === item.id
            const categoriasDoTime = getTeamCategories(item.id)

            return (
              <div
                key={item.id}
                className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
              >
<div
  className="relative h-32 bg-gradient-to-r from-[#0f3b2e] to-[#1d6b52] bg-cover bg-center"
  style={
    item.fototime
      ? { backgroundImage: `url(${item.fototime})` }
      : undefined
  }
>
  <div className="absolute inset-0 bg-black/25" />
</div>
                <div className="px-6 pb-6 relative">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl -mt-12 flex items-center justify-center text-[#0f3b2e] font-black text-2xl overflow-hidden">
                    {item.logo ? (
                      <span
                        aria-label={`Logo do ${nomeTime}`}
                        role="img"
                        className="h-full w-full rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.logo})` }}
                      />
                    ) : (
                      iniciais || "CV"
                    )}
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xl font-black text-zinc-900">
                      {nomeTime}
                    </h2>

                    <p className="mt-1 text-zinc-500 flex items-center gap-2">
                      <MapPin size={15} />
                      {localizacao || "Localizacao nao informada"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {categoriasDoTime.length > 0 ? (
                      categoriasDoTime.slice(0, 3).map((category) => (
                        <span
                          key={category.id}
                          className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold"
                        >
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold">
                        Sem categoria
                      </span>
                    )}

                    {categoriasDoTime.length > 3 && (
                      <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold">
                        +{categoriasDoTime.length - 3}
                      </span>
                    )}

                    <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium flex items-center gap-1">
                      <Users size={12} />
                      {item.precisajogador ? "Recrutando" : "Ativo"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                    {item.descricao ||
                      "Time cadastrado na Central Varzea para contatos e amistosos."}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setTimeSelecionado(item)}
                      className="h-12 rounded-2xl border border-zinc-200 text-sm font-medium hover:bg-zinc-50 transition"
                    >
                      Ver Perfil
                    </button>

                    <button
                      type="button"
                      onClick={() => abrirModalConvite(item)}
                      disabled={
                        !item.id ||
                        item.id === currentTeamId ||
                        !!conviteStatus ||
                        conviteEnviando
                      }
                      className="h-12 rounded-2xl border border-[#0f3b2e] text-[#0f3b2e] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#edf3ef] transition disabled:opacity-50 disabled:hover:bg-white"
                    >
                      <Send size={15} />
                      {conviteEnviando
                        ? "..."
                        : conviteStatus
                          ? "Enviado"
                          : "Convite"}
                    </button>

                    <a
                      href={whatsappUrl || undefined}
                      target={whatsappUrl ? "_blank" : undefined}
                      rel={whatsappUrl ? "noreferrer" : undefined}
                      aria-disabled={!whatsappUrl}
                      className={`h-12 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium flex items-center justify-center gap-2 transition ${
                        whatsappUrl
                          ? "hover:opacity-90"
                          : "opacity-50 pointer-events-none"
                      }`}
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <Shield className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">{times.length}</h3>
          <p className="text-zinc-500 text-sm mt-1">Times cadastrados</p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <Users className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">
            {times.filter((time) => time.precisajogador).length}
          </h3>
          <p className="text-zinc-500 text-sm mt-1">Times recrutando</p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <MessageCircle className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">
            {times.filter((time) => time.whatsapp).length}
          </h3>
          <p className="text-zinc-500 text-sm mt-1">Contatos disponiveis</p>
        </div>
      </section>

      {timeSelecionado && (
        <TeamProfileModal
          time={timeSelecionado}
          onClose={() => setTimeSelecionado(null)}
          onInvite={abrirModalConvite}
          inviteStatus={
            timeSelecionado.id ? convites[timeSelecionado.id] : null
          }
          inviteLoading={enviandoConvite === timeSelecionado.id}
        />
      )}

      {timeConvite && (
        <InviteModal
          time={timeConvite}
          categories={currentTeamInviteCategories}
          loading={enviandoConvite === timeConvite.id}
          onClose={() => setTimeConvite(null)}
          onSubmit={(form) => enviarConvite(timeConvite, form)}
        />
      )}
    </main>
  )
}

function InviteModal({
  time,
  categories,
  loading,
  onClose,
  onSubmit,
}: {
  time: TeamProfile
  categories: Category[]
  loading: boolean
  onClose: () => void
  onSubmit: (form: InviteFormData) => void
}) {
  const [categoryId, setCategoryId] = useState("")
  const [proposedDate, setProposedDate] = useState("")
  const [proposedTime, setProposedTime] = useState("")
  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")

  const nomeTime = time.nometime || "Time sem nome"

  useEffect(() => {
    setCategoryId(categories[0]?.id || "")
  }, [categories])

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-3 md:p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-[32px] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-[#0f3b2e] font-bold">
              Convite de amistoso
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mt-1">
              {nomeTime}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              A categoria abaixo vem do seu próprio time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-zinc-700">
              Categoria do seu time
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-2 h-12 w-full rounded-2xl bg-[#f5f7f9] px-4 outline-none border border-transparent focus:border-[#0f3b2e]"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {categories.length === 0 && (
              <p className="mt-2 text-sm text-red-600">
                Seu time ainda não tem categorias cadastradas.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-zinc-700">
                Data
              </label>

              <div className="mt-2 h-12 rounded-2xl bg-[#f5f7f9] px-4 flex items-center gap-3">
                <CalendarDays size={17} className="text-zinc-400" />

                <input
                  type="date"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-700">
                Horário
              </label>

              <div className="mt-2 h-12 rounded-2xl bg-[#f5f7f9] px-4 flex items-center gap-3">
                <Clock3 size={17} className="text-zinc-400" />

                <input
                  type="time"
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                  className="bg-transparent outline-none flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700">
              Local
            </label>

            <div className="mt-2 h-12 rounded-2xl bg-[#f5f7f9] px-4 flex items-center gap-3">
              <MapPin size={17} className="text-zinc-400" />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Campo Municipal"
                className="bg-transparent outline-none flex-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700">
              Mensagem opcional
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Temos campo reservado e arbitragem combinada."
              className="mt-2 min-h-[100px] w-full rounded-2xl bg-[#f5f7f9] p-4 outline-none border border-transparent focus:border-[#0f3b2e] resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-2xl border border-zinc-200 font-semibold hover:bg-zinc-50 transition"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={loading || categories.length === 0}
            onClick={() =>
              onSubmit({
                categoryId,
                proposedDate,
                proposedTime,
                location,
                message,
              })
            }
            className="h-12 flex-1 rounded-2xl bg-[#0f3b2e] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          >
            <Send size={16} />
            {loading ? "Enviando..." : "Enviar convite"}
          </button>
        </div>
      </div>
    </div>
  )
}
