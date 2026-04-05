import Head from "next/head";

export default function SEOHead() {
  return (
    <Head>
      {/* Título da página */}
      <title>Central Várzea - Futebol de Várzea, Jogos e Campeonatos</title>

      {/* Meta description */}
      <meta
        name="description"
        content="Portal completo de futebol de várzea com notícias, jogos e campeonatos. Acompanhe resultados, tabela de times e destaques do futebol amador."
      />

      {/* Meta keywords */}
      <meta name="keywords" content="futebol, várzea, campeonato, times, jogos, resultados" />

      {/* Controle de indexação */}
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href="https://www.centralvarzea.com.br/" />

      {/* Open Graph */}
      <meta property="og:title" content="Central Várzea - Futebol de Várzea, Jogos e Campeonatos" />
      <meta property="og:description" content="Portal completo de futebol de várzea com notícias, jogos e campeonatos." />
      <meta property="og:image" content="https://www.centralvarzea.com.br/logo-og.png" />
      <meta property="og:url" content="https://www.centralvarzea.com.br/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Central Várzea - Futebol de Várzea, Jogos e Campeonatos" />
      <meta name="twitter:description" content="Portal completo de futebol de várzea com notícias, jogos e campeonatos." />
      <meta name="twitter:image" content="https://www.centralvarzea.com.br/logo-og.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* JSON-LD para rich snippet de site */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Central Várzea",
            "url": "https://www.centralvarzea.com.br/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.centralvarzea.com.br/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
    </Head>
  );
}