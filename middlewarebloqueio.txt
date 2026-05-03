import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const isDashboard = pathname.startsWith("/dashboard")
  const isLogin = pathname.startsWith("/login")

  // 🔒 BLOQUEIO TOTAL TEMPORÁRIO
  const BLOQUEADO = true

  if (BLOQUEADO && (isDashboard || isLogin)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // 🔽 SEU CÓDIGO ORIGINAL (mantido)
  if (!isDashboard) return NextResponse.next()

  const access = req.cookies.get("sb-access-token")?.value
  const refresh = req.cookies.get("sb-refresh-token")?.value

  if (!access && !refresh) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}

