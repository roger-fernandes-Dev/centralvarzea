"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-black text-white shadow-md border-b border-white/10">

      {/* linha superior estilo GE */}
      <div className="w-full bg-neutral-900 text-[11px] text-white/60 py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span>Central Várzea</span>
          <span>Futebol de várzea em destaque</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <div className="relative w-24 md:w-40 h-12 cursor-pointer">
            <Image
              src="/central_varzea.png"
              alt="Central Várzea"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link href="/" className="hover:text-yellow-400 transition">
            Início
          </Link>

          <Link href="/noticias" className="hover:text-yellow-400 transition">
            Notícias
          </Link>

          <Link href="/times" className="hover:text-yellow-400 transition">
            Clubes
          </Link>

          <Link href="/jogos" className="hover:text-yellow-400 transition">
            Jogos
          </Link>

          <Link href="/contato" className="hover:text-yellow-400 transition">
            Contato
          </Link>

        </nav>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span className={`w-6 h-[2px] bg-white transition ${open && "rotate-45 translate-y-[6px]"}`} />
          <span className={`w-6 h-[2px] bg-white transition ${open && "opacity-0"}`} />
          <span className={`w-6 h-[2px] bg-white transition ${open && "-rotate-45 -translate-y-[6px]"}`} />
        </button>

      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10">

          <nav className="flex flex-col p-5 gap-4 text-sm font-medium">

            <Link href="/" onClick={() => setOpen(false)} className="hover:text-yellow-400">
              Início
            </Link>

            <Link href="/noticias" onClick={() => setOpen(false)} className="hover:text-yellow-400">
              Notícias
            </Link>

            <Link href="/times" onClick={() => setOpen(false)} className="hover:text-yellow-400">
              Clubes
            </Link>

            <Link href="/jogos" onClick={() => setOpen(false)} className="hover:text-yellow-400">
              Jogos
            </Link>

            <Link href="/contato" onClick={() => setOpen(false)} className="hover:text-yellow-400">
              Contato
            </Link>

          </nav>

        </div>
      )}

    </header>
  )
}