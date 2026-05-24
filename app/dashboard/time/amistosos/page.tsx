"use client"

import {
  Search,
  MapPin,
  Calendar,
  Trophy,
  MessageCircle,
  Plus,
  Filter,
} from "lucide-react"

const amistosos = [
  {
    id: 1,
    time: "União F.C.",
    cidade: "Birigui/SP",
    categoria: "Semi-pro",
    data: "Domingo • 15:00",
    descricao: "Procuramos amistoso para este final de semana.",
  },
  {
    id: 2,
    time: "Real Paulista",
    cidade: "Araçatuba/SP",
    categoria: "Amador",
    data: "Sábado • 16:30",
    descricao: "Campo próprio e arbitragem inclusa.",
  },
  {
    id: 3,
    time: "Atlético Zona Sul",
    cidade: "São Paulo/SP",
    categoria: "Semi-pro",
    data: "Domingo • 10:00",
    descricao: "Aceitamos jogos fora também.",
  },
]

export default function AmistososPage() {
  return (
    <main className="flex-1 p-3 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-[32px] font-bold text-zinc-900">
            Amistosos
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Encontre times e marque amistosos.
          </p>
        </div>

        <button className="h-12 px-5 rounded-2xl bg-[#0f3b2e] text-white flex items-center justify-center gap-2 text-sm font-medium cursor-pointer hover:opacity-90 transition">
          <Plus size={18} />
          Publicar amistoso
        </button>
      </div>

      {/* FILTROS */}
      <section className="bg-white border border-zinc-200 rounded-[28px] p-4 mb-5 md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="h-12 rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
            <Search size={17} className="text-zinc-400" />

            <input
              placeholder="Buscar time..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          <div className="h-12 rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
            <MapPin size={17} className="text-zinc-400" />

            <input
              placeholder="Cidade"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          <select className="h-12 rounded-2xl border border-zinc-200 px-4 text-sm outline-none bg-white">
            <option>Todas categorias</option>
            <option>Amador</option>
            <option>Semi-pro</option>
            <option>Profissional</option>
          </select>

          <button className="h-12 rounded-2xl bg-zinc-100 hover:bg-zinc-200 transition text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </section>

      {/* LISTA */}
      <section className="space-y-4">
        {amistosos.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-zinc-200 rounded-[28px] p-5 md:p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] font-bold text-lg">
                  FC
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-zinc-900">
                      {item.time}
                    </h2>

                    <span className="bg-[#edf3ef] text-[#0f3b2e] text-xs px-3 py-1 rounded-full font-medium">
                      {item.categoria}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={15} />
                      {item.cidade}
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar size={15} />
                      {item.data}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 mt-4 max-w-2xl">
                    {item.descricao}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="h-11 px-5 rounded-2xl border border-zinc-200 hover:bg-zinc-100 transition text-sm font-medium cursor-pointer">
                  Ver perfil
                </button>

                <button className="h-11 px-5 rounded-2xl bg-[#0f3b2e] hover:opacity-90 transition text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer">
                  <MessageCircle size={16} />
                  Chamar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-6 md:mt-8 bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white">
        <Trophy size={30} />

        <h2 className="text-2xl font-bold mt-5">
          Quer encontrar adversários mais rápido?
        </h2>

        <p className="text-sm text-zinc-300 mt-2 max-w-2xl">
          Publique um amistoso e deixe outros times entrarem em contato.
        </p>

        <button className="mt-5 h-12 px-6 rounded-2xl bg-white text-[#0f3b2e] text-sm font-semibold cursor-pointer hover:opacity-90 transition">
          Publicar agora
        </button>
      </section>
    </main>
  )
}