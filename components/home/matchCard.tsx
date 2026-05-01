import Image from "next/image"

type Jogo = {
  id: string
  home: string
  homeLogo: string
  away: string
  awayLogo: string
  score?: string
  type: string
}

export default function MatchCard({ jogo }: { jogo: Jogo }) {
  if (!jogo.score) return null

  const [golsCasa, golsFora] = jogo.score.split(" x ").map(Number)

  const casaVenceu = golsCasa > golsFora
  const foraVenceu = golsFora > golsCasa

  return (
<div className="relative min-w-[240px] h-[120px] sm:h-[130px] snap-start rounded-2xl overflow-hidden text-white shadow-lg">

      <Image
        src="/fundo_clubs.png"
        alt="fundo"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/80" />

  <div className="relative z-10 p-2.5 flex flex-col gap-1">

        <p className="text-xs opacity-80 truncate">
          {jogo.type}
        </p>

        {/* casa */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 max-w-[75%]">

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={jogo.homeLogo} alt="" width={20} height={20} className="object-contain" />
            </div>

            <span className={`text-sm sm:text-base truncate ${casaVenceu ? "font-bold" : "opacity-90"}`}>
              {jogo.home}
            </span>
          </div>

          <span className={`text-lg sm:text-xl ml-2 ${casaVenceu ? "text-green-400 font-bold" : ""}`}>
            {golsCasa}
          </span>
        </div>

        {/* fora */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 max-w-[75%]">

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={jogo.awayLogo} alt="" width={20} height={20} className="object-contain" />
            </div>

            <span className={`text-sm sm:text-base truncate ${foraVenceu ? "font-bold" : "opacity-90"}`}>
              {jogo.away}
            </span>
          </div>

          <span className={`text-lg sm:text-xl ml-2 ${foraVenceu ? "text-green-400 font-bold" : ""}`}>
            {golsFora}
          </span>
        </div>

      </div>
    </div>
  )
}