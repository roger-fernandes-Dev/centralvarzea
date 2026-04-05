import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.centralvarzea.com.br"

  const noticias = [
    "renuka-adc-amistoso-ousadia-evolucao",
    "goleiro-san-renova-amigos-do-futebol",
    "minicampo-promissao-inscricoes",
    "jogo-cancelado-renuka-boleiros",
    "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola",
    "amigos-do-futebol-vence-campeonato",
    // 👉 adiciona novos slugs aqui
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...noticias.map((slug) => ({
      url: `${baseUrl}/noticias/${slug}`,
      lastModified: new Date(),
    })),
  ]
}