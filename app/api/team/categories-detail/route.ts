import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type StaffRole = "coach" | "staff"

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
    .select("id, category_id, needs_players, wanted_positions, active")
    .eq("team_id", teamId)
    .eq("active", true)

  if (teamCategoriesError) {
    console.log("ERRO AO BUSCAR TEAM_CATEGORIES:", teamCategoriesError)
    return NextResponse.json(
      { error: "Erro ao buscar categorias do time" },
      { status: 500 }
    )
  }

  const teamCategoryRows = teamCategories || []
  const categoryIds = teamCategoryRows
    .map((item) => item.category_id)
    .filter(Boolean)

  let categoryNameById = new Map<string, string>()

  if (categoryIds.length > 0) {
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name")
      .in("id", categoryIds)

    if (categoriesError) {
      console.log("ERRO AO BUSCAR CATEGORIES:", categoriesError)
      return NextResponse.json(
        { error: "Erro ao buscar nomes das categorias" },
        { status: 500 }
      )
    }

    categoryNameById = new Map(
      (categories || []).map((category) => [category.id, category.name])
    )
  }

  const { data: staff, error: staffError } = await supabase
    .from("team_staff")
    .select("id, name, role, phone, notes")
    .eq("team_id", teamId)
    .eq("active", true)
    .order("created_at", { ascending: true })

  if (staffError) {
    console.log("ERRO AO BUSCAR TEAM_STAFF:", staffError)
    return NextResponse.json(
      { error: "Erro ao buscar comissão técnica" },
      { status: 500 }
    )
  }

  const staffRows = staff || []
  const staffIds = staffRows.map((item) => item.id)

  let relations: any[] = []

  if (staffIds.length > 0) {
    const { data: relationRows, error: relationError } = await supabase
      .from("team_staff_categories")
      .select("staff_id, team_category_id")
      .in("staff_id", staffIds)

    if (relationError) {
      console.log("ERRO AO BUSCAR TEAM_STAFF_CATEGORIES:", relationError)
      return NextResponse.json(
        { error: "Erro ao buscar vínculos da comissão" },
        { status: 500 }
      )
    }

    relations = relationRows || []
  }

  const formatted = teamCategoryRows.map((teamCategory) => {
    const staffInCategory = staffRows.filter((person) =>
      relations.some(
        (relation) =>
          relation.staff_id === person.id &&
          relation.team_category_id === teamCategory.id
      )
    )

    return {
      id: teamCategory.id,
      category_id: teamCategory.category_id,
      categoryName:
        categoryNameById.get(teamCategory.category_id) || "Categoria sem nome",
      needs_players: teamCategory.needs_players,
      wanted_positions: teamCategory.wanted_positions,
      staff: staffInCategory.map((person) => ({
        id: person.id,
        name: person.name,
        role: person.role as StaffRole,
        phone: person.phone,
        notes: person.notes,
      })),
    }
  })

  return NextResponse.json({ categories: formatted })
}
