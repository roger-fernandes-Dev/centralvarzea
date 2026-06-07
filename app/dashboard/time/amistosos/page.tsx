"use client"

import {
  Search,
  MapPin,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react"

const times = [
  {
    id: 1,
    time: "União F.C.",
    cidade: "Birigui/SP",
    categoria: "Semi-pro",
    descricao: "Equipe tradicional da cidade, participando de campeonatos regionais.",
  },
  {
    id: 2,
    time: "Real Paulista",
    cidade: "Araçatuba/SP",
    categoria: "Amador",
    descricao: "Time focado em amistosos e torneios municipais.",
  },
  {
    id: 3,
    time: "Atlético Zona Sul",
    cidade: "São Paulo/SP",
    categoria: "Semi-pro",
    descricao: "Participação frequente em competições estaduais.",
  },
]

export default function BuscarTimesPage() {
  return (
    <main className="flex-1 p-3 md:p-6">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0f3b2e] via-[#14503d] to-[#0f3b2e] p-8 md:p-10 text-white mb-8">

        <span className="text-xs uppercase tracking-[3px] text-green-200">
          CENTRAL VÁRZEA
        </span>

        <h1 className="mt-3 text-4xl md:text-5xl font-black">
          Buscar Times
        </h1>

        <p className="mt-3 text-green-100 max-w-2xl">
          Descubra clubes, visualize perfis completos e entre em contato para
          marcar amistosos.
        </p>

      </section>

      {/* FILTROS */}
      <section className="bg-white rounded-[32px] p-5 border border-zinc-200 shadow-sm mb-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">

          <div className="h-14 bg-[#f5f7f9] rounded-2xl px-4 flex items-center gap-3">
            <Search size={18} className="text-zinc-400" />

            <input
              placeholder="Nome do clube"
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <div className="h-14 bg-[#f5f7f9] rounded-2xl px-4 flex items-center gap-3">
            <MapPin size={18} className="text-zinc-400" />

            <input
              placeholder="Cidade"
              className="bg-transparent outline-none flex-1"
            />
          </div>

          <select className="h-14 bg-[#f5f7f9] rounded-2xl px-4 outline-none">
            <option>Todas categorias</option>
            <option>Amador</option>
            <option>Semi-pro</option>
            <option>Profissional</option>
          </select>

          <button className="h-14 rounded-2xl bg-[#0f3b2e] text-white font-semibold hover:opacity-90 transition">
            Buscar clubes
          </button>

        </div>

      </section>

      {/* LISTAGEM */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {times.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all"
          >

            {/* CAPA */}
            <div className="h-28 bg-gradient-to-r from-[#0f3b2e] to-[#1d6b52]" />

            <div className="px-6 pb-6 relative">

              {/* LOGO */}
              <div
                className="
                  w-24 h-24
                  rounded-full
                  bg-white
                  border-4 border-white
                  shadow-xl
                  -mt-12
                  flex items-center justify-center
                  text-[#0f3b2e]
                  font-black
                  text-2xl
                "
              >
                FC
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-black text-zinc-900">
                  {item.time}
                </h2>

                <p className="mt-1 text-zinc-500 flex items-center gap-2">
                  <MapPin size={15} />
                  {item.cidade}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">

                <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold">
                  {item.categoria}
                </span>

                <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium flex items-center gap-1">
                  <Users size={12} />
                  Ativo
                </span>

              </div>

              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                {item.descricao}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <button className="h-12 rounded-2xl border border-zinc-200 font-medium hover:bg-zinc-50 transition">
                  Ver Perfil
                </button>

                <button className="h-12 rounded-2xl bg-[#0f3b2e] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
                  <MessageCircle size={16} />
                  WhatsApp
                </button>

              </div>

            </div>

          </div>
        ))}

      </section>

      {/* ESTATÍSTICAS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <Shield className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">1.250+</h3>
          <p className="text-zinc-500 text-sm mt-1">
            Times cadastrados
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <Users className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">5.800+</h3>
          <p className="text-zinc-500 text-sm mt-1">
            Jogadores ativos
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-zinc-200">
          <MessageCircle className="text-[#0f3b2e]" />
          <h3 className="mt-4 text-3xl font-black">3.400+</h3>
          <p className="text-zinc-500 text-sm mt-1">
            Contatos realizados
          </p>
        </div>

      </section>

    </main>
  )
}