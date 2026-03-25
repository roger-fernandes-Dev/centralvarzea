import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Script from "next/script"
import "./globals.css"

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