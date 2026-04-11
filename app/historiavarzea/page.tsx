import HistoriaVarzea from "./HistoriaVarzea"

export const metadata = {
  title: "História da Várzea no Brasil | Futebol de Várzea, Times e Cultura Popular",
  description:
    "Conheça a história do futebol de várzea no Brasil: origem, crescimento, times de bairro, campeonatos e a importância da várzea no futebol brasileiro.",
  keywords: [
  // principais
  "futebol de várzea",
  "história da várzea",
  "times de várzea",
  "campeonato de várzea",
  "futebol amador brasil",

  // buscas reais
  "times de bairro futebol",
  "liga de várzea",
  "jogos de várzea hoje",
  "tabela campeonato de várzea",
  "resultado futebol amador",

  // long tail (menos concorrência, mais conversão)
  "como funciona campeonato de várzea",
  "como montar time de futebol amador",
  "história do futebol de várzea no brasil",
  "onde assistir jogos de várzea",
  "futebol de periferia brasil",

  // autoridade / contexto
  "futebol brasileiro raiz",
  "origem do futebol no brasil",
  "categorias de futebol amador",
  "futebol de base brasil",
  "jogadores revelados na várzea",

  // intenção local (muito forte pro seu projeto)
  "futebol de várzea em são paulo",
  "times de várzea interior sp",
  "campeonato de várzea regional",
  "futebol amador paulista",

  // comparação (pega tráfego grande)
  "diferença entre futebol profissional e várzea",
  "como jogadores da várzea viram profissionais",
],
  openGraph: {
    title: "História da Várzea no Brasil",
    description:
      "Descubra como surgiu o futebol de várzea e sua importância no Brasil.",
    url: "https://www.centralvarzea.com.br/historiavarzea",
    siteName: "Central Várzea",
    images: [
      {
        url: "/central_varzea.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "article",
  },
}

export default function Page() {
  return <HistoriaVarzea />
}