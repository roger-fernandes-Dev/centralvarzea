"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase/client"

type Theme = "light" | "dark"

export default function DashboardJogador() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [theme, setTheme] = useState<Theme>("dark")
  const [loading, setLoading] = useState(true)

  // MODAL
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
    ? "bg-gradient-to-br from-zinc-950 to-zinc-900 text-white"
    : "bg-gray-50 text-gray-900"

  const card = isDark
    ? "bg-zinc-900/70 backdrop-blur border border-zinc-800"
    : "bg-white shadow-md border border-gray-200"

  const inner = isDark ? "bg-zinc-800" : "bg-gray-100"

  return (
    <div className={`${bg} min-h-screen`}>

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="font-bold text-3xl tracking-wide">
          {nome}
        </h1>

        <div className="flex items-center gap-3">

          {/* CONFIG */}
          <button
            onClick={() => setOpenModal(true)}
            className={`p-2 rounded-full ${
              isDark ? "bg-zinc-800" : "bg-gray-200"
            }`}
          >
            ⚙️
          </button>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-full ${
              isDark ? "bg-zinc-800" : "bg-gray-200"
            }`}
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-500 text-white"
          >
            ⎋
          </button>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className={`w-full max-w-2xl rounded-xl p-6 ${card}`}>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Editar Perfil</h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700"
                placeholder="Nome"
              />

              <input
                value={posicao}
                onChange={(e) => setPosicao(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700"
                placeholder="Posição"
              />

              <input
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700"
                placeholder="Idade"
              />

              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700"
                placeholder="Time"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-500 text-white"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white"
              >
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-5 p-6">

        {/* PERFIL */}
        <div className={`col-span-12 lg:col-span-3 rounded-xl p-5 ${card}`}>
          <div className="flex gap-4">
            <img
              src="/player.jpg"
              className="w-28 h-28 rounded-full object-cover border-2 border-orange-500"
            />

            <div>
              <h2 className="text-xl font-bold">{posicao}</h2>
              <p className="text-sm opacity-70">{idade} anos</p>

              <p className="text-sm">
                <span className="opacity-60">Time atual:</span> {time}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 text-xs">
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">
              Campo
            </span>
            <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
              Quadra
            </span>
          </div>
        </div>

        {/* RESUMO */}
        <div className={`col-span-12 lg:col-span-5 rounded-xl p-5 ${card}`}>
          <h2 className="font-semibold mb-4">Resumo do Jogador</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className={`${inner} p-4 rounded-lg`}>
              <p className="text-xs opacity-60">Partidas</p>
              <p className="text-2xl font-bold">24</p>
            </div>

            <div className={`${inner} p-4 rounded-lg`}>
              <p className="text-xs opacity-60">Gols</p>
              <p className="text-2xl font-bold">12</p>
            </div>

            <div className={`${inner} p-4 rounded-lg`}>
              <p className="text-xs opacity-60">Assistências</p>
              <p className="text-2xl font-bold">7</p>
            </div>

            <div className={`${inner} p-4 rounded-lg`}>
              <p className="text-xs opacity-60">Cartões</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>

        {/* CAMPEONATOS */}
        <div className={`col-span-12 lg:col-span-4 rounded-xl p-5 ${card}`}>
          <h2 className="font-semibold mb-4">Campeonatos Atuais</h2>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className={`${inner} p-4 rounded-lg`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">Série A</p>
                    <p className="text-xs opacity-60">
                      Flamengo • 18 jogos
                    </p>
                  </div>

                  <img
                    src="/team.png"
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                <div className="mt-3 h-2 bg-black/30 rounded">
                  <div className="h-2 w-[70%] bg-orange-500 rounded"></div>
                </div>

                <p className="text-xs opacity-60 mt-2">
                  Próximo jogo: 28/10
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HISTÓRICO */}
        <div className={`col-span-12 rounded-xl p-5 ${card}`}>
          <h2 className="font-semibold mb-4">Campeonatos que Jogou</h2>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-4 rounded-lg ${inner}`}
              >
                <div>
                  <p className="text-sm font-semibold">
                    2023 - Série A
                  </p>
                  <p className="text-xs opacity-60">
                    Flamengo • 12 gols
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    Campeão
                  </span>

                  <img
                    src="/team.png"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}