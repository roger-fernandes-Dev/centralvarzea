import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const noticiasData = {
  "sporting-guaicara-empata-com-magos": {
    title: "REAÇÃO DE GIGANTE: SPORTING GUAIÇARA BUSCA EMPATE NA RAÇA APÓS SAIR ATRÁS",
    resumo: "O Sporting Guaíçara mostrou poder de reação ao buscar o empate após sair atrás no placar.",
    image: "/noticias/sportingguaicara/spotingguaicaraempatecontramagos.png",
    team: {
      name: "Sporting Guaíçara",
      logo: "/times/sporting-guaicarafc.png",
    },
    content: `Em uma partida marcada por intensidade, superação e muita emoção, o Sporting Guaíçara mostrou que não desiste fácil. Mesmo começando o jogo em desvantagem, a equipe demonstrou personalidade dentro de campo e arrancou um empate que teve gosto de vitória para quem acompanhou de perto.

Logo nos primeiros minutos, o adversário aproveitou uma falha defensiva e abriu o placar, colocando pressão sobre o Sporting. O gol sofrido poderia ter abalado qualquer equipe, mas não foi o caso. O time de Guaíçara manteve a calma, reorganizou suas linhas e começou a crescer no jogo, buscando espaços e tentando impor seu ritmo.

A partir da metade do primeiro tempo, o Sporting já mostrava outra postura. Com mais posse de bola e presença ofensiva, passou a levar perigo constante, obrigando o adversário a recuar. A torcida, sempre presente, começou a empurrar o time, criando um clima de apoio que fez a diferença.

Na segunda etapa, o cenário ficou ainda mais claro: só dava Sporting. A equipe voltou mais agressiva, pressionando desde a saída de bola e criando boas oportunidades. O empate parecia questão de tempo — e veio. Após uma jogada bem trabalhada, o gol saiu para coroar a insistência e a entrega dos jogadores.

Depois de igualar o placar, o Sporting ainda seguiu em busca da virada, mostrando ambição e confiança até o apito final. Apesar de não conseguir o segundo gol, a atuação deixou uma mensagem forte: o time tem força, união e espírito de luta.

O empate pode até não refletir totalmente o domínio apresentado em boa parte do jogo, mas evidencia algo ainda mais importante — a capacidade de reação. E, no futebol de várzea, isso vale muito.

O Sporting Guaíçara sai de campo com moral elevada, reforçando sua identidade competitiva e mostrando que, independentemente das circunstâncias, sempre vai lutar até o fim.`
  },

  "vini-e-junior-fecham-com-a-adc": {
    title: "Julio e vini fecham com ADC",
    resumo: "Julio e vini fecham com o time livre da ADC",
    image: "/noticias/amigosdofutebol/contratacao_julio_vini.png",
    team: {
      name: "renuka adc",
      logo: "/times/renukaadc.png",
    },
    content: `A ADC segue se movimentando forte nos bastidores e confirmou duas contratações que já começam a gerar expectativa: Vini e Júnior agora fazem parte do elenco para a próxima temporada. A dupla chega com a missão de elevar o nível da equipe e fortalecer o grupo que vem sendo montado com ambição.

Conhecidos no cenário local, os dois jogadores carregam experiência e qualidade técnica, características que chamaram a atenção da diretoria. A chegada deles não é por acaso — faz parte de um planejamento claro de montar um time competitivo e preparado para brigar por títulos.

Vini é visto como um atleta versátil, capaz de contribuir tanto na criação quanto no apoio ofensivo, trazendo dinamismo ao time. Já Júnior chega com perfil mais decisivo, sendo reconhecido por sua presença em momentos importantes e capacidade de definição.

A diretoria da ADC vem trabalhando de forma estratégica, buscando peças que se encaixem no estilo de jogo da equipe. As contratações indicam que o clube não pretende apenas participar das competições, mas sim disputar em alto nível.

Nos bastidores, o clima é de confiança. A expectativa é que, com a base sendo reforçada por nomes de peso, a equipe consiga apresentar um futebol mais consistente e competitivo ao longo da temporada.

A chegada de Vini e Júnior marca mais um passo importante na construção do elenco. Agora, a torcida aguarda para ver, dentro de campo, o impacto dessas contratações e até onde a ADC pode chegar.`
  },

  "amigos-do-futebol-vence-campeonato": {
    title: "Amigos do Futebol vence campeonato 50+",
    resumo: "Partida intensa",
    image: "/noticias/amigosdofutebol/foto_taca.png",
    team: {
      name: "amigos do futebol",
      logo: "/times/amigos_do_futebol40+.png"
    },
    content: `Em uma final digna de aplausos, o Amigos do Futebol mostrou que experiência e qualidade ainda fazem toda a diferença dentro de campo. A equipe entrou determinada e conquistou o título do campeonato 50+ após uma atuação sólida, marcada por inteligência tática, união e muita entrega.

Desde o início da partida, o confronto já indicava que seria equilibrado. As duas equipes se estudaram bastante nos primeiros minutos, valorizando a posse de bola e evitando erros. Mesmo assim, o Amigos do Futebol demonstrava maior organização, controlando o ritmo e criando as melhores oportunidades.

Com o passar do tempo, a pressão começou a surtir efeito. Em uma jogada bem construída, o time encontrou o caminho do gol, abrindo o placar e incendiando a torcida presente. O gol trouxe ainda mais confiança, e a equipe passou a dominar as ações, mantendo o adversário sob controle.

Na segunda etapa, o cenário exigiu maturidade. O adversário voltou mais agressivo, tentando reagir e buscando o empate a todo custo. Foi nesse momento que o Amigos do Futebol mostrou sua principal virtude: a experiência. Com posicionamento correto e muita calma, a equipe soube segurar a pressão e administrar o resultado.

Mesmo diante das investidas finais, o sistema defensivo se manteve firme, garantindo a vantagem até o apito final. Quando o árbitro encerrou a partida, a comemoração tomou conta do campo — jogadores, comissão e torcida celebraram juntos uma conquista construída com dedicação ao longo de toda a competição.

O título do campeonato 50+ reforça a força do Amigos do Futebol, que mais uma vez prova que o futebol vai muito além da idade. Com talento, disciplina e paixão pelo jogo, a equipe escreve mais um capítulo importante em sua história.`
  }

} as const

