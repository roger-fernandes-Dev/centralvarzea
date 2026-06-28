"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CalendarDays,
  Clock3,
  MapPin,
  Plus,
  Trophy,
  Users,
} from "lucide-react"
import { supabase } from "@/src/lib/supabase/client"

type TeamInfo = {
  id: string
  nometime: string | null
  logo?: string | null
  cidade?: string | null
  estado?: string | null
}

type CategoryInfo = {
  id: string
  name: string
}

type Match = {
  id: string
  home_team_id: string
  away_team_id: string
  category_id: string | null
  type: "friendly" | "championship"
  match_date: string
  match_time: string
  location: string | null
  status: "scheduled" | "finished" | "cancelled"
  home_score: number | null
  away_score: number | null
  home_team?: TeamInfo | null
  away_team?: TeamInfo | null
  category?: CategoryInfo | null
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number)

  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatTime(time: string) {
  return time.slice(0, 5)
}

export default function AgendaPage() {
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAgenda() {
      setLoading(true)
      setError(null)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Você precisa estar logado para ver sua agenda.")
        setLoading(false)
        return
      }

      const { data: team, error: teamError } = await supabase
        .from("team_profiles")
        .select("id")
        .eq("userid", user.id)
        .maybeSingle()

      if (teamError || !team) {
        console.log("ERRO AO BUSCAR TIME LOGADO:", teamError)
        setError("Não foi possível identificar seu time.")
        setLoading(false)
        return
      }

      setCurrentTeamId(team.id)

      const { data, error } = await supabase
        .from("matches")
        .select(`
          *,
          home_team:team_profiles!matches_home_team_id_fkey (
            id,
            nometime,
            logo,
            cidade,
            estado
          ),
          away_team:team_profiles!matches_away_team_id_fkey (
            id,
            nometime,
            logo,
            cidade,
            estado
          ),
          category:categories (
            id,
            name
          )
        `)
        .or(`home_team_id.eq.${team.id},away_team_id.eq.${team.id}`)
        .order("match_date", { ascending: true })
        .order("match_time", { ascending: true })

      if (error) {
        console.log("ERRO AO BUSCAR AGENDA:", error)
        setError("Não foi possível carregar sua agenda agora.")
        setLoading(false)
        return
      }

      setMatches(data || [])
      setLoading(false)
    }

    loadAgenda()
  }, [])

  const upcomingMatches = useMemo(() => {
    const now = new Date()

    return matches.filter((match) => {
      if (match.status !== "scheduled") return false

      const matchDateTime = new Date(
        `${match.match_date}T${match.match_time}`
      )

      return matchDateTime >= now
    })
  }, [matches])

  const nextMatch = upcomingMatches[0]

  function getOpponent(match: Match) {
    if (!currentTeamId) return null

    if (match.home_team_id === currentTeamId) {
      return match.away_team
    }

    return match.home_team
  }

  function getMatchType(match: Match) {
    if (match.type === "friendly") return "Amistoso"
    return "Campeonato"
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-[32px] font-bold text-zinc-900">
            Agenda
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Organize os compromissos e jogos do seu time.
          </p>
        </div>

        <button className="h-12 px-5 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
          <Plus size={18} />
          Novo compromisso
        </button>
      </div>

      {loading && (
        <div className="bg-white border border-zinc-200 rounded-[28px] p-8 text-center text-zinc-500">
          Carregando agenda...
        </div>
      )}

      {!loading && error && (
        <div className="bg-white border border-red-100 rounded-[28px] p-8 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* PROXIMO JOGO */}
          {nextMatch ? (
            <section className="bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Trophy size={24} />
                </div>

                <div>
                  <p className="text-sm text-zinc-300">Próximo jogo</p>

                  <h2 className="text-2xl font-bold">
                    {nextMatch.home_team?.nometime || "Time mandante"} vs{" "}
                    {nextMatch.away_team?.nometime || "Time visitante"}
                  </h2>

                  {nextMatch.category?.name && (
                    <p className="text-sm text-zinc-300 mt-1">
                      Categoria: {nextMatch.category.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <CalendarDays size={16} />
                    Data
                  </div>

                  <p className="mt-2 font-semibold">
                    {formatDate(nextMatch.match_date)}
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <Clock3 size={16} />
                    Horário
                  </div>

                  <p className="mt-2 font-semibold">
                    {formatTime(nextMatch.match_time)}
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <MapPin size={16} />
                    Local
                  </div>

                  <p className="mt-2 font-semibold">
                    {nextMatch.location || "Local não informado"}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white mb-6">
              <p className="text-sm text-zinc-300">Próximo jogo</p>
              <h2 className="text-2xl font-bold mt-2">
                Nenhum jogo agendado
              </h2>
              <p className="text-sm text-zinc-300 mt-2">
                Quando um amistoso for aceito com data, horário e local, ele
                aparecerá aqui.
              </p>
            </section>
          )}

          {/* LISTA */}
          <section className="space-y-4">
            {matches.length === 0 && (
              <div className="bg-white border border-zinc-200 rounded-[28px] p-8 text-center text-zinc-500">
                Sua agenda ainda está vazia.
              </div>
            )}

            {matches.map((match) => {
              const opponent = getOpponent(match)
              const tipo = getMatchType(match)

              return (
                <div
                  key={match.id}
                  className="bg-white border border-zinc-200 rounded-[28px] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#edf3ef] flex items-center justify-center">
                      {match.type === "friendly" ? (
                        <Users className="text-[#0f3b2e]" size={22} />
                      ) : (
                        <Trophy className="text-[#0f3b2e]" size={22} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">
                        {tipo}
                        {match.category?.name
                          ? ` • ${match.category.name}`
                          : ""}
                      </p>

                      <h3 className="text-lg font-semibold text-zinc-900">
                        {opponent?.nometime || "Adversário não informado"}
                      </h3>

                      <p className="text-sm text-zinc-500 mt-1">
                        {match.location || "Local não informado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-6">
                    <div>
                      <p className="text-xs text-zinc-500">Data</p>

                      <p className="font-medium text-sm text-zinc-900 mt-1">
                        {formatDate(match.match_date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">Hora</p>

                      <p className="font-medium text-sm text-zinc-900 mt-1">
                        {formatTime(match.match_time)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">Status</p>

                      <p className="font-medium text-sm text-zinc-900 mt-1">
                        {match.status === "scheduled"
                          ? "Agendado"
                          : match.status === "finished"
                            ? "Finalizado"
                            : "Cancelado"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        </>
      )}
    </div>
  )
}