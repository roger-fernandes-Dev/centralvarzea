import { NextResponse } from "next/server"
import { noticias } from "@/app/data/noticias"

export async function GET() {
  return NextResponse.json(noticias)
}