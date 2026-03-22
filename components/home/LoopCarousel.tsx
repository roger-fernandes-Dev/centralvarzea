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
      image: "/foto_taca.png",
      title: "Final emocionante no futebol de várzea",
      description: "Equipe vence, após jogo muito disputado.",
      link: "/noticia/taça_do_titulo"
    },
    {
      image: "/festa_do_campeao.png",
      title: "Comemoração no Domingo do time 40+",
      description: "Grande comemoração com direito a samba",
      link: "/noticia/festa_do_campeao"
    },
    {
      image: "/amistoso_livre.png",
      title: "Time aposta com idade livre, fazendo o primeiro amistoso",
      description: "O ano começando ja disputado",
      link: "/noticia/amistoso_livre"
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
              className="object-cover"
            />

            {/* overlay escuro */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            {/* título (topo) */}
            <div className="absolute top-0 left-0 w-full p-3">
              <h2 className="text-white text-sm md:text-lg font-bold leading-tight">
                {item.title}
              </h2>
            </div>

            {/* descrição (baixo) */}
            <div className="absolute bottom-0 left-0 w-full p-3">
              <p className="text-white text-xs md:text-sm">
                {item.description}
              </p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  )
}