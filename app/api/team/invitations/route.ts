import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const invitationType = "convite_amistoso"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  const direction = searchParams.get("direction")

  if (!userId || !["sent", "received"].includes(direction || "")) {
    return NextResponse.json({ error: "Parametros invalidos" }, { status: 400 })
  }

  const column = direction === "sent" ? "playerid" : "teamid"

  const { data, error } = await supabase
    .from("connections")
    .select("*")
    .eq(column, userId)
    .eq("tipo", invitationType)

  if (error) {
    console.log("ERRO AO BUSCAR CONVITES:", error)
    return NextResponse.json(
      { error: "Erro ao buscar convites" },
      { status: 500 }
    )
  }

  return NextResponse.json({ invitations: data || [] })
}

export async function POST(req: Request) {
  const { senderId, targetId } = await req.json()

  if (!senderId || !targetId || senderId === targetId) {
    return NextResponse.json({ error: "Dados invalidos" }, { status: 400 })
  }

  const { data: existing } = await supabase
    .from("connections")
    .select("*")
    .eq("playerid", senderId)
    .eq("teamid", targetId)
    .eq("tipo", invitationType)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ invitation: existing })
  }

  const { data, error } = await supabase
    .from("connections")
    .insert([
      {
        id: crypto.randomUUID(),
        playerid: senderId,
        teamid: targetId,
        tipo: invitationType,
        status: "pendente",
      },
    ])
    .select("*")
    .single()

  if (error) {
    console.log("ERRO AO ENVIAR CONVITE:", error)
    return NextResponse.json(
      { error: "Erro ao enviar convite" },
      { status: 500 }
    )
  }

  return NextResponse.json({ invitation: data })
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json()

  if (!id || !["aceito", "recusado"].includes(status)) {
    return NextResponse.json({ error: "Dados invalidos" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("connections")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    console.log("ERRO AO RESPONDER CONVITE:", error)
    return NextResponse.json(
      { error: "Erro ao responder convite" },
      { status: 500 }
    )
  }

  return NextResponse.json({ invitation: data })
}
