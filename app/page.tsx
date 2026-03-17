import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Cards from "@/components/Cards"
import PlayerHighlight from "@/components/PlayerHighLight"
import LeagueTable from "@/components/LeagueTable"
import Sidebar from "@/components/Sidebar"

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">

      <Header />

      <Hero />

      <Cards />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar />
        </div>

        <div className="col-span-9">
          <LeagueTable />
        </div>
      </div>

      <PlayerHighlight />

    </main>
  )
}