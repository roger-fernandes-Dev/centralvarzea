import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const pathname = req.nextUrl.pathname

  // libera login admin
  if (pathname.startsWith("/admin/login")) {
    return response
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
        get(name: string) {
          return req.cookies.get(name)?.value
        },

        set(name: string, value: string, options) {
          response.cookies.set({
            name,
            value,
            ...options,
            path: "/",
            sameSite: "lax",
            secure: true,
          })
        },

        remove(name: string, options) {
          response.cookies.set({
            name,
            value: "",
            ...options,
            path: "/",
            maxAge: 0,
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

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}