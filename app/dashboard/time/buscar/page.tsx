"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Trophy,
  Users,
  Shield,
  Calendar,
  MessageCircle,
  ChevronRight,
} from "lucide-react"

export default function BuscarTimesPage() {
  const [search, setSearch] = useState("")

  const times = [
    {
      nome: "União F.C.",
      cidade: "Araçatuba",
      categoria: "Adulto",
      jogadores: 24,
      amistosos: 12,
    },
    {
      nome: "Atlético Birigui",
      cidade: "Birigui",
      categoria: "Livre",
      jogadores: 20,
      amistosos: 8,
    },
    {
      nome: "Vila Nova",
      cidade: "Penápolis",
      categoria: "40+",
      jogadores: 18,
      amistosos: 15,
    },
  ]

  return (
    <main className="flex-1 p-3 md:p-6">
      {/* HEADER */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-[30px] font-bold text-zinc-900">
          Buscar Times
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          Explore equipes, veja perfis e marque amistosos.
        </p>
      </div>

      {/* SEARCH */}
      <section className="bg-white border border-zinc-200 rounded-[28px] p-4 md:p-5 mb-5 md:mb-7">
        <div className="h-12 rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
          <Search
            className="text-zinc-400"
            size={17}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome do time..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {/* FILTROS */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {[
            "Todos",
            "Adulto",
            "Livre",
            "40+",
            "Society",
          ].map((item, index) => (
            <button
              key={index}
              className={`h-10 px-4 rounded-xl text-sm whitespace-nowrap transition ${
                index === 0
                  ? "bg-[#0f3b2e] text-white"
                  : "bg-[#f5f7f9] text-zinc-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {times.map((time, index) => (
          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-[30px] p-5 md:p-6"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] text-lg font-bold">
                  CV
                </div>

                <div>
                  <h2 className="font-bold text-zinc-900 text-lg">
                    {time.nome}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    <MapPin
                      className="text-zinc-400"
                      size={14}
                    />

                    <p className="text-sm text-zinc-500">
                      {time.cidade}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-10 h-10 rounded-2xl border border-zinc-200 flex items-center justify-center">
                <ChevronRight
                  className="text-zinc-500"
                  size={18}
                />
              </button>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="border border-zinc-200 rounded-2xl p-3">
                <Users
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-[11px] text-zinc-500 mt-3">
                  Jogadores
                </p>

                <h3 className="font-bold text-sm text-zinc-900 mt-1">
                  {time.jogadores}
                </h3>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-3">
                <Shield
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-[11px] text-zinc-500 mt-3">
                  Categoria
                </p>

                <h3 className="font-bold text-sm text-zinc-900 mt-1">
                  {time.categoria}
                </h3>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-3">
                <Trophy
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-[11px] text-zinc-500 mt-3">
                  Amistosos
                </p>

                <h3 className="font-bold text-sm text-zinc-900 mt-1">
                  {time.amistosos}
                </h3>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="h-11 rounded-2xl border border-zinc-200 text-sm font-medium text-zinc-700 flex items-center justify-center gap-2">
                <Users size={16} />
                Ver perfil
              </button>

              <button className="h-11 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium flex items-center justify-center gap-2">
                <Calendar size={16} />
                Marcar amistoso
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-6 md:mt-8 bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white">
        <MessageCircle size={28} />

        <h2 className="text-2xl font-bold mt-5">
          Conecte seu time com outros da região
        </h2>

        <p className="text-sm text-zinc-300 mt-2 max-w-[500px]">
          Busque equipes, organize amistosos e aumente a
          visibilidade do seu time dentro da plataforma.
        </p>

        <button className="mt-5 h-12 px-5 rounded-2xl bg-white text-[#0f3b2e] text-sm font-semibold">
          Explorar times
        </button>
      </section>
    </main>
  )
}