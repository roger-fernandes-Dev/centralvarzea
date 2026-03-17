import "./globals.css"

export const metadata = {
  title: "Central Várzea",
  description: "Campeonatos de várzea"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  )
}