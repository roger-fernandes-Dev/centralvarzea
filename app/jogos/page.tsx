"use client"

import Championships from "@/components/home/Championships"
import NextChampionships from "@/components/home/NextChampionships"

type Match = {
  id: string
  home: string
  away: string
  homeLogo: string
  awayLogo: string
  date: string
  competition: string
  type: "campeonato" | "amistoso"
  status: "agendado" | "finalizado"
  score?: {
    home: number
    away: number
  }
}

export default function MatchesList({ matches }: { matches?: Match[] }) {
  const now = new Date()

  const safeMatches = matches ?? []

  const upcoming = safeMatches.filter(
    (m) => new Date(m.date) >= now
  )

  const finished = safeMatches.filter(
    (m) => new Date(m.date) < now
  )

  return (
    <div className="space-y-10">

      {/* PRÓXIMOS JOGOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Próximos Jogos
        </h2>

        <NextChampionships matches={upcoming} />
      </section>

      {/* RESULTADOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">
          Resultados
        </h2>

        <Championships matches={finished} />
      </section>

    </div>
  )
}