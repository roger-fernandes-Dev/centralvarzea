"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.auth.getSession()

      console.log("DASH SESSION:", data)
      console.log("DASH ERROR:", error)

      setUser(data.session?.user || null)
    }

    load()
  }, [])

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <pre className="mt-6 text-sm">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}