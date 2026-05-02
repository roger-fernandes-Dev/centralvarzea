"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function TimesPage() {
  const [openCity, setOpenCity] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const dados = [
  {
    estado: "SP",
    cidades: [
      {
        cidade: "Promissão",
        times: [
          { name: "Amigos do Futebol", logo: "/times/amigos_do_futebol40.png", slug: "amigos-do-futebol" },
          { name: "Bahea", logo: "/times/bahea.png", slug: "bahea" },
          { name: "Bengala FC", logo: "/times/bengala.png", slug: "bengala" },
          { name: "Falcões", logo: "/times/falcoes.png", slug: "falcoes" },
          { name: "Meninos da Vila", logo: "/times/meninos_da_vila.png", slug: "meninos-da-vila" },
          { name: "Os Paraíbas", logo: "/times/os_paraibas.png", slug: "os-paraibas" },
          { name: "ADC Renuka", logo: "/times/renukaadc.png", slug: "adc-renuka" },
          { name: "Point", logo: "/times/point.png", slug: "point" },
          { name: "Promi Informática", logo: "/times/promi_informatica.png", slug: "promi-informatica" },
          { name: "Unidos São João", logo: "/times/unidos_sao_joao.png", slug: "unidos-sao-joao" },
          { name: "Arsenal", logo: "/times/arsenal.png", slug: "arsenal" },
          { name: "MEC", logo: "/times/mec.png", slug: "mec" },
          { name: "Bem Amigos", logo: "/times/bemamigosfc.png", slug: "bemamigos" },
        ]
      },
      {
        cidade: "Guaiçara",
        times: [
          { name: "Sporting Guaiçara", logo: "/times/sporting-guaicarafc.png", slug: "sportingguaicara" },
          { name: "Magos", logo: "/times/magos.png", slug: "magos" },
        ]
      },
      {
        cidade: "Lins",
        times: [
          { name: "América", logo: "/times/lins/america.jpg", slug: "america" },
          { name: "Favela Bom Viver", logo: "/times/lins/favelabomviver.jpg", slug: "favelabomviver" },
          { name: "Max Elite", logo: "/times/maxelite.png", slug: "maxelite" },
          { name: "Molecada", logo: "/times/lins/molecada.jpg", slug: "molecada" },
          { name: "Santa Maria", logo: "/times/lins/santamaria.jpg", slug: "santamaria" },
          { name: "Santa Terezinha", logo: "/times/lins/santaterezinha.jpg", slug: "santaterezinha" },
          { name: "São João", logo: "/times/lins/saojoao.jpg", slug: "saojoao" },
          { name: "São Manoel", logo: "/times/lins/saomanoel.jpg", slug: "saomanoel" },
          { name: "Villa Real", logo: "/times/lins/villareal.jpg", slug: "villareal" },
        ]
      },
      {
        cidade: "Sabino",
        times: [
          { name: "Afirma", logo: "/times/afirma.png", slug: "afirma" },
        ]
      },
      {
        cidade: "Penápolis",
        times: [
          { name: "Cruzeiro do Salla", logo: "/times/cruzeirodosalla.png", slug: "cruzeirodosalla" },
        ]
      },
      {
        cidade: "Barbosa",
        times: [
          { name: "Amigos da Vila", logo: "/times/amigosdavila.png", slug: "amigosdavila" },
          { name: "Mineiros FC", logo: "/times/barbosa/mineirosfc.jpg", slug: "mineirosfc" },
        ]
      },
      {
        cidade: "Juquitiba",
        times: [
          { name: "Acadêmicos da vila", logo: "/times/juquitiba/academicosdavila.jpg", slug: "academicosdavila" },
          { name: "Amigos do Posto", logo: "/times/juquitiba/amigosdoposto.jpg", slug: "amigosdoposto" },
          { name: "Boa Esperança", logo: "/times/juquitiba/boaesperanca.jpg", slug: "boaesperanca" },
          { name: "Camargos", logo: "/times/juquitiba/camargos.jpg", slug: "camargos" },
          { name: "Meio Copo FC", logo: "/times/juquitiba/meiocopofc.jpg", slug: "meiocopofc" },
          { name: "Olaria FC", logo: "/times/juquitiba/olariafc.jpg", slug: "olariafc" },
          { name: "Red Bull Barnabés", logo: "/times/juquitiba/redbullbarnabes.jpg", slug: "redbullbarnabes" },
          { name: "Sintonia FC", logo: "/times/juquitiba/sintoniafc.jpg", slug: "sintoniafc" },
          { name: "Tropa FC", logo: "/times/juquitiba/tropafc.jpg", slug: "tropafc" },
          { name: "União da Serra", logo: "/times/juquitiba/uniaodaserra.jpg", slug: "uniaodaserra" },
        ]
      },
      {
        cidade: "Osasco",
        times: [
          { name: "Unidos do São Victor", logo: "/times/osasco/unidosdosaovictor.png", slug: "unidosdosaovictor" },
          { name: "vila Izabel", logo: "/times/osasco/vilaizabelosasco.png", slug: "vilaizabelosasco" },
        ]
      },
    ]
  }
]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-black">
            Clubes
          </h1>
          <p className="text-gray-500 text-sm">
            Times organizados por região
          </p>
        </div>

        {/* BUSCA */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Buscar time..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-black text-sm"
          />
        </div>

        {/* ESTADOS */}
        {dados.map((estado, i) => (
          <section key={i} className="mb-10">

            {/* ESTADO */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-black tracking-tight">
                {estado.estado}
              </h2>
            </div>

            {/* CIDADES */}
            {estado.cidades.map((grupo, idx) => {
              const isSearching = search.trim().length > 0
              const isOpen = isSearching || openCity === grupo.cidade

              const timesFiltrados = grupo.times.filter(t =>
                t.name.toLowerCase().includes(search.toLowerCase())
              )

              if (timesFiltrados.length === 0) return null

              return (
                <div key={idx} className="border-t border-gray-200">

                  {/* CIDADE */}
                  <button
                    onClick={() => {
                      if (!isSearching) {
                        setOpenCity(isOpen ? null : grupo.cidade)
                      }
                    }}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-black">
                        {grupo.cidade}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {timesFiltrados.length}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400 uppercase">
                      {isSearching ? "Resultados" : isOpen ? "Fechar" : "Ver"}
                    </span>
                  </button>

                  {/* TIMES */}
                  {isOpen && (
                    <div className="pb-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4">

                      {timesFiltrados.map((time, t) => (
                        <Link
                          key={t}
                          href={`/clubs/${time.slug}`}
                          className="group flex flex-col items-center text-center"
                        >
                          <div className="w-10 h-10 relative mb-2">
                            <Image
                              src={time.logo}
                              alt={time.name}
                              fill
                              className="object-contain transition duration-300 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
                            />
                          </div>

                          <span className="text-[11px] text-gray-700 leading-tight">
                            {time.name}
                          </span>
                        </Link>
                      ))}

                    </div>
                  )}

                </div>
              )
            })}

          </section>
        ))}

      </div>
    </div>
  )
}