import Image from "next/image"
import Link from "next/link"

export default function Clubs() {

  const clubs = [
    { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40+.png", slug: "amigos-do-futebol" },
    { name: "Águias de Deus", logo: "/times/aguias_de_Deus.png", slug: "aguias-de-deus" },
    { name: "Arsenal", logo: "/times/arsenal.png", slug: "arsenal" },
    { name: "Bahea", logo: "/times/bahea.png", slug: "bahea" },
    { name: "Bengala", logo: "/times/bengala.png", slug: "bengala" },
    { name: "BullDogs", logo: "/times/bulldogs.png", slug: "bulldogs" },
    { name: "Falcões", logo: "/times/falcoes.png", slug: "falcoes" },
    { name: "Meninos da Vila", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
    { name: "Niltinho", logo: "/times/niltinho.png", slug: "niltinho" },
    { name: "Os Paraíbas", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
    { name: "Point", logo: "/times/point.png", slug: "point" },
    { name: "Promi Informática", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
    { name: "The Best", logo: "/times/the_best.png", slug: "the-best" },
    { name: "Unidos São João", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
    { name: "Quebrada FC", logo: "/times/quebrada-fc.png", slug: "quebrada-fc" },
    { name: "MEC", logo: "/times/mec.png", slug: "mec" },
    { name: "Sporting Guaicara", logo: "/times/sporting-guaicarafc.png", slug: "sportingguaicara" },
    { name: "Guerreiros FC", logo: "/times/guerreirosfc.png", slug: "guerreirosfc" },
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

        {/* HEADER */}
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

        {/* GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">

          {clubs.map((club, i) => (
            <Link key={i} href={`/clubs/${club.slug}`}>
              <div
                title={club.name}
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