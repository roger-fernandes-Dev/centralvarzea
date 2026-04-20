import dotenv from "dotenv"
dotenv.config()
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { eq } from "drizzle-orm"

import { noticias } from "../app/data/noticias"
import { news, team } from "@/src/db/schema"

// conexão
const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

async function main() {
  for (const n of noticias) {
    let teamId: string | null = null

    // =========================
    // UPSERT TEAM
    // =========================
    if (n.team) {
      const existingTeam = await db
        .select()
        .from(team)
        .where(eq(team.name, n.team.name))
        .limit(1)

      if (existingTeam.length > 0) {
        teamId = existingTeam[0].id
      } else {
        const insertedTeam = await db
          .insert(team)
          .values({
            id: crypto.randomUUID(),
            name: n.team.name,
            logo: n.team.logo,
          })
          .returning()

        teamId = insertedTeam[0].id
      }
    }

    // =========================
    // UPSERT NEWS
    // =========================
    const existingNews = await db
      .select()
      .from(news)
      .where(eq(news.slug, n.slug))
      .limit(1)

    if (existingNews.length > 0) {
      // se quiser update depois, pode colocar aqui
      continue
    }

    await db.insert(news).values({
      id: crypto.randomUUID(),
      slug: n.slug,
      title: n.title,
      resumo: n.resumo,
      image: n.image,
      categoria: n.categoria,
      data: new Date(n.data),
      content: n.content,
      destaque: n.destaque ?? false,
      teamId,
    })
  }
}

main()
  .then(() => {
    console.log("Seed finalizado")
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await client.end()
  })