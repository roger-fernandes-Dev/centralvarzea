import Image from "next/image"

export default function Page() {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">

      {/* 🔝 BANNER ESTILO GE */}
      <div className="relative w-full h-[260px] md:h-[360px]">

        <Image
          src="/noticias/amigosdofutebol/foto_taca.png"
          alt="Time Amigos do Futebol"
          fill
          className="object-cover"
        />

        {/* overlay escuro */}
        <div className="absolute inset-0 bg-black/50" />

        {/* degradê inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* conteúdo do banner */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">

          <div className="flex items-center gap-4">

            <Image
              src="/times/amigos_do_futebol40.png"
              alt="Escudo"
              width={60}
              height={60}
              className="bg-white rounded-full p-1 shadow-lg"
            />

            <div>
              <h1 className="text-white text-2xl md:text-4xl font-extrabold uppercase tracking-wide">
                Amigos do Futebol
              </h1>

              <p className="text-white/80 text-xs md:text-sm">
                Promissão • Futebol de Várzea
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 📦 CONTEÚDO */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🟡 ADS ESQUERDA */}
        <div className="hidden md:flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-2">
            <div className="relative w-full h-[220px]">
              <Image src="/cegsegurosad/cegsegurosad.png" alt="" fill className="object-contain" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-2">
            <div className="relative w-full h-[220px]">
              <Image src="/mairenead/mairenead.png" alt="" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* 🟢 CONTEÚDO PRINCIPAL */}
        <div className="md:col-span-2">

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">

            <div className="text-gray-800 leading-relaxed text-[15px] md:text-base space-y-5 text-justify">

              <p>
                O <strong>Amigos do Futebol</strong> é um dos times mais tradicionais do futebol de várzea em Promissão,
                conhecido pela sua dedicação dentro de campo e pelo espírito de união entre seus atletas.
              </p>

              <div className="relative w-full h-64">
                <Image
                  src="/noticias/amigosdofutebol/foto_taca.png"
                  alt="Comemoração"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <p>
                Ao longo dos anos, o time construiu uma trajetória sólida no futebol amador,
                participando de diversos campeonatos e conquistando reconhecimento pela sua organização
                e competitividade.
              </p>

              <p>
                Com uma base forte de jogadores e apoio da torcida, o Amigos do Futebol segue evoluindo
                e consolidando seu nome como referência no futebol de várzea regional.
              </p>

            </div>

          </div>

        </div>

        {/* 🔵 ADS DIREITA */}
        <div className="hidden md:flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-2">
            <div className="relative w-full h-[220px]">
              <Image src="/flmarmitariaad/flmarmitariaad.png" alt="" fill className="object-contain" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-2">
            <div className="relative w-full h-[220px]">
              <Image src="/romaad/romaad.png" alt="" fill className="object-contain" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}