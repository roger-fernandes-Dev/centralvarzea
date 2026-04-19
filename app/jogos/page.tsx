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
              className="grid grid-cols-[90px_1fr] sm:grid-cols-[140px_1fr_140px] items-center px-2 py-4 hover:bg-yellow-50"
            >
              {/* ESQUERDA */}
              <div className="flex flex-col text-[11px] text-gray-500">
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
              <div className="flex items-center justify-center gap-3 whitespace-nowrap">

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Image src={match.homeLogo} alt={match.home} width={24} height={24} />
                  <span className="text-xs sm:text-sm font-medium">
                    {abreviar(match.home)}
                  </span>
                </div>

                <span className="text-gray-400 font-semibold min-w-[35px] text-center">
                  x
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium">
                    {abreviar(match.away)}
                  </span>
                  <Image src={match.awayLogo} alt={match.away} width={24} height={24} />
                </div>

              </div>

              <div className="hidden sm:block" />
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
              className="grid grid-cols-[90px_1fr] sm:grid-cols-[140px_1fr_140px] items-center px-2 py-4 hover:bg-yellow-50"
            >
              {/* ESQUERDA */}
              <div className="flex flex-col text-[11px] text-gray-500">
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
              <div className="flex items-center justify-center gap-3 whitespace-nowrap">

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Image src={match.homeLogo} alt={match.home} width={24} height={24} />
                  <span className="text-xs sm:text-sm font-medium">
                    {abreviar(match.home)}
                  </span>
                </div>

                <span className="font-bold min-w-[40px] text-center">
                  {match.score ?? "-"}
                </span>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium">
                    {abreviar(match.away)}
                  </span>
                  <Image src={match.awayLogo} alt={match.away} width={24} height={24} />
                </div>

              </div>

              <div className="hidden sm:block" />
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}