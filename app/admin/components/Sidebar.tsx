"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase"

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    href: "/admin/noticias",
    label: "Notícias",
  },
  {
    href: "/admin/jogos",
    label: "Jogos",
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-black text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">
          Central Várzea
        </h1>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-3 rounded transition ${
                pathname === link.href
                  ? "bg-white text-black"
                  : "hover:bg-zinc-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 p-3 rounded"
      >
        Sair
      </button>
    </aside>
  )
}