import Image from "next/image"

export default function AdsRightClubs(){
  return (
    <section className="flex flex-col gap-6 w-full">

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/wideamop.png"
          alt="clinica juliano marcato"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/wideroma.png"
          alt="logo roma gelateria"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/widemairene.png"
          alt="logo mairene clima certo"
          fill
          className="object-cover"
        />
      </div>

    </section>
  )
}