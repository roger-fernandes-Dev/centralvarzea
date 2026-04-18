"use client"

import Image from "next/image"
import Link from "next/link"
import LoopBanner from "@/components/home/LoopBannerNoticias"
import { noticias as dataNoticias } from "@/app/data/noticias"

type Noticia = {
  slug: string
  title: string
  resumo: string
  image: string
  categoria: string
  data: string
}

function timeAgo(date: Date) {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `há ${seconds} segundos`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `há ${minutes} minutos`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} horas`
  const days = Math.floor(hours / 24)
  if (days < 7) return `há ${days} dias`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `há ${weeks} semanas`
  const months = Math.floor(days / 30)
  if (months < 12) return `há ${months} meses`
  const years = Math.floor(days / 365)
  return `há ${years} anos`
}

export default function Noticias() {
  const noticiasOrdenadas = [...dataNoticias].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 space-y-8">

        <section>
          {/**<NewsCarousel noticias={noticiasOrdenadas} /> */}
        </section>

        <section className="space-y-3">

          {noticiasOrdenadas.map((n, i) => (
            <Link
              key={i}
              href={`/noticias/${n.slug}`}
              className="group flex gap-4 py-4 items-start hover:bg-gray-50 px-2 rounded-lg transition"
            >

              <div className="relative w-36 aspect-video overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="flex flex-col gap-1">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-yellow-600 font-semibold uppercase">
                    {n.categoria}
                  </span>
                  <span>•</span>
                  <span>{timeAgo(new Date(n.data))}</span>
                </div>

                <h3 className="font-semibold text-base md:text-lg group-hover:text-yellow-600">
                  {n.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {n.resumo}
                </p>

              </div>
            </Link>
          ))}

        </section>

      </main>

      <div className="mt-10">
        <LoopBanner />
      </div>
    </>
  )
}