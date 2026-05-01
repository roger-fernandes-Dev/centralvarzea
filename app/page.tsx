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
import MatchesCarousel from "@/components/home/MatchesCarousel"
import { getNoticias } from "@/src/db/news-repo"

async function getJogos() {
  const res = await fetch("http://localhost:3000/api/jogos?tipo=passados", {
    cache: "no-store",
  })

  return res.json()
}

export default async function Home() {
  const jogos = await getJogos()
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

        {/* RESULTADOS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Últimos Resultados</h2>
          </div>

          <div className="overflow-hidden">
            <MatchesCarousel jogos={jogos} />
          </div>
        </section>

        {/* topo */}
        <section className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          <NewsSection />
          <NextChampionships />
        </section>

        {/* banner */}
        <section>
          <div className="w-full mb-3">
            <div className="bg-gray-100 rounded-lg px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-gray-200 shadow-md">
              <h1 className="font-bold text-sm md:text-lg tracking-wide text-gray-900">
                A CASA DO FUTEBOL AMADOR
              </h1>

              <p className="text-[11px] md:text-sm text-gray-600">
                Futebol de várzea • Jogos • Campeonatos
              </p>
            </div>
          </div>

          <LoopBanner />
        </section>

        {/* ads */}
        <section>
          <AdsSidebar slides={slides} />
        </section>

        {/* campeonatos + clubes */}
        <section className="grid grid-cols-1 lg:grid-cols-[30%_45%_25%] gap-6 items-stretch">
          <div className="min-h-[320px]">
            <Championships />
          </div>

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