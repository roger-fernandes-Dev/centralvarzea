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

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Federações de Arbitragem
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {federacoes.map((f, i) => (
          <Link key={i} href={`/arbitros/${f.slug}`}>
            <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">

              <h2 className="text-xl font-semibold">
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

    </main>
  )
}