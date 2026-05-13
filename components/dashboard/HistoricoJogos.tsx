"use client"

type Props = {
  card: string
  inner: string
}

export default function HistoricoJogos({
  card,
  inner,
}: Props) {
  return (
    <div className={`col-span-12 rounded-3xl p-6 ${card}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

        <div>
          <h2 className="font-bold text-xl tracking-tight">
            Histórico de Jogos
          </h2>

          <span className="text-xs opacity-50">
            Jogos já realizados
          </span>
        </div>

        <button
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold shadow-lg shadow-yellow-400/20 hover:scale-[1.02] transition-all"
        >
          + Adicionar jogo
        </button>
      </div>

      <div className="space-y-4">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`${inner} rounded-2xl p-5`}
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <p className="text-sm font-semibold">
                  Flamengo x Corinthians
                </p>

                <p className="text-xs opacity-50 mt-1">
                  Campeonato Série A
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">

                <span className="text-xs px-3 py-2 rounded-2xl bg-yellow-400/10 text-yellow-300 border border-yellow-400/10">
                  3x1
                </span>

                <span className="text-xs px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
                  28/10/2026
                </span>

                <span className="text-xs px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
                  19:30
                </span>

                <span className="text-xs px-3 py-2 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/10">
                  Campo
                </span>

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs">

              <span className="px-3 py-2 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
                ⚽ 2 gols
              </span>

              <span className="px-3 py-2 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/10">
                🎯 1 assistência
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}