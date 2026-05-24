"use client"

import {
  CalendarDays,
  Clock3,
  MapPin,
  Plus,
  Trophy,
  Users,
} from "lucide-react"

export default function AgendaPage() {
  const jogos = [
    {
      tipo: "Amistoso",
      adversario: "União F.C.",
      data: "24 Maio 2026",
      hora: "16:00",
      local: "Campo Central",
    },
    {
      tipo: "Campeonato",
      adversario: "Vila Nova",
      data: "30 Maio 2026",
      hora: "15:30",
      local: "Arena Leste",
    },
    {
      tipo: "Amistoso",
      adversario: "Resenha FC",
      data: "05 Junho 2026",
      hora: "14:00",
      local: "Campo Esperança",
    },
  ]

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-[32px] font-bold text-zinc-900">
            Agenda
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Organize os compromissos e jogos do seu time.
          </p>
        </div>

        <button className="h-12 px-5 rounded-2xl bg-[#0f3b2e] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition">
          <Plus size={18} />
          Novo compromisso
        </button>
      </div>

      {/* PROXIMO JOGO */}
      <section className="bg-[#0f3b2e] rounded-[30px] p-6 md:p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <Trophy size={24} />
          </div>

          <div>
            <p className="text-sm text-zinc-300">
              Próximo jogo
            </p>

            <h2 className="text-2xl font-bold">
              Central City vs União F.C.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <CalendarDays size={16} />
              Data
            </div>

            <p className="mt-2 font-semibold">
              24 Maio 2026
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <Clock3 size={16} />
              Horário
            </div>

            <p className="mt-2 font-semibold">
              16:00
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <MapPin size={16} />
              Local
            </div>

            <p className="mt-2 font-semibold">
              Campo Central
            </p>
          </div>
        </div>
      </section>

      {/* LISTA */}
      <section className="space-y-4">
        {jogos.map((jogo, index) => (
          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-[28px] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#edf3ef] flex items-center justify-center">
                {jogo.tipo === "Amistoso" ? (
                  <Users
                    className="text-[#0f3b2e]"
                    size={22}
                  />
                ) : (
                  <Trophy
                    className="text-[#0f3b2e]"
                    size={22}
                  />
                )}
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  {jogo.tipo}
                </p>

                <h3 className="text-lg font-semibold text-zinc-900">
                  {jogo.adversario}
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  {jogo.local}
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-6">
              <div>
                <p className="text-xs text-zinc-500">
                  Data
                </p>

                <p className="font-medium text-sm text-zinc-900 mt-1">
                  {jogo.data}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Hora
                </p>

                <p className="font-medium text-sm text-zinc-900 mt-1">
                  {jogo.hora}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}