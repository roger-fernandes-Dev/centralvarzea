import { NextResponse } from "next/server"
import { noticias } from "@/app/data/noticias"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const noticia = noticias.find((n) => n.slug === slug)

  if (!noticia) {
    return NextResponse.json(
      { error: "Notícia não encontrada" },
      { status: 404 }
    )
  }

  return NextResponse.json(noticia)
}