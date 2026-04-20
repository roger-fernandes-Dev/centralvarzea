import {
  pgTable,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core"

/* =========================
   TEAM
========================= */
export const team = pgTable("Team", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  logo: text("logo").notNull(),
})

/* =========================
   NEWS
========================= */
export const news = pgTable("News", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  resumo: text("resumo").notNull(),
  image: text("image").notNull(),
  categoria: text("categoria").notNull(),
  content: text("content").notNull(),
  destaque: boolean("destaque").default(false),

  data: timestamp("data").notNull(),

  teamId: text("teamId").references(() => team.id),

  createdAt: timestamp("createdAt").defaultNow(),
})