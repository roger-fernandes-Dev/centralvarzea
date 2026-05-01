"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Championships() {
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    async function fetchJogos() {
      try {
        const res = await fetch("/api/jogos")
        const data = await res.json()

        const agora = new Date()

        const passados = data
          .filter((jogo: any) => {
            const dataJogo = new Date(`${jogo.data}T${jogo.hora}`)
            return dataJogo <= agora
          })
          .sort(
            (a: any, b: any) =>
              new Date(`${b.data}T${b.hora}`).getTime() -
              new Date(`${a.data}T${a.hora}`).getTime()
          )

        setMatches(passados.slice(0, 5))
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      }
    }

    fetchJogos()
  }, [])

  return (
    <section className="w-full bg-white rounded-lg">
      <div className="flex flex-col divide-y divide-zinc-200 max-h-[420px] overflow-y-auto">

        {matches.map((match: any, i: number) => {
          const date = new Date(`${match.data}T00:00:00-03:00`).toLocaleDateString(
            "pt-BR",
            { day: "2-digit", month: "2-digit" }
          )

          return (
            <div
              key={i}
              className="px-4 py-3 hover:bg-zinc-50 transition"
            >

              {/* LINHA 1 - META (estilo GE) */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500">

                <div className="flex items-center gap-2">
                  <span>{date}</span>
                  <span>|</span>
                  <span className="truncate max-w-[180px]">
                    {match.local}
                  </span>
                </div>

                {/* FINALIZADO */}
                <span className="text-[10px] font-bold uppercase text-amber-500">
                  FINALIZADO
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

                {/* SCORE */}
                <span className="text-sm font-bold text-zinc-700 min-w-[40px] text-center">
                  {match.score ?? "-"}
                </span>

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

      {/* BOTÃO */}
      <div className="p-3 flex justify-center border-t border-zinc-200">
        <Link
          href="/jogos"
          className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition"
        >
          Ver mais
        </Link>
      </div>
    </section>
  )
}