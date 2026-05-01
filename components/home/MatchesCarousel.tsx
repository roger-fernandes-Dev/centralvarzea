"use client"

import { useRef, useEffect } from "react"
import MatchCard from "./matchCard"

export default function MatchesCarousel({ jogos }: { jogos: any[] }) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return

    const firstCard = ref.current.querySelector(
      "[data-card]"
    ) as HTMLElement

    if (!firstCard) return

    const gap = 16
    const cardWidth = firstCard.offsetWidth + gap

    ref.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
  }

  // 🔥 autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref.current) return

      const firstCard = ref.current.querySelector(
        "[data-card]"
      ) as HTMLElement

      if (!firstCard) return

      const gap = 16
      const cardWidth = firstCard.offsetWidth + gap

      const maxScroll =
        ref.current.scrollWidth - ref.current.clientWidth

      const current = ref.current.scrollLeft

      // se chegou no fim → volta pro começo
      if (current >= maxScroll - 5) {
        ref.current.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      } else {
        ref.current.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        })
      }
    }, 3000) // 3s (ajusta aqui se quiser)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">

      {/* esquerda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-0 h-full w-10 z-10 bg-gradient-to-r from-black/70 to-transparent"
      />

      {/* direita */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-0 h-full w-10 z-10 bg-gradient-to-l from-black/70 to-transparent"
      />

      {/* lista */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pr-20 pl-1 snap-x snap-mandatory"
      >
        {jogos.map((jogo) => (
          <div key={jogo.id} data-card className="snap-start">
            <MatchCard jogo={jogo} />
          </div>
        ))}
      </div>
    </div>
  )
}