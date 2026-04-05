import Image from "next/image"
export const metadata = {
  title: "bem amigos em promissao | Futebol de Várzea e Time Amador",
  description:
    "O bem amigos promissao é um dos times mais tradicionais do futebol de várzea em promissao, com destaque em campeonatos amadores, união entre jogadores e forte presença no esporte local.",
  keywords: [
    "bem amigos promissao",
    "futebol de várzea promissao",
    "time amador promissao",
    "campeonatos de várzea",
    "futebol amador SP",
    "times de futebol promissao",
    "equipe bem amigos promissao",
    "futebol local promissao",
    "tradição no futebol de várzea",
    "time de bairro promissao",
    "futebol regional interior SP"
  ],
  openGraph: {
    title: "bem amigos promissao | Time de Várzea em Promissão",
    description:
      "Conheça o bem amigos promissao, equipe tradicional do futebol de várzea em promissao, com história, união e destaque em campeonatos amadores.",
    url: "https://www.centralvarzea.com.br/clubs/bemamigos",
    siteName: "Central Varzea",
    images: [
      {
        url: "/times/bemamigos.png",
        width: 1200,
        height: 630,
        alt: "Time bem amigos de promissao"
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function SportingGuaicaraPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 🔳 camada branca (fundo) */}
      <div className="absolute inset-0 bg-white/90 -z-20" />

      {/* 🟣 Marca d'água full screen */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/times/bemamigos.png"
          alt="Logo bem amigos"
          fill
          className="object-contain opacity-5"
        />
      </div>

      {/* 🔝 Banner topo
      <Image
          src="/times/magos.png"
          alt="Time Sporting Guaicara"
          fill
          className="object-contain"
        /> */}
      <div className="relative w-full h-[250px] md:h-[350px]">
        
      </div>

      {/* 📦 Conteúdo */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🟡 ESQUERDA (ads/patrocinadores) */}
        <div className="hidden md:flex flex-col items-center gap-6">
          <div className="relative w-[160px] h-[250px]">
            <Image src="/cegsegurosad/cegsegurosad.png" alt="Patrocinador" fill className="object-contain" />
          </div>
          <div className="relative w-[160px] h-[250px]">
            <Image src="/suplementelinsad/suplementelinsad.png" alt="Patrocinador" fill className="object-contain" />
          </div>
        </div>

        {/* 🟢 CENTRO */}
        <div className="md:col-span-2 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/times/bemamigos.png"
              alt="Escudo bem amigos"
              width={100}
              height={100}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
              bem amigos
            </h1>
          </div>
        </div>

        {/* 🔵 DIREITA (ads/patrocinadores) */}
        <div className="hidden md:flex flex-col items-center gap-6">
          <div className="relative w-[160px] h-[250px]">
            <Image src="/romaad/romaad.png" alt="Patrocinador" fill className="object-contain" />
          </div>
          <div className="relative w-[160px] h-[250px]">
            <Image src="/flmarmitariaad/flmarmitariaad.png" alt="Patrocinador" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* 📱 Ads mobile (2x2 grid) */}
      <div className="md:hidden max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 gap-4">
        <div className="relative w-full aspect-[160/250]">
          <Image src="/cegsegurosad/cegsegurosad.png" alt="Patrocinador" fill className="object-contain" />
        </div>
        <div className="relative w-full aspect-[160/250]">
          <Image src="/suplementelinsad/suplementelinsad.png" alt="Patrocinador" fill className="object-contain" />
        </div>
        <div className="relative w-full aspect-[160/250]">
          <Image src="/romaad/romaad.png" alt="Patrocinador" fill className="object-contain" />
        </div>
        <div className="relative w-full aspect-[160/250]">
          <Image src="/flmarmitariaad/flmarmitariaad.png" alt="Patrocinador" fill className="object-contain" />
        </div>
      </div>

    </div>
  )
}