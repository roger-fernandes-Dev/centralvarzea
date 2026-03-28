import LoopCarousel from "@/components/home/LoopCarousel"
import Image from "next/image"

export default function AdsSidebar() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4">

      {/* carousel (topo no mobile) */}
      <div className="relative h-56 md:h-72 w-full md:w-2/3 rounded-xl shadow overflow-hidden">
        <LoopCarousel />
      </div>

      {/* propagandas */}
      <section className="flex flex-col gap-4 w-full md:w-1/3">

        <div className="relative bg-white h-28 md:h-32 rounded-xl shadow overflow-hidden">
          <Image
            src="/bormioesilva.png"
            alt="logo bormio advogado"
            fill
            className="object-fill md:object-cover p-2 md:p-0"
          />
        </div>

        <div className="relative bg-white h-28 md:h-32 rounded-xl shadow overflow-hidden">
          <Image
            src="/wideroma.png"
            alt="logo roma gelateria"
            fill
            className="object-fill md:object-cover p-2 md:p-0"
          />
        </div>

      </section>

    </div>
  )
}