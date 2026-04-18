"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function LoopBanner() {
  const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  })

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay]
  )

  const banners = [
    "/wideparaiso.png",
    "/wideh6.png",
    "/wideamop.png",
    "/cegseguros.png",
    "/wideroma.png",
    "/suplementlins.png",
    "/widealameda.png",
    "/bormioesilva.png",
  ]

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex gap-4 px-4">

        {banners.map((src, i) => (
          <div
            key={i}
            className="relative flex-[0_0_70%] sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_20%]
                       h-20 md:h-24 rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt={`banner ${i}`}
              fill
              sizes="(max-width: 768px) 70vw, (max-width: 1024px) 40vw, 25vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

      </div>
    </div>
  )
}