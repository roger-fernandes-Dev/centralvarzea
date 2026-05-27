import SidebarTime from "@/app/dashboard/time/components/SideBarTime"

export default function TimeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f5f7f9] flex flex-col lg:flex-row">
      <SidebarTime />

      <main className="flex-1 p-3 md:p-6">
        {children}
      </main>
    </div>
  )
}