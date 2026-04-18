"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function NextChampionships() {
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    async function fetchJogos() {
      try {
        const res = await fetch("/api/jogos?tipo=futuros")
        const data = await res.json()
        setMatches(data)
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      }
    }

    fetchJogos()
  }, [])

  return (
    <section className="h-full">
      <div className="flex flex-col divide-y divide-gray-200 max-h-[420px] overflow-y-auto">

        {matches.map((match: any, i: number) => (
          <div
            key={i}
            className="flex items-center px-3 py-4 hover:bg-yellow-50 transition"
          >

            {/* ESQUERDA */}
            <div className="w-[140px] min-w-[140px] flex flex-col text-xs text-gray-500">
              
              <span className="font-semibold text-yellow-700 truncate">
                {match.type}
              </span>

              <span className="truncate">
                {match.local}
              </span>

              <span>
                {new Date(match.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit"
                })} • {match.hora}
              </span>
            </div>

            {/* MEIO */}
            <div className="flex-1 flex items-center justify-center gap-6">

              {/* CASA */}
              <div className="flex items-center gap-2 group relative">
                <Image
                  src={match.homeLogo}
                  alt={match.home}
                  width={28}
                  height={28}
                  className="rounded-full"
                />

                <span className="text-sm font-medium">
                  {match.home.slice(0, 3).toUpperCase()}
                </span>

                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {match.home}
                </div>
              </div>

              <span className="text-sm font-semibold text-gray-400">
                x
              </span>

              {/* FORA */}
              <div className="flex items-center gap-2 group relative">
                <span className="text-sm font-medium">
                  {match.away.slice(0, 3).toUpperCase()}
                </span>

                <Image
                  src={match.awayLogo}
                  alt={match.away}
                  width={28}
                  height={28}
                  className="rounded-full"
                />

                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {match.away}
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  )
}