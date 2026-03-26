import Link from "next/link"

export default function Arbitros() {

  const federacoes = [
    {
      cidade: "Promissão",
      nome: "Federação Promissão Futebol",
      contato: "(14) 99999-9999",
      slug: "lins"
    },
    {
      cidade: "Promissão",
      nome: "Liga Promissão Esportes",
      contato: "(18) 98888-8888",
      slug: "birigui"
    },
  ]

  const independentes = [
    {
      nome: "Nome",
      cidade: "Promissão",
      contato: "(14) 99777-1111",
      funcao: "Árbitro Principal"
    },
    {
      nome: "Nome",
      cidade: "Promissão",
      contato: "(18) 99666-2222",
      funcao: "Mesário"
    },
    {
      nome: "Nome",
      cidade: "Promissão",
      contato: "(14) 99655-3333",
      funcao: "Auxiliar"
    },
  ]

  const agrupados = independentes.reduce((acc: any, arbitro) => {
    if (!acc[arbitro.cidade]) acc[arbitro.cidade] = []
    acc[arbitro.cidade].push(arbitro)
    return acc
  }, {})

  return (
    <div className="relative min-h-screen">

      {/* FUNDO */}
      <div className="absolute inset-0 bg-[url('/fundo_clubs.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/80" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* 🚧 AVISO GLOBAL */}
        <div className="bg-yellow-400 text-black font-semibold text-center py-3 rounded-lg shadow">
          🚧 Página em manutenção — informações podem estar incompletas
        </div>

        {/* 🔰 FEDERAÇÕES */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Federações de Arbitragem
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {federacoes.map((f, i) => (
              <Link key={i} href={`/arbitros/${f.slug}`}>
                <div className="relative bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg hover:scale-[1.02] transition cursor-pointer">

                  {/* badge */}
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
                    Em manutenção
                  </span>

                  <h2 className="text-lg md:text-xl font-semibold text-black">
                    {f.nome}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    📍 {f.cidade}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    📞 {f.contato}
                  </p>

                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🧑‍⚖️ ÁRBITROS */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Árbitros Independentes
          </h2>

          {Object.entries(agrupados).map(([cidade, arbitros]: any, i) => (
            <div key={i} className="mb-10">

              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-yellow-500 rounded" />
                <h3 className="text-lg font-semibold text-white">
                  {cidade}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                {arbitros.map((a: any, index: number) => (
                  <div
                    key={index}
                    className="relative bg-white/95 backdrop-blur rounded-xl p-4 shadow-md hover:scale-[1.02] transition"
                  >

                    {/* badge */}
                    <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
                      Em manutenção
                    </span>

                    <h4 className="font-semibold text-black text-base">
                      {a.nome}
                    </h4>

                    <p className="text-sm text-gray-600">
                      {a.funcao}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      📞 {a.contato}
                    </p>

                  </div>
                ))}

              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  )
}