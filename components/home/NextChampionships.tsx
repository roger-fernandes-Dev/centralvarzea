"use client"

import Image from "next/image"

export default function NextChampionships({ matches = [] }: any) {

  const fallback = [
    {
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/falcoes.png",
      away: "Falcões",
      date: "29/03",
      time: "08:15",
      local: "Chacara do Danilo",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/aguias_de_deus.png",
      home: "Águias de Deus",
      awayLogo: "/times/the_best.png",
      away: "The Best",
      date: "29/03",
      time: "08:30",
      local: "Renuka ADC - Campo B",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/mec.png",
      away: "MEC",
      date: "29/03",
      time: "08:30",
      local: "Arena ADC",
      type: "Amistoso"
    },
    {
      homeLogo: "/times/amigos_do_futebol40+.png",
      home: "Amigos do futebol",
      awayLogo: "/times/amigos_da_bola.png",
      away: "Amigos da bola",
      date: "01/04",
      time: "19:15",
      local: "Arena Cajú",
      type: "Amistoso"
    }
  ]

  const data = matches.length ? matches : fallback

  return (
    <section className="bg-black rounded-xl shadow p-3">

      <div className="flex flex-col divide-y divide-gray-800 max-h-[400px] overflow-y-auto pr-1 custom-scroll">

        {data.map((match: any, i: number) => (
          <div key={i} className="py-3 px-2 hover:bg-gray-900 rounded text-white">

            <span className="text-xs text-gray-400">
              {match.type}
            </span>

            {/* INFO */}
            <div className="text-xs text-gray-300 mt-1 flex flex-wrap gap-2">
              <span>📍 {match.local}</span>
              <span>• {match.date}</span>
              <span>• {match.time}</span>
            </div>

            <div className="flex items-center justify-between mt-2">

              {/* CASA */}
              <div className="relative group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src={match.homeLogo} alt={match.home} fill className="object-cover" />
                </div>

                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {match.home}
                </div>
              </div>

              <span className="font-semibold">VS</span>

              {/* FORA */}
              <div className="relative group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image src={match.awayLogo} alt={match.away} fill className="object-cover" />
                </div>

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