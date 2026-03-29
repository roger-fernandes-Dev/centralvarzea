import Image from "next/image"

export default function RenkaADC() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* 🟣 Marca d'água */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
        <Image
          src="/times/renukaadc.png"
          alt="Logo Renuka ADC"
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
          src="/clubs/adc/timeadc.png"
          alt="Time Renuka ADC"
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
              src="/times/renukaadc.png"
              alt="Escudo Renuka ADC"
              width={100}
              height={100}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
              Renuka ADC
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