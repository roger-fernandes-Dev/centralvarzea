import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import LoopBanner from "@/components/home/LoopBanner"
import NextChampionships from "@/components/home/NextChampionships"
import AdsRightClubs from "@/components/home/AdsRightClubs"
import UpcomingChampionships from "@/components/home/UpCommingChampionships"
import FederacoesCTA from "@/components/home/FederacoesCTA"
import SEOHead from "@/components/SeoHead"
import MilestoneBanner from "@/components/home/MilestoneBanner"
import { getNoticias } from "@/src/db/news-repo"

export default async function Home() {
  const noticias = await getNoticias()

  const slides = noticias
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)
    .map((n) => ({
      image: n.image,
      title: n.title,
      description: n.resumo,
      link: `/noticias/${n.slug}`,
    }))

  return (
    <>

    <SEOHead />
    
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <MilestoneBanner />

        {/* topo */}
        <section className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          <NewsSection />
          <NextChampionships />
        </section>

        {/* banner */}
        <section>
          <div className="w-full mb-3">

  <div className="bg-gray-100 rounded-lg px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-gray-200 shadow-md">

    {/* título principal */}
    <h1
      className="font-bold text-sm md:text-lg tracking-wide text-gray-900"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
    >
      A CASA DO FUTEBOL AMADOR
    </h1>

    {/* subtítulo */}
    <p
      className="text-[11px] md:text-sm text-gray-600"
      style={{ textShadow: "0 1px 1px rgba(0,0,0,0.15)" }}
    >
      Futebol de várzea • Jogos • Campeonatos
    </p>

  </div>

</div>
          <LoopBanner />
        </section>

        {/* ads */}
        <section>
          <AdsSidebar slides={slides}  />
        </section>

        {/* campeonatos + clubes */}
        <section className="grid grid-cols-1 lg:grid-cols-[30%_45%_25%] gap-6 items-stretch">

          {/* agora tem mais espaço */}
          <div className="min-h-[320px]">
            <Championships />
          </div>

          {/* clubs menor */}
          <div className="min-h-[320px]">
            <Clubs />
          </div>

          <div className="rounded-xl p-2 min-h-[320px]">
            <AdsRightClubs />
          </div>

        </section>

        <UpcomingChampionships />

      </div>

      <section className="mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <FederacoesCTA />
        </div>
      </section>
    </>
  )
}