import NewsSection from "@/components/home/NewsSection"
import AdsSidebar from "@/components/home/AdsSidebar"
import Championships from "@/components/home/Championships"
import Clubs from "@/components/home/Clubs"
import LoopBanner from "@/components/home/LoopBanner"
import NextChampionships from "@/components/home/NextChampionships"
import AdsRightClubs from "@/components/home/AdsRightClubs"
import UpcomingChampionships from "@/components/home/UpCommingChampionships"
import FederacoesCTA from "@/components/home/FederacoesCTA"
import Head from "next/head"

export default function Home() {
  return (
    <>
    <Head>
      {/* Título da página */}
      <title>Central Várzea - Futebol de Várzea, Jogos e Campeonatos</title>

      {/* Meta description */}
      <meta
        name="description"
        content="Portal completo de futebol de várzea com notícias, jogos e campeonatos. Acompanhe resultados, tabela de times e destaques do futebol amador."
      />

      {/* Meta keywords */}
      <meta name="keywords" content="futebol, várzea, campeonato, times, jogos, resultados" />

      {/* Controle de indexação */}
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href="https://www.centralvarzea.com.br/" />

      {/* Open Graph */}
      <meta property="og:title" content="Central Várzea - Futebol de Várzea, Jogos e Campeonatos" />
      <meta property="og:description" content="Portal completo de futebol de várzea com notícias, jogos e campeonatos." />
      <meta property="og:image" content="https://www.centralvarzea.com.br/central_varzea.png" />
      <meta property="og:url" content="https://www.centralvarzea.com.br/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Central Várzea - Futebol de Várzea, Jogos e Campeonatos" />
      <meta name="twitter:description" content="Portal completo de futebol de várzea com notícias, jogos e campeonatos." />
      <meta name="twitter:image" content="https://www.centralvarzea.com.br/central_varzea.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div className="max-w-7xl mx-auto px-4 space-y-6">

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