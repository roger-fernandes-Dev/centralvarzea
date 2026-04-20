"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"

type Slide = {
  image: string
  title: string
  description: string
  link: string
}

export default function LoopCarousel({
  noticias,
}: {
  noticias: Slide[]
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  })

  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [emblaApi])

  useEffect(() => {
    setSlides(noticias)
  }, [noticias])

  return (
    <div
      className="overflow-hidden w-full h-[220px] md:h-[420px] lg:h-[480px]"
      ref={emblaRef}
    >
      <div className="flex h-full px-2 md:px-6 lg:px-10">
        {slides.map((item) => (
          <Link
            href={item.link}
            key={item.link}
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
              className="object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-0 p-3">
              <h2 className="text-white font-bold">{item.title}</h2>
              <p className="text-gray-200 text-sm line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}