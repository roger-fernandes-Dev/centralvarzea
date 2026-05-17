"use client"

import { useEffect } from "react"
console.log("TRACK COMPONENT CARREGOU")
export default function TrackHomeView() {
  useEffect(() => {
    console.log("TRACK MONTADO")
  async function run() {
    try {
      const res = await fetch("/api/analytics/view", {
        method: "POST",
      })

      const data = await res.json()

      console.log("VIEW API:", data)
    } catch (err) {
      console.log("ERRO TRACK:", err)
    }
  }

  run()
}, [])

return null
}