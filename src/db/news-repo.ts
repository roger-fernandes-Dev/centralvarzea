import { db } from "@/src/db"
import { news, team } from "@/src/db/schema"
import { eq } from "drizzle-orm"

/* =========================
   LISTA DE NOTÍCIAS
========================= */
export async function getNoticias() {
  const result = await db
    .select()
    .from(news)
    .leftJoin(team, eq(news.teamId, team.id))

  return result.map((row) => ({
    ...row.News,
    team: row.Team,
  }))
}

/* =========================
   NOTÍCIA POR SLUG
========================= */
export async function getNoticia(slug: string) {
  const result = await db
    .select()
    .from(news)
    .leftJoin(team, eq(news.teamId, team.id))
    .where(eq(news.slug, slug))
    .limit(1)

  if (!result.length) return null

  const row = result[0]

  return {
    ...row.News,
    team: row.Team,
  }
}