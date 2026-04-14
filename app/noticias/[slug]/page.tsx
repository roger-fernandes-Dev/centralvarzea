import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { noticias } from "@/app/data/noticias"

type Slug = typeof noticias[number]["slug"]

function getNoticia(slug: string) {
  return noticias.find((n) => n.slug === slug) || null
}

function getNoticias() {
  return noticias
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params
  const noticia = getNoticia(slug)

  if (!noticia) {
    return { title: "Notícia não encontrada" }
  }

  const url = `https://www.centralvarzea.com.br/noticias/${slug}`

  const imageUrl = noticia.image.startsWith("http")
    ? noticia.image
    : `https://www.centralvarzea.com.br${noticia.image}`

  return {
    title: noticia.title,
    description: noticia.resumo,

    openGraph: {
      title: noticia.title,
      description: noticia.resumo,
      url,
      siteName: "Central Várzea",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: noticia.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: noticia.title,
      description: noticia.resumo,
      images: [imageUrl],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const noticia = getNoticia(slug)
  const todas = getNoticias()

  if (!noticia) return notFound()

  const relacionadas = todas
    .filter((n) => n.slug !== slug)
    .slice(0, 3)

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <div className="max-w-2xl mx-auto">
        <span className="text-sm font-semibold text-yellow-600 uppercase">
          Futebol de Várzea
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
          {noticia.title}
        </h1>

        <p className="text-gray-500 mt-3">
          {noticia.resumo}
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 mt-6 rounded-lg overflow-hidden">
        <Image
          src={noticia.image}
          alt={noticia.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 mt-10">

        <aside className="hidden lg:flex flex-col items-center">
          <div className="sticky top-24 flex flex-col gap-24">
            <div className="w-[160px] h-[250px] relative">
              <Image src="/pedireitoad/pedireitoad.png" alt="" fill className="object-cover rounded-md" />
            </div>
            <div className="w-[160px] h-[250px] relative">
              <Image src="/amopad/amopad.png" alt="" fill className="object-cover rounded-md" />
            </div>
          </div>
        </aside>

        <article>
          <div className="max-w-2xl mx-auto text-[17px] leading-8 text-gray-800 space-y-6">
            {noticia.content.split("\n").map((p, i) => {
              const urlMatch = p.match(/https?:\/\/\S+/)

              return (
                <div key={i}>
                  {urlMatch ? (
                    <p className="text-justify">
                      {p.replace(urlMatch[0], "")}
                      <a
                        href={urlMatch[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {urlMatch[0]}
                      </a>
                    </p>
                  ) : (
                    <p className="text-justify">{p}</p>
                  )}

                  {i === 1 && (
                    <div className="flex flex-col items-center my-8 gap-4">

                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src={noticia.team?.logo || "/logos/default.png"}
                          alt={noticia.team?.name || ""}
                          width={120}
                          height={120}
                          className="rounded-full shadow-md"
                        />
                        <span className="text-sm text-gray-500">
                          {noticia.team?.name}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full max-w-xs lg:hidden">
                        {[
                          "/pedireitoad/pedireitoad.png",
                          "/amopad/amopad.png",
                          "/cegsegurosad/cegsegurosad.png",
                          "/suplementelinsad/suplementelinsad.png",
                        ].map((src, idx) => (
                          <div key={idx} className="w-full aspect-[160/250] relative bg-white">
                            <Image src={src} alt="" fill className="object-contain rounded-md" />
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </article>

        <aside className="hidden lg:flex flex-col items-center">
          <div className="sticky top-24 flex flex-col gap-24">
            <div className="w-[160px] h-[250px] relative">
              <Image src="/cegsegurosad/cegsegurosad.png" alt="" fill className="object-cover rounded-md" />
            </div>
            <div className="w-[160px] h-[250px] relative">
              <Image src="/suplementelinsad/suplementelinsad.png" alt="" fill className="object-cover rounded-md" />
            </div>
          </div>
        </aside>

      </div>

      {relacionadas.length > 0 && (
        <section className="mt-16">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-xl font-bold mb-6 border-l-4 border-yellow-600 pl-3">
              Notícias Recomendadas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {relacionadas.map((item) => (
                <Link key={item.slug} href={`/noticias/${item.slug}`} className="group block">

                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition duration-500 group-hover:bg-black/0"></div>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold transition-colors duration-300 group-hover:text-yellow-600">
                    {item.title}
                  </h3>

                </Link>
              ))}

            </div>
          </div>
        </section>
      )}

    </main>
  )
}