import Link from "next/link"

export default function Arbitros() {

  const federacoes = [
    {
      cidade: "Lins",
      nome: "Federação Lins Futebol",
      contato: "(14) 99999-9999",
      slug: "lins"
    },
    {
      cidade: "Birigui",
      nome: "Liga Birigui Esportes",
      contato: "(18) 98888-8888",
      slug: "birigui"
    },
  ]

  const independentes = [
    {
      nome: "Carlos Silva",
      cidade: "Lins",
      contato: "(14) 99777-1111",
      funcao: "Árbitro Principal"
    },
    {
      nome: "João Pereira",
      cidade: "Birigui",
      contato: "(18) 99666-2222",
      funcao: "Mesário"
    },
    {
      nome: "Marcos Lima",
      cidade: "Lins",
      contato: "(14) 99655-3333",
      funcao: "Auxiliar"
    },
  ]

  // 🔹 agrupar por cidade
  const agrupados = independentes.reduce((acc: any, arbitro) => {
    if (!acc[arbitro.cidade]) {
      acc[arbitro.cidade] = []
    }
    acc[arbitro.cidade].push(arbitro)
    return acc
  }, {})

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* 🟩 FEDERAÇÕES */}
      <section>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Federações de Arbitragem
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {federacoes.map((f, i) => (
            <Link key={i} href={`/arbitros/${f.slug}`}>
              <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">

                <h2 className="text-lg md:text-xl font-semibold">
                  {f.nome}
                </h2>

                <p className="text-gray-600">
                  Cidade: {f.cidade}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  📞 {f.contato}
                </p>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🟦 ÁRBITROS INDEPENDENTES */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Árbitros Independentes
        </h2>

        {Object.entries(agrupados).map(([cidade, arbitros]: any, i) => (
          <div key={i} className="mb-8">

            {/* 🏙️ cidade */}
            <h3 className="text-xl font-semibold mb-4">
              📍 {cidade}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {arbitros.map((a: any, index: number) => (
                <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">

                  <h4 className="font-semibold text-base">
                    {a.nome}
                  </h4>

                  <p className="text-sm text-gray-600">
                    {a.funcao}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    📞 {a.contato}
                  </p>

                </div>
              ))}

            </div>

          </div>
        ))}
      </section>

    </main>
  )
}