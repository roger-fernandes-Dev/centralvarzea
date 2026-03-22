"use client"

import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-black shadow text-white relative">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* logo responsiva */}
        <div className="relative w-20 md:w-40 lg:w-48 h-12">
          <Image
            src="/central_varzea.png"
            alt="logo central varzea"
            fill
            className="object-contain"
          />
        </div>

        {/* menu desktop */}
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="/noticias">Notícias</a>
          <a href="/campeonatos">Campeonatos</a>
          <a href="/clubes">Clubes</a>
          <a href="/jogos">Jogos</a>
        </nav>

        {/* botão hamburguer */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </div>

      {/* menu mobile */}
      {open && (
        <div className="absolute top-full right-0 w-64 bg-black border-t border-gray-700 md:hidden z-50">

          <nav className="flex flex-col p-4 gap-4 text-sm">

            <a href="/noticias" onClick={() => setOpen(false)}>Notícias</a>
            <a href="/campeonatos" onClick={() => setOpen(false)}>Campeonatos</a>
            <a href="/clubes" onClick={() => setOpen(false)}>Clubes</a>
            <a href="/jogos" onClick={() => setOpen(false)}>Jogos</a>

          </nav>

        </div>
      )}

    </header>
  )
}