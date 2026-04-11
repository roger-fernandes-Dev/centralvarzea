"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Section = {
  title: string
  text: string
  image: string
}

const sections: Section[] = [
  {
    title: "O Nascimento da Várzea no Brasil",
    text: "O futebol de várzea surgiu no Brasil no início do século XX, principalmente nas margens dos rios das grandes cidades, como São Paulo. Operários, imigrantes e trabalhadores utilizavam terrenos baldios e áreas alagáveis — as chamadas várzeas — para jogar bola nos momentos de folga, dando origem ao futebol popular fora dos clubes oficiais.",
    image: "/varzea/1.jpg",
  },
  {
    title: "A Popularização nas Periferias",
    text: "Com o crescimento urbano ao longo das décadas de 1940 e 1950, o futebol de várzea se espalhou pelas periferias. Times de bairro passaram a representar comunidades inteiras, criando rivalidades locais e fortalecendo a identidade cultural de cada região.",
    image: "/varzea/2.jpg",
  },
  {
    title: "Organização e Campeonatos",
    text: "A partir dos anos 60 e 70, a várzea começou a se organizar. Ligas amadoras surgiram, campeonatos passaram a ser estruturados e campos improvisados deram lugar a espaços mais definidos. Mesmo sem apoio oficial, a organização era feita pela própria comunidade.",
    image: "/varzea/3.jpg",
  },
  {
    title: "Berço de Grandes Jogadores",
    text: "Diversos jogadores profissionais começaram na várzea. Antes de chegarem aos grandes clubes, muitos desenvolveram sua técnica jogando em campos de terra, enfrentando adversários experientes e aprendendo na prática o futebol de rua e de comunidade.",
    image: "/varzea/4.jpg",
  },
  {
    title: "A Várzea na Atualidade",
    text: "Hoje, o futebol de várzea continua vivo e mais forte do que nunca. Com apoio de mídias digitais e projetos independentes, ganhou visibilidade, organização e estrutura, mas sem perder sua essência: paixão, raiz e ligação direta com o povo.",
    image: "/varzea/5.jpg",
  },
]

export default function HistoriaVarzea() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [scrollY, setScrollY] = useState(0)

  // scroll mais performático
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.2 }
    )

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 scale-110">
        <Image
          src="/varzea/bg.jpg"
          alt="futebol de várzea no Brasil campo de terra campeonato amador"
          fill
          className="object-cover"
        />
      </div>

      {/* OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.75)_100%)]" />

      {/* 🔥 BLOCO SEO FORTE */}
      <div className="max-w-4xl mx-auto pt-24 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Futebol de Várzea no Brasil: História, Times e Campeonatos
        </h1>

        <p className="text-gray-300 leading-relaxed">
          O futebol de várzea no Brasil é uma das maiores expressões do esporte popular. Presente em bairros e periferias, os times de várzea movimentam campeonatos, revelam jogadores e mantêm viva a essência do futebol raiz.
        </p>

        <p className="text-gray-400 mt-4 leading-relaxed">
          Desde campos de terra até ligas organizadas, a várzea faz parte da história do futebol brasileiro e continua crescendo com jogos, resultados e campeonatos acompanhados por milhares de pessoas.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 space-y-32">

        {sections.map((section, index) => {
          const isReverse = index % 2 !== 0

          const ref = refs.current[index]
          let progress = 0

          if (ref) {
            const rect = ref.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // curva mais suave
            progress = 1 - rect.top / (windowHeight * 0.8)
            progress = Math.max(0, Math.min(1, progress))
          }

          // só ativa depois de rolar MESMO
          const hasScrolled = scrollY > 30

          const rotate = hasScrolled ? 15 - progress * 15 : 15
          const grayscale = hasScrolled ? 100 - progress * 100 : 100
          const textOpacity = hasScrolled ? 0.2 + progress * 0.8 : 0.2

          return (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`opacity-0 translate-y-10 transition-all duration-700 flex flex-col md:flex-row items-center gap-12 ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGEM */}
              <div className="flex-1 flex justify-center">
                <div
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    filter: `grayscale(${grayscale}%)`,
                  }}
                  className="relative w-[280px] h-[380px] border-4 border-white shadow-2xl overflow-hidden transition-all duration-300"
                >
                  {/* GRAIN */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:3px_3px]" />

                  <Image
                    src={section.image}
                    alt={`${section.title} futebol de várzea campeonato amador times de bairro`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* TEXTO */}
              <div
                style={{ opacity: textOpacity }}
                className="flex-1 transition-all duration-300"
              >
                <h2 className="text-3xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="leading-relaxed text-gray-300">
                  {section.text}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 🔥 SEO ESCONDIDO */}
      <div className="hidden">
        futebol de várzea, campeonato de várzea, jogos de várzea hoje, resultado futebol amador, times de bairro, futebol raiz brasil, ligas de várzea, futebol de periferia
      </div>

      <style jsx>{`
        .show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}