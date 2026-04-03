"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image"
import Link from "next/link"

type Noticia = {
  title: string
  image: string
  slug: string
}

interface NewsCarouselProps {
  noticias: Noticia[]
}

export default function NewsCarousel({ noticias }: NewsCarouselProps) {
  // pega sempre as 3 primeiras notícias
  const topNoticias = noticias.slice(0, 3)

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-[300px] md:h-[400px] overflow-hidden"
      >
        {topNoticias.map((n, i) => (
          <SwiperSlide key={i}>
            <Link href={`/noticias/${n.slug}`}>
              <div className="relative w-full h-full cursor-pointer">
                {/* 🖼️ imagem */}
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover"
                />

                {/* 🎬 overlay escuro */}
                <div className="absolute inset-0 bg-black/50" />

                {/* 📰 título */}
                <div className="absolute bottom-0 p-6 max-w-6xl mx-auto left-0 right-0">
                  <h2 className="text-white text-xl md:text-3xl font-bold">
                    {n.title}
                  </h2>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}