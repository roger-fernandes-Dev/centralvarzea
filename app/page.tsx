import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import LoopBanner from "@/components/home/LoopBanner"
import NextChampionships from "@/components/home/NextChampionships"
import AdsRightClubs from "@/components/home/AdsRightClubs"
import Newlestter from "@/components/home/Newlestter"

export default function Home() {
  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4">

      {/* topo */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-[80%_20%] gap-6">

        <div>
          <NewsSection />
        </div>

        <div>
          <NextChampionships />
        </div>

      </section>

      {/* banner */}
      <section>

        {/* faixa título */}
        <div className="w-full bg-black py-3 mb-2">
          <h2 className="text-center text-white font-semibold text-sm md:text-base tracking-wide">
            Empresas que apoiam o futebol de várzea
          </h2>
        </div>

        <LoopBanner />

      </section>

      {/* ads topo */}
      <section className="col-span-full">
        <div className="max-w-6xl mx-auto">
          <AdsSidebar />
        </div>
      </section>

      {/* campeonatos + clubes */}
      <section className="grid grid-cols-1 lg:grid-cols-[20%_60%_20%] gap-6 items-start">

        <div>
          <Championships />
        </div>

        <div>
          <Clubs />
        </div>

        {/* ads direita */}
        <div className="rounded-xl p-2">
          <AdsRightClubs />
        </div>

      </section>

      {/* próximos jogos */}
      <Newlestter />

    </div>
  )
}