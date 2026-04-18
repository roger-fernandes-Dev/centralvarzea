"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

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

const CHAMP_ID = "copa-selt40-2026"

function calculateTable(group: Group): Team[] {
  const table = group.teams.map(team => ({
    ...team,
    pts: 0,
    pj: 0,
    sg: 0,
  }))

  group.matches.forEach(match => {
    if (match.homeScore == null || match.awayScore == null) return

    const home = table.find(t => t.short === match.home)
    const away = table.find(t => t.short === match.away)

    if (!home || !away) return

    home.pj++
    away.pj++

    home.sg += match.homeScore - match.awayScore
    away.sg += match.awayScore - match.homeScore

    if (match.homeScore > match.awayScore) home.pts += 3
    else if (match.homeScore < match.awayScore) away.pts += 3
    else {
      home.pts += 1
      away.pts += 1
    }
  })

  return table.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    return b.sg - a.sg
  })
}

export default function Selt40Page() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/championship/${CHAMP_ID}`)
        const data = await res.json()
        setGroups(data?.groups ?? [])
      } catch (err) {
        console.log(err)
        setError("Erro ao carregar Copa Selt 40")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <div className="p-10">Carregando...</div>
  if (error) return <div className="p-10 text-red-500">{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        Copa Selt Promissão 40
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {groups.map(group => (
          <div
            key={group.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="bg-black text-white px-4 py-3 font-semibold">
              {group.name}
            </div>

            {/* TABELA */}
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
                    key={team.short}
                    className={`h-14 border-b border-gray-100 hover:bg-gray-50 ${
                      index === 0 ? "bg-green-50/60" : ""
                    }`}
                  >
                    <td className="px-3 text-center font-semibold">
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
                        <span className="font-medium">{team.short}</span>
                      </div>
                    </td>

                    <td className="text-center">{team.pts}</td>
                    <td className="text-center">{team.pj}</td>
                    <td className="text-center">{team.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* JOGOS */}
            <div className="px-4 py-4 bg-gray-50/60">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Jogos
              </h3>

              <div className="space-y-2">
                {group.matches.map((match, i) => {
                  const homeTeam = group.teams.find(
                    t => t.short?.trim().toUpperCase() === match.home?.trim().toUpperCase()
                  )

                  const awayTeam = group.teams.find(
                    t => t.short?.trim().toUpperCase() === match.away?.trim().toUpperCase()
                  )

                  const hasResult =
                    match.homeScore != null && match.awayScore != null

                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl px-3 py-2 flex justify-between border border-gray-100"
                    >
                      <div className="flex gap-2 text-sm">

                        {/* HOME */}
                        <div className="flex items-center gap-1" title={homeTeam?.name}>
                          {homeTeam?.logo && (
                            <Image
                              src={homeTeam.logo}
                              alt={homeTeam.name}
                              width={18}
                              height={18}
                              className="rounded-full"
                            />
                          )}
                          <span>{match.home}</span>
                        </div>

                        <span className="w-10 text-center">
                          {hasResult
                            ? `${match.homeScore} - ${match.awayScore}`
                            : "vs"}
                        </span>

                        {/* AWAY (corrigido de forma segura) */}
                        <div className="flex items-center gap-1" title={awayTeam?.name}>
                          {awayTeam?.logo && (
                            <Image
                              src={awayTeam.logo}
                              alt={awayTeam.name}
                              width={18}
                              height={18}
                              className="rounded-full"
                            />
                          )}
                          <span>{match.away}</span>
                        </div>

                      </div>

                      <div className="text-[11px] text-gray-400">
                        {hasResult
                          ? "Encerrado"
                          : `${match.date} ${match.time}`}
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