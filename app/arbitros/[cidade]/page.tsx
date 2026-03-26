import Image from "next/image"

export default function FederacaoPage({ params }: any) {

  const federacao = {
    nome: "Federação Promissão Futebol",
    cidade: "Promissão",
    contato: "(14) 99999-9999",
    email: "contato@federacaoPromissão.com"
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
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">

      {/* 🚧 AVISO GLOBAL */}
      <div className="bg-yellow-400 text-black font-semibold text-center py-3 rounded-lg shadow">
        🚧 Página em manutenção — informações podem estar incompletas
      </div>

      {/* 🏷️ header */}
      <div>
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

      {/* 👨‍⚖️ título */}
      <h2 className="text-xl font-semibold">
        Equipe de Arbitragem
      </h2>

      {/* 👨‍⚖️ lista */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {arbitros.map((a, i) => (
          <div key={i} className="bg-white border rounded-lg p-3 text-center relative">

            {/* 🔥 etiqueta manutenção no card */}
            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
              Em manutenção
            </span>

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