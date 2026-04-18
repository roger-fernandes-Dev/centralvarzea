"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

const banners = [
  "/cegseguros.png",
  "/suplementelinsad/promosuplemente.png",
  "/suplementlins.png",
  "/wideh6.png"
]

export default function VerticalCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true
  })

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 2000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative h-[200px] md:h-[400px] -mx-4 md:mx-0">
      
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex flex-col h-full">

          {banners.map((src, i) => (
            <div key={i} className="relative h-full min-h-full">

              <Image
                src={src}
                alt="banner"
                fill
                priority={i === 0}   // só o primeiro como LCP
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

            </div>
          ))}

        </div>
      </div>

      {/* botões */}
      <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-3">

        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-white/80 backdrop-blur shadow"
        >
          <ChevronUp size={20} />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-white/80 backdrop-blur shadow"
        >
          <ChevronDown size={20} />
        </button>

      </div>

    </div>
  )
}