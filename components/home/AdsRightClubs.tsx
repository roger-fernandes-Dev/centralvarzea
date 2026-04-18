import Image from "next/image"

export default function AdsRightClubs() {
  return (
    <section
      className="
        flex flex-col gap-4 w-full
        h-[420px] md:h-[520px] lg:h-full
      "
    >

      {/* banner 1 */}
      <div className="relative w-full h-1/2 rounded-xl overflow-hidden">
        <Image
          src="/roma-gelateria.jpeg"
          alt="logo roma gelateria"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* banner 2 */}
      <div className="relative w-full h-1/2 rounded-xl overflow-hidden">
        <Image
          src="/mairenead/loja-maireneclimacerto.png"
          alt="loja mairene clima certo"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

    </section>
  )
}