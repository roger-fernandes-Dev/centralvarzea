"use client"

import { useState } from "react"

type Props = {
  card: string
  inner: string
  input: string
}

export default function CampeonatosAtuais({
  card,
  inner,
  input,
}: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className={`col-span-12 lg:col-span-4 rounded-3xl p-6 ${card}`}>
        
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-xl tracking-tight">
              Campeonatos Atuais
            </h2>

            <p className="text-xs opacity-50 mt-1">
              Campeonatos em andamento
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold shadow-lg shadow-yellow-400/20 hover:scale-[1.02] transition-all"
          >
            +
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`${inner} p-5 rounded-2xl`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">
                    Série A
                  </p>

                  <p className="text-xs opacity-50 mt-1">
                    Flamengo • 18 jogos
                  </p>
                </div>

                <img
                  src="/team.png"
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>

              <div className="mt-4 h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-2 w-[70%] bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-[11px] bg-green-500/10 text-green-400 border border-green-500/10 px-2 py-1 rounded-xl">
                  Campo
                </span>

                <p className="text-xs opacity-50">
                  Próximo jogo: 28/10
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 py-8 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl rounded-[32px] p-8 ${card}`}
          >

            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold">
                  Campeonato Atual
                </p>

                <h2 className="text-3xl font-bold tracking-tight mt-2">
                  Adicionar campeonato
                </h2>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label className="text-sm opacity-70 mb-2 block">
                  Nome do campeonato
                </label>

                <input
                  className={input}
                  placeholder="Ex: Copa Birigui 2026"
                />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">
                  Cidade
                </label>

                <input
                  className={input}
                  placeholder="Ex: Birigui"
                />
              </div>

              <div className="md:col-span-2">
            <label className="text-sm opacity-70 mb-2 block">
            Estado
            </label>

          <select
            className={`${input} bg-[#232326] text-white`}
          >
            <option className="bg-[#232326]">AC</option>
            <option className="bg-[#232326]">AL</option>
            <option className="bg-[#232326]">AP</option>
            <option className="bg-[#232326]">AM</option>
            <option className="bg-[#232326]">BA</option>
            <option className="bg-[#232326]">CE</option>
            <option className="bg-[#232326]">DF</option>
            <option className="bg-[#232326]">ES</option>
            <option className="bg-[#232326]">GO</option>
            <option className="bg-[#232326]">MA</option>
            <option className="bg-[#232326]">MT</option>
            <option className="bg-[#232326]">MS</option>
            <option className="bg-[#232326]">MG</option>
            <option className="bg-[#232326]">PA</option>
            <option className="bg-[#232326]">PB</option>
            <option className="bg-[#232326]">PR</option>
            <option className="bg-[#232326]">PE</option>
            <option className="bg-[#232326]">PI</option>
            <option className="bg-[#232326]">RJ</option>
            <option className="bg-[#232326]">RN</option>
            <option className="bg-[#232326]">RS</option>
            <option className="bg-[#232326]">RO</option>
            <option className="bg-[#232326]">RR</option>
            <option className="bg-[#232326]">SC</option>
            <option className="bg-[#232326]">SP</option>
            <option className="bg-[#232326]">SE</option>
            <option className="bg-[#232326]">TO</option>
          </select>
        </div>

              <div className="md:col-span-2">
                <label className="text-sm opacity-70 mb-2 block">
                  Time que está jogando
                </label>

                <input
                  className={input}
                  placeholder="Nome do time"
                />
              </div>

            </div>

            <div className="mt-6">
              <label className="text-sm opacity-70 mb-3 block">
                Tipo
              </label>

              <div className="grid grid-cols-2 gap-4">

                <button
                  className="p-4 rounded-2xl border border-yellow-400 bg-yellow-400/10 text-left"
                >
                  <p className="font-semibold">
                    Campo
                  </p>

                  <p className="text-xs opacity-60 mt-1">
                    Futebol de campo
                  </p>
                </button>

                <button
                  className="p-4 rounded-2xl border border-white/10 bg-white/5 text-left"
                >
                  <p className="font-semibold">
                    Quadra
                  </p>

                  <p className="text-xs opacity-60 mt-1">
                    Society/Futsal
                  </p>
                </button>

              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>

              <button
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg shadow-yellow-400/20"
              >
                Salvar campeonato
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  )
}