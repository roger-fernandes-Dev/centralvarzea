import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

const noticiasData = {
  "amigos-da-bola-x-amigos-do-futebol-amistoso-arena-caju": {
  title: "Amigos da Bola vence amistoso contra Amigos do Futebol na Arena Caju",
  resumo: "Partida sofreu atraso por bloqueio devido a competição de ciclismo. Mesmo desfalcado e sem reservas, Amigos do Futebol acabou superado por 6 a 1.",
  image: "/noticias/amigosdofutebol/amigosdabolavsamigosdofutebol.png",
  team: {
    name: "Amigos do Futebol Clube",
    logo: "/times/amigos_do_futebol40.png",
  },
  content: `Na manhã deste domingo (12/04), Amigos do Futebol e Amigos da Bola se enfrentaram na Arena Caju em mais um amistoso preparatório.

A partida, que estava marcada para às 08h15, acabou sofrendo atraso por conta do bloqueio da pista realizado pela guarda municipal, devido a uma competição de ciclismo na região. Com isso, o confronto teve início apenas por volta das 09h.

Dentro de campo, o Amigos do Futebol entrou em situação complicada. A equipe estava desfalcada e não contava com jogadores no banco de reservas, o que limitou as opções durante o jogo e aumentou o desgaste físico ao longo da partida.

Aproveitando esse cenário, o Amigos da Bola conseguiu impor seu ritmo e foi eficiente nas oportunidades criadas, construindo o placar com tranquilidade até fechar o confronto em 6 a 1.

Mesmo com o resultado adverso, o clima no elenco do Amigos do Futebol segue firme. O grupo entende que o amistoso faz parte do processo de preparação e que o foco principal está no campeonato.

A expectativa agora é corrigir os erros, recuperar os atletas e chegar mais forte para os próximos desafios oficiais.

Nos siga agora no instagram: https://instagram.com/centralvarzea.of
Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
},
  "amigos-do-futebol-x-amigos-da-bola-adiado-adc": {
  title: "Amigos do Futebol x Amigos da Bola é adiado e vira preparação para a ADC",
  resumo: "Comissão técnica decide adiar confronto por desfalques, e partida passa a ser utilizada como preparação e avaliação física visando o campeonato.",
  image: "/noticias/amigosdofutebol/jogoadiado.png",
  team: {
    name: "Amigos do Futebol Clube",
    logo: "/times/amigos_do_futebol40.png",
  },
  content: `O confronto entre Amigos do Futebol e Amigos da Bola foi adiado e agora será realizado no dia 12 de abril, às 08h20.

A decisão partiu da comissão técnica, que optou pela mudança principalmente por conta de desfalques nos elencos. A ideia é garantir que as equipes tenham mais jogadores disponíveis, evitando um jogo abaixo do esperado neste momento de preparação.

Mesmo sem caráter decisivo, o duelo é considerado importante internamente. As duas equipes seguem em fase de organização para o campeonato, e a partida entra como parte desse processo, ajudando no ajuste tático e no entrosamento entre os atletas.

Além disso, o jogo também deve ser usado como uma avaliação física do elenco. A comissão técnica pretende observar quem está em melhores condições, tanto no ritmo quanto na parte física, pensando já na sequência da competição.

Outro ponto levado em consideração foi justamente o planejamento a médio prazo. Evitar um jogo com muitos desfalques agora pode ajudar a ter um desempenho mais consistente quando o campeonato começar de fato.

Com a nova data definida, o confronto segue no calendário como mais um passo na preparação das equipes, que buscam chegar prontas para a disputa do campeonato.

Nos siga agora no instagram: https://instagram.com/centralvarzea.of
Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
},
  "renuka-adc-amistoso-ousadia-evolucao": {
  title: "Renuka ADC utiliza amistoso como teste e foca na evolução da equipe",
  resumo: "Em partida realizada na Arena ADC, a equipe enfrentou o Ousadia em um amistoso de preparação e utilizou o confronto para ajustes e ganho de ritmo.",
  image: "/noticias/renukaadc/renuka_ousadia.png",
  team: {
    name: "Renuka ADC",
    logo: "/times/renukaadc.png",
  },
  content: `Em um amistoso realizado na Arena ADC, na manhã deste domingo, o Renuka ADC entrou em campo para mais um importante teste de preparação, enfrentando a equipe do Ousadia. A partida, que teve início após as 9h devido a um pequeno atraso, serviu como oportunidade para ajustes e observações visando a sequência da temporada.

Mesmo diante de um placar adverso, o confronto foi tratado internamente como um treino de alto nível, permitindo à comissão técnica avaliar o comportamento do time em diferentes situações de jogo. A equipe buscou manter sua proposta em campo e não deixou de competir, demonstrando entrega durante toda a partida.

Os gols marcados pelo Renuka ADC reforçam o potencial ofensivo do grupo, que segue trabalhando para aprimorar o entrosamento e a consistência ao longo dos jogos. Em compromissos preparatórios como este, o resultado acaba ficando em segundo plano, enquanto o foco principal está no desenvolvimento coletivo e individual dos atletas.

A comissão técnica destacou a importância de enfrentar adversários qualificados neste momento, entendendo que jogos assim contribuem diretamente para a evolução da equipe. A expectativa é de que o grupo siga crescendo, corrigindo detalhes e ganhando ritmo para os desafios que virão ao longo da temporada.

Com a sequência de treinamentos e amistosos, o Renuka ADC mantém o foco no aprimoramento, utilizando cada partida como um passo importante na construção de um time mais competitivo.

Nos siga agora no instagram: https://instagram.com/centralvarzea.of
Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
},
  "goleiro-san-renova-amigos-do-futebol": {
  title: "Goleiro SAN mantém legado e renova com Amigos do Futebol Clube",
  resumo: "Destaque histórico da equipe, SAN seguirá defendendo o clube na próxima temporada, reforçando sua importância no elenco.",
  image: "/noticias/amigosdofutebol/goleirosan.png",
  team: {
    name: "Amigos do Futebol Clube",
    logo: "/times/amigos_do_futebol40.png",
  },
  content: `O goleiro SAN, destaque histórico da família Amigos do Futebol Clube, renovou seu vínculo com a equipe e seguirá defendendo o time na próxima temporada. Com trajetória marcada por defesas decisivas e liderança dentro da quadra, SAN se mantém como peça fundamental no elenco, reforçando a tradição de talentos formados pelo clube.

“É uma honra continuar vestindo a camisa do Amigos do Futebol. Aqui é a minha casa e quero ajudar o time a conquistar cada vez mais”, afirmou o goleiro.

A renovação confirma a confiança da diretoria no atleta, que segue como referência para os jovens e para os torcedores que acompanham o clube há anos. Com SAN entre os titulares, o Amigos do Futebol Clube mira novos desafios e mantém a expectativa de brigar por títulos.
Nos siga agora no instagram: https://instagram.com/centralvarzea.of
Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
},
  "jogo-cancelado-renuka-boleiros": {
    title: "JOGO CANCELADO: RENUKA ADC X BOLEIROS NÃO ACONTECE EM RESPEITO À PÁSCOA",
    resumo: "A partida marcada para o dia 05/04, na Arena ADC, foi cancelada em respeito ao Domingo de Páscoa.",
    image: "/noticias/renukaadc/jogo-boleiros-contra-adc-cancelado.png",
    team: {
      name: "Renuka ADC",
      logo: "/times/renukaadc.png",
    },
    content: `O confronto entre Renuka ADC e Boleiros, que seria realizado no próximo dia 05 de abril, na Arena ADC, foi oficialmente cancelado. A decisão foi tomada em razão do Domingo de Páscoa, uma das datas mais importantes do calendário, tradicionalmente marcada por momentos de reflexão, fé e, principalmente, pela reunião entre familiares. A organização optou por não realizar a partida em respeito ao significado da data, valorizando o tempo de convivência dos atletas, comissão técnica e torcedores junto às suas famílias. Apesar do cancelamento, a expectativa pelo duelo segue alta, e uma possível nova data para o confronto poderá ser definida e divulgada em breve pelos responsáveis. O futebol de várzea, além da competitividade dentro de campo, também carrega valores que vão além das quatro linhas — e, neste caso, o respeito às tradições falou mais alto.

Nos siga agora no instagram: https://instagram.com/centralvarzea.of

Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao    `
  },

  "jogo-cancelado-amigos-do-futebol-vs-amigos-da-bola": {
    title: "JOGO CANCELADO: AMIGOS DO FUTEBOL X AMIGOS DA BOLA NÃO ACONTECE DEVIDO À CHUVA",
    resumo: "A partida em Avanhandava foi cancelada após fortes chuvas deixarem o campo sem condições de jogo.",
    image: "/noticias/amigosdofutebol/jogocancelado.png",
    team: {
      name: "Amigos do Futebol",
      logo: "/times/amigos_do_futebol40.png",
    },
    content: `A partida entre Amigos do Futebol e Amigos da Bola, que aconteceria em Avanhandava, acabou sendo cancelada devido às fortes chuvas que atingiram a cidade.

As condições do campo ficaram comprometidas, impossibilitando a realização do jogo com segurança para os atletas. Com o gramado encharcado e sem condições adequadas, a decisão pelo cancelamento foi tomada pela organização pouco antes do início da partida.

O confronto era aguardado com expectativa, mas acabou não acontecendo por conta do clima adverso.

Até o momento, uma nova data para a realização do jogo ainda não foi definida.
Você também pode acompanhar todas as novidades e conteúdos através das nossas redes sociais:

Nos siga agora no instagram: https://instagram.com/centralvarzea.of

Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
},
  "amigos-do-futebol-vence-campeonato": {
    title: "Amigos do Futebol vence campeonato 50+",
    resumo: "Partida intensa",
    image: "/noticias/amigosdofutebol/foto_taca.png",
    team: {
      name: "amigos do futebol",
      logo: "/times/amigos_do_futebol40.png"
    },
    content: `Em uma final digna de aplausos, o Amigos do Futebol mostrou que experiência e qualidade ainda fazem toda a diferença dentro de campo. A equipe entrou determinada e conquistou o título do campeonato 50+ após uma atuação sólida, marcada por inteligência tática, união e muita entrega.

Desde o início da partida, o confronto já indicava que seria equilibrado. As duas equipes se estudaram bastante nos primeiros minutos, valorizando a posse de bola e evitando erros. Mesmo assim, o Amigos do Futebol demonstrava maior organização, controlando o ritmo e criando as melhores oportunidades.

Com o passar do tempo, a pressão começou a surtir efeito. Em uma jogada bem construída, o time encontrou o caminho do gol, abrindo o placar e incendiando a torcida presente. O gol trouxe ainda mais confiança, e a equipe passou a dominar as ações, mantendo o adversário sob controle.

Na segunda etapa, o cenário exigiu maturidade. O adversário voltou mais agressivo, tentando reagir e buscando o empate a todo custo. Foi nesse momento que o Amigos do Futebol mostrou sua principal virtude: a experiência. Com posicionamento correto e muita calma, a equipe soube segurar a pressão e administrar o resultado.

Mesmo diante das investidas finais, o sistema defensivo se manteve firme, garantindo a vantagem até o apito final. Quando o árbitro encerrou a partida, a comemoração tomou conta do campo — jogadores, comissão e torcida celebraram juntos uma conquista construída com dedicação ao longo de toda a competição.

O título do campeonato 50+ reforça a força do Amigos do Futebol, que mais uma vez prova que o futebol vai muito além da idade. Com talento, disciplina e paixão pelo jogo, a equipe escreve mais um capítulo importante em sua história.Você também pode acompanhar todas as novidades e conteúdos através das nossas redes sociais:

Nos siga agora no instagram: https://instagram.com/centralvarzea.of

Para mais notícias sobre Promissão e região, siga o jornal nas redes sociais:
- Instagram: https://www.instagram.com/noticiaspromissao
- Facebook: https://www.facebook.com/noticiaspromissaoeregiao`
  }

} as const

type Slug = keyof typeof noticiasData

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params

  const noticia = noticiasData[slug as Slug]

  if (!noticia) {
    return {
      title: "Notícia não encontrada",
    }
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

  const noticia = noticiasData[slug as Slug]

  if (!slug || !noticia) return notFound()

  const relacionadas = Object.entries(noticiasData)
    .filter(([key]) => key !== slug)
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

        {/* LEFT ADS */}
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

        {/* ARTICLE */}
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
                          alt={noticia.team?.name}
                          width={120}
                          height={120}
                          className="rounded-full shadow-md"
                        />
                        <span className="text-sm text-gray-500">
                          {noticia.team?.name}
                        </span>
                      </div>

                      {/* MOBILE ADS */}
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

        {/* RIGHT ADS */}
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

      {/* RELACIONADAS */}
      {relacionadas.length > 0 && (
        <section className="mt-16">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-xl font-bold mb-6 border-l-4 border-yellow-600 pl-3">
              Notícias Recomendadas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {relacionadas.map(([key, item]) => (
                <Link key={key} href={`/noticias/${key}`} className="group block">

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