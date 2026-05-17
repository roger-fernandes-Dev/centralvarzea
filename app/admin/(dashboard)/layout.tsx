"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import { Menu } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">
      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* SIDEBAR MOBILE */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen lg:hidden
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {/* CONTENT */}
      <main className="flex-1 min-w-0">
        {/* MOBILE HEADER */}
        <div className="lg:hidden sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-zinc-200 px-4 py-4 flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-xl hover:bg-zinc-100 transition"
          >
            <Menu size={26} />
          </button>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}