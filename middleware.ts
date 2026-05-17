import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },

        set(name, value, options) {
          res.cookies.set(name, value, {
            ...options,
            sameSite: "lax",
          })
        },

        remove(name, options) {
          res.cookies.set(name, "", {
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // libera login
  if (pathname === "/admin/login") {
    return res
  }

  // protege admin
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    )
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}