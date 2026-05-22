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

  nometime: z.string().optional(),
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
      nometime,
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

    const userid = authData.user.id

    // =========================
    // 2. PROFILE
    // =========================
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userid,
          tipo,
          nome,
          telefone,
          cidade,
          estado,
        },
      ])

    if (profileError) {
      console.log("ERRO PROFILE:", profileError)

      // rollback auth user
      await supabase.auth.admin.deleteUser(userid)

      return NextResponse.json(
        { error: "Erro ao criar perfil" },
        { status: 500 }
      )
    }

    // =========================
    // 3. PLAYER PROFILE
    // =========================
    if (tipo === "jogador") {
      const { error: playerError } = await supabase
        .from("player_profiles")
        .insert([
          {
            id: crypto.randomUUID(),
            userid,
            posicao,
            modalidade,
          },
        ])

      if (playerError) {
        console.log("ERRO PLAYER PROFILE:", playerError)

        // rollback
        await supabase.from("profiles").delete().eq("id", userid)

        await supabase.auth.admin.deleteUser(userid)

        return NextResponse.json(
          { error: "Erro ao criar perfil do jogador" },
          { status: 500 }
        )
      }
    }

    // =========================
    // 4. TEAM PROFILE
    // =========================
    if (tipo === "time") {
      const { error: teamError } = await supabase
        .from("team_profiles")
        .insert([
          {
            id: crypto.randomUUID(),
            userid,
            nometime: nometime || nome,
            cidade,
            estado,
          },
        ])

      if (teamError) {
        console.log("ERRO TEAM PROFILE:", teamError)

        // rollback
        await supabase.from("profiles").delete().eq("id", userid)

        await supabase.auth.admin.deleteUser(userid)

        return NextResponse.json(
          { error: "Erro ao criar perfil do time" },
          { status: 500 }
        )
      }
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