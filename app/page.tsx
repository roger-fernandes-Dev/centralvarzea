import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import LoopBanner from "@/components/home/LoopBanner"
import NextChampionships from "@/components/home/NextChampionships"
import AdsRightClubs from "@/components/home/AdsRightClubs"
import UpcomingChampionships from "@/components/home/UpCommingChampionships"
import FederacoesCTA from "@/components/home/FederacoesCTA"

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        {/* topo */}
        <section className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          <NewsSection />
          <NextChampionships />
        </section>

        {/* banner */}
        <section>
          <div className="w-full bg-black py-3 mb-2">
            <h2 className="text-center text-white font-semibold text-sm md:text-base tracking-wide">
              A casa do futebol amador - Futebol de Várzea, Jogos e Campeonatos
            </h2>
          </div>
          <LoopBanner />
        </section>

        {/* ads */}
        <section>
          <AdsSidebar />
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