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
    }, 5000)

    return () => clearInterval(interval)
  }, [emblaApi])

  const slides = [
    {
      image: "/noticias/amigosdofutebol/contratacao_julio_vini.png",
      title: "Junior e vini fecham com o time livre da ADC",
      description: "Junior e vini fecham com o time livre da ADC, time ADC vem montando um grande elenco para 2026",
      link: "/noticias"
    },
    {
      image: "/foto_taca.png",
      title: "Final emocionante no futebol de várzea",
      description: "Equipe vence, após jogo muito disputado.",
      link: "/noticias"
    },
    {
      image: "/festa_do_campeao.png",
      title: "Comemoração no Domingo do time 50+",
      description: "Grande comemoração com direito a samba",
      link: "/noticias"
    },
    {
      image: "/amistoso_livre.png",
      title: "Time aposta com idade livre, fazendo o primeiro amistoso",
      description: "O ano começando ja disputado",
      link: "/noticias"
    }
  ]

  return (
    <div className="overflow-hidden w-full h-full" ref={emblaRef}>
      <div className="flex h-full px-10">

        {slides.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className="flex-[0_0_70%] mx-2 h-full relative rounded-xl overflow-hidden group"
          >
            {/* imagem */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            {/* overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* conteúdo */}
            <div className="absolute bottom-0 left-0 w-full p-4">

              {/* categoria */}
              <span className="text-[10px] md:text-xs uppercase tracking-wider text-yellow-400 font-semibold">
                Futebol de Várzea
              </span>

              {/* título */}
              <h2 className="text-white text-base md:text-xl font-extrabold leading-snug mt-1">
                {item.title}
              </h2>

              {/* descrição */}
              <p className="text-gray-200 text-xs md:text-sm mt-1 line-clamp-2">
                {item.description}
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}