"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

type Championship = {
  name: string
  logo: string
  registrationEnd: string
  startDate: string
  slug: string
  status: "open" | "soon" | "closed" | "running"
}

export default function UpcomingChampionships() {
  const championships: Championship[] = [
    { name: "Segunda Copa ADC", logo: "/campeonato/campeonatoadc.png", registrationEnd: "15/04/2026", startDate: "25/04/2026", slug: "campeonato-adc", status: "running" },
    { name: "Mini Campo livre Promissão 2026", logo: "/campeonato/selt-minicampo.png", registrationEnd: "30/03/2026", startDate: "07/04/2026", slug: "copaseltlivre", status: "running" },
    { name: "Mini Campo 50+ Promissão 2026", logo: "/campeonato/selt-minicampo.png", registrationEnd: "30/03/2026", startDate: "07/04/2026", slug: "copaseltpromissao50", status: "running" },
    { name: "Mini Campo 40+ Promissão 2026", logo: "/campeonato/selt-minicampo.png", registrationEnd: "30/03/2026", startDate: "07/04/2026", slug: "copaseltpromissao40", status: "running" },
    { name: "Super Copa Taquarituba 2026", logo: "/campeonato/copataquarituba.png", registrationEnd: "18/07/2026", startDate: "24/07/2026", slug: "super-copa-taquarituba", status: "soon" },
    { name: "Copa Talentos Lins 2026", logo: "/campeonato/copatalentoslins.png", registrationEnd: "18/07/2026", startDate: "24/07/2026", slug: "super-copa-taquarituba", status: "running" },
    { name: "Mini Campo Master-B Penápolis 2026", logo: "/campeonato/copalagoazul-penapolis.png", registrationEnd: "18/07/2026", startDate: "24/07/2026", slug: "master-b-penapolis", status: "running" },
    { name: "Copa futsal Bariri 2026", logo: "/campeonato/copabariri.png", registrationEnd: "18/07/2026", startDate: "24/07/2026", slug: "super-bariri", status: "running" },
    { name: "Copa Ferradura 2026", logo: "/campeonato/copaferradura.png", registrationEnd: "18/07/2026", startDate: "24/07/2026", slug: "copa-ferradura", status: "running" },
    { name: "Super Master Guaiçara", logo: "/campeonato/supermaster-guaicara.png", registrationEnd: "15/04/2026", startDate: "25/04/2026", slug: "supermaster-guaicara", status: "running" },
    { name: "Copa Guararapes", logo: "/campeonato/copa-guararapes.png", registrationEnd: "14/07/2026", startDate: "20/07/2026", slug: "copa-guararapes", status: "soon" },
    { name: "Copa Futsal infantil ourinhos", logo: "/campeonato/copafutsalinfantilourinhos.png", registrationEnd: "14/07/2026", startDate: "20/07/2026", slug: "copa-guararapes", status: "running" },
    { name: "Copa Bá", logo: "/campeonato/copaba.png", registrationEnd: "14/07/2026", startDate: "20/07/2026", slug: "copa-ba", status: "running" },
    
  ]

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 768) {
      const container = scrollRef.current
      const adjustScroll = () => {
        const cards = Array.from(container.children[0].children) as HTMLElement[]
        if (cards.length >= 3) {
          const thirdCard = cards[2]
          const offset = thirdCard.offsetLeft - 16
          container.scrollLeft = offset
        }
      }
      requestAnimationFrame(adjustScroll)
      setTimeout(adjustScroll, 50)
    }
  }, [])

  const getHref = (item: Championship) => {
    if (item.name === "Segunda Copa ADC") return "/copaadc"
    if (item.name === "Mini Campo 50+ Promissão 2026") return "/copaseltpromissao50"
    if (item.name === "Mini Campo 40+ Promissão 2026") return "/copaseltpromissao40"
    if (item.name === "Mini Campo livre Promissão 2026") return "/copaseltlivre"
    return `/campeonatos/${item.slug}`
  }

  const isClickable = (item: Championship) => {
    return item.name === "Segunda Copa ADC" || item.name === "Mini Campo 50+ Promissão 2026" || item.name === "Mini Campo 40+ Promissão 2026" || item.name === "Mini Campo livre Promissão 2026"
  }

  return (
    <section className="w-full">
      <div className="mb-6">
        <p className="text-xl md:text-2xl font-bold">Próximos Campeonatos</p>
        <p className="text-sm text-gray-500">
          Competições abertas e que irão começar em breve ou em andamento
        </p>
      </div>

      {/* desktop */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-5">
        {championships.map((item, i) => (
          <Link
            key={i}
            href={getHref(item)}
            onClick={(e) => {
              if (!isClickable(item)) e.preventDefault()
            }}
            className="group cursor-pointer"
          >
            <ChampionshipCard item={item} />
          </Link>
        ))}
      </div>

      {/* mobile */}
      <div
        ref={scrollRef}
        className="md:hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <div className="flex gap-4 w-max px-1">
          {championships.map((item, i) => (
            <Link
              key={i}
              href={getHref(item)}
              onClick={(e) => {
                if (!isClickable(item)) e.preventDefault()
              }}
              className="group cursor-pointer min-w-[120px]"
            >
              <ChampionshipCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChampionshipCard({ item }: { item: Championship }) {
  return (
    <div className="flex flex-col items-center text-center transition duration-300 group-hover:scale-[1.06] group-hover:-translate-y-1">
      <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 rounded-full overflow-hidden border border-gray-200">
        <Image src={item.logo} alt={item.name} fill className="object-cover" />
      </div>

      <h3 className="text-xs md:text-sm font-semibold leading-tight line-clamp-2">
        {item.name}
      </h3>

      <span
        className={`mt-1 text-[11px] font-semibold
        ${item.status === "open" && "text-green-600"}
        ${item.status === "soon" && "text-yellow-600"}
        ${item.status === "closed" && "text-red-600"}
        ${item.status === "running" && "text-blue-600"}`}
      >
        {item.status === "open" && "Inscrições abertas"}
        {item.status === "soon" && "Em breve"}
        {item.status === "closed" && "Encerrado"}
        {item.status === "running" && "Em andamento"}
      </span>

      {(item.status === "open" || item.status === "soon") && (
        <div className="mt-2 text-xs md:text-sm text-gray-600 leading-tight">
          <div>
            <span className="text-gray-400">Ínicio inscrições:</span> <strong>{item.registrationEnd}</strong>
          </div>
          <div>
            <span className="text-gray-400">Final Inscrições:</span> <strong>{item.startDate}</strong>
          </div>
        </div>
      )}

      {item.status === "closed" && (
        <div className="mt-2 text-xs md:text-sm text-gray-600">
          <span className="text-gray-400">Início:</span> <strong>{item.startDate}</strong>
        </div>
      )}
    </div>
  )
}