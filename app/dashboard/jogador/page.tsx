"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase/client"

import ResumoJogador from "@/components/dashboard/Resumojogador"
import HistoricoJogos from "@/components/dashboard/HistoricoJogos"
import CampeonatosAtuais from "@/components/dashboard/CampeonatosAtuais"
import CampeonatosJogados from "@/components/dashboard/CampeonatosJogados"

type Theme = "light" | "dark"

export default function DashboardJogador() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [theme, setTheme] = useState<Theme>("dark")
  const [loading, setLoading] = useState(true)

  // MODAL PERFIL
  const [openModal, setOpenModal] = useState(false)

  // DADOS EDITÁVEIS
  const [nome, setNome] = useState("Roger Fernandes")
  const [posicao, setPosicao] = useState("Atacante")
  const [idade, setIdade] = useState("24")
  const [time, setTime] = useState("Flamengo")

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace("/login")
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    check()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  function handleSave() {
    setOpenModal(false)
  }

  if (loading) return null

  const isDark = theme === "dark"

  const bg = isDark
    ? "bg-[#0f0f10] text-white"
    : "bg-[#f5f5f7] text-gray-900"

  const card = isDark
    ? "bg-[#18181b] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
    : "bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"

  const inner = isDark ? "bg-[#232326]" : "bg-gray-100"

  const input =
    "w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-yellow-400 transition-all"

  return (
    <div className={`${bg} min-h-screen`}>

      {/* HEADER */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/5 px-6 py-5 flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-400 font-semibold">
            Central Várzea
          </p>

          <h1 className="font-bold text-3xl tracking-tight mt-1">
            {nome}
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setOpenModal(true)}
            className={`p-3 rounded-full ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                : "bg-gray-200"
            }`}
          >
            ⚙️
          </button>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-3 rounded-full ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                : "bg-gray-200"
            }`}
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          <button
            onClick={handleLogout}
            className="p-3 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            ⎋
          </button>
        </div>
      </div>

      {/* MODAL PERFIL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className={`w-full max-w-2xl rounded-3xl p-8 ${card}`}>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Editar Perfil
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={input}
                placeholder="Nome"
              />

              <input
                value={posicao}
                onChange={(e) => setPosicao(e.target.value)}
                className={input}
                placeholder="Posição"
              />

              <input
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className={input}
                placeholder="Idade"
              />

              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={input}
                placeholder="Time"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg shadow-yellow-400/20"
              >
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* PERFIL */}
        <div className={`col-span-12 lg:col-span-3 rounded-3xl p-6 ${card}`}>
          <div className="flex gap-5 items-center">
            <img
              src="/player.jpg"
              className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.25)]"
            />

            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {posicao}
              </h2>

              <p className="text-sm opacity-70 mt-1">
                {idade} anos
              </p>

              <p className="text-sm mt-2">
                <span className="opacity-50">
                  Time atual:
                </span>{" "}
                {time}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6 text-xs">
            <span className="bg-green-500/10 text-green-400 border border-green-500/10 px-3 py-2 rounded-2xl">
              Campo
            </span>

            <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/10 px-3 py-2 rounded-2xl">
              Quadra
            </span>
          </div>
        </div>

        {/* RESUMO */}
        <div className="col-span-12 lg:col-span-5">
          <ResumoJogador
            card={card}
            inner={inner}
            input={input}
          />
        </div>

        {/* CAMPEONATOS ATUAIS */}
        <CampeonatosAtuais
          card={card}
          inner={inner}
          input={input}
        />

        {/* HISTÓRICO DE JOGOS */}
        <HistoricoJogos
          card={card}
          inner={inner}
        />

      </div>
    </div>
  )
}