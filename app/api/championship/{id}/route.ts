import { NextResponse } from "next/server"
import { championship } from "@/app/lib/championship"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const champ = championship.find(c => c.id === id)

  if (!champ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(champ)
}