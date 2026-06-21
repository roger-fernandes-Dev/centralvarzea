"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  MapPin,
  MessageCircle,
  Shield,
  Users,
  Send,
} from "lucide-react"
import { supabase } from "@/src/lib/supabase/client"
import {
  TeamProfileModal,
  type TeamProfile,
} from "../components/TeamProfileModal"

type FriendlyInvitation = {
  teamid?: string | null
  status?: string | null
}

export default function BuscarTimesPage() {
  const [times, setTimes] = useState<TeamProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nomeBusca, setNomeBusca] = useState("")
  const [cidadeBusca, setCidadeBusca] = useState("")
  const [categoriaBusca, setCategoriaBusca] = useState("Todas categorias")
  const [timeSelecionado, setTimeSelecionado] = useState<TeamProfile | null>(
    null
  )
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
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

      const { data, error } = await supabase
        .from("team_profiles")
        .select("*")
        .order("nometime", { ascending: true })

      if (error) {
        console.log("ERRO AO BUSCAR TIMES:", error)
        setError("Nao foi possivel carregar os times agora.")
        setLoading(false)
        return
      }

      setTimes(data || [])

      if (user) {
        const response = await fetch(
          `/api/team/invitations?direction=sent&userId=${user.id}`
        )
        const result = response.ok ? await response.json() : { invitations: [] }

        const statusPorTime = (result.invitations || []).reduce(
          (acc: Record<string, string>, convite: FriendlyInvitation) => {
            if (convite.teamid) {
              acc[convite.teamid] = convite.status || "pendente"
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

  async function enviarConvite(time: TeamProfile) {
    if (!currentUserId) {
      alert("Entre na sua conta de time para enviar convites.")
      return
    }

    if (!time.userid) {
      alert("Este time ainda nao pode receber convites.")
      return
    }

    if (time.userid === currentUserId) {
      alert("Voce nao pode enviar convite para o proprio time.")
      return
    }

    if (convites[time.userid]) return

    setEnviandoConvite(time.userid)

    const response = await fetch("/api/team/invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: currentUserId,
        targetId: time.userid,
      }),
    })

    setEnviandoConvite(null)

    if (!response.ok) {
      alert("Nao foi possivel enviar o convite agora.")
      return
    }

    setConvites((current) => ({
      ...current,
      [time.userid as string]: "pendente",
    }))
  }

  const timesFiltrados = useMemo(() => {
    const nome = nomeBusca.trim().toLowerCase()
    const cidade = cidadeBusca.trim().toLowerCase()

    return times.filter((item) => {
      const nomeTime = item.nometime?.toLowerCase() || ""
      const cidadeTime = item.cidade?.toLowerCase() || ""
      const estadoTime = item.estado?.toLowerCase() || ""
      const categoriaTime = item.categoria || "Amador"

      const matchNome = !nome || nomeTime.includes(nome)
      const matchCidade =
        !cidade || cidadeTime.includes(cidade) || estadoTime.includes(cidade)
      const matchCategoria =
        categoriaBusca === "Todas categorias" || categoriaTime === categoriaBusca

      return matchNome && matchCidade && matchCategoria
    })
  }, [categoriaBusca, cidadeBusca, nomeBusca, times])

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
          Descubra clubes, visualize perfis completos e entre em contato para
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
            <option>Todas categorias</option>
            <option>Amador</option>
            <option>Semi-pro</option>
            <option>Profissional</option>
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

            return (
              <div
                key={item.id}
                className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                <div className="h-28 bg-gradient-to-r from-[#0f3b2e] to-[#1d6b52]" />

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
                    <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold">
                      {item.categoria || "Amador"}
                    </span>

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
                      onClick={() => enviarConvite(item)}
                      disabled={
                        !item.userid ||
                        item.userid === currentUserId ||
                        !!convites[item.userid] ||
                        enviandoConvite === item.userid
                      }
                      className="h-12 rounded-2xl border border-[#0f3b2e] text-[#0f3b2e] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#edf3ef] transition disabled:opacity-50 disabled:hover:bg-white"
                    >
                      <Send size={15} />
                      {enviandoConvite === item.userid
                        ? "..."
                        : convites[item.userid || ""]
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
          onInvite={enviarConvite}
          inviteStatus={
            timeSelecionado.userid ? convites[timeSelecionado.userid] : null
          }
          inviteLoading={enviandoConvite === timeSelecionado.userid}
        />
      )}
    </main>
  )
}
