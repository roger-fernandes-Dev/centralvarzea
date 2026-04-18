"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

function abreviar(nome: string) {
  return nome.slice(0, 3).toUpperCase()
}

export default function JogosPage() {
  const [upcoming, setUpcoming] = useState<any[]>([])
  const [finished, setFinished] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJogos() {
      try {
        const [resFuturos, resPassados] = await Promise.all([
          fetch("/api/jogos?tipo=futuros"),
          fetch("/api/jogos?tipo=passados"),
        ])

        const futuros = await resFuturos.json()
        const passados = await resPassados.json()

        const futurosOrdenados = futuros.sort(
          (a: any, b: any) =>
            new Date(`${a.data}T${a.hora}`).getTime() -
            new Date(`${b.data}T${b.hora}`).getTime()
        )

        const passadosOrdenados = passados.sort(
          (a: any, b: any) =>
            new Date(`${b.data}T${b.hora}`).getTime() -
            new Date(`${a.data}T${a.hora}`).getTime()
        )

        setUpcoming(futurosOrdenados)
        setFinished(passadosOrdenados)
      } catch (error) {
        console.error("Erro ao buscar jogos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJogos()
  }, [])

  if (loading) {
    return <div className="p-4">Carregando jogos...</div>
  }

  return (
    <div className="space-y-10 p-2 md:p-4">

      {/* PRÓXIMOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Próximos Jogos</h2>

        <div className="flex flex-col divide-y divide-gray-200">
          {upcoming.map((match: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-[140px_1fr_140px] items-center px-3 py-4 hover:bg-yellow-50"
            >
              {/* ESQUERDA */}
              <div className="flex flex-col text-xs text-gray-500">
                <span className="font-semibold text-yellow-700 truncate">
                  {match.type}
                </span>

                <span className="truncate">{match.local}</span>

                <span>
                  {new Date(match.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit"
                  })} • {match.hora}
                </span>
              </div>

              {/* MEIO */}
              <div className="flex items-center justify-center gap-6">

                {/* CASA */}
                <div className="flex items-center gap-2 group relative">
                  <Image
                    src={match.homeLogo}
                    alt={match.home}
                    width={28}
                    height={28}
                  />

                  <span className="text-sm font-medium">
                    {abreviar(match.home)}
                  </span>

                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                    bg-black text-white text-[10px] px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {match.home}
                  </div>
                </div>

                <span className="text-gray-400 font-semibold min-w-[40px] text-center">
                  x
                </span>

                {/* FORA */}
                <div className="flex items-center gap-2 group relative">
                  <span className="text-sm font-medium">
                    {abreviar(match.away)}
                  </span>

                  <Image
                    src={match.awayLogo}
                    alt={match.away}
                    width={28}
                    height={28}
                  />

                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                    bg-black text-white text-[10px] px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {match.away}
                  </div>
                </div>

              </div>

              <div />
            </div>
          ))}
        </div>
      </section>

      {/* RESULTADOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Resultados</h2>

        <div className="flex flex-col divide-y divide-gray-200">
          {finished.map((match: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-[140px_1fr_140px] items-center px-3 py-4 hover:bg-yellow-50"
            >
              {/* ESQUERDA */}
              <div className="flex flex-col text-xs text-gray-500">
                <span className="font-semibold text-yellow-700 truncate">
                  {match.type}
                </span>

                <span className="truncate">{match.local}</span>

                <span>
                  {new Date(match.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit"
                  })} • {match.hora}
                </span>
              </div>

              {/* MEIO */}
              <div className="flex items-center justify-center gap-6">

                {/* CASA */}
                <div className="flex items-center gap-2 group relative">
                  <Image
                    src={match.homeLogo}
                    alt={match.home}
                    width={28}
                    height={28}
                  />

                  <span className="text-sm font-medium">
                    {abreviar(match.home)}
                  </span>

                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                    bg-black text-white text-[10px] px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {match.home}
                  </div>
                </div>

                <span className="font-bold min-w-[40px] text-center">
                  {match.score ?? "-"}
                </span>

                {/* FORA */}
                <div className="flex items-center gap-2 group relative">
                  <span className="text-sm font-medium">
                    {abreviar(match.away)}
                  </span>

                  <Image
                    src={match.awayLogo}
                    alt={match.away}
                    width={28}
                    height={28}
                  />

                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                    bg-black text-white text-[10px] px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {match.away}
                  </div>
                </div>

              </div>

              <div />
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}