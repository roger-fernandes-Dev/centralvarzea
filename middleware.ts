import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const pathname = req.nextUrl.pathname

  // bloqueia login jogador
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

  console.log("MIDDLEWARE USER:", user)
console.log("PATH:", pathname)

  // se estiver logado e tentar acessar login
  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url))
  }

  // protege admin EXCETO login
  const isAdminProtected =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"

/** if (isAdminProtected && !user) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  } */

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}