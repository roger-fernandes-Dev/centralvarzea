import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const pathname = req.nextUrl.pathname

  // libera login admin
  if (pathname.startsWith("/admin/login")) {
    return res
  }

  // bloqueia login player
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
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
              secure: true,
            })
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = pathname.startsWith("/admin")

  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}