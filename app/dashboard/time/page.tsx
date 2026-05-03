"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/src/lib/supabase/client"

export default function DashboardTime() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return null

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard Time</h1>
      <p className="text-gray-600 mt-2">{user.email}</p>
    </div>
  )
}