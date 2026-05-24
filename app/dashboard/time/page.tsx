"use client"

import {
  Calendar,
  Trophy,
  Search,
  MapPin,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react"

export default function DashboardTime() {
  return (
    <main className="flex-1 p-3 md:p-6">
      {/* DESKTOP HEADER */}
      <div className="hidden lg:flex items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-zinc-900">
            Bem-vindo de volta
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Acompanhe tudo sobre seu time.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[370px] h-12 bg-white rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
            <Search className="text-zinc-400" size={18} />

            <input
              placeholder="Buscar..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="lg:hidden mb-4">
        <div className="h-11 bg-white rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
          <Search className="text-zinc-400" size={16} />

          <input
            placeholder="Buscar times..."
            className="bg-transparent outline-none flex-1 text-[13px]"
          />
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <section className="bg-white rounded-[28px] border border-zinc-200 p-4 md:p-8 mb-5 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          {/* LOGO */}
          <div className="relative mx-auto md:mx-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-3xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] text-2xl md:text-4xl font-bold">
              CV
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Central City F.C.
            </h2>

            <p className="text-sm text-zinc-500 mt-1 md:mt-2">
              Fundado em 2021
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-8">
              {[
                {
                  icon: Users,
                  title: "22 atletas",
                  desc: "Jogadores",
                },
                {
                  icon: Shield,
                  title: "Verde e Branco",
                  desc: "Cores",
                },
                {
                  icon: MapPin,
                  title: "São Paulo",
                  desc: "Local",
                },
                {
                  icon: Trophy,
                  title: "Semi-pro",
                  desc: "Categoria",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-zinc-200 rounded-2xl p-3 md:p-5"
                >
                  <item.icon
                    className="text-[#0f3b2e]"
                    size={18}
                  />

                  <h3 className="mt-3 text-sm md:text-base font-semibold text-zinc-900">
                    {item.title}
                  </h3>

                  <p className="text-[11px] md:text-sm text-zinc-500 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACESSO RAPIDO */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-5 md:mb-8">
        {[
          {
            title: "Buscar times",
            icon: Search,
          },
          {
            title: "Amistosos",
            icon: Users,
          },
          {
            title: "Campeonatos",
            icon: Trophy,
          },
          {
            title: "Agenda",
            icon: Calendar,
          },
        ].map((item, index) => (
          <button
            key={index}
            className="bg-white border border-zinc-200 rounded-[24px] p-4 md:p-6 text-left"
          >
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-[#edf3ef] flex items-center justify-center">
              <item.icon
                className="text-[#0f3b2e]"
                size={18}
              />
            </div>

            <h3 className="mt-4 font-semibold text-sm md:text-lg text-zinc-900">
              {item.title}
            </h3>
          </button>
        ))}
      </section>

      {/* GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-6">
        {/* JOGOS */}
        <div className="bg-white rounded-[28px] border border-zinc-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base md:text-xl font-bold text-zinc-900">
              Próximos jogos
            </h2>

            <button className="text-xs md:text-sm text-zinc-500">
              Ver todos
            </button>
          </div>

          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="border border-zinc-200 rounded-2xl p-3 md:p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] font-bold text-sm">
                    CV
                  </div>

                  <div>
                    <p className="text-[11px] md:text-sm text-zinc-500">
                      {item === 1 ? "Amistoso" : "Campeonato"}
                    </p>

                    <h3 className="font-semibold text-sm md:text-base text-zinc-900">
                      Central City
                    </h3>

                    <p className="text-[11px] md:text-sm text-zinc-500">
                      vs União F.C.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                  <div className="text-right">
                    <p className="font-medium text-xs md:text-sm text-zinc-800">
                      24/05
                    </p>

                    <p className="text-[11px] md:text-sm text-zinc-500">
                      16:00
                    </p>
                  </div>

                  <ChevronRight
                    className="text-zinc-400"
                    size={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAMPEONATOS */}
        <div className="space-y-5">
          <div className="bg-white rounded-[28px] border border-zinc-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base md:text-xl font-bold text-zinc-900">
                Campeonatos
              </h2>

              <button className="text-xs md:text-sm text-zinc-500">
                Ver todos
              </button>
            </div>

            <div className="border border-zinc-200 rounded-2xl p-3 md:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#edf3ef] flex items-center justify-center">
                  <Trophy
                    className="text-[#0f3b2e]"
                    size={18}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-sm md:text-base text-zinc-900">
                    Copa Várzea
                  </h3>

                  <p className="text-[11px] md:text-sm text-zinc-500">
                    Categoria adulto
                  </p>
                </div>
              </div>

              <span className="bg-[#edf3ef] text-[#0f3b2e] text-[11px] md:text-sm px-3 py-2 rounded-full font-medium">
                Inscrito
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#0f3b2e] rounded-[28px] p-5 md:p-8 text-white">
            <Trophy size={28} />

            <h2 className="text-xl md:text-2xl font-bold mt-5">
              Novos campeonatos
            </h2>

            <p className="text-sm text-zinc-300 mt-2">
              Explore competições disponíveis.
            </p>

            <button className="mt-5 h-11 md:h-14 px-5 rounded-2xl bg-white text-[#0f3b2e] text-sm font-semibold">
              Explorar
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}