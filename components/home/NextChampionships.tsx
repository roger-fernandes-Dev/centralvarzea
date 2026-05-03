"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function NextChampionships() {
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    async function fetchJogos() {
      try {
        const res = await fetch("/api/jogos")
        const data = await res.json()

        const agora = new Date()

        const futuros = data.filter((jogo: any) => {
          const dataJogo = new Date(`${jogo.data}T${jogo.hora}:00-03:00`)

          const limite = new Date(dataJogo)
          limite.setHours(limite.getHours() + 6)

          if (jogo.score != null) return false

          return limite > agora
        })

        const ordenados = futuros.sort((a: any, b: any) => {
        const dataA = new Date(`${a.data}T${a.hora}:00-03:00`).getTime()
        const dataB = new Date(`${b.data}T${b.hora}:00-03:00`).getTime()
        return dataA - dataB
      })

setMatches(ordenados)
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      }
    }

    fetchJogos()
  }, [])

  return (
    <section className="w-full bg-white">
      <div className="flex flex-col divide-y divide-zinc-200 max-h-[420px] overflow-y-auto">

        {matches.map((match: any, i: number) => {
          const agora = new Date()
          const inicio = new Date(`${match.data}T${match.hora}:00-03:00`)

          const aoVivo =
            agora >= inicio &&
            agora <= new Date(inicio.getTime() + 4 * 60 * 60 * 1000)

          const date = new Date(`${match.data}T00:00:00-03:00`).toLocaleDateString(
            "pt-BR",
            { day: "2-digit", month: "2-digit" }
          )

          return (
            <div key={i} className="px-4 py-3 hover:bg-zinc-50 transition">

              {/* LINHA 1 - META */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500">

                <div className="flex items-center gap-2">
                  <span>{date}</span>
                  <span>{match.hora}</span>
                  <span>|</span>
                  <span className="truncate max-w-[180px]">
                    {match.type}
                  </span>
                </div>

                {/* STATUS (AO VIVO / AGENDADO) */}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                    aoVivo ? "text-red-600" : "text-amber-500"
                  }`}
                >
                  {aoVivo && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                  )}

                  {aoVivo ? "AO VIVO" : "AGENDADO"}
                </span>

              </div>

              {/* LINHA 2 - JOGO */}
              <div className="flex items-center justify-center gap-6 mt-2">

                {/* HOME */}
                <div className="flex items-center gap-2">
                  <Image
                    src={match.homeLogo}
                    alt={match.home}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="text-sm font-semibold text-zinc-900">
                    {match.home.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                <span className="text-zinc-400 font-semibold">X</span>

                {/* AWAY */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-900">
                    {match.away.slice(0, 3).toUpperCase()}
                  </span>
                  <Image
                    src={match.awayLogo}
                    alt={match.away}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </div>

              </div>

            </div>
          )
        })}

      </div>
    </section>
  )
}