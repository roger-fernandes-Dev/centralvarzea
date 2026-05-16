import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  let res = NextResponse.next()

  // =========================
  // BLOQUEAR SOMENTE /login EXATO
  // =========================
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // =========================
  // SUPABASE CLIENT (SERVER)
  // =========================
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // =========================
  // SESSION
  // =========================
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // =========================
  // PROTEGER ADMIN
  // =========================
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"] // só admin agora
}