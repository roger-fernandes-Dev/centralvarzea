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
      title: "Jogo entre Amigos do Futebol e Amigos da Bola é cancelado por chuva",
      image: "/noticias/amigosdofutebol/jogocancelado.png",
      slug: "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola",
      resumo: "A partida em Avanhandava foi cancelada devido às fortes chuvas que deixaram o campo sem condições de jogo."
    },
    {
      title: "Poder de reaçao: Sporting Guaiçara sai atrás, mas luta até o fim e empata",
      image: "/noticias/sportingguaicara/spotingguaicaraempatecontramagos.png",
      slug: "sporting-guaicara-empata-com-magos",
      resumo: "O Sporting Guaiçara mostrou poder de reação..."
    },
    {
      title: "Julio e vini fecham com ADC",
      image: "/noticias/amigosdofutebol/contratacao_julio_vini.png",
      slug: "vini-e-junior-fecham-com-a-adc",
      resumo: "Julio e vini fecham com o time livre da ADC"
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
            <Link key={i} href={`/noticias/${n.slug}`} className="flex gap-3">
              <div className="relative w-28 h-20">
                <Image src={n.image} alt={n.title} fill className="object-cover" />
              </div>

              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.resumo}</p>
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