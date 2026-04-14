"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { getNoticias } from "@/app/lib/getNoticias"

export default function LoopCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center"
  })

  const [slides, setSlides] = useState<any[]>([])

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [emblaApi])

  useEffect(() => {
    getNoticias().then((data) => {
      const filtradas = data
        .sort((a: any, b: any) => new Date(b.data).getTime() - new Date(a.data).getTime())
        .slice(0, 8)
        .map((n: any) => ({
          image: n.image,
          title: n.title,
          description: n.resumo,
          link: `/noticias/${n.slug}`
        }))

      setSlides(filtradas)
    })
  }, [])

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
              flex-[0_0_85%]
              md:flex-[0_0_70%]
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

            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

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