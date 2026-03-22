import Image from "next/image"

export default function Clubs() {

  const clubs = [
    { name: "Time 0", logo: "/times/amigos_do_futebol40+.png" },
    { name: "Time 1", logo: "/times/aguias_de_Deus.png" },
    { name: "Time 2", logo: "/times/arsenal.png" },
    { name: "Time 3", logo: "/times/bahea.png" },
    { name: "Time 4", logo: "/times/bengala.png" },
    { name: "Time 5", logo: "/times/bulldogs.png" },
    { name: "Time 6", logo: "/times/falcoes.png" },
    { name: "Time 7", logo: "/times/meninos_da_vila.png" },
    { name: "Time 8", logo: "/times/niltinho.png" },
    { name: "Time 9", logo: "/times/os_paraibas.png" },
    { name: "Time 10", logo: "/times/point.png" },
    { name: "Time 11", logo: "/times/promi_informatica.png" },
    { name: "Time 12", logo: "/times/the_best.png" },
    { name: "Time 13", logo: "/times/unidos_sao_joao.png" },
  ]

  return (
    <section className="relative rounded-xl shadow overflow-hidden">

      {/* imagem de fundo */}
      <Image
        src="/fundo_clubs.png" // <-- sua imagem
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
            <div
              key={i}
              className="relative w-16 h-16 bg-yellow-400 rounded-full overflow-hidden 
                         shadow-sm hover:scale-105 transition"
            >
              <Image
                src={club.logo}
                alt={club.name}
                fill
                className="object-contain p-1"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}