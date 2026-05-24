import SidebarTime from "@/app/dashboard/time/components/SideBarTime"

export default function TimeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen mt-[10] bg-[#f5f7f9] flex flex-col">
      <SidebarTime />

      <main className="flex-1 p-3 md:p-6 lg:ml-0 mt-0">
        {children}
      </main>
    </div>
  )
}