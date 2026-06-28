import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const DEFAULT_CATEGORIES = [
  { name: "Livre", display_order: 1 },
  { name: "Feminino", display_order: 2 },
  { name: "Master", display_order: 3 },
  { name: "Veterano", display_order: 4 },
  { name: "40+", display_order: 5 },
  { name: "50+", display_order: 6 },
  { name: "60+", display_order: 7 },
]

export async function GET() {
  const { error: upsertError } = await supabase
    .from("categories")
    .upsert(
      DEFAULT_CATEGORIES.map((category) => ({
        ...category,
        active: true,
      })),
      { onConflict: "name" }
    )

  if (upsertError) {
    console.log("ERRO AO GARANTIR CATEGORIAS:", upsertError)

    return NextResponse.json(
      { error: "Erro ao carregar categorias" },
      { status: 500 }
    )
  }

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name")
    .eq("active", true)
    .order("display_order", { ascending: true })

  if (categoriesError) {
    console.log("ERRO AO BUSCAR CATEGORIAS:", categoriesError)

    return NextResponse.json(
      { error: "Erro ao carregar categorias" },
      { status: 500 }
    )
  }

  const { data: teamCategories, error: teamCategoriesError } = await supabase
    .from("team_categories")
    .select("team_id, category_id")
    .eq("active", true)

  if (teamCategoriesError) {
    console.log("ERRO AO BUSCAR CATEGORIAS DOS TIMES:", teamCategoriesError)

    return NextResponse.json(
      { error: "Erro ao carregar categorias dos times" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    categories: categories || [],
    teamCategories: teamCategories || [],
  })
}
