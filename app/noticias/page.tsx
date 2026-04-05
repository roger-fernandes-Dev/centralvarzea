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
  data?: Date // agora é Date
}

// função para calcular tempo "há x"
function timeAgo(date: Date) {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `há ${seconds} segundos`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `há ${minutes} minutos`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} horas`
  const days = Math.floor(hours / 24)
  if (days < 7) return `há ${days} dias`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `há ${weeks} semanas`
  const months = Math.floor(days / 30)
  if (months < 12) return `há ${months} meses`
  const years = Math.floor(days / 365)
  return `há ${years} anos`
}

export default function Noticias() {

  const noticias: Noticia[] = [
    {
      title: "Renuka ADC utiliza amistoso como teste e foca na evolução da equipe",
      image: "/noticias/renukaadc/renuka_ousadia.png",
      slug: "renuka-adc-amistoso-ousadia-evolucao",
      resumo: "Em partida realizada na Arena ADC, equipe enfrentou o Ousadia em um amistoso de preparação e utilizou o confronto para ajustes e ganho de ritmo.",
      categoria: "Notícia",
      data: new Date("2026-04-05T09:30:00")
    },
    {
      title: "Goleiro SAN mantém legado e renova com Amigos do Futebol Clube",
      image: "/noticias/amigosdofutebol/goleirosan.png",
      slug: "goleiro-san-renova-amigos-do-futebol",
      resumo: "Destaque histórico da equipe, SAN seguirá defendendo o clube na próxima temporada, reforçando sua importância no elenco.",
      categoria: "Notícia",
      data: new Date("2026-04-05T08:00:00")
    },
    {
      title: "Goleiro SAN mantém legado e renova com Amigos do Futebol Clube",
      image: "/noticias/amigosdofutebol/goleirosan.png",
      slug: "goleiro-san-renova-amigos-do-futebol",
      resumo: "Destaque histórico da equipe, SAN seguirá defendendo o clube na próxima temporada, reforçando sua importância no elenco.",
      categoria: "Notícia",
      data: new Date("2026-04-04T01:00:00")
    },
    {
      title: "Campeonato de Mini Campo em Promissão abre inscrições",
      image: "/noticias/campeonatos/minicampopromissao.png",
      slug: "minicampo-promissao-inscricoes",
      resumo: "Estão abertas, de 30/03 até 07/04...",
      categoria: "Campeonato",
      data: new Date("2026-04-04T06:00:00")
    },
    {
      title: "Jogo entre Renuka ADC e Boleiros é cancelado devido ao Domingo de Páscoa",
      image: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
      slug: "jogo-cancelado-renuka-boleiros",
      resumo: "A partida que seria realizada no dia 05/04...",
      categoria: "Comunicado",
      data: new Date("2026-04-03T01:00:00")
    },
    {
      title: "Jogo cancelado por chuva em Avanhandava",
      image: "/noticias/amigosdofutebol/jogocancelado.png",
      slug: "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola",
      resumo: "O campo ficou sem condições de jogo...",
      categoria: "Clima",
      data: new Date("2026-04-01T07:00:00")
    },
    {
      title: "Amigos do Futebol vence campeonato 50+",
      image: "/noticias/amigosdofutebol/foto_taca.png",
      slug: "amigos-do-futebol-vence-campeonato",
      resumo: "Título veio após partida intensa...",
      categoria: "Título",
      data: new Date("2026-03-15T10:00:00")
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
                  <span>{n.data ? timeAgo(n.data) : ""}</span>
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