type Slug = keyof typeof noticiasData

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const noticia = noticiasData[slug as Slug]

  if (!noticia) return notFound()

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
        <Image src={noticia.image} alt={noticia.title} fill className="object-cover" />
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
            {noticia.content.split("\n").map((p, i) => (
              <div key={i}>
                <p className="text-justify">{p}</p>

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

                    {/* MOBILE ADS 2x2 */}
                    <div className="grid grid-cols-2 gap-2 w-full max-w-xs lg:hidden">
                    <div className="w-full aspect-[160/250] relative bg-white">
                        <Image src="/pedireitoad/pedireitoad.png" alt="" fill className="object-contain rounded-md" />
                    </div>
                    <div className="w-full aspect-[160/250] relative bg-white">
                        <Image src="/amopad/amopad.png" alt="" fill className="object-contain rounded-md" />
                    </div>
                    <div className="w-full aspect-[160/250] relative bg-white">
                        <Image src="/cegsegurosad/cegsegurosad.png" alt="" fill className="object-contain rounded-md" />
                    </div>
                    <div className="w-full aspect-[160/250] relative bg-white">
                        <Image src="/suplementelinsad/suplementelinsad.png" alt="" fill className="object-contain rounded-md" />
                    </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
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
              
              {relacionadas.map(([key, item]) => (
                <Link
                  key={key}
                  href={`/noticias/${key}`}
                  className="group block"
                >
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/60 transition duration-500 group-hover:bg-black/0"></div>

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