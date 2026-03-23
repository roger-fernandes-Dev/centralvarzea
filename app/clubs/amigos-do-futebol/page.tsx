import LoopBanner from "@/components/home/LoopBanner"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative w-full">

      {/* 🟩 Fundo da página (quadra) */}
      <Image
        src="/clubs/amigosdofutebol/amigosdofutebol3.png"
        alt="quadra"
        fill
        className="object-cover opacity-50 -z-10"
      />

      {/* 🔳 camada branca para melhorar leitura */}
      <div className="absolute inset-0 bg-white/80 -z-10" />

      {/* 🔝 Banner topo */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="/clubs/amigosdofutebol/amigosfutebol.png"
          alt="Time completo"
          fill
          className="object-contain"
        />
      </div>

      {/* 📦 Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* 🟡 Lado esquerdo (patrocínio) */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="relative bg-gray-200 h-32 flex items-center justify-center">
            <Image
              src="/cegseguros.png"
              alt="ceg seguros"
              fill
              className="object-fill"
            />
          </div>

          <div className="relative bg-gray-200 h-32 flex items-center justify-center">
            <Image
              src="/drogaria_geral.png"
              alt="drogaria geral"
              fill
              className="object-fill"
            />
          </div>
        </div>

        {/* 🟢 Conteúdo central */}
        <div className="md:col-span-2">

          <h1 className="text-2xl font-bold mb-4 text-center">
            Amigos do Futebol
          </h1>

          <p className="text-gray-700 leading-relaxed text-justify">
            O time Amigos do Futebol nasceu da união de jogadores apaixonados
            pelo esporte, com o objetivo de fortalecer a amizade e a competição
            saudável dentro de campo. Ao longo dos anos, o time construiu sua
            história baseada em dedicação, respeito e muita vontade de vencer.
          </p>

          {/* 🖼️ imagem no meio do texto */}
          <div className="float-left mr-4 my-4 w-60 h-48 relative">
            <Image
              src="/clubs/amigosdofutebol/amigosdofutebol2.png"
              alt="Comemoração"
              fill
              className="object-contain rounded"
            />
          </div>

          <p className="text-gray-700 leading-relaxed text-justify">
            Com participações marcantes em campeonatos locais, o grupo se destaca
            não apenas pelos resultados, mas também pela união dentro e fora de
            campo. Cada vitória é celebrada como uma conquista coletiva, reforçando
            o espírito de equipe.
          </p>

          <p className="text-gray-700 leading-relaxed text-justify mt-4 clear-both">
            O time continua evoluindo, sempre buscando novos desafios e mantendo
            viva a paixão pelo futebol que une todos os seus integrantes.
          </p>

        </div>

        {/* 🔵 Lado direito (patrocínio) */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="relative bg-gray-200 h-32 flex items-center justify-center">
            <Image
              src="/flmarmitaria.png"
              alt="drogaria geral"
              fill
              className="object-fill"
            />
          </div>
          <div className="relative bg-gray-200 h-32 flex items-center justify-center">
            <Image
              src="/roma_gelateria.png"
              alt="drogaria geral"
              fill
              className="object-fill"
            />
          </div>
        </div>

      </div>

      {/* 🔻 Patrocínio inferior */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="bg-gray-200 h-24 flex items-center justify-center">
         <LoopBanner />
        </div>
      </div>

    </div>
  )
}