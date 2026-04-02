import Image from "next/image"

export default function AdsRightClubs(){
  return (
    <section className="grid grid-cols-2 gap-4 w-full">

      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
        <Image
          src="/h6.png"
          alt="restaurante h6"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
        <Image
          src="/wideroma.png"
          alt="logo roma gelateria"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
        <Image
          src="/widemairene.png"
          alt="logo mairene clima certo"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
        <Image
          src="/suplemente160x160.png"
          alt="Loja Suplement"
          fill
          className="object-cover"
        />
      </div>

    </section>
  )
}