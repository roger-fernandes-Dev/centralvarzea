import Image from "next/image"
export const metadata = {
  title: "Amigos do Futebol em Promissão | Futebol de Várzea e Time Amador",
  description:
    "O Amigos do Futebol é um dos times mais tradicionais do futebol de várzea em Promissão, com destaque em campeonatos amadores, união entre jogadores e forte presença no esporte local.",
  keywords: [
    "Amigos do Futebol Promissão",
    "futebol de várzea Promissão",
    "time amador Promissão",
    "campeonatos de várzea",
    "futebol amador SP",
    "times de futebol Promissão",
    "equipe Amigos do Futebol",
    "futebol local Promissão",
    "tradição no futebol de várzea",
    "time de bairro Promissão",
    "futebol regional interior SP"
  ],
  openGraph: {
    title: "Amigos do Futebol | Time de Várzea em Promissão",
    description:
      "Conheça o Amigos do Futebol, equipe tradicional do futebol de várzea em Promissão, com história, união e destaque em campeonatos amadores.",
    url: "https://www.centralvarzea.com.br/clubs/amigos-do-futebol",
    siteName: "Central Várzea",
    images: [
      {
        url: "/noticias/amigosdofutebol/foto_taca.png",
        width: 1200,
        height: 630,
        alt: "Time Amigos do Futebol de Promissão"
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}
export default function Page() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 🟣 Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
        <Image
          src="/times/amigos_do_futebol40.png"
          alt="Logo Amigos do Futebol"
          width={800}
          height={800}
          className="object-cover"
        />
      </div>

      {/* 🔳 camada branca */}
      <div className="absolute inset-0 bg-white/90 -z-10" />

      {/* 🔝 Banner topo */}
      <div className="relative w-full h-[250px] md:h-[350px]">
        <Image
          src="/noticias/amigosdofutebol/foto_taca.png"
          alt="Time Amigos do Futebol"
          fill
          className="object-cover"
        />
      </div>

      {/* 📦 Conteúdo */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🟡 ESQUERDA */}
        <div className="hidden md:flex flex-col items-center gap-6">
          <div className="relative w-[160px] h-[250px] overflow-hidden rounded">
            <Image src="/cegsegurosad/cegsegurosad.png" alt="Patrocinador" fill className="object-contain" />
          </div>
          <div className="relative w-[160px] h-[250px] overflow-hidden rounded">
            <Image src="/mairenead/mairenead.png" alt="Patrocinador" fill className="object-cover" />
          </div>
        </div>

        {/* 🟢 CENTRO */}
        <div className="md:col-span-2 text-center">

          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/times/amigos_do_futebol40.png"
              alt="Escudo Amigos do Futebol"
              width={50}
              height={50}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
              Amigos do Futebol
            </h1>
          </div>

          <div className="text-gray-800 leading-relaxed text-[15px] md:text-base max-w-2xl mx-auto text-justify">

            <p>
              O <strong>Amigos do Futebol</strong> é um dos times mais tradicionais do futebol de várzea em Promissão,
              conhecido pela sua dedicação dentro de campo e pelo espírito de união entre seus atletas.
              Fundado com o objetivo de promover o esporte amador, o clube rapidamente se destacou nas competições locais.
            </p>

            <div className="relative w-full h-64 my-6">
              <Image
                src="/noticias/amigosdofutebol/foto_taca.png"
                alt="Amigos do Futebol comemoração"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <p>
              Ao longo dos anos, o time construiu uma trajetória sólida no futebol amador, participando de diversos campeonatos
              de várzea e conquistando reconhecimento pela sua organização, competitidade e respeito aos adversários.
              A equipe representa com orgulho a comunidade local e mantém viva a paixão pelo futebol.
            </p>

            <p className="mt-4">
              Com uma base forte de jogadores e apoio da torcida, o Amigos do Futebol segue em constante evolução,
              buscando novos títulos e consolidando seu nome como referência no futebol de várzea regional.
            </p>

          </div>
        </div>

        {/* 🔵 DIREITA */}
        <div className="hidden md:flex flex-col items-center gap-6">
          <div className="relative w-[160px] h-[250px] overflow-hidden rounded">
            <Image src="/flmarmitariaad/flmarmitariaad.png" alt="Patrocinador" fill className="object-cover" />
          </div>
          <div className="relative w-[160px] h-[250px] overflow-hidden rounded">
            <Image src="/romaad/romaad.png" alt="Patrocinador" fill className="object-cover" />
          </div>
        </div>

      </div>
    </div>
  )
}