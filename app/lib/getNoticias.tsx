const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function getNoticias() {
  const res = await fetch(`${baseUrl}/api/noticias`, {
    cache: "no-store"
  })

  return res.json()
}