"use client"

import Image from "next/image"

export default function NextChampionships({ matches = [] }: any) {

  const fallback = [
    {
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da Bola",
      awayLogo: "/times/amigos_do_futebol40.png",
      away: "Amigos do Futebol",
      date: "12/04",
      time: "08:15",
      local: "Arena Caju",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/sporting-guaicarafc.png",
      home: "Sporting Guaiçara",
      awayLogo: "/times/bulldogs.png",
      away: "Bull Dogs",
      date: "12/04",
      time: "08:30",
      local: "Arena Travalão",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/mec.png",
      home: "MEC",
      awayLogo: "/times/afirma.png",
      away: "FIRMA",
      date: "12/04",
      time: "08:00",
      local: "Arena ADC - Campo A",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/aguias_de_Deus.png",
      home: "Aguias de Deus",
      awayLogo: "/times/maxelite.png",
      away: "Max Elite",
      date: "12/04",
      time: "08:00",
      local: "Arena ADC - Campo A",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/napoli.png",
      away: "Napoli",
      date: "12/04",
      time: "08:00",
      local: "Arena ADC - Campo B",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/casinhafc.png",
      home: "Casinha FC",
      awayLogo: "/times/unidos_sao_joao.png",
      away: "Unidos São João",
      date: "12/04",
      time: "08:00",
      local: "Arena ADC - Campo B",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/mancheslins.png",
      home: "Manches Lins",
      awayLogo: "/times/molecada.png",
      away: "Molecada",
      date: "12/04",
      time: "10:00",
      local: "Pasetto Stadium",
      type: "Copa Bá"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/casinhafc.png",
      away: "casinha fc",
      date: "12/04",
      time: "08:30",
      local: "Arena ADC",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/haiti.png",
      home: "Haiti",
      awayLogo: "/times/franca.png",
      away: "França",
      date: "14/04",
      time: "19:15",
      local: "Lago Azul - Penápolis",
      type: "Minicampo veteranos"
    },
    {
      homeLogo: "/times/nova_alianca.png",
      home: "Nova Aliança",
      awayLogo: "/times/point.png",
      away: "Point",
      date: "19/04",
      time: "08:00",
      local: "Arena ADC - Campo A",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/boleirosfc.png",
      home: "Boleiros",
      awayLogo: "/times/os_paraibas.png",
      away: "Os Paraíbas",
      date: "19/04",
      time: "08:00",
      local: "Arena ADC - Campo A",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/sporting-guaicarafc.png",
      home: "Sporting Guaiçara",
      awayLogo: "/times/the_best.png",
      away: "The Best",
      date: "19/04",
      time: "08:00",
      local: "Arena ADC - Campo B",
      type: "Copa ADC"
    },
    {
      homeLogo: "/times/magos.png",
      home: "Magos",
      awayLogo: "/times/raizesportiva.png",
      away: "Raiz Esportiva",
      date: "19/04",
      time: "08:00",
      local: "Arena ADC - Campo B",
      type: "Copa ADC"
    },
  ]

  const data = matches.length ? matches : fallback

  return (
    <section className="h-full">

      <div className="flex flex-col divide-y divide-gray-200 max-h-[420px] overflow-y-auto">

        {data.map((match: any, i: number) => (
          <div
            key={i}
            className="flex items-center px-3 py-4 hover:bg-yellow-50 transition"
          >

            {/* ESQUERDA FIXA */}
            <div className="w-[140px] min-w-[140px] flex flex-col text-xs text-gray-500">
              
              {/* 👇 AQUI MUDOU */}
              <span className="font-semibold text-yellow-700 truncate">
                {match.type}
              </span>

              <span className="truncate">
                {match.local}
              </span>

              <span>
                {match.date} • {match.time}
              </span>
            </div>

            {/* MEIO FLEX */}
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