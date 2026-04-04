import Image from "next/image"
import Link from "next/link"

export default function Clubs() {

  const clubs = [
    { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40.png", slug: "amigos-do-futebol" },
    { name: "Bengala", logo: "/times/bengala.png", slug: "bengala" },
    { name: "Bahea", logo: "/times/bahea.png", slug: "bahea" },
    { name: "Falcões", logo: "/times/falcoes.png", slug: "falcoes" },
    { name: "Meninos da Vila", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
    { name: "Os Paraíbas", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
    { name: "Point", logo: "/times/point.png", slug: "point" },
    { name: "Promi Informática", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
    { name: "Unidos São João", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
    { name: "MEC", logo: "/times/mec.png", slug: "mec" },
    { name: "Sporting Guaicara", logo: "/times/sporting-guaicarafc.png", slug: "sportingguaicara" },
    { name: "Guerreiros FC", logo: "/times/guerreirosfc.png", slug: "guerreirosfc" },
  ]

  return (
    <section className="relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden w-full h-full">

      {/* fundo leve */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-80" />

      <div className="relative p-5 flex flex-col h-full">

        {/* topo */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            Clubes
          </h2>

          <Link
            href="/times"
            className="text-sm font-semibold text-yellow-600 hover:text-yellow-500 transition"
          >
            Ver todos →
          </Link>
        </div>

        {/* lista */}
        <div className="flex-1 flex items-center">

          <div className="
            overflow-x-auto w-full
            snap-x snap-mandatory
            scroll-smooth
            scrollbar-thin scrollbar-thumb-gray-300
          ">

            <div className="
              grid grid-rows-2 grid-flow-col 
              auto-cols-[90px]
              gap-x-4 gap-y-8
            ">

              {clubs.map((club, i) => (
                <Link key={i} href={`/clubs/${club.slug}`}>
                  <div className="flex flex-col items-center group snap-start cursor-pointer">

                    {/* ESCUDO */}
                    <div className="relative">

                      <div
                        className="
                          w-14 h-14 md:w-16 md:h-16
                          bg-white rounded-full 
                          border border-gray-200
                          shadow-sm
                          flex items-center justify-center
                          transition-all duration-200
                          group-hover:shadow-md group-hover:-translate-y-0.5
                        "
                      >
                        <Image
                          src={club.logo}
                          alt={club.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>

                      {/* TOOLTIP */}
                      <div className="
                        absolute -top-8 left-1/2 -translate-x-1/2
                        bg-black/80 backdrop-blur-sm
                        text-white text-[10px]
                        px-2 py-1 rounded
                        opacity-0 group-hover:opacity-100
                        transition whitespace-nowrap
                      ">
                        {club.name}
                      </div>

                    </div>

                    {/* NOME CURTO */}
                    <span className="
                      mt-2 text-[11px] text-gray-600
                      text-center leading-tight
                      line-clamp-2
                    ">
                      {club.name}
                    </span>

                  </div>
                </Link>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}