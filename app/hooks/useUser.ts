"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

export function useUser() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // pega sessão inicial
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // escuta mudanças (login/logout)
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}