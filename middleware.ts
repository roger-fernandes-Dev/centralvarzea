import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  return NextResponse.next()
}
// bloqueia login jogador
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
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