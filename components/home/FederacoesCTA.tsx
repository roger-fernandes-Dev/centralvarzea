import Link from "next/link"

export default function FederacoesCTA() {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">

      {/* texto */}
      <div className="text-center md:text-left">
        <h2 className="text-white text-xl md:text-2xl font-bold">
          Federações/arbitros
        </h2>

        <p className="text-gray-300 text-sm md:text-base mt-2">
          Veja a federação da sua cidade, árbitros e informações de contato
        </p>
      </div>

      {/* botão */}
      <Link href="/arbitros">
        <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
          visualizar
        </button>
      </Link>

    </section>
  )
}