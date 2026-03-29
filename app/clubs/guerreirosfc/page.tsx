import Image from "next/image"
export const metadata = {
  title: "Guerreirosfc em Promissão | Futebol de Várzea e Time Amador",
  description:
    "O Guerreirosfc é um dos times mais tradicionais do futebol de várzea em Promissão, com destaque em campeonatos amadores, união entre jogadores e forte presença no esporte local.",
  keywords: [
    "Guerreirosfc Promissão",
    "futebol de várzea Promissão",
    "time amador Promissão",
    "campeonatos de várzea",
    "futebol amador SP",
    "times de futebol Promissão",
    "equipe Guerreirosfc",
    "futebol local Promissão",
    "tradição no futebol de várzea",
    "time de bairro Promissão",
    "futebol regional interior SP"
  ],
  openGraph: {
    title: "Guerreirosfc | Time de Várzea em Promissão",
    description:
      "Conheça o Guerreirosfc, equipe tradicional do futebol de várzea em Promissão, com história, união e destaque em campeonatos amadores.",
    url: "https://www.centralvarzea.com.br/clubs/guerreirosfc",
    siteName: "Central Varzea",
    images: [
      {
        url: "/times/guerreirosfc.png",
        width: 1200,
        height: 630,
        alt: "Time Guerreirosfc de Promissão"
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function Guerreirosfc() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 🟣 Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
        <Image
          src="/times/guerreirosfc.png"
          alt="Logo Guerreiros FC"
          width={800}
          height={800}
          className="object-cover"
        />
      </div>

      {/* 🔳 camada branca */}
      <div className="absolute inset-0 bg-white/90 -z-10" />

      {/* 🔝 Banner topo*/}
      <div className="relative w-full h-[250px] md:h-[350px]">
        <Image
          src="/clubs/guerreirosfc/timeguerreiros.png"
          alt="Time Guerreiros FC"
          fill
          className="object-contain"
        />
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

          {/* 🏆 Título com brasão */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/times/guerreirosfc.png"
              alt="Escudo Bulldogs"
              width={100}
              height={100}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
              Guerreiros FC
            </h1>
          </div>

          {/* 📖 Espaço para texto futuro */}
          <div className="text-gray-800 leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto text-justify">
            {/* Texto do time será inserido aqui depois */}
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

      {/* 📱 Ads mobile (2x2 grid no celular) com proporção */}
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