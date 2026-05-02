import Image from "next/image"
export const metadata = {
  title: "Santa Terezinha em Lins | Futebol de Várzea e Time Amador",
  description:
    "O Santa Terezinha é um dos times mais tradicionais do futebol de várzea em lins, com destaque em campeonatos amadores, união entre jogadores e forte presença no esporte local.",
  keywords: [
    "Santa Terezinha de lins",
    "futebol de várzea lins",
    "time amador lins",
    "campeonatos de várzea",
    "futebol amador SP",
    "times de futebol lins",
    "equipe Santa Terezinha",
    "futebol local lins",
    "tradição no futebol de várzea",
    "time de bairro lins",
    "futebol regional interior SP"
  ],
  openGraph: {
    title: "Santa Terezinha | Time de Várzea em lins",
    description:
      "Conheça o Santa Terezinha equipe tradicional do futebol de várzea em lins, com história, união e destaque em campeonatos amadores.",
    url: "https://www.centralvarzea.com.br/clubs/santaterezinha",
    siteName: "Central Varzea",
    images: [
      {
        url: "/times/lins/santaterezinha.jpg",
        width: 1200,
        height: 630,
        alt: "Time Santa Terezinha de lins"
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function Bulldogs() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 🟣 Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
        <Image
          src="/times/lins/santaterezinha.jpg"
          alt="Logo Santa Terezinha"
          width={800}
          height={800}
          className="object-cover"
        />
      </div>

      {/* 🔳 camada branca */}
      <div className="absolute inset-0 bg-white/90 -z-10" />

      {/* 🔝 Banner topo*
      <Image
          src="/clubs/bulldogs/timebulldogs.png"
          alt="Time Bulldogs"
          fill
          className="object-contain"
        />/}
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

          {/* 🏆 Título com brasão */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/times/lins/santaterezinha.jpg"
              alt="Escudo Santa Terezinha"
              width={100}
              height={100}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
              Santa Terezinha
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