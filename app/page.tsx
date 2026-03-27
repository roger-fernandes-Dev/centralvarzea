import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import LoopBanner from "@/components/home/LoopBanner"
import NextChampionships from "@/components/home/NextChampionships"
import AdsRightClubs from "@/components/home/AdsRightClubs"
import Newlestter from "@/components/home/Newlestter"
import FederacoesCTA from "@/components/home/FederacoesCTA"

export default function Home() {
  return (
    <>
      {/* CONTAINER PADRÃO */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">

        {/* topo */}
        <section className="grid grid-cols-1 lg:grid-cols-[80%_20%] gap-6">
          <NewsSection />
          <NextChampionships />
        </section>

        {/* banner */}
        <section>
          <div className="w-full bg-black py-3 mb-2">
            <h2 className="text-center text-white font-semibold text-sm md:text-base tracking-wide">
              Empresas que apoiam o futebol de várzea
            </h2>
          </div>
          <LoopBanner />
        </section>

        {/* ads topo (CORRIGIDO - removido max-w-6xl) */}
        <section>
          <AdsSidebar />
        </section>

        {/* campeonatos + clubes */}
        <section className="grid grid-cols-1 lg:grid-cols-[20%_60%_20%] gap-6 items-start">
          <Championships />
          <Clubs />
          <div className="rounded-xl p-2">
            <AdsRightClubs />
          </div>
        </section>

        {/* newsletter */}
        <Newlestter />

      </div>

      {/* FULL WIDTH CONTROLADO */}
      <section className="mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <FederacoesCTA />
        </div>
      </section>
    </>
  )
}