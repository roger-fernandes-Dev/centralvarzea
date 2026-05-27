"use client"

import { useState } from "react"
import {
  Trophy,
  Calendar,
  MapPin,
  Plus,
  Search,
  Medal,
  Clock3,
} from "lucide-react"

export default function CampeonatosPage() {
  const [activeTab, setActiveTab] = useState("atuais")

  const campeonatos = [
    {
      nome: "Copa Várzea Regional",
      status: "Em andamento",
      cidade: "Araçatuba",
      ano: "2026",
      categoria: "Adulto",
    },
    {
      nome: "Super Copa Interior",
      status: "Finalizado",
      cidade: "Birigui",
      ano: "2025",
      categoria: "Livre",
    },
  ]

  return (
    <main className="flex-1 p-3 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-[30px] font-bold text-zinc-900">
            Campeonatos
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Gerencie os campeonatos do seu time.
          </p>
        </div>

        <button className="h-12 px-5 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium flex items-center justify-center gap-2">
          <Plus size={18} />
          Adicionar campeonato
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white border border-zinc-200 rounded-[24px] p-3 md:p-4 mb-5 md:mb-6">
        <div className="h-11 rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
          <Search className="text-zinc-400" size={16} />

          <input
            placeholder="Buscar campeonato..."
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>

        {/* TABS */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {[
            {
              id: "atuais",
              label: "Em andamento",
            },
            {
              id: "finalizados",
              label: "Finalizados",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-4 rounded-xl text-sm whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-[#0f3b2e] text-white"
                  : "bg-[#f5f7f9] text-zinc-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {campeonatos.map((camp, index) => (
          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-[28px] p-5 md:p-6"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#edf3ef] flex items-center justify-center">
                  <Trophy
                    className="text-[#0f3b2e]"
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-zinc-900 text-base md:text-lg">
                    {camp.nome}
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    {camp.categoria}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-2 rounded-full text-[11px] md:text-sm font-medium ${
                  camp.status === "Em andamento"
                    ? "bg-[#edf3ef] text-[#0f3b2e]"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                {camp.status}
              </span>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="border border-zinc-200 rounded-2xl p-4">
                <MapPin
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-xs text-zinc-500 mt-3">
                  Cidade
                </p>

                <h3 className="font-semibold text-sm text-zinc-900 mt-1">
                  {camp.cidade}
                </h3>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-4">
                <Calendar
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-xs text-zinc-500 mt-3">
                  Ano
                </p>

                <h3 className="font-semibold text-sm text-zinc-900 mt-1">
                  {camp.ano}
                </h3>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-4">
                <Medal
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-xs text-zinc-500 mt-3">
                  Categoria
                </p>

                <h3 className="font-semibold text-sm text-zinc-900 mt-1">
                  {camp.categoria}
                </h3>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-4">
                <Clock3
                  className="text-[#0f3b2e]"
                  size={17}
                />

                <p className="text-xs text-zinc-500 mt-3">
                  Status
                </p>

                <h3 className="font-semibold text-sm text-zinc-900 mt-1">
                  {camp.status}
                </h3>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 h-11 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium">
                Editar
              </button>

              <button className="flex-1 h-11 rounded-2xl border border-zinc-200 text-sm font-medium text-zinc-700">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-6 md:mt-8 bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white">
        <div className="max-w-[500px]">
          <Trophy size={30} />

          <h2 className="text-2xl font-bold mt-5">
            Adicione o histórico do seu time
          </h2>

          <p className="text-zinc-300 text-sm mt-2">
            Mostre os campeonatos que sua equipe já disputou
            e fortaleça o perfil do time dentro da plataforma.
          </p>

          <button className="mt-5 h-12 px-5 rounded-2xl bg-white text-[#0f3b2e] text-sm font-semibold">
            Cadastrar campeonato
          </button>
        </div>
      </section>
    </main>
  )
}