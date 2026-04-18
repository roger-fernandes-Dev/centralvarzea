"use client"

import Marquee from "react-fast-marquee"

export default function MilestoneBanner() {
  return (
    <div className="w-full bg-zinc-900 text-white border-b border-zinc-800">
      <Marquee speed={50} gradient={false}>
        <span className="mx-8">
          🔥🔥🔥 Já somos mais de <strong>4.000</strong>. Obrigado por fazer parte disso. A comunidade só cresce!🔥🔥🔥
        </span>
      </Marquee>
    </div>
  )
}