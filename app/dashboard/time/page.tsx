"use client"

import {
  Calendar,
  Trophy,
  Search,
  MapPin,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardTime() {
  const router = useRouter()

  // depois isso vem do banco
  const hasTeam = false

  if (!hasTeam) {
    return (
      <main className="flex-1 p-3 md:p-6">
        {/* ONBOARDING */}
        <section className="bg-white border border-zinc-200 rounded-[28px] p-6 md:p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] font-bold text-2xl">
            CV
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mt-5 text-zinc-900">
            Comece criando seu time
          </h1>

          <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
            Complete o cadastro do seu time para liberar o dashboard, jogos e campeonatos.
          </p>

          <button
            onClick={() => router.push("/dashboard/time/editartime")}
            className="mt-6 h-12 px-6 rounded-2xl cursor-pointer bg-[#0f3b2e] text-white text-sm font-semibold"
          >
            Criar meu time
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="flex-1 p-3 md:p-6">
      {/* DESKTOP HEADER */}
      <div className="hidden lg:flex items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-[30px] font-bold text-zinc-900">
            Bem-vindo de volta
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Acompanhe tudo sobre seu time.
          </p>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="lg:hidden mb-4">
        <div className="h-11 bg-white rounded-2xl border border-zinc-200 px-4 flex items-center gap-3">
          <Search className="text-zinc-400" size={16} />

          <input
            placeholder="Buscar times..."
            className="bg-transparent outline-none flex-1 text-[13px]"
          />
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <section className="bg-white rounded-[28px] border border-zinc-200 p-4 md:p-8 mb-5 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="relative mx-auto md:mx-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-3xl bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] text-2xl md:text-4xl font-bold">
              CV
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">
              Central City F.C.
            </h2>

            <p className="text-sm text-zinc-500 mt-1 md:mt-2">
              Fundado em 2021
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-8">
              {[
                { icon: Users, title: "22 atletas", desc: "Jogadores" },
                { icon: Shield, title: "Verde e Branco", desc: "Cores" },
                { icon: MapPin, title: "São Paulo", desc: "Local" },
                { icon: Trophy, title: "Semi-pro", desc: "Categoria" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-zinc-200 rounded-2xl p-3 md:p-5"
                >
                  <item.icon className="text-[#0f3b2e]" size={18} />
                  <h3 className="mt-3 text-sm font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="text-[11px] md:text-sm text-zinc-500 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* resto do dashboard continua igual */}
    </main>
  )
}