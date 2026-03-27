"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function VerticalCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true
  })

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative h-[200px] sm:h-[200px] md:h-[400px]">

      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex flex-col h-full">

          {[ 
            "/cegseguros.png",
            "/pe_direito.png",
            "/suplementlins.png"
          ].map((src, i) => (
            <div key={i} className="min-h-full relative bg-white">

              <Image
                src={src}
                alt="banner"
                fill
                className="object-fill md:object-cover bg-white md:bg-transparent p-2 md:p-0"
              />

            </div>
          ))}

        </div>
      </div>

      {/* botões */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">

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