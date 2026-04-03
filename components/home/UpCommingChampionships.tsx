"use client"

import Image from "next/image"
import Link from "next/link"

type Championship = {
  name: string
  logo: string
  registrationEnd: string
  startDate: string
  slug: string
  status: "open" | "soon" | "closed" | "running"
}

export default function UpcomingChampionships() {
  const championships: Championship[] = [
    {
      name: "Selt Mini Campo 2026",
      logo: "/campeonato/selt-minicampo.png",
      registrationEnd: "30/03/2026",
      startDate: "07/04/2026",
      slug: "copa-selt-mini-campo",
      status: "soon"
    },
    {
      name: "Super Master Guaicara",
      logo: "/campeonato/supermaster-guaicara.png",
      registrationEnd: "15/04/2026",
      startDate: "25/04/2026",
      slug: "supermaster-guaicara",
      status: "running"
    },
  ]

  return (
    <section className="w-full">

      {/* título */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold">
          Próximos Campeonatos
        </h2>
        <p className="text-sm text-gray-500">
          Competições abertas e que irão começar em breve ou em andamento
        </p>
      </div>

      {/* grid */}
      <div className="
        grid gap-5
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      ">

        {championships.map((item, i) => (
          <Link
            key={i}
            href={`/campeonatos/${item.slug}`}
            className="group cursor-pointer"
          >

            <div className="
              flex flex-col items-center text-center
              transition duration-300
              group-hover:scale-[1.06] group-hover:-translate-y-1
            ">

              {/* logo */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* nome */}
              <h3 className="
                text-xs md:text-sm font-semibold
                leading-tight line-clamp-2
              ">
                {item.name}
              </h3>

              {/* status */}
              <span className={`
                mt-1 text-[11px] font-semibold

                ${item.status === "open" && "text-green-600"}
                ${item.status === "soon" && "text-yellow-600"}
                ${item.status === "closed" && "text-red-600"}
                ${item.status === "running" && "text-blue-600"}
              `}>
                {item.status === "open" && "Inscrições abertas"}
                {item.status === "soon" && "Em breve"}
                {item.status === "closed" && "Encerrado"}
                {item.status === "running" && "Em andamento"}
              </span>

              {/* datas condicionais */}
              {(item.status === "open" || item.status === "soon") && (
                <div className="mt-2 text-xs md:text-sm text-gray-600 leading-tight">
                  <div>
                    <span className="text-gray-400">Inscrições:</span>{" "}
                    <strong>{item.registrationEnd}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400">Início:</span>{" "}
                    <strong>{item.startDate}</strong>
                  </div>
                </div>
              )}

              {/* caso queira mostrar só início quando fechado (opcional) */}
              {item.status === "closed" && (
                <div className="mt-2 text-xs md:text-sm text-gray-600">
                  <span className="text-gray-400">Início:</span>{" "}
                  <strong>{item.startDate}</strong>
                </div>
              )}

            </div>

          </Link>
        ))}

      </div>
    </section>
  )
}