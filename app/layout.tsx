import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Script from "next/script"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.centralvarzea.com.br"),

  title: "Central Várzea - Futebol de Várzea, Jogos e Campeonatos",
  description:
    "Portal completo de futebol de várzea com notícias, jogos, campeonatos, times, árbitros e federações da sua região.",

  keywords: [
    "futebol várzea",
    "varzea",
    "times de várzea",
    "campeonatos de várzea",
    "jogos de várzea",
    "futebol amador",
    "times amadores",
    "árbitros futebol",
    "federações futebol",
    "notícias futebol várzea",
  ],

  authors: [{ name: "Central Várzea" }],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Central Várzea - Futebol de Várzea",
    description:
      "Acompanhe tudo sobre futebol de várzea: jogos, campeonatos, times, árbitros e notícias atualizadas.",
    url: "https://www.centralvarzea.com.br",
    siteName: "Central Várzea",
    locale: "pt_BR",
    type: "website",

    images: [
      {
        url: "/og-image.jpg", // 👈 coloca uma imagem padrão aqui
        width: 1200,
        height: 630,
        alt: "Central Várzea",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-865MZRBBEC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-865MZRBBEC');
          `}
        </Script>

        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  )
}