import {
  pgTable,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core"

/* =========================
   TEAM (USADO NAS NOTÍCIAS)
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

/* =========================
   PROFILES (BASE DE USUÁRIOS)
========================= */
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // mesmo id do auth.users

  tipo: text("tipo").notNull(), // jogador | time

  nome: text("nome").notNull(),
  telefone: text("telefone"),

  cidade: text("cidade"),
  estado: text("estado"),

  foto: text("foto"),

  createdAt: timestamp("createdAt").defaultNow(),
})

/* =========================
   PLAYER PROFILE
========================= */
export const playerProfiles = pgTable("player_profiles", {
  id: text("id").primaryKey(),

  userId: text("userId")
    .notNull()
    .references(() => profiles.id),

  posicao: text("posicao"),
  modalidade: text("modalidade"), // campo | quadra | ambos

  timeAtual: text("timeAtual"),

  premium: boolean("premium").default(false),
})

/* =========================
   TEAM PROFILE (REAL DO TIME)
========================= */
export const teamProfiles = pgTable("team_profiles", {
  id: text("id").primaryKey(),

  userId: text("userId")
    .notNull()
    .references(() => profiles.id),

  nomeTime: text("nomeTime").notNull(),
  idadeTime: text("idadeTime"),

  cidade: text("cidade"),
  bairro: text("bairro"),
  estado: text("estado"),

  precisaJogador: boolean("precisaJogador").default(false),
  posicaoProcurada: text("posicaoProcurada"),

  precisaPatrocinio: boolean("precisaPatrocinio").default(false),

  premium: boolean("premium").default(false),
})

/* =========================
   CONNECTIONS (MATCH)
========================= */
export const connections = pgTable("connections", {
  id: text("id").primaryKey(),

  playerId: text("playerId")
    .notNull()
    .references(() => profiles.id),

  teamId: text("teamId")
    .notNull()
    .references(() => profiles.id),

  tipo: text("tipo"), // interesse_time | interesse_jogador

  status: text("status").default("pendente"), // pendente | aceito | recusado

  createdAt: timestamp("createdAt").defaultNow(),
})