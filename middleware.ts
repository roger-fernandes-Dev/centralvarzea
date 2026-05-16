import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  let res = NextResponse.next()

  // =========================
  // BLOQUEAR LOGIN PLAYER/TIME
  // =========================
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // =========================
  // ADMIN LOGIN LIBERADO
  // =========================
  if (pathname === "/admin/login") {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/login", "/admin/:path*"]
}