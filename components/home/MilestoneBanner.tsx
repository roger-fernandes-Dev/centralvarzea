"use client"

import Marquee from "react-fast-marquee"

export default function BreakingBanner() {
  return (
    <div className="w-full bg-black border-b border-red-600/30 text-white">

      <div className="flex items-center">

        {/* etiqueta */}
        <div className="bg-red-600 px-3 py-1 text-xs font-semibold tracking-widest">
          DESTAQUE
        </div>

        {/* texto rolando */}
        <div className="flex-1">
          <Marquee speed={45} gradient={false}>
            <span className="mx-8 text-sm text-neutral-200">
              Central Várzea já ultrapassa <strong className="text-white">5.000 usuários</strong> — acompanhe jogos, resultados e notícias da várzea em tempo real.
            </span>
          </Marquee>
        </div>

      </div>

    </div>
  )
}