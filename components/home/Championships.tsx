import Image from "next/image"

export default function Championships() {

  const matches = [
    {
      home: "/times/amigos_da_bola.png",
      away: "/times/bahea.png",
      score: "10 x 3",
      type: "Amistoso",
      local: "Avanhandava",
      date: "22/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      away: "/times/meninos_da_vila.png",
      score: "3 x 5",
      type: "Amistoso",
      local: "Arena ADC",
      date: "22/03",
      time: "08:30"
    },
    {
      home: "/times/bengala.png",
      away: "/times/the_best.png",
      score: "6 x 9",
      type: "Amistoso",
      local: "Promissão",
      date: "15/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      away: "/times/bulldogs.png",
      score: "9 x 3",
      type: "Amistoso",
      local: "Arena ADC",
      date: "15/03",
      time: "08:30"
    },
    {
      home: "/times/renukaadc.png",
      away: "/times/the_best.png",
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

  {/* container com scroll */}
  <div className="flex flex-col divide-y divide-gray-800 max-h-[400px] overflow-y-auto pr-1">

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