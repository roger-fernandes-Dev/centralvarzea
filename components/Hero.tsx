export default function Hero() {
  return (
    <section className="relative h-[350px] rounded-2xl overflow-hidden">

      <img
        src="/stadium.jpg"
        className="absolute w-full h-full object-cover"
      />

      <div className="relative z-10 p-10 text-white space-y-4">

        <h1 className="text-4xl font-bold">
          Várzea Promissão
        </h1>

        <div className="flex gap-3">

          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full">
            Início
          </button>

          <button className="bg-white/20 px-4 py-2 rounded-full">
            Jogadores
          </button>

          <button className="bg-white/20 px-4 py-2 rounded-full">
            Resultados
          </button>

          <button className="bg-white/20 px-4 py-2 rounded-full">
            Tabela
          </button>

        </div>

      </div>

    </section>
  )
}