"use client"

import { useState } from "react"
import CampeonatosJogados from "./CampeonatosJogados"

type Props = {
  card: string
  inner: string
  input: string
}

export default function ResumoJogador({
  card,
  inner,
  input,
}: Props) {

  const [openGameModal, setOpenGameModal] = useState(false)
  const [openCampeonatoModal, setOpenCampeonatoModal] = useState(false)

  const [tipoJogo, setTipoJogo] =
    useState<"amistoso" | "campeonato">("amistoso")

  const [campeonato, setCampeonato] = useState("")
  const [meuTime, setMeuTime] = useState("")
  const [adversario, setAdversario] = useState("")
  const [placar, setPlacar] = useState("")
  const [gols, setGols] = useState("")
  const [assistencias, setAssistencias] = useState("")
  const [teveCartao, setTeveCartao] = useState(false)

  const [tipoCartao, setTipoCartao] =
    useState<"amarelo" | "vermelho">("amarelo")

  const [quantidadeCartao, setQuantidadeCartao] = useState("")
  const [dataJogo, setDataJogo] = useState("")
  const [horaJogo, setHoraJogo] = useState("")

  return (
    <>
      {/* MODAL JOGO */}
      {openGameModal && (
        <div
          onClick={() => setOpenGameModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4 py-8 overflow-y-auto"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl rounded-[32px] p-8 ${card}`}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-yellow-400 text-xs uppercase tracking-[0.3em] font-semibold">
                  Novo jogo
                </p>

                <h2 className="text-3xl font-bold tracking-tight mt-2">
                  Adicionar partida
                </h2>
              </div>

              <button
                onClick={() => setOpenGameModal(false)}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">

              {tipoJogo === "campeonato" && (
                <div>
                  <label className="text-sm opacity-70 mb-2 block">
                    Nome do campeonato
                  </label>

                  <input
                    value={campeonato}
                    onChange={(e) => setCampeonato(e.target.value)}
                    className={input}
                    placeholder="Ex: Série Ouro 2026"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={meuTime}
                  onChange={(e) => setMeuTime(e.target.value)}
                  className={input}
                  placeholder="Seu time"
                />

                <input
                  value={adversario}
                  onChange={(e) => setAdversario(e.target.value)}
                  className={input}
                  placeholder="Adversário"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  value={placar}
                  onChange={(e) => setPlacar(e.target.value)}
                  className={input}
                  placeholder="3x1"
                />

                <input
                  value={gols}
                  onChange={(e) => setGols(e.target.value)}
                  className={input}
                  placeholder="Gols"
                />

                <input
                  value={assistencias}
                  onChange={(e) => setAssistencias(e.target.value)}
                  className={input}
                  placeholder="Assistências"
                />
              </div>

              <div className={`${inner} rounded-3xl p-5 border border-white/5`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Recebeu cartão?
                  </h3>

                  <button
                    onClick={() => setTeveCartao(!teveCartao)}
                    className={`w-14 h-8 rounded-full transition-all relative ${
                      teveCartao
                        ? "bg-yellow-400"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all ${
                        teveCartao ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {teveCartao && (
                  <div className="mt-5 grid md:grid-cols-2 gap-4">

                    <select
                      value={tipoCartao}
                      onChange={(e) =>
                        setTipoCartao(
                          e.target.value as "amarelo" | "vermelho"
                        )
                      }
                      className={input}
                    >
                      <option value="amarelo">
                        Amarelo
                      </option>

                      <option value="vermelho">
                        Vermelho
                      </option>
                    </select>

                    <input
                      value={quantidadeCartao}
                      onChange={(e) =>
                        setQuantidadeCartao(e.target.value)
                      }
                      className={input}
                      placeholder="Quantidade"
                    />

                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={dataJogo}
                  onChange={(e) => setDataJogo(e.target.value)}
                  className={input}
                />

                <input
                  type="time"
                  value={horaJogo}
                  onChange={(e) => setHoraJogo(e.target.value)}
                  className={input}
                />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* RESUMO */}
      <div className={`col-span-12 lg:col-span-5 rounded-3xl p-6 ${card}`}>
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="font-bold text-xl tracking-tight">
              Resumo do Jogador
            </h2>

            <span className="text-xs text-yellow-400">
              Temporada 2026
            </span>
          </div>

          <button
            onClick={() => setOpenGameModal(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold"
          >
            + Adicionar jogo
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className={`${inner} p-5 rounded-2xl`}>
            <p className="text-xs opacity-50 mb-2">
              Partidas
            </p>

            <p className="text-3xl font-bold">
              24
            </p>
          </div>

          <div className={`${inner} p-5 rounded-2xl`}>
            <p className="text-xs opacity-50 mb-2">
              Gols
            </p>

            <p className="text-3xl font-bold">
              12
            </p>
          </div>

        </div>
      </div>

      {/* HISTÓRICO */}
      {/* CAMPEONATOS JOGADOS */}
              <CampeonatosJogados
                card={card}
                inner={inner}
                input={input}
                />
      
    </>
  )
}