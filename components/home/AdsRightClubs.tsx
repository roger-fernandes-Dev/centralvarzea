import Image from "next/image"

export default function AdsRightClubs(){
  return (
    <section
      className="
        grid grid-cols-2 grid-rows-2 gap-4 w-full
        min-h-[220px] md:min-h-[260px] lg:h-full
      "
    >

      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image src="/h6.png" alt="restaurante h6" fill className="object-cover"/>
      </div>

      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image src="/roma-gelateria.jpeg" alt="logo roma gelateria" fill className="object-cover"/>
      </div>

      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image src="/mairene-climacerto.png" alt="logo mairene clima certo" fill className="object-cover lg:object-fill"/>
      </div>

      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image src="/suplemente_lins.png" alt="Loja Suplement" fill className="object-cover lg:object-fill"/>
      </div>

    </section>
  )
}