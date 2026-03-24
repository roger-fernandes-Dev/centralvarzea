"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function LoopBanner() {

  const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: false
  })

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start"
    },
    [autoplay]
  )

  const banners = [
    "/paraisocentroautomotivo.png",
    "/cegseguros.png",
    "/drogaria_geral.png",
    "/roma_gelateria.png",
    "/suplementlins.png",
    "/flmarmitaria.png",
    "/cegseguros.png",
  ]

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex gap-4 px-4">

        {banners.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_70%] sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_20%] 
                       h-20 md:h-24 relative rounded-xl overflow-hidden bg-white md:bg-transparent"
          >
            <Image
              src={src}
              alt={`banner ${i}`}
              fill
              className="object-fill md:object-cover p-2 md:p-0"
            />
          </div>
        ))}

      </div>
    </div>
  )
}