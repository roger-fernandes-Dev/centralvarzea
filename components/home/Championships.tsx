"use client"

import Image from "next/image"

export default function Championships({ matches }: any) {

  const fallback = [
    {
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/falcoes.png",
      away: "Falcões",
      score: "4 x 3",
      type: "Amistoso",
      date: "29/03",
      time: "08:15",
      local: "Chacara do Danilo"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/mec.png",
      away: "MEC",
      score: "2 x 2",
      type: "Amistoso",
      date: "29/03",
      time: "08:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/the_best.png",
      home: "The Best",
      awayLogo: "/times/aguias_de_Deus.png",
      away: "Águias de Deus",
      score: "4 x 2",
      type: "Amistoso",
      date: "29/03",
      time: "08:30",
      local: "Arena ADC - Campo B"
    },
    {
      homeLogo: "/times/magos.png",
      home: "Magos",
      awayLogo: "/times/sporting-guaicarafc.png",
      away: "Sporting Guaicara",
      score: "3 x 3",
      type: "Amistoso",
      date: "28/03",
      time: "16:00",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/unidosanchieta.png",
      home: "Unidos Anchieta",
      awayLogo: "/times/juventudefc.png",
      away: "Juventude FC",
      score: "4 x 5",
      type: "Amistoso",
      date: "28/03",
      time: "09:30",
      local: "Campo Santa Rita"
    },
    {
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/bahea.png",
      away: "Bahea",
      score: "10 x 3",
      type: "Amistoso",
      date: "22/03",
      time: "08:30",
      local: "Avanhandava"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/meninos_da_vila.png",
      away: "Meninos da Vila",
      score: "3 x 5",
      type: "Amistoso",
      date: "22/03",
      time: "08:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/bengala.png",
      home: "Bengala",
      awayLogo: "/times/the_best.png",
      away: "the best",
      score: "3 x 5",
      type: "Amistoso",
      date: "15/03",
      time: "08:30",
      local: "Promissão"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/bulldogs.png",
      away: "Bulldogs",
      score: "9 x 3",
      type: "Amistoso",
      date: "15/03",
      time: "08:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/the_best.png",
      away: "The best",
      score: "5 x 2",
      type: "Amistoso",
      date: "08/03",
      time: "08:30",
      local: "Arena ADC"
    }
  ]

  const data = matches && matches.length ? matches : fallback

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

              {/* PLACAR */}
              <span className="font-semibold text-base">
                {match.score ?? "-"}
              </span>

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