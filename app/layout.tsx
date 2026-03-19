import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">

        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  )
}