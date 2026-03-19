import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import NextMatches from "@/components/home/NextMatches"
import BannerCarousel from "@/components/home/BannerCarousel"

export default function Home() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4">

      {/* topo */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* noticias */}
        <div className="lg:col-span-2">
          <NewsSection />
        </div>

        <div>
          <BannerCarousel />
        </div>

      </section>

 <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <div className="lg:col-span-2">
    {/* algum conteúdo aqui (ex: lista de notícias, feed, etc) */}
  </div>

</section>

<section className="col-span-full">
  <div className="max-w-4xl mx-auto">
    <AdsSidebar />
  </div>
</section>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

  <div className="lg:col-span-1">
    <Championships />
  </div>

  <div className="lg:col-span-2">
    <h2 className="font-bold text-lg">
        Clubes
      </h2>
    <Clubs />
  </div>

</section>

      {/* proximos jogos */}
      <NextMatches />

    </div>
  )
}