import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Script from "next/script"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Central Várzea - Notícias, Jogos e Federações",
  description:
    "Acompanhe notícias, jogos, árbitros, federações e campeonatos do futebol de várzea da sua região.",
  keywords: [
    "futebol várzea",
    "varzea",
    "time varzea",
    "time de varzea",
    "campeonato de varzea",
    "jogadores de varzea",
    "jogos amadores",
    "campeonatos",
    "árbitros",
    "federações",
    "notícias futebol",
  ],
  authors: [{ name: "Central Várzea" }],
  robots: "index, follow",

  openGraph: {
    title: "Central Várzea",
    description:
      "Tudo sobre futebol de várzea: notícias, jogos, árbitros e campeonatos, times.",
    url: "https://seudominio.com", // ⚠️ troca pelo seu domínio real
    siteName: "Central Várzea",
    locale: "pt_BR",
    type: "website",
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