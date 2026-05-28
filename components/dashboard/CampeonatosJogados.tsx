"use client"

import { useState } from "react"

type Props = {
  card: string
  inner: string
  input: string
}

export default function CampeonatosJogados({
  card,
  inner,
  input,
}: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className={`col-span-12 rounded-3xl p-6 ${card}`}>
        
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-xl tracking-tight">
              Campeonatos que Jogou
            </h2>

            <span className="text-xs opacity-50">
              Histórico completo
            </span>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold"
          >
            + Adicionar campeonato
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-5 rounded-2xl ${inner}`}
            >
              <div>
                <p className="text-sm font-semibold">
                  2023 - Série A
                </p>

                <p className="text-xs opacity-50 mt-1">
                  Flamengo • 12 gols
                </p>
              </div>

              <img
                src="/team.png"
                className="w-11 h-11 rounded-full object-cover"
              />
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
                  Campeonato
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
                <input className={input} />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">
                  Cidade
                </label>
                <input className={input} />
              </div>

              <div>
                <label className="text-sm opacity-70 mb-2 block">
                  Estado
                </label>

                <select className={`${input} bg-[#232326] text-white`}>
                  <option>SP</option>
                  <option>RJ</option>
                  <option>MG</option>
                  <option>PR</option>
                  <option>SC</option>
                  <option>RS</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10"
              >
                Cancelar
              </button>

              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}