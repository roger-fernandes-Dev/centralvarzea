import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type InvitationStatus = "pending" | "accepted" | "rejected" | "cancelled"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const teamId = searchParams.get("teamId")
  const direction = searchParams.get("direction")

  if (!teamId || !["sent", "received"].includes(direction || "")) {
    return NextResponse.json(
      { error: "Parâmetros inválidos" },
      { status: 400 }
    )
  }

  const column =
    direction === "sent" ? "sender_team_id" : "receiver_team_id"

  const { data, error } = await supabase
    .from("friendly_invitations")
    .select(`
      *,
      sender_team:team_profiles!fk_sender_team (
        id,
        nometime,
        logo,
        cidade,
        estado
      ),
      receiver_team:team_profiles!fk_receiver_team (
        id,
        nometime,
        logo,
        cidade,
        estado
      ),
      category:categories (
        id,
        name
      )
    `)
    .eq(column, teamId)
    .order("created_at", { ascending: false })

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
  const {
    senderTeamId,
    receiverTeamId,
    categoryId,
    message,
    proposedDate,
    proposedTime,
    location,
  } = await req.json()

  if (!senderTeamId || !receiverTeamId || senderTeamId === receiverTeamId) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    )
  }

  let query = supabase
    .from("friendly_invitations")
    .select("*")
    .eq("sender_team_id", senderTeamId)
    .eq("receiver_team_id", receiverTeamId)
    .eq("status", "pending")

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  } else {
    query = query.is("category_id", null)
  }

  const { data: existing, error: existingError } = await query.maybeSingle()

  if (existingError) {
    console.log("ERRO AO VERIFICAR CONVITE:", existingError)

    return NextResponse.json(
      { error: "Erro ao verificar convite" },
      { status: 500 }
    )
  }

  if (existing) {
    return NextResponse.json({ invitation: existing })
  }

  const { data, error } = await supabase
    .from("friendly_invitations")
    .insert([
      {
        sender_team_id: senderTeamId,
        receiver_team_id: receiverTeamId,
        category_id: categoryId || null,
        message: message || null,
        proposed_date: proposedDate || null,
        proposed_time: proposedTime || null,
        location: location || null,
        status: "pending",
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
  const { id, status } = await req.json() as {
    id?: string
    status?: InvitationStatus
  }

  if (!id || !["accepted", "rejected", "cancelled"].includes(status || "")) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    )
  }

  const { data: invitation, error: invitationError } = await supabase
    .from("friendly_invitations")
    .select("*")
    .eq("id", id)
    .single()

  if (invitationError || !invitation) {
    console.log("ERRO AO BUSCAR CONVITE:", invitationError)

    return NextResponse.json(
      { error: "Convite não encontrado" },
      { status: 404 }
    )
  }

  if (invitation.status !== "pending") {
    return NextResponse.json(
      { error: "Este convite já foi respondido" },
      { status: 400 }
    )
  }

  const { data: updatedInvitation, error: updateError } = await supabase
    .from("friendly_invitations")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single()

  if (updateError) {
    console.log("ERRO AO RESPONDER CONVITE:", updateError)

    return NextResponse.json(
      { error: "Erro ao responder convite" },
      { status: 500 }
    )
  }

  if (status === "accepted") {
    if (
      invitation.proposed_date &&
      invitation.proposed_time &&
      invitation.location
    ) {
      const { error: matchError } = await supabase
        .from("matches")
        .insert([
          {
            home_team_id: invitation.sender_team_id,
            away_team_id: invitation.receiver_team_id,
            category_id: invitation.category_id || null,
            type: "friendly",
            invitation_id: invitation.id,
            match_date: invitation.proposed_date,
            match_time: invitation.proposed_time,
            location: invitation.location,
            status: "scheduled",
          },
        ])

      if (matchError) {
        console.log("ERRO AO CRIAR JOGO:", matchError)

        return NextResponse.json(
          { error: "Convite aceito, mas erro ao criar jogo" },
          { status: 500 }
        )
      }
    }
  }

  return NextResponse.json({ invitation: updatedInvitation })
}