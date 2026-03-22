import Image from "next/image"

export default function Newlestter() {
  return (
     <section className="w-full max-w-7xl mx-auto border-b border-gray-300 pb-6">

      {/* título da seção */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-black">
        Notícias
      </h1>

      <div className="flex flex-col md:flex-row gap-4">

        {/* imagem */}
        <div className="relative w-full md:w-1/2 h-56 md:h-64 rounded overflow-hidden">
          <Image
            src="/amistoso_livre.png" // troca pela sua imagem
            alt="amistoso"
            fill
            className="object-cover"
          />
        </div>

        {/* conteúdo */}
        <div className="flex flex-col justify-between w-full md:w-1/2">

          <div>
            <span className="text-sm text-gray-500">
              fase se iniciando
            </span>

            <h2 className="text-xl md:text-2xl font-bold mt-2 text-yellow-600 leading-snug">
              Time aposta com idade livre, fazendo o primeiro amistoso
            </h2>

            <ul className="mt-3 text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>O ano começando ja disputado</li>
              <li>Mesmo com desfalque, time vence amistoso</li>
            </ul>
          </div>

        </div>

      </div>

    </section>
  )
}