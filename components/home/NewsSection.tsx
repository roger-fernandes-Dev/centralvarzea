import Carousel from "./Carousel";

export default function NewsSection() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="p-4 font-semibold border-b">
        Notícias do dia
      </div>

      <Carousel />

    </div>
  )
}