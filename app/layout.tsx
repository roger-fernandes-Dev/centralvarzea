import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Script from "next/script"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {

  metadataBase: new URL("https://www.centralvarzea.com.br"),

  title: {
    default: "A CASA DO FUTEBOL AMADOR | Central Várzea",
    template: "%s | Central Várzea",
  },

  description:
    "A casa do futebol amador. Notícias, jogos, campeonatos e tudo sobre a várzea.",

  applicationName: "Central Várzea",

  keywords: [
    "futebol várzea",
    "futebol amador",
    "campeonatos de várzea",
    "times de várzea",
    "notícias várzea",
  ],

  authors: [{ name: "Central Várzea" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://www.centralvarzea.com.br",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
  },

  openGraph: {
    title: "A CASA DO FUTEBOL AMADOR | Central Várzea",
    description:
      "Acompanhe tudo sobre futebol de várzea: jogos, campeonatos e notícias atualizadas.",
    url: "https://www.centralvarzea.com.br",
    siteName: "Central Várzea",
    locale: "pt_BR",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Central Várzea",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A CASA DO FUTEBOL AMADOR",
    description: "Tudo sobre futebol de várzea",
    images: ["/og-image.png"],
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9783146186834272"
     crossOrigin="anonymous"
     strategy="afterInteractive" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Central Várzea",
              alternateName: "A CASA DO FUTEBOL AMADOR",
              url: "https://www.centralvarzea.com.br",
            }),
          }}
        />

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