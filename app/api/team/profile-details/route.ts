import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teamId = searchParams.get("teamId")

  if (!teamId) {
    return NextResponse.json(
      { error: "teamId é obrigatório" },
      { status: 400 }
    )
  }

  const { data: teamCategories, error: teamCategoriesError } = await supabase
    .from("team_categories")
    .select("id, category_id, needs_players, wanted_positions")
    .eq("team_id", teamId)
    .eq("active", true)

  if (teamCategoriesError) {
    console.log("ERRO AO BUSCAR CATEGORIAS DO TIME:", teamCategoriesError)

    return NextResponse.json(
      { error: "Erro ao buscar categorias do time" },
      { status: 500 }
    )
  }

  const categoryIds = (teamCategories || []).map((item) => item.category_id)

  const { data: categories, error: categoriesError } =
    categoryIds.length > 0
      ? await supabase
          .from("categories")
          .select("id, name")
          .in("id", categoryIds)
      : { data: [], error: null }

  if (categoriesError) {
    console.log("ERRO AO BUSCAR NOMES DAS CATEGORIAS:", categoriesError)

    return NextResponse.json(
      { error: "Erro ao buscar nomes das categorias" },
      { status: 500 }
    )
  }

  const { data: staff, error: staffError } = await supabase
    .from("team_staff")
    .select("id, name, role, phone, notes")
    .eq("team_id", teamId)
    .eq("active", true)

  if (staffError) {
    console.log("ERRO AO BUSCAR EQUIPE TÉCNICA:", staffError)

    return NextResponse.json(
      { error: "Erro ao buscar equipe técnica" },
      { status: 500 }
    )
  }

  const staffIds = (staff || []).map((person) => person.id)

  const { data: relations, error: relationsError } =
    staffIds.length > 0
      ? await supabase
          .from("team_staff_categories")
          .select("staff_id, team_category_id")
          .in("staff_id", staffIds)
      : { data: [], error: null }

  if (relationsError) {
    console.log("ERRO AO BUSCAR VÍNCULOS DA EQUIPE:", relationsError)

    return NextResponse.json(
      { error: "Erro ao buscar vínculos da equipe" },
      { status: 500 }
    )
  }

  const categoryNameById = new Map(
    (categories || []).map((category) => [category.id, category.name])
  )

  const staffById = new Map(
    (staff || []).map((person) => [person.id, person])
  )

  const result = (teamCategories || []).map((teamCategory) => {
    const categoryStaff = (relations || [])
      .filter((relation) => relation.team_category_id === teamCategory.id)
      .map((relation) => staffById.get(relation.staff_id))
      .filter(Boolean)

    return {
      id: teamCategory.id,
      category_id: teamCategory.category_id,
      category_name:
        categoryNameById.get(teamCategory.category_id) || "Categoria",
      needs_players: Boolean(teamCategory.needs_players),
      wanted_positions: teamCategory.wanted_positions
        ? teamCategory.wanted_positions.split(", ").filter(Boolean)
        : [],
      staff: categoryStaff,
    }
  })

  return NextResponse.json({ categories: result })
}
