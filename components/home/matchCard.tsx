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
    <div className="relative min-w-[240px] h-[180px] snap-start rounded-2xl overflow-hidden text-white shadow-lg">

      {/* imagem de fundo */}
      <Image
        src="/fundo_clubs.png"
        alt="fundo"
        fill
        className="object-cover"
      />

      {/* overlay escuro */}
      <div className="absolute inset-0 bg-black/80" />

      {/* conteúdo */}
      <div className="relative z-10 p-4 flex flex-col justify-between h-full">

        {/* campeonato */}
        <p className="text-xs opacity-80 truncate">
          {jogo.type}
        </p>

        {/* casa */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">

            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={jogo.homeLogo} alt="" width={22} height={22} className="object-contain" />
            </div>

            <span className={`text-sm truncate ${casaVenceu ? "font-bold" : "opacity-90"}`}>
              {jogo.home}
            </span>
          </div>

          <span className={`text-xl ${casaVenceu ? "text-green-400 font-bold" : ""}`}>
            {golsCasa}
          </span>
        </div>

        {/* fora */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">

            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image src={jogo.awayLogo} alt="" width={22} height={22} className="object-contain" />
            </div>

            <span className={`text-sm truncate ${foraVenceu ? "font-bold" : "opacity-90"}`}>
              {jogo.away}
            </span>
          </div>

          <span className={`text-xl ${foraVenceu ? "text-green-400 font-bold" : ""}`}>
            {golsFora}
          </span>
        </div>

      </div>
    </div>
  )
}