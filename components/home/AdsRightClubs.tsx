import Image from "next/image"

export default function AdsRightClubs(){
  return (
    <section className="flex flex-col gap-6 w-full">

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/suplementlins.png"
          alt="logo suplementlins"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/roma_gelateria.png"
          alt="logo roma gelateria"
          fill
          className="object-cover"
        />
      </div>

    </section>
  )
}