import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const pathname = req.nextUrl.pathname

  // libera login admin
  if (pathname.startsWith("/admin/login")) {
    return res
  }

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
            res.cookies.set(name, value, {
              ...options,
              path: "/",
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            })
          })
        },
      },
    }
  )

  // ⚠️ IMPORTANTE: usar getSession no middleware é mais confiável que getUser
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAdminRoute = pathname.startsWith("/admin")

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}