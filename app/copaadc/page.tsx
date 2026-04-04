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

type Group = {
  name: string
  teams: Team[]
}

const groups: Group[] = [
  {
    name: "Grupo A",
    teams: [
      { name: "Águias de Deus", short: "ADF", logo: "/times/aguias_de_deus.png", pts: 0, pj: 0, sg: 0 },
      { name: "Max Elite", short: "MXE", logo: "/times/maxelite.png", pts: 0, pj: 0, sg: 0 },
      { name: "MEC", short: "MEC", logo: "/times/mec.png", pts: 0, pj: 0, sg: 0 },
      { name: "A Firma", short: "AFA", logo: "/times/afirma.png", pts: 0, pj: 0, sg: 0 },
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
  },
  {
    name: "Grupo C",
    teams: [
      { name: "Boleiros", short: "BLS", logo: "/times/boleirosfc.png", pts: 0, pj: 0, sg: 0 },
      { name: "Os Paraíbas", short: "PRB", logo: "/times/os_paraibas.png", pts: 0, pj: 0, sg: 0 },
      { name: "Nova Aliança", short: "NAL", logo: "/times/nova_alianca.png", pts: 0, pj: 0, sg: 0 },
      { name: "Point", short: "PIT", logo: "/times/point.png", pts: 0, pj: 0, sg: 0 },
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
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="bg-black text-white px-4 py-3 font-semibold">
              {group.name}
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-200">
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
                      className={`h-14 border-b border-gray-200 shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:bg-yellow-50 transition ${
                        index === 0 ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="px-3 font-semibold text-center">
                        {index + 1}
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="relative group">
                            <Image
                              src={team.logo}
                              alt={team.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />

                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {team.name}
                            </div>
                          </div>

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
          </div>
        ))}
      </div>
    </div>
  )
}