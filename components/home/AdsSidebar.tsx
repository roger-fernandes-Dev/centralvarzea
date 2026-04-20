import LoopCarousel from "@/components/home/LoopCarousel"

type Slide = {
  image: string
  title: string
  description: string
  link: string
}

export default function AdsSidebar({ slides }: { slides: Slide[] }) {
  return (
    <div className="w-full">
      <div className="relative h-56 md:h-72 lg:h-[480px] w-full rounded-xl shadow overflow-hidden">
        <LoopCarousel noticias={slides} />
      </div>
    </div>
  )
}