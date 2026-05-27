"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Calendar,
  Trophy,
  Search,
  Bell,
  MessageCircle,
  Shield,
  Users,
  Menu,
  Settings,
} from "lucide-react"

export default function SidebarTime() {
  const [menuOpen, setMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const menu = [
    {
      icon: Shield,
      label: "Dashboard",
      path: "/dashboard/time",
    },
    {
      icon: Search,
      label: "Buscar Times",
      path: "/dashboard/time/buscar",
    },
    {
      icon: Users,
      label: "Amistosos",
      path: "/dashboard/time/amistosos",
    },
    {
      icon: Trophy,
      label: "Campeonatos",
      path: "/dashboard/time/campeonatos",
    },
    {
      icon: Calendar,
      label: "Agenda",
      path: "/dashboard/time/agenda",
    },
    {
      icon: Settings,
      label: "Editar Time",
      path: "/dashboard/time/editartime",
    },
  ]

 return (
  <>
    {/* DESKTOP */}
    <aside className="hidden lg:flex w-[250px] h-screen bg-white border-r border-zinc-200 flex-col justify-between">
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f3b2e] flex items-center justify-center text-white font-bold text-sm">
                CV
              </div>

              <div>
                <h1 className="font-bold text-[16px] text-zinc-900 leading-none">
                  Central
                </h1>

                <p className="text-xs text-zinc-500 mt-1">
                  Várzea
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard/time/editartime")}
              className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200 hover:bg-zinc-100 transition flex items-center justify-center"
            >
              <Settings size={18} />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menu.map((item, index) => {
              const active = pathname === item.path

              return (
                <button
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`w-full h-12 rounded-2xl flex items-center gap-3 px-4 text-sm transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#edf3ef] text-[#0f3b2e] font-medium hover:bg-[#dce8e0]"
                      : "text-zinc-700 hover:bg-[#f1f5f3]"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* MOBILE */}
      <div className="lg:hidden relative top-0 left-0 right-0 z-50 bg-[#f5f7f9] p-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mt-3 bg-white border border-zinc-200 rounded-3xl p-3 space-y-2 relative z-40"
          >
            <Menu size={18} />
          </button>

          <button className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center">
            <Bell size={17} />
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 bg-white border border-zinc-200 rounded-3xl p-3 space-y-2">
            {menu.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  router.push(item.path)
                  setMenuOpen(false)
                }}
                className="w-full h-11 rounded-2xl flex items-center gap-3 px-4 text-sm text-zinc-700 hover:bg-zinc-100 transition"
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}