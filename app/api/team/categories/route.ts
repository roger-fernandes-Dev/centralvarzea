import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const DEFAULT_CATEGORIES = [
  { name: "Livre", display_order: 1, active: true },
  { name: "Feminino", display_order: 2, active: true },
  { name: "Master", display_order: 3, active: true },
  { name: "Veterano", display_order: 4, active: true },
  { name: "40+", display_order: 5, active: true },
  { name: "50+", display_order: 6, active: true },
  { name: "60+", display_order: 7, active: true },
];

async function getCategories() {
  return supabase
    .from("categories")
    .select("id, name")
    .eq("active", true)
    .order("display_order", { ascending: true });
}

export async function GET() {
  let { data, error } = await getCategories();

  if (error) {
    console.log("ERRO AO BUSCAR CATEGORIAS:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 },
    );
  }

  if (!data || data.length === 0) {
    const { error: insertError } = await supabase
      .from("categories")
      .upsert(DEFAULT_CATEGORIES, {
        onConflict: "name",
        ignoreDuplicates: false,
      });

    if (insertError) {
      console.log("ERRO AO CRIAR CATEGORIAS PADRÃO:", insertError);
      return NextResponse.json(
        { error: "Erro ao criar categorias padrão" },
        { status: 500 },
      );
    }

    const result = await getCategories();
    data = result.data;
    error = result.error;

    if (error) {
      console.log("ERRO AO RECARREGAR CATEGORIAS:", error);
      return NextResponse.json(
        { error: "Erro ao recarregar categorias" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ categories: data || [] });
}
