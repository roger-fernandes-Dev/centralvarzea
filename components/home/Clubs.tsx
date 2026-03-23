import Image from "next/image"
import Link from "next/link"

export default function Clubs() {

  const clubs = [
    { name: "Time 0", logo: "/times/amigos_do_futebol40+.png", slug: "amigos-do-futebol" },
    { name: "Time 1", logo: "/times/aguias_de_Deus.png", slug: "aguias-de-deus" },
    { name: "Time 2", logo: "/times/arsenal.png", slug: "arsenal" },
    { name: "Time 3", logo: "/times/bahea.png", slug: "bahea" },
    { name: "Time 4", logo: "/times/bengala.png", slug: "bengala" },
    { name: "Time 5", logo: "/times/bulldogs.png", slug: "bulldogs" },
    { name: "Time 6", logo: "/times/falcoes.png", slug: "falcoes" },
    { name: "Time 7", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
    { name: "Time 8", logo: "/times/niltinho.png", slug: "niltinho" },
    { name: "Time 9", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
    { name: "Time 10", logo: "/times/point.png", slug: "point" },
    { name: "Time 11", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
    { name: "Time 12", logo: "/times/the_best.png", slug: "the-best" },
    { name: "Time 13", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
  ]

  return (
    <section className="relative rounded-xl shadow overflow-hidden">

      {/* imagem de fundo */}
      <Image
        src="/fundo_clubs.png"
        alt="fundo clubes"
        fill
        className="object-cover opacity-20"
      />

      {/* conteúdo */}
      <div className="relative p-6">

        <h2 className="text-lg font-semibold mb-4 text-black">
          Clubes
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">

          {clubs.map((club, i) => (
            <Link key={i} href={`/clubs/${club.slug}`}>
              <div
                className="relative w-16 h-16 bg-yellow-400 rounded-full overflow-hidden 
                           shadow-sm hover:scale-105 transition cursor-pointer"
              >
                <Image
                  src={club.logo}
                  alt={club.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </Link>
          ))}

        </div>

      </div>

    </section>
  )
}