import Sidebar from "./components/Sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-100 flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}