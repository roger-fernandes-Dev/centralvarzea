"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function VerticalCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true // importante pro autoplay ficar contínuo
  })

  // autoplay
  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000) // 3 segundos

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="relative h-[300px]">

      {/* carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex flex-col h-full">

          <div className="min-h-full bg-red-400 flex items-center justify-center">
            Notícia 1
          </div>

          <div className="min-h-full bg-blue-400 flex items-center justify-center">
            Notícia 2
          </div>

          <div className="min-h-full bg-green-400 flex items-center justify-center">
            Notícia 3
          </div>

        </div>
      </div>

      {/* botões */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">

        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-white/80 backdrop-blur shadow hover:bg-white transition"
        >
          <ChevronUp size={20} />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                     bg-white/80 backdrop-blur shadow hover:bg-white transition"
        >
          <ChevronDown size={20} />
        </button>

      </div>

    </div>
  )
}