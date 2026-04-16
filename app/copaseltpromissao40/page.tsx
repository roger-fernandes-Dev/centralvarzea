
"use client"

import Image from "next/image"

type Team = {
  name: string
  short: string
  logo: string
  pts: number
  pj: number
  sg: number
}

type Match = {
  home: string
  away: string
  date: string
  time: string
  homeScore?: number
  awayScore?: number
}

type Group = {
  name: string
  teams: Team[]
  matches: Match[]
}

/** CALCULA TABELA AUTOMATICAMENTE */
function calculateTable(group: Group): Team[] {
  const table = group.teams.map(team => ({
    ...team,
    pts: 0,
    pj: 0,
    sg: 0,
  }))

  group.matches.forEach(match => {
    if (match.homeScore === undefined || match.awayScore === undefined) return

    const home = table.find(t => t.short === match.home)!
    const away = table.find(t => t.short === match.away)!

    home.pj++
    away.pj++

    home.sg += match.homeScore - match.awayScore
    away.sg += match.awayScore - match.homeScore

    if (match.homeScore > match.awayScore) {
      home.pts += 3
    } else if (match.homeScore < match.awayScore) {
      away.pts += 3
    } else {
      home.pts += 1
      away.pts += 1
    }
  })

  return table.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    return b.sg - a.sg
  })
}

const groups: Group[] = [
  {
    name: "Grupo A",
    teams: [
      { name: "Bengala", short: "BGA", logo: "/times/bengala.png", pts: 0, pj: 0, sg: 0 },
      { name: "Bahea", short: "BAE", logo: "/times/bahea.png", pts: 0, pj: 0, sg: 0 },
      { name: "Falcões", short: "FAC", logo: "/times/falcoes.png", pts: 0, pj: 0, sg: 0 },
      { name: "Mec", short: "MEC", logo: "/times/mec.png", pts: 0, pj: 0, sg: 0 },
      { name: "Bem Amigos", short: "BAG", logo: "/times/bemamigos.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "BGA", away: "BAE", date: "25/04", time: "17:45", },
      { home: "FAC", away: "BAG", date: "25/04", time: "17:45", },
      { home: "MEC", away: "FAC", date: "05/05", time: "19:00", },
      { home: "BAG", away: "BGA", date: "05/05", time: "19:00", },
      { home: "BAE", away: "BAG", date: "09/05", time: "20:00", },
      { home: "BGA", away: "MEC", date: "09/05", time: "20:00", },
      { home: "FAC", away: "BGA", date: "14/05", time: "21:00", },
      { home: "MEC", away: "BAE", date: "14/05", time: "21:00", },
      { home: "BAG", away: "MEC", date: "19/05", time: "19:00", },
      { home: "BAE", away: "FAC", date: "19/05", time: "19:00", },
    ],
  },
  {
    name: "Grupo B",
    teams: [
      { name: "Assentamento", short: "ASS", logo: "/times/assentamento50.png", pts: 0, pj: 0, sg: 0 },
      { name: "Promi Informatica", short: "PRO", logo: "/times/promi_informatica.png", pts: 0, pj: 0, sg: 0 },
      { name: "Grupo Deu Bom", short: "GDB", logo: "/times/grupodeubom.png", pts: 0, pj: 0, sg: 0 },
      { name: "Amigos do Futebol", short: "ADF", logo: "/times/amigosdofutebol50.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "ASS", away: "ADF", date: "25/04", time: "19:00", },
      { home: "GDB", away: "PRO", date: "25/04", time: "19:00", },
      { home: "GDB", away: "ASS", date: "05/05", time: "20:00", },
      { home: "PRO", away: "ADF", date: "05/05", time: "20:00", },
      { home: "ASS", away: "PRO", date: "09/05", time: "19:00", },
      { home: "ADF", away: "GDB", date: "09/05", time: "19:00", },
    ],
  }
]

export default function GroupsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Fase de Grupos</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <div
            key={group.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="bg-black text-white px-4 py-3 font-semibold">
              {group.name}
            </div>

            {/* tabela */}
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="text-left px-3 py-3">#</th>
                  <th className="text-left">Time</th>
                  <th>P</th>
                  <th>J</th>
                  <th>SG</th>
                </tr>
              </thead>

              <tbody>
                {calculateTable(group).map((team, index) => (
                  <tr
                    key={team.name}
                    className={`h-14 border-b border-gray-100 hover:bg-gray-50 transition ${
                      index === 0 ? "bg-green-50/60" : ""
                    }`}
                  >
                    <td className="px-3 font-semibold text-center">
                      {index + 1}
                    </td>

                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium">
                          {team.short}
                        </span>
                      </div>
                    </td>

                    <td className="text-center">{team.pts}</td>
                    <td className="text-center">{team.pj}</td>
                    <td className="text-center">{team.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* jogos (NÃO MEXI) */}
            <div className="px-4 py-4 bg-gray-50/60">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Jogos
              </h3>

              <div className="space-y-2">
                {group.matches.map((match, i) => {
                  const homeTeam = group.teams.find(t => t.short === match.home)
                  const awayTeam = group.teams.find(t => t.short === match.away)
                  const hasResult = match.homeScore !== undefined && match.awayScore !== undefined

                  return (
                    <div
                      key={i}
                      className={`bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all hover:bg-gray-50 hover:shadow-md ${
                        hasResult ? "bg-gray-50/80" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="flex items-center gap-1">
                          {homeTeam && (
                            <Image src={homeTeam.logo} alt={homeTeam.name} width={18} height={18} className="rounded-full" />
                          )}
                          <span>{match.home}</span>
                        </div>

                        <div className="px-2 min-w-[40px] text-center">
                          {hasResult ? (
                            <span className="font-semibold text-gray-800">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">vs</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {awayTeam && (
                            <Image src={awayTeam.logo} alt={awayTeam.name} width={18} height={18} className="rounded-full" />
                          )}
                          <span>{match.away}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-400 text-right leading-tight">
                        {hasResult ? (
                          <span className="text-gray-500 font-medium">
                            Encerrado
                          </span>
                        ) : (
                          <>
                            <div>{match.date}</div>
                            <div>{match.time}</div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}