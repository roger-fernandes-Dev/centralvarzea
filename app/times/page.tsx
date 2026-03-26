import CidadeSection from "@/components/home/CidadeSection"

export default function TimesPage() {

  const dados = [
    {
      cidade: "Promissão",
      times: [
        { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40+.png" },
        { name: "Bahea", logo: "/times/Bahea.png" },
        { name: "Bengala FC", logo: "/times/bengala.png" },
        { name: "Bulldogs", logo: "/times/bulldogs.png" },
        { name: "falcoes", logo: "/times/falcoes.png" },
        { name: "Meninos da vila", logo: "/times/meninos_da_vila.png" },
        { name: "niltinho", logo: "/times/niltinho.png" },
        { name: "Os Paraibas", logo: "/times/os_paraibas.png" },
        { name: "ADC Renuka", logo: "/times/renukaadc.png" },
        { name: "Point", logo: "/times/point.png" },
        { name: "Promi Informática", logo: "/times/promi_informatica.png" },
        { name: "The best", logo: "/times/the_best.png" },
        { name: "Unidos São João", logo: "/times/unidos_sao_joao.png" },
        { name: "Arsenal", logo: "/times/arsenal.png" }
      ]
    },
    {
      cidade: "Aguardando próxima cidade",
      times: [
        { name: "aguardando próximo time", logo: "/central_varzea.png" }
      ]
    },
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
      <div className="relative z-10">

        {/* HEADER */}
        <header className="flex justify-between items-center p-4 bg-black/60 backdrop-blur-sm">
          <h1 className="text-white text-xl font-bold">Várzea</h1>

          <a
            href="/contato"
            className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            Inserir meu time
          </a>
        </header>

        {/* LISTA */}
        <main className="p-4 space-y-8">
          {dados.map((grupo, i) => (
            <CidadeSection
              key={i}
              cidade={grupo.cidade}
              times={grupo.times}
            />
          ))}
        </main>

      </div>
    </div>
  )
}