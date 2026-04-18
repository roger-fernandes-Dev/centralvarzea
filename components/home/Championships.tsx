"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Championships() {
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    async function fetchJogos() {
      try {
        const res = await fetch("/api/jogos?tipo=passados")
        const data = await res.json()

        // 👇 pega só os 5 mais recentes
        const ordenados = data.sort(
          (a: any, b: any) =>
            new Date(`${b.data}T${b.hora}`).getTime() -
            new Date(`${a.data}T${a.hora}`).getTime()
        )

        setMatches(ordenados.slice(0, 5))
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      }
    }

    fetchJogos()
  }, [])

  return (
    <section className="rounded-xl shadow">
      <div className="flex flex-col divide-y divide-gray-200 max-h-[420px] overflow-y-auto">

        {matches.map((match: any, i: number) => (
          <div
            key={i}
            className="flex items-center px-2 py-3 hover:bg-yellow-50 transition"
          >

            {/* ESQUERDA */}
            <div className="w-[95px] min-w-[95px] lg:w-[100px] lg:min-w-[100px] flex flex-col text-[11px] text-gray-500">
              
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
            <div className="flex-1 flex items-center justify-center gap-2 lg:gap-3">

              <div className="flex items-center gap-1 group relative">
                <Image src={match.homeLogo} alt={match.home} width={24} height={24} className="rounded-full" />
                <span className="text-xs lg:text-sm font-medium text-gray-800">
                  {match.home.slice(0, 3).toUpperCase()}
                </span>
              </div>

              <span className="text-xs lg:text-sm font-bold text-gray-700 min-w-[45px] text-center">
                {match.score ?? "-"}
              </span>

              <div className="flex items-center gap-1 group relative">
                <span className="text-xs lg:text-sm font-medium text-gray-800">
                  {match.away.slice(0, 3).toUpperCase()}
                </span>
                <Image src={match.awayLogo} alt={match.away} width={24} height={24} className="rounded-full" />
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* 👇 BOTÃO */}
      <div className="p-3 flex justify-center">
        <Link
          href="/jogos"
          className="text-sm font-semibold text-yellow-700 hover:underline"
        >
          Ver mais
        </Link>
      </div>
    </section>
  )
}