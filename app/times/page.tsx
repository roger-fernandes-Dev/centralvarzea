import Image from "next/image"
import Link from "next/link"

export default function TimesPage() {
  const dados = [
    {
      cidade: "Promissão",
      times: [
        { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40.png", slug: "amigos-do-futebol" },
        { name: "Bahea", logo: "/times/bahea.png", slug: "bahea" },
        { name: "Bengala FC", logo: "/times/bengala.png", slug: "bengala" },
        { name: "Falcões", logo: "/times/falcoes.png", slug: "falcoes" },
        { name: "Meninos da Vila", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
        { name: "Os Paraíbas", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
        { name: "ADC Renuka", logo: "/times/renukaadc.png", slug: "adc-renuka" },
        { name: "Point", logo: "/times/point.png", slug: "point" },
        { name: "Promi Informática", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
        { name: "Unidos São João", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
        { name: "Arsenal", logo: "/times/arsenal.png", slug: "arsenal" },
        { name: "MEC", logo: "/times/mec.png", slug: "mec" },
      ]
    },
    {
      cidade: "Guaiçara",
      times: [
        { name: "Sporting Guaiçara", logo: "/times/sporting-guaicarafc.png", slug: "sportingguaicara" },
        { name: "Magos", logo: "/times/magos.png", slug: "magos" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-wide">
              Clubes de Várzea
            </h1>
            <p className="text-gray-500 text-sm">
              Explore os times e suas histórias
            </p>
          </div>

          <Link
            href="/contato"
            className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800 transition shadow"
          >
            + Inserir meu time
          </Link>

        </div>

        {/* LISTA */}
        {dados.map((grupo, i) => (
          <section key={i} className="mb-12">

            {/* cidade */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-black rounded"></div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {grupo.cidade}
              </h2>
            </div>

            {/* grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

              {grupo.times.map((time, idx) => (
                <Link
                  key={idx}
                  href={`/clubs/${time.slug}`}
                  className="group bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow hover:shadow-lg transition duration-300 border border-gray-100 hover:-translate-y-1"
                >

                  {/* logo */}
                  <div className="w-16 h-16 relative mb-3">
                    <Image
                      src={time.logo}
                      alt={time.name}
                      fill
                      className="object-contain group-hover:scale-110 transition"
                    />
                  </div>

                  {/* nome */}
                  <span className="text-gray-800 text-sm text-center font-medium group-hover:text-black">
                    {time.name}
                  </span>

                </Link>
              ))}

            </div>

          </section>
        ))}

      </div>
    </div>
  )
}