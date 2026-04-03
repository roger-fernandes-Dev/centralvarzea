import Image from "next/image"
import Link from "next/link"

const noticias = [
  {
    id: 2,
    imagem: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
    categoria: "comunicado oficial",
    titulo: "Jogo entre Renuka ADC e Boleiros é cancelado em respeito ao Domingo de Páscoa",
  },
  {
    id: 3,
    imagem: "/clubs/amigosdofutebol/amigosfutebol.png",
    categoria: "final 50+",
    titulo: "Equipe conquista título em decisão emocionante",
  }
]

export default function Noticias() {
  return (
    <section className="w-full max-w-7xl mx-auto py-8">

      {/* título */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black">
        Notícias
      </h1>

      {/* grid estilo portal */}
      <div className="grid md:grid-cols-2 gap-6">

        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="relative h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer"
          >
            {/* imagem */}
            <Image
              src={noticia.imagem}
              alt={noticia.titulo}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />

            {/* overlay escuro */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

            {/* conteúdo em cima */}
            <div className="absolute bottom-0 p-4 text-white">
              <span className="text-sm text-yellow-400">
                {noticia.categoria}
              </span>

              <h2 className="text-lg md:text-xl font-bold leading-snug mt-1">
                {noticia.titulo}
              </h2>
            </div>
          </div>
        ))}

      </div>

      {/* botão embaixo */}
      <div className="flex justify-center mt-8">
        <Link href="/noticias">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition">
            Leia todas
          </button>
        </Link>
      </div>

    </section>
  )
}