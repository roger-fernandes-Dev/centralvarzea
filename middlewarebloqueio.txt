import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  const pathname = req.nextUrl.pathname

  // =========================
  // BLOQUEAR LOGIN PLAYER/TIME
  // =========================
  const blockedRoutes = [
    "/login",
    "/cadastro",
    "/dashboard",
  ]

  const isBlocked = blockedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isBlocked) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // =========================
  // ADMIN LIBERADO
  // =========================
  if (pathname.startsWith("/admin/login")) {
    return res
  }

  // =========================
  // SUPABASE
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
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    )
  }

  return res
}

export const config = {
  matcher: [
    "/login/:path*",
    "/cadastro/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
}