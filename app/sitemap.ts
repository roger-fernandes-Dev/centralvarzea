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
    "amigos-do-futebol-x-amigos-da-bola-adiado-adc",
    "A-varzea-esta-deixando-de-ser-varzea-Custos-altos-geram-revolta",
    "primeira-rodada-do-mini-campo-selt-comea-hoje",
    "maratona-de-jogos-no-mesmo-gramado-levanta-debate-na-copa-minicampo-vai-aguentar-a-semana-inteira",
    "o-desafio-real-de-manter-um-time-de-vrzea-vivo",
    "clubes-de-vrzea-enfrentam-dilema-entre-valorizar-atletas-locais-e-buscar-reforos-de-fora",
  ]

  const pages = [
    "",
    "/historiavarzea",
    "/times",
    "/jogos",
    "/noticias",
    "/contato",
    "/termos",
    "/privacidade",
    "/arbitros",
    "/lins",
    "/birigui",
    "/copaadc",
    "/copaseltlivre",
    "/copaseltpromissao50",
    "/copaseltpromissao40",
    "/clubs/amigos-do-futebol",
    "/clubs/bahea",
    "/clubs/bengala",
    "/clubs/falcoes",
    "/clubs/meninos-da-vila",
    "/clubs/os-paraibas",
    "/clubs/adc-renuka",
    "/clubs/point",
    "/clubs/promi-informatica",
    "/clubs/unidos-sao-joao",
    "/clubs/arsenal",
    "/clubs/mec",
    "/clubs/bemamigos",
    "/clubs/sportingguaicara",
    "/clubs/magos",
    "/clubs/maxelite",
    ]

  return [
    // páginas principais
    ...pages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
    })),

    // notícias
    ...noticias.map((slug) => ({
      url: `${baseUrl}/noticias/${slug}`,
      lastModified: new Date(),
    })),
  ]
}