import Image from "next/image"

export default function FederacaoPage({ params }: any) {

  const federacao = {
    nome: "Federação Lins Futebol",
    cidade: "Lins",
    contato: "(14) 99999-9999",
    email: "contato@federacaolins.com"
  }

  const arbitros = [
    {
      nome: "Carlos Silva",
      funcao: "Árbitro Principal",
      foto: "/arbitros/arbitro1.png"
    },
    {
      nome: "João Pereira",
      funcao: "Mesário",
      foto: "/arbitros/arbitro2.png"
    },
    {
      nome: "Marcos Lima",
      funcao: "Auxiliar",
      foto: "/arbitros/arbitro3.png"
    },
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* 🏷️ header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          {federacao.nome}
        </h1>

        <p className="text-gray-600">
          Cidade: {federacao.cidade}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          📞 {federacao.contato} | ✉️ {federacao.email}
        </p>
      </div>

      {/* 👨‍⚖️ lista de árbitros */}
      <h2 className="text-xl font-semibold mb-4">
        Equipe de Arbitragem
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {arbitros.map((a, i) => (
          <div key={i} className="bg-white border rounded-lg p-3 text-center">

            <div className="relative w-full h-32 mb-2">
              <Image
                src={a.foto}
                alt={a.nome}
                fill
                className="object-cover rounded"
              />
            </div>

            <h3 className="font-semibold text-sm">
              {a.nome}
            </h3>

            <p className="text-xs text-gray-500">
              {a.funcao}
            </p>

          </div>
        ))}

      </div>

    </main>
  )
}