import Image from "next/image"

export default function NextChampionships() {

  const matches = [
    {
      home: "/times/amigos_da_bola.png",
      away: "/times/amigos_do_futebol40+.png",
      score: "X",
      type: "Amistoso",
      local: "Arena Caju",
      date: "01/04",
      time: "19:15"
    },
  ]

  return (
    <section className="bg-black rounded-xl shadow p-3">

      <h2 className="font-bold text-lg mb-6 text-white">
        Próximos jogos
      </h2>

      {/* scroll aqui */}
      <div className="flex flex-col divide-y divide-gray-800 max-h-[400px] overflow-y-auto pr-1 custom-scroll">

        {matches.map((match, i) => (
          <div
            key={i}
            className="py-3 px-2 cursor-pointer hover:bg-gray-900 rounded text-white"
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

              <div className="relative w-12 h-12">
                <Image
                  src={match.home}
                  alt="time casa"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="font-semibold text-base">
                {match.score}
              </span>

              <div className="relative w-12 h-12">
                <Image
                  src={match.away}
                  alt="time visitante"
                  fill
                  className="object-contain"
                />
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}