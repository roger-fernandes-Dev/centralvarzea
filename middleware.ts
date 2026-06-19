import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  return NextResponse.next()
}

export const config = {
  matcher: ["/login"],
}
/**
 * // bloqueia login jogador
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }
 */