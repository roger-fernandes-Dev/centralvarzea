import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  const { data, error: selectError } = await supabase
    .from("site_views")
    .select("views")
    .eq("id", 1)
    .single()

  if (selectError) {
    return NextResponse.json({ error: selectError }, { status: 500 })
  }

  const { error: updateError } = await supabase
    .from("site_views")
    .update({ views: (data?.views || 0) + 1 })
    .eq("id", 1)

  if (updateError) {
    return NextResponse.json({ error: updateError }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}