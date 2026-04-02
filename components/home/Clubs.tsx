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
    <section className="relative rounded-xl shadow overflow-hidden w-full h-full">

      <Image
        src="/fundo_clubs.png"
        alt="fundo clubes"
        fill
        className="object-cover opacity-20"
      />

      <div className="relative p-6 flex flex-col h-full">

        {/* topo */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">
            Clubes
          </h2>

          <Link
            href="/times"
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            Ver todos
          </Link>
        </div>

        {/* centro */}
        <div className="flex-1 flex items-center">

          <div className="overflow-x-auto custom-scroll w-full">
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[calc((100%-2rem)/3)] 
                            gap-6 md:gap-x-6 md:gap-y-12">

              {clubs.map((club, i) => (
                <Link key={i} href={`/clubs/${club.slug}`}>
                  <div className="flex items-center justify-center">

                    <div
                      title={club.name}
                      className="relative 
                        w-16 h-16 
                        md:w-20 md:h-20
                        bg-yellow-400 rounded-full overflow-hidden 
                        shadow-sm hover:scale-105 transition cursor-pointer"
                    >
                      <Image
                        src={club.logo}
                        alt={club.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

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