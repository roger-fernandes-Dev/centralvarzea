"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

import {
  Newspaper,
  Trophy,
  Eye,
  Activity,
  ArrowUpRight,
} from "lucide-react"

export default function DashboardPage() {
  const [newsCount, setNewsCount] = useState(0)
  const [viewsTotal, setViewsTotal] = useState(0)
  const [siteViews, setSiteViews] = useState(0)

  useEffect(() => {
    async function fetchDashboard() {
      // ======================
      // NOTÍCIAS COUNT
      // ======================
      const { count } = await supabase
        .from("News")
        .select("*", {
          count: "exact",
          head: true,
        })

      // ======================
      // VIEWS DAS NOTÍCIAS
      // ======================
      const { data: newsViews } = await supabase
        .from("News")
        .select("views")

      const totalViews =
        newsViews?.reduce((acc, item) => {
          return acc + (item.views ?? 0)
        }, 0) ?? 0

      // ======================
      // SITE VIEWS (CORRIGIDO)
      // ======================
      const { data, error } = await supabase
        .from("site_views")
        .select("views")

      if (error) {
        console.log("site_views error:", error)
      }

      const views = data?.[0]?.views ?? 0
      setNewsCount(count ?? 0)
      setViewsTotal(totalViews)
      setSiteViews(views)
    }

    fetchDashboard()
  }, [])

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-2 text-base">
          Painel administrativo da Central Várzea
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* NOTÍCIAS */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Newspaper size={24} />
            </div>

            <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
              <ArrowUpRight size={16} />
              Portal
            </div>
          </div>

          <div className="mt-6">
            <p className="text-zinc-500 text-sm">
              Notícias publicadas
            </p>

            <h2 className="text-4xl font-bold mt-2 tracking-tight">
              {newsCount.toLocaleString("pt-BR")}
            </h2>

            <h3 className="text-2xl font-bold text-zinc-900 mt-3">
              {viewsTotal.toLocaleString("pt-BR")}
            </h3>

            <p className="text-sm text-zinc-400 mt-4">
              Total de notícias cadastradas no portal
            </p>
          </div>
        </div>

        {/* JOGOS */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
              <Trophy size={24} />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-zinc-500 text-sm">Jogos</p>
            <h2 className="text-4xl font-bold mt-2">0</h2>
          </div>
        </div>

        {/* VIEWS SITE */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Eye size={24} />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-zinc-500 text-sm">
              Visualizações gerais
            </p>

            <h2 className="text-4xl font-bold mt-2 tracking-tight">
              {siteViews.toLocaleString("pt-BR")}
            </h2>
          </div>
        </div>

      </div>

      {/* ACTIVITY */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
            <Activity size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Atividades recentes
            </h2>
          </div>
        </div>

        <div className="border border-dashed p-12 text-center">
          <p className="text-zinc-500">
            Nenhuma atividade registrada ainda.
          </p>
        </div>

      </div>

    </div>
  )
}