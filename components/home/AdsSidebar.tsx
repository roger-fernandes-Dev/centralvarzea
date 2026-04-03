import LoopCarousel from "@/components/home/LoopCarousel"

export default function AdsSidebar() {
  return (
    <div className="w-full">

      {/* carousel full width */}
      <div className="relative h-56 md:h-72 lg:h-[480px] w-full rounded-xl shadow overflow-hidden">
        <LoopCarousel />
      </div>

    </div>
  )
}