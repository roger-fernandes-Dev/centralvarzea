import Image from "next/image"

export default function NextChampionships() {

  const matches = [
    {
      home: "/times/amigos_da_bola.png",
      homeName: "Amigos da Bola",
      away: "/times/falcoes.png",
      awayName: "Falcões",
      score: "X",
      type: "Amistoso",
      local: "Chacara do Danilo",
      date: "29/03",
      time: "08:15"
    },
    {
      home: "/times/amigos_da_bola.png",
      homeName: "Amigos da Bola",
      away: "/times/amigos_do_futebol40+.png",
      awayName: "Amigos do Futebol 40+",
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

              <div className="relative group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border border-gray-700">
                  <Image src={match.home} alt={match.homeName} fill className="object-cover" />
                </div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {match.homeName}
                </div>
              </div>

              <span className="font-semibold text-base">
                {match.score}
              </span>

              <div className="relative group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border border-gray-700">
                  <Image src={match.away} alt={match.awayName} fill className="object-cover" />
                </div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 
                  bg-black text-white text-[10px] px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {match.awayName}
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}