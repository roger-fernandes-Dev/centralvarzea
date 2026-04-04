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
  categoria?: string
  data?: string
}

export default function Noticias() {

  const noticias: Noticia[] = [
    {
      title: "Campeonato de Mini Campo em Promissão abre inscrições",
      image: "/noticias/campeonatos/minicampopromissao.png",
      slug: "minicampo-promissao-inscricoes",
      resumo: "Estão abertas, de 30/03 até 07/04...",
      categoria: "Campeonato",
      data: "há 2h"
    },
    {
      title: "Jogo entre Renuka ADC e Boleiros é cancelado devido ao Domingo de Páscoa",
      image: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
      slug: "jogo-cancelado-renuka-boleiros",
      resumo: "A partida que seria realizada no dia 05/04...",
      categoria: "Comunicado",
      data: "há 5h"
    },
    {
      title: "Jogo cancelado por chuva em Avanhandava",
      image: "/noticias/amigosdofutebol/jogocancelado.png",
      slug: "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola",
      resumo: "O campo ficou sem condições de jogo...",
      categoria: "Clima",
      data: "há 1 dia"
    },
    {
      title: "Sporting Guaiçara mostra reação e empata",
      image: "/noticias/sportingguaicara/spotingguaicaraempatecontramagos.png",
      slug: "sporting-guaicara-empata-com-magos",
      resumo: "Equipe buscou empate na raça...",
      categoria: "Jogo",
      data: "há 1 dia"
    },
    {
      title: "Amigos do Futebol vence campeonato 50+",
      image: "/noticias/amigosdofutebol/foto_taca.png",
      slug: "amigos-do-futebol-vence-campeonato",
      resumo: "Título veio após partida intensa...",
      categoria: "Título",
      data: "há 2 dias"
    }
  ]


  return (
    <>
      <main className="max-w-6xl mx-auto px-4 space-y-8">

        {/* 🔥 CAROUSEL PRINCIPAL */}
        <section>
          <NewsCarousel noticias={noticias} />
        </section>

        {/* 📰 LISTA EDITORIAL */}
        <section className="space-y-3">

          {noticias.map((n, i) => (
            <Link
              key={i}
              href={`/noticias/${n.slug}`}
              className="group flex gap-4 py-4 items-start hover:bg-gray-50 px-2 rounded-lg transition"
            >
              {/* IMAGEM */}
              <div className="relative w-36 aspect-video overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* TEXTO */}
              <div className="flex flex-col gap-1">

                {/* META (categoria + tempo) */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-yellow-600 font-semibold uppercase tracking-wide">
                    {n.categoria}
                  </span>
                  <span>•</span>
                  <span>{n.data}</span>
                </div>

                {/* TÍTULO */}
                <h3 className="font-semibold leading-snug text-base md:text-lg group-hover:text-yellow-600 transition">
                  {n.title}
                </h3>

                {/* RESUMO */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {n.resumo}
                </p>

              </div>
            </Link>
          ))}

        </section>

      </main>

      <div className="mt-10">
        <LoopBanner />
      </div>
    </>
  )
}