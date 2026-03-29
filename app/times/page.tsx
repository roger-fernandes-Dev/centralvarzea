import Image from "next/image"
import Link from "next/link"

export default function TimesPage() {
  const dados = [
    {
      cidade: "Promissão",
      times: [
        { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40.png", slug: "amigos-do-futebol" },
        { name: "Bahea", logo: "/times/bahea.png", slug: "bahea" },
        { name: "Bengala FC", logo: "/times/bengala.png", slug: "bengala-fc" },
        { name: "Bulldogs", logo: "/times/bulldogs.png", slug: "bulldogs" },
        { name: "Falcões", logo: "/times/falcoes.png", slug: "falcoes" },
        { name: "Meninos da Vila", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
        { name: "Niltinho", logo: "/times/niltinho.png", slug: "niltinho" },
        { name: "Os Paraíbas", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
        { name: "ADC Renuka", logo: "/times/renukaadc.png", slug: "adc-renuka" },
        { name: "Point", logo: "/times/point.png", slug: "point" },
        { name: "Promi Informática", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
        { name: "The Best", logo: "/times/the_best.png", slug: "the-best" },
        { name: "Unidos São João", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
        { name: "Arsenal", logo: "/times/arsenal.png", slug: "arsenal" }
      ]
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* FUNDO */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fundo_clubs.png')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTEÚDO */}
      <div className="relative z-10 p-4">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 bg-black/60 backdrop-blur-sm p-4 rounded">
          <h1 className="text-white text-xl font-bold">Times de Várzea</h1>
          <Link
            href="/contato"
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            Inserir meu time
          </Link>
        </header>

        {/* LISTA DE TIMES */}
        {dados.map((grupo, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-white text-2xl font-bold mb-4">{grupo.cidade}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {grupo.times.map((time, idx) => (
                <Link
                  key={idx}
                  href={`/clubs/${time.slug}`}
                  className="flex flex-col items-center bg-black/40 p-2 rounded hover:bg-black/60 transition"
                >
                  <div className="w-20 h-20 relative mb-2">
                    <Image
                      src={time.logo}
                      alt={time.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-white text-center text-sm">{time.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  )
}