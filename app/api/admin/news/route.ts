import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
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
    // 🔐 pegar cookies corretamente
    const cookieStore = await cookies()
    const token = cookieStore.get("sb-access-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // 🔐 cliente com token do usuário
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    if (user.email !== "seuemail@email.com") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    // 🔐 validar dados
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    const { title, resumo, content, image } = parsed.data

    const slug =
      title.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Date.now()

    // 🔐 insert seguro
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
      return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}