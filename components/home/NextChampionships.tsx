"use client"

import Image from "next/image"

export default function NextChampionships({ matches = [] }: any) {

  const fallback = [
    {
      homeLogo: "/times/juventus.png",
      home: "Juventus",
      awayLogo: "/times/claudineimotos.png",
      away: "Claudinei Motos",
      date: "11/04",
      time: "16:00",
      local: "Arena Del Rey",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/mexico.png",
      home: "México",
      awayLogo: "/times/novazelandia.png",
      away: "Nova Zelandias",
      date: "07/04",
      time: "20:30",
      local: "Lago Azul",
      type: "Minicampo veteranos"
    },
    {
      homeLogo: "/times/alemanha.png",
      home: "Alemanha",
      awayLogo: "/times/colombia.png",
      away: "Colombia",
      date: "08/04",
      time: "17:15",
      local: "Lago Azul",
      type: "Minicampo veteranos"
    },
    {
      homeLogo: "/times/espanha.png",
      home: "Espanha",
      awayLogo: "/times/usa.png",
      away: "Estados Unidos",
      date: "08/04",
      time: "20:30",
      local: "Lago Azul",
      type: "Minicampo veteranos"
    },
    {
      homeLogo: "/times/uruguai.png",
      home: "Uruguai",
      awayLogo: "/times/marrocos.png",
      away: "Marrocos",
      date: "09/04",
      time: "20:30",
      local: "Lago Azul",
      type: "Minicampo veteranos"
    },
    {
      homeLogo: "/times/mec.png",
      home: "MEC",
      awayLogo: "/times/afirma.png",
      away: "FIRMA",
      date: "12/04",
      time: "07:30",
      local: "Arena ADC",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/mancheslins.png",
      home: "Manches Lins",
      awayLogo: "/times/molecada.png",
      away: "Molecada",
      date: "12/04",
      time: "10:00",
      local: "Psetto Stadium",
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
      local: "Lago Azul",
      type: "Minicampo veteranos"
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