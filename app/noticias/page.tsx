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

  const share = (slug: string) => {
  const url = `${window.location.origin}/noticias/${slug}`
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`
  }
}

return (
  <>
    <main className="max-w-6xl mx-auto px-4 space-y-8">

      {/* 🔥 CAROUSEL PRINCIPAL */}
      <section>
        <NewsCarousel noticias={noticias} />
      </section>

      {/* 📰 LISTA EDITORIAL */}
      <section className="space-y-3">

  {noticias.map((n, i) => {

    const url = typeof window !== "undefined"
      ? `${window.location.origin}/noticias/${n.slug}`
      : ""

    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    const whatsapp = `https://wa.me/?text=${encodeURIComponent(url)}`

    return (
      <Link
        key={i}
        href={`/noticias/${n.slug}`}
        className="group flex gap-4 p-3 items-start bg-white rounded-lg 
        shadow-[0_1px_4px_rgba(0,0,0,0.06)] 
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] 
        transition-all duration-300"
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
        <div className="flex flex-col flex-1 justify-between h-full">

          <div className="flex flex-col gap-1">
            {/* META */}
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

          {/* 🔗 SHARE FIXO DIREITA */}
          <div className="flex justify-end gap-2 mt-2">

            {/* Facebook */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(facebook, "_blank")
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12"/>
              </svg>
            </button>

            {/* WhatsApp */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(whatsapp, "_blank")
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-green-100 transition"
            >
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 12a8 8 0 1 0-14.5 4.5L4 20l3.7-1.5A8 8 0 1 0 20 12Zm-8 6.5c-1.3 0-2.6-.3-3.7-1l-.3-.2-2.2.9.9-2.1-.2-.3A6.5 6.5 0 1 1 12 18.5Zm3.5-4.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.1-.5 0-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.5l.3-.3c.1-.1.2-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.3 0-.4.2-.1.2-.5.5-.5 1.2s.5 1.4.6 1.5c.1.2 1 1.6 2.5 2.2 1.5.6 1.5.4 1.8.4.3 0 1-.4 1.2-.8.2-.4.2-.7.1-.8-.1-.1-.2-.1-.4-.2Z"/>
              </svg>
            </button>

          </div>

        </div>
      </Link>
    )
  })}

</section>

    </main>

    <div className="mt-10">
      <LoopBanner />
    </div>
  </>
)
}