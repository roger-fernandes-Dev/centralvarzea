"use client"

import Image from "next/image"

export default function Championships({ matches }: any) {

  const fallback = [
    {
      homeLogo: "/times/juventus.png",
      home: "Juventus",
      awayLogo: "/times/claudineimotos.png",
      away: "Claudinei Motos",
      score: "4 x 6",
      type: "Amistoso",
      date: "11/04",
      time: "Arena Del Rey",
      local: "16:00"
    },
    {
      homeLogo: "/times/bemamigos.png",
      home: "Bem Amigos",
      awayLogo: "/times/mec.png",
      away: "MEC",
      score: "4 x 8",
      type: "Amistoso",
      date: "04/04",
      time: "16:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/meninos_da_vila.png",
      home: "meninos da vila",
      awayLogo: "/times/aguias_de_Deus.png",
      away: "Águias de Deus",
      score: "7 x 4",
      type: "Amistoso",
      date: "0/04",
      time: "08:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/ousadiafc.png",
      away: "Ousadia",
      score: "2 x 8",
      type: "Amistoso",
      date: "05/04",
      time: "08:30",
      local: "Arena ADC"
    },
    {
      homeLogo: "/times/the_best.png",
      home: "The best",
      awayLogo: "/times/quebrada_fc.png",
      away: "Quebrada FC",
      score: "9 x 7",
      type: "Amistoso",
      date: "05/04",
      time: "08:00",
      local: "Golden Ball - Guaiçara"
    },
    {
      homeLogo: "/times/amigosdavila.png",
      home: "Amigos da Vila",
      awayLogo: "/times/cruzeirodosalla.png",
      away: "Cruzeiro do Salla",
      score: "15 x 6",
      type: "Amistoso",
      date: "04/04",
      time: "16:00",
      local: "Centro de lazer(barbosa)"
    },
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
      local: "Arena ADC"
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
    <section className="rounded-xl shadow">

      <div className="flex flex-col divide-y divide-gray-200 max-h-[420px] overflow-y-auto">

        {data.map((match: any, i: number) => (
          <div
            key={i}
            className="flex items-center px-2 py-3 hover:bg-yellow-50 transition"
          >

            {/* ESQUERDA */}
            <div className="
              w-[95px] min-w-[95px] 
              lg:w-[100px] lg:min-w-[100px]
              flex flex-col text-[11px] text-gray-500
            ">
              
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

            {/* MEIO */}
            <div className="
              flex-1 flex items-center justify-center 
              gap-2 lg:gap-3
            ">

              {/* CASA */}
              <div className="flex items-center gap-1 group relative">
                <Image
                  src={match.homeLogo}
                  alt={match.home}
                  width={24}
                  height={24}
                  className="rounded-full"
                />

                <span className="text-xs lg:text-sm font-medium text-gray-800">
                  {match.home.slice(0, 3).toUpperCase()}
                </span>

                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {match.home}
                </div>
              </div>

              {/* PLACAR */}
              <span className="
                text-xs lg:text-sm font-bold text-gray-700 
                whitespace-nowrap min-w-[45px] text-center
              ">
                {match.score ?? "-"}
              </span>

              {/* FORA */}
              <div className="flex items-center gap-1 group relative">
                <span className="text-xs lg:text-sm font-medium text-gray-800">
                  {match.away.slice(0, 3).toUpperCase()}
                </span>

                <Image
                  src={match.awayLogo}
                  alt={match.away}
                  width={24}
                  height={24}
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