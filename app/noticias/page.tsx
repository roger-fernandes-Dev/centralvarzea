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
      title: "Jogo entre Renuka ADC e Boleiros é cancelado devido ao Domingo de Páscoa",
      image: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
      slug: "jogo-cancelado-renuka-boleiros",
      resumo: "A partida que seria realizada no dia 05/04, na Arena ADC, foi cancelada em respeito ao Domingo de Páscoa, data importante de celebração e reunião familiar."
    },
    {
      title: "Jogo entre Amigos do Futebol e Amigos da Bola é cancelado por chuva",
      image: "/noticias/amigosdofutebol/jogocancelado.png",
      slug: "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola",
      resumo: "A partida em Avanhandava foi cancelada devido às fortes chuvas que deixaram o campo sem condições de jogo."
    },
    {
      title: "Poder de reação: Sporting Guaiçara sai atrás, mas luta até o fim e empata",
      image: "/noticias/sportingguaicara/spotingguaicaraempatecontramagos.png",
      slug: "sporting-guaicara-empata-com-magos",
      resumo: "O Sporting Guaiçara mostrou poder de reação..."
    },
    {
      title: "Amigos do Futebol vence campeonato 50+",
      image: "/noticias/amigosdofutebol/foto_taca.png",
      slug: "amigos-do-futebol-vence-campeonato",
      resumo: "Partida intensa"
    }
  ]

  return (
    <>
      <main className="max-w-6xl mx-auto px-4">

        <div className="mb-8">
          <NewsCarousel />
        </div>

        <div className="space-y-4">
          {noticias.map((n, i) => (
            <Link
              key={i}
              href={`/noticias/${n.slug}`}
              className="flex gap-3 items-start"
            >
              {/* IMAGEM PADRONIZADA */}
              <div className="relative w-28 aspect-video overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* TEXTO */}
              <div>
                <h3 className="font-semibold leading-snug">{n.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {n.resumo}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <div className="mt-8">
        <LoopBanner />
      </div>
    </>
  )
}