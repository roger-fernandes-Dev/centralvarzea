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

          // delay de 6 horas
          dataJogo.setHours(dataJogo.getHours() + 6)

          return dataJogo > agora
        })

        setMatches(futuros)
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      }
    }

    fetchJogos()
  }, [])

  return (
    <section className="h-full">
      <div className="flex flex-col divide-y divide-gray-200 max-h-[420px] overflow-y-auto">

        {matches.map((match: any, i: number) => {

          const agora = new Date()
          const inicio = new Date(`${match.data}T${match.hora}:00-03:00`)

          const limiteAoVivo = new Date(inicio)
          limiteAoVivo.setHours(limiteAoVivo.getHours() + 4)

          const limiteTotal = new Date(inicio)
          limiteTotal.setHours(limiteTotal.getHours() + 6)

          const aoVivo = !match.score && agora >= inicio && agora <= limiteAoVivo
          const encerrado = !match.score && agora > limiteAoVivo && agora <= limiteTotal

          return (
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

                <span className="flex items-center">
                  {new Date(match.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit"
                  })} • {match.hora}

                  {aoVivo && (
                    <span className="ml-2 flex items-center gap-1 text-[10px] text-red-600 font-semibold animate-pulse">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      AO VIVO
                    </span>
                  )}
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
          )
        })}

      </div>
    </section>
  )
}