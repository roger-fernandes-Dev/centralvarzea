import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// =========================
// SUPABASE
// =========================
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// =========================
// VALIDATION
// =========================
const schema = z.object({
  title: z.string().min(5),
  resumo: z.string().min(10),
  content: z.string().min(20),
  image: z.string().url(),
})

// =========================
// POST
// =========================
export async function POST(req: Request) {
  try {
    // =========================
    // TOKEN
    // =========================
    const token = req.headers
      .get("authorization")
      ?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        { error: "Token não enviado" },
        { status: 401 }
      )
    }

    // =========================
    // AUTH USER
    // =========================
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token)

    if (userError || !user) {
      console.error(userError)

      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    // =========================
    // ADMIN EMAIL
    // =========================
    if (
      user.email !==
      "rogerfernandes.adm@centralvarzea.com.br"
    ) {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      )
    }

    // =========================
    // VALIDAR DADOS
    // =========================
    const body = await req.json()

    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    }

    const { title, resumo, content, image } = parsed.data

    // =========================
    // SLUG
    // =========================
    const slug =
  title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") +
  "-" +
  Date.now()

    // =========================
    // INSERT
    // =========================
    const { error } = await supabase.from("News").insert([
      {
        id: crypto.randomUUID(),
        title,
        resumo,
        content,
        image,
        slug,
        categoria: "geral",
        data: new Date(),
      },
    ])

    if (error) {
      console.error(error)

      return NextResponse.json(
        { error: "Erro ao salvar" },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}