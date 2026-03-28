"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function PopupAd() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const images = [
    "/ads/propagandaTime.png",
    "/ads/propaganda-empresa.png"
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // autoplay
  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000) // ✅ 5 segundos

    return () => clearInterval(interval)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* fundo */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* box */}
      <div className="
        relative bg-white rounded-xl overflow-hidden shadow-xl
        w-[90%] md:w-full
        max-w-none md:max-w-2xl
      ">

        {/* fechar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 z-10 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center"
        >
          ✕
        </button>

        {/* imagem */}
        <div className="relative w-full h-[300px] md:h-[400px] bg-black">
          <Image
            src={images[index]}
            alt="Anúncio"
            fill
            className="object-contain transition-all duration-500"
          />
        </div>

        {/* bolinhas */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  )
}