import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { userId } = await req.json()

  const { data, error } = await supabase
    .from("profiles")
    .select("tipo")
    .eq("id", userId)
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Perfil não encontrado" },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}