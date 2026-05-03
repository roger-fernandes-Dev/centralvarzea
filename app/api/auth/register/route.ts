import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// 🔐 service role (server only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// =========================
// VALIDATION
// =========================
const schema = z.object({
  tipo: z.enum(["jogador", "time"]),
  nome: z.string().min(3),
  telefone: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(6),

  cidade: z.string().optional(),
  estado: z.string().optional(),

  posicao: z.string().optional(),
  modalidade: z.string().optional(),

  nomeTime: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("BODY RECEBIDO:", body)

    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      console.log("ERRO ZOD:", parsed.error.format())

      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    }

    const {
      tipo,
      nome,
      telefone,
      email,
      password,
      cidade,
      estado,
      posicao,
      modalidade,
      nomeTime,
    } = parsed.data

    // =========================
    // 1. CRIAR USUÁRIO AUTH
    // =========================
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      })

    // 🔴 EMAIL JÁ EXISTE
    if (authError?.code === "email_exists") {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 409 }
      )
    }

    if (authError || !authData.user) {
      console.log("ERRO SUPABASE AUTH:", authError)

      return NextResponse.json(
        { error: "Erro ao criar usuário" },
        { status: 400 }
      )
    }

    const userId = authData.user.id

    // =========================
    // 2. PROFILE
    // =========================
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          tipo,
          nome,
          telefone,
          cidade,
          estado,
        },
      ])

    if (profileError) {
      console.log("ERRO PROFILE:", profileError)

      return NextResponse.json(
        { error: "Erro ao criar perfil" },
        { status: 500 }
      )
    }

    // =========================
    // 3. PLAYER / TEAM
    // =========================
    if (tipo === "jogador") {
      await supabase.from("player_profiles").insert([
        {
          id: crypto.randomUUID(),
          userId,
          posicao,
          modalidade,
        },
      ])
    }

    if (tipo === "time") {
      await supabase.from("team_profiles").insert([
        {
          id: crypto.randomUUID(),
          userId,
          nomeTime: nomeTime || nome,
          cidade,
          estado,
        },
      ])
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("ERRO INTERNO:", err)

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}