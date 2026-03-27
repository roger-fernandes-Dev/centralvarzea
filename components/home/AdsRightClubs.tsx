import Image from "next/image"

export default function AdsRightClubs(){
  return (
    <section className="flex flex-col gap-6 w-full">

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/clinica_amop.png"
          alt="clinica juliano marcato"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/gelateria_roma.png"
          alt="logo roma gelateria"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-32 rounded-xl overflow-hidden">
        <Image
          src="/maireneclimacerto.png"
          alt="logo mairene clima certo"
          fill
          className="object-cover"
        />
      </div>

    </section>
  )
}