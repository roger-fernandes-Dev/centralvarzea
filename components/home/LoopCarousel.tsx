"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"

export default function LoopCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center"
  })

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [emblaApi])

  const slides = [
    {
      image: "/noticias/amigosdofutebol/amigosdabolavsamigosdofutebol.png",
      title: "Amigos da Bola vence amistoso contra Amigos do Futebol na Arena Caju",
      description: "Jogo atrasou após bloqueio da via por competição de ciclismo. Sem reservas, Amigos do Futebol enfrentou dificuldades e foi derrotado por 6 a 1, mas mantém foco no campeonato.",
      link: "/noticias/amigos-da-bola-x-amigos-do-futebol-amistoso-arena-caju"
    },
    {
      image: "/noticias/amigosdofutebol/jogoadiado.png",
      title: "Amigos do Futebol x Amigos da Bola é adiado!",
      description: "Com desfalques, comissão técnica opta pelo adiamento do confronto, que passa a servir como teste e avaliação física visando o campeonato.",
      link: "/noticias/amigos-do-futebol-x-amigos-da-bola-adiado-adc"
    },
    {
      image: "/noticias/renukaadc/renuka_ousadia.png",
      title: "Renuka ADC aposta em aprendizado após amistoso contra o Ousadia",
      description: "Em jogo realizado na Arena ADC, equipe utilizou o amistoso como preparação, reforçando o foco no desenvolvimento e na evolução ao longo da temporada.",
      link: "/noticias/renuka-adc-amistoso-ousadia-evolucao"
    },
    {
      image: "/noticias/amigosdofutebol/goleirosan.png",
      title: "Goleiro SAN renova com Amigos do Futebol Clube",
      description: "Destaque histórico do clube, SAN seguirá defendendo a equipe na próxima temporada, reforçando seu legado e importância no elenco.",
      link: "/noticias/goleiro-san-renova-amigos-do-futebol"
    },
    {
      image: "/noticias/campeonatos/minicampopromissao.png",
      title: "Campeonato de Mini Campo em Promissão abre inscrições",
      description: "Estão abertas, de 30/03 até 07/04, as inscrições para o campeonato de mini campo em Promissão, que promete reunir equipes da cidade e região em uma competição organizada e de alto nível.",
      link: "/noticias/minicampo-promissao-inscricoes"
    },
    {
      image: "/noticias/amigosdofutebol/jogocancelado.png",
      title: "Jogo entre Amigos do Futebol e Amigos da Bola é cancelado por chuva",
      description: "A partida em Avanhandava foi cancelada devido às fortes chuvas.",
      link: "/noticias/jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola"
    },
    {
      image: "/foto_taca.png",
      title: "Final emocionante no futebol de várzea",
      description: "Equipe vence após jogo muito disputado.",
      link: "/noticias"
    },
    {
      image: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
      title: "Partida entre Renuka ADC e Boleiros é cancelada devido ao Domingo de Páscoa",
      description: "O confronto que seria realizado no dia 05/04, na Arena ADC, entre Renuka ADC e Boleiros, foi oficialmente cancelado em respeito ao Domingo de Páscoa.",
      link: "/noticias/jogo-cancelado-renuka-boleiros"
    },
  ]

  return (
    <div
      className="overflow-hidden w-full h-[220px] md:h-[420px] lg:h-[480px]"
      ref={emblaRef}
    >
      <div className="flex h-full px-2 md:px-6 lg:px-10">

        {slides.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className="
              relative h-full rounded-xl overflow-hidden group mx-2

              /* mobile */
              flex-[0_0_85%]

              /* tablet */
              md:flex-[0_0_70%]

              /* desktop - 3 slides + preview lateral */
              lg:flex-[0_0_30%]
            "
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition duration-500"
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 30vw"
              priority={i === 0}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

            {/* conteúdo */}
            <div className="absolute bottom-0 md:top-0 md:bottom-auto left-0 w-full p-3 md:p-5">

              <span className="text-[10px] md:text-xs uppercase tracking-wider text-yellow-400 font-semibold">
                Futebol de Várzea
              </span>

              <h2 className="text-white text-sm md:text-lg lg:text-base font-extrabold leading-snug mt-1 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-gray-200 text-[11px] md:text-sm mt-2 line-clamp-2">
                {item.description}
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}