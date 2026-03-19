import LoopCarousel from "@/components/home/LoopCarousel"

export default function AdsSidebar() {
  return (
    <div className="w-full max-w-7xl mx-auto flex gap-4">

      {/* propaganda */}
      <div className="bg-white h-24 w-1/5 rounded-xl shadow flex items-center justify-center">
        propaganda
      </div>

      {/* carousel */}
      <div className="h-60 w-4/5 rounded-xl shadow overflow-hidden">
        <LoopCarousel />
      </div>

    </div>
  )
}