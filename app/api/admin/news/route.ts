import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { z } from "zod"

// =========================
// CLIENT (service role - DB)
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
    // AUTH USER
    // =========================
    const cookieStore = await cookies()

    console.log("COOKIES:", cookieStore.getAll())

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser()

    console.log("USER:", user)
    console.log("USER ERROR:", userError)

    if (!user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    // =========================
    // ADMIN EMAIL
    // =========================
    if (user.email !== "seuemail@email.com") {
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
      title.toLowerCase().replace(/\s+/g, "-") +
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