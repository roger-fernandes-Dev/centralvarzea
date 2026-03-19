"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"

export default function LoopCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center" // centraliza o slide ativo
  })

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="overflow-hidden w-full h-full" ref={emblaRef}>
      
      {/* padding lateral cria o "peek" */}
      <div className="flex h-full px-10">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex-[0_0_70%] mx-2 h-full rounded-xl 
                       bg-black text-white flex items-center justify-center"
          >
            {item}
          </div>
        ))}

      </div>
    </div>
  )
}