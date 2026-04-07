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

/**  homeScore: 2, awayScore: 1  */
const groups: Group[] = [
  {
    name: "Grupo A",
    teams: [
      { name: "Águias de Deus", short: "ADF", logo: "/times/aguias_de_Deus.png", pts: 0, pj: 0, sg: 0 },
      { name: "Max Elite", short: "MXE", logo: "/times/maxelite.png", pts: 0, pj: 0, sg: 0 },
      { name: "MEC", short: "MEC", logo: "/times/mec.png", pts: 0, pj: 0, sg: 0 },
      { name: "A Firma", short: "AFA", logo: "/times/afirma.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "ADF", away: "MXE", date: "12/04", time: "08:00" },
      { home: "MEC", away: "AFA", date: "12/04", time: "08:00" },
    ],
  },
  {
    name: "Grupo B",
    teams: [
      { name: "Renuka ADC", short: "ADC", logo: "/times/renukaadc.png", pts: 0, pj: 0, sg: 0 },
      { name: "Napoli", short: "NPI", logo: "/times/napoli.png", pts: 0, pj: 0, sg: 0 },
      { name: "Casinha FC", short: "CFC", logo: "/times/casinhafc.png", pts: 0, pj: 0, sg: 0 },
      { name: "União São João", short: "USJ", logo: "/times/unidos_sao_joao.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "ADC", away: "NPI", date: "12/04", time: "08:00" },
      { home: "CFC", away: "USJ", date: "12/04", time: "08:00" },
    ],
  },
  {
    name: "Grupo C",
    teams: [
      { name: "Boleiros", short: "BLS", logo: "/times/boleirosfc.png", pts: 0, pj: 0, sg: 0 },
      { name: "Os Paraíbas", short: "PRB", logo: "/times/os_paraibas.png", pts: 0, pj: 0, sg: 0 },
      { name: "Nova Aliança", short: "NAL", logo: "/times/nova_alianca.png", pts: 0, pj: 0, sg: 0 },
      { name: "Point", short: "PIT", logo: "/times/point.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "BLS", away: "PRB", date: "19/04", time: "08:00" },
      { home: "NAL", away: "PIT", date: "19/04", time: "08:00" },
    ],
  },
  {
    name: "Grupo D",
    teams: [
      { name: "Magos FC", short: "MAG", logo: "/times/magos.png", pts: 0, pj: 0, sg: 0 },
      { name: "Sporting Guaiçara", short: "SGC", logo: "/times/sporting-guaicarafc.png", pts: 0, pj: 0, sg: 0 },
      { name: "The Best", short: "TBT", logo: "/times/the_best.png", pts: 0, pj: 0, sg: 0 },
      { name: "Raiz Esportiva", short: "RZS", logo: "/times/raiz_esportiva.png", pts: 0, pj: 0, sg: 0 },
    ],
    matches: [
      { home: "MAG", away: "RZC", date: "19/04", time: "08:00" },
      { home: "TBT", away: "SGC", date: "19/04", time: "08:00" },
    ],
  },
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

            {/* tabela (igual) */}
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
                {group.teams
                  .sort((a, b) => b.pts - a.pts)
                  .map((team, index) => (
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

            {/* jogos */}
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
                      {/* TIMES */}
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="flex items-center gap-1">
                          {homeTeam && (
                            <Image src={homeTeam.logo} alt={homeTeam.name} width={18} height={18} className="rounded-full" />
                          )}
                          <span>{match.home}</span>
                        </div>

                        {/* PLACAR OU VS */}
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

                      {/* DATA OU STATUS */}
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