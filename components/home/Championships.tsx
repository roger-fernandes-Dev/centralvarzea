import Image from "next/image"

export default function Championships() {

  const matches = [
    {
      home: "/times/unidosanchieta.png",
      homeName: "Unidos Anchieta",
      away: "/times/juventudefc.png",
      awayName: "Juventude FC",
      score: "4 x 5",
      type: "Amistoso",
      local: "Campo Santa Rita",
      date: "28/03",
      time: "09:30"
    },
    {
      home: "/times/amigos_da_bola.png",
      homeName: "Amigos da Bola",
      away: "/times/bahea.png",
      awayName: "Bahea",
      score: "10 x 3",
      type: "Amistoso",
      local: "Avanhandava",
      date: "22/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      homeName: "Renuka ADC",
      away: "/times/meninos_da_vila.png",
      awayName: "Meninos da Vila",
      score: "3 x 5",
      type: "Amistoso",
      local: "Arena ADC",
      date: "22/03",
      time: "08:30"
    },
    {
      home: "/times/bengala.png",
      homeName: "Bengala",
      away: "/times/the_best.png",
      awayName: "The Best",
      score: "6 x 9",
      type: "Amistoso",
      local: "Promissão",
      date: "15/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      homeName: "Renuka ADC",
      away: "/times/bulldogs.png",
      awayName: "Bulldogs",
      score: "9 x 3",
      type: "Amistoso",
      local: "Arena ADC",
      date: "15/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      homeName: "Renuka ADC",
      away: "/times/the_best.png",
      awayName: "The Best",
      score: "5 x 2",
      type: "Amistoso",
      local: "Arena ADC",
      date: "08/03",
      time: "08:30"
    },
  ]

  return (
    <section className="bg-black rounded-xl shadow p-3">

      <h2 className="font-bold text-lg mb-4 text-white">
        Jogos Finalizados
      </h2>

      <div className="flex flex-col divide-y divide-gray-800 max-h-[400px] overflow-y-auto pr-1 custom-scroll">

        {matches.map((match, i) => (
          <div
            key={i}
            className="py-3 px-2 hover:bg-gray-900 rounded text-white"
          >

            <span className="text-xs text-gray-400">
              {match.type}
            </span>

            <div className="text-xs text-gray-300 mt-1 flex flex-wrap gap-2">
              <span>📍 {match.local}</span>
              <span>• {match.date}</span>
              <span>• {match.time}</span>
            </div>

            <div className="flex items-center justify-between mt-2">

              {/* Time da casa */}
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden bg-white border border-gray-700"
                title={match.homeName}
              >
                <Image
                  src={match.home}
                  alt="time casa"
                  fill
                  className="object-cover"
                />
              </div>

              <span className="font-semibold text-base">
                {match.score}
              </span>

              {/* Time visitante */}
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden bg-white border border-gray-700"
                title={match.awayName}
              >
                <Image
                  src={match.away}
                  alt="time visitante"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}