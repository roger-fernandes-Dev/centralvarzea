"use client"

import Image from "next/image"
import Link from "next/link"
import NewsCarousel from "@/components/home/NewsCarousel"
import LoopBanner from "@/components/home/LoopBannerNoticias"

type Noticia = {
  title: string
  image: string
  slug: string
  resumo: string
}

export default function Noticias() {

  const noticias: Noticia[] = [
    {
      title: "Poder de reaçao: Sporting Guaiçara sai atrás, mas luta até o fim e empata",
      image: "/noticias/sportingguaicara/spotingguaicaraempatecontramagos.png",
      slug: "sporting-guaicara-empata-com-magos",
      resumo: "O Sporting Guaiçara mostrou poder de reação ao buscar o empate após sair atrás no placar. Com raça e determinação, a equipe não desistiu e foi premiada pela luta até o fim"
    },
    {
      title: "Julio e vini fecham com ADC",
      image: "/noticias/amigosdofutebol/contratacao_julio_vini.png",
      slug: "vini-e-junior-fecham-com-a-adc",
      resumo: "Julio e vini fecham com o time livre da ADC, time ADC vem montando um grande elenco para 2026 "
    },
    {
      title: "Amigos do Futebol vence campeonato 50+",
      image: "/noticias/amigosdofutebol/foto_taca.png",
      slug: "amigos-do-futebol-vence-campeonato",
      resumo: "Partida intensa, mas time vence o campeonato e conquista troféu."
    },
    {
      title: "Time ADC agora aposta na categoria livre, e faz primeiro amistoso",
      image: "/noticias/renukaadc/amistoso_livre.png",
      slug: "adc-aposta-na-categoria-livre",
      resumo: "Time novo faz seu primeiro amistoso e termina com vitória"
    },
    {
      title: "Amigos do futebol comemora campeonato com samba no clube ADC",
      image: "/noticias/amigosdofutebol/festa_do_campeao.png",
      slug: "festa-do-campeao",
      resumo: "Equipe mostrou que manda bem na quadra e na festa."
    },
  ]

  return (
    <>
      <main className="max-w-6xl mx-auto px-4">

        {/* 🔥 CARROSSEL */}
        <div className="mb-8">
          <NewsCarousel />
        </div>

        {/* 📦 grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 🟢 lista de notícias */}
          <div className="md:col-span-2 space-y-4">

            {noticias.map((n, i) => (
              <Link
                key={i}
                href={`/noticias/${n.slug}`}
                className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                {/* imagem */}
                <div className="relative w-24 h-20 md:w-32 md:h-24 flex-shrink-0">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* texto */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-base md:text-lg leading-tight">
                    {n.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                    {n.resumo}
                  </p>
                </div>
              </Link>
            ))}

          </div>

          {/* 🔵 sidebar */}
          <div className="space-y-4">

            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Destaques</h4>
              <ul className="text-sm space-y-2">
                <li>⚽ Artilheiro da rodada</li>
                <li>🟥 Cartões da rodada</li>
                <li>📊 Classificação</li>
              </ul>
            </div>

            {/* patrocinio ajustado */}
            <div className="relative h-32 md:h-40 flex items-center justify-center rounded-lg overflow-hidden">
              <Image
                src="/suplementlins.png"
                alt="logo suplement lins"
                fill
                className="object-contain p-4"
              />
            </div>

          </div>

        </div>

      </main>

      {/* 🔁 BANNER FULL WIDTH NO RODAPÉ */}
      <div className="mt-8">
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <LoopBanner />
        </div>
      </div>
    </>
  )
}