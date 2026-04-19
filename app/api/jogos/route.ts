// /app/api/jogos/route.ts

import { NextResponse } from "next/server"

const jogos = [
    {
        id: "1",
      homeLogo: "/times/nova_alianca.png",
      home: "Nova Aliança",
      awayLogo: "/times/point.png",
      away: "Point",
      type: "Copa ADC",
      data: "2026-04-19",
      hora: "08:00",
      local: "Arena ADC - Campo A",
    },
    {
        id: "2",
      homeLogo: "/times/boleirosfc.png",
      home: "Boleiros",
      awayLogo: "/times/os_paraibas.png",
      away: "Os Paraíbas",
      type: "Copa ADC",
      data: "2026-04-19",
      hora: "08:00",
      local: "Arena ADC - Campo A",
    },
    {
        id: "3",
      homeLogo: "/times/sporting-guaicarafc.png",
      home: "Sporting Guaiçara",
      awayLogo: "/times/the_best.png",
      away: "The Best",
      type: "Copa ADC",
      data: "2026-04-19",
      hora: "08:00",
      local: "Arena ADC - Campo B",
    },
    {
        id: "4",
      homeLogo: "/times/magos.png",
      home: "Magos",
      awayLogo: "/times/raizesportiva.png",
      away: "Raiz Esportiva",
      type: "Copa ADC",
      data: "2026-04-19",
      hora: "08:00",
      local: "Arena ADC - Campo B",
      
    },
  {
    id: "7",
      homeLogo: "/times/the_best.png",
      home: "The Best",
      awayLogo: "/times/os_paraibas.png",
      away: "Os Paraibas",
      score: "3 x 5",
      type: "Amistoso",
      data: "2026-04-12",
      hora: "08:30",
      local: "Campo São João"
    },
    {
        id: "8",
      homeLogo: "/times/casinhafc.png",
      home: "Casinha FC",
      awayLogo: "/times/unidos_sao_joao.png",
      away: "Unidos São João",
      score: "3 x 2",
      type: "Copa ADC",
      data: "2026-04-12",
      hora: "08:00",
      local: "Arena ADC - Campo B"
    },
    {
        id: "9",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/napoli.png",
      away: "Napoli",
      score: "1 x 3",
      type: "Copa ADC",
      data: "2026-04-12",
      hora: "08:00",
      local: "Arena ADC - Campo B"
    },
    {
        id: "10",
      homeLogo: "/times/aguias_de_Deus.png",
      home: "Águias de Deus",
      awayLogo: "/times/maxelite.png",
      away: "Max Elite",
      score: "4 x 3",
      type: "Copa ADC",
      data: "2026-04-12",
      hora: "08:00",
      local: "Arena ADC - Campo A"
    },
    {
        id: "11",
      homeLogo: "/times/sporting-guaicarafc.png",
      home: "Sporting Guaiçara",
      awayLogo: "/times/bulldogs.png",
      away: "BullDogs",
      score: "9 x 4",
      type: "Amistoso",
      data: "2026-04-12",
      hora: "08:30",
      local: "Arena Travalão"
    },
    {
        id: "12",
      homeLogo: "/times/mec.png",
      home: "MEC",
      awayLogo: "/times/afirma.png",
      away: "Firma",
      score: "4 x 2",
      type: "Copa ADC",
      data: "2026-04-12",
      hora: "08:00",
      local: "Arena ADC - Campo A"
    },
    {
        id: "13",
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/amigos_do_futebol40.png",
      away: "Amigos do Futebol",
      score: "6 x 1",
      type: "Amistoso",
      data: "2026-04-12",
      hora: "08:15",
      local: "Arena Caju"
    },
    {
        id: "14",
      homeLogo: "/times/juventus.png",
      home: "Juventus",
      awayLogo: "/times/claudineimotos.png",
      away: "Claudinei Motos",
      score: "4 x 6",
      type: "Amistoso",
      data: "2026-04-11",
      hora: "16:00",
      local: "Arena Del Rey"
    },
    {
        id: "15",
      homeLogo: "/times/bemamigos.png",
      home: "Bem Amigos",
      awayLogo: "/times/mec.png",
      away: "MEC",
      score: "4 x 8",
      type: "Amistoso",
      data: "2026-04-04",
      hora: "16:30",
      local: "Arena ADC"
    },
    {
        id: "16",
      homeLogo: "/times/meninos_da_vila.png",
      home: "meninos da vila",
      awayLogo: "/times/aguias_de_Deus.png",
      away: "Águias de Deus",
      score: "7 x 4",
      type: "Amistoso",
      data: "2026-04-05",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "17",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/ousadiafc.png",
      away: "Ousadia",
      score: "2 x 8",
      type: "Amistoso",
      data: "2026-04-05",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "18",
      homeLogo: "/times/the_best.png",
      home: "The best",
      awayLogo: "/times/quebrada_fc.png",
      away: "Quebrada FC",
      score: "9 x 7",
      type: "Amistoso",
      data: "2026-04-05",
      hora: "08:00",
      local: "Golden Ball - Guaiçara"
    },
    {
        id: "19",
      homeLogo: "/times/amigosdavila.png",
      home: "Amigos da Vila",
      awayLogo: "/times/cruzeirodosalla.png",
      away: "Cruzeiro do Salla",
      score: "15 x 6",
      type: "Amistoso",
      data: "2026-04-04",
      hora: "16:00",
      local: "Centro de lazer(barbosa)"
    },
    {
        id: "20",
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/falcoes.png",
      away: "Falcões",
      score: "4 x 3",
      type: "Amistoso",
      data: "2026-03-29",
      hora: "08:15",
      local: "Chacara do Danilo"
    },
    {
        id: "21",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/mec.png",
      away: "MEC",
      score: "2 x 2",
      type: "Amistoso",
      data: "2026-03-29",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "22",
      homeLogo: "/times/the_best.png",
      home: "The Best",
      awayLogo: "/times/aguias_de_Deus.png",
      away: "Águias de Deus",
      score: "4 x 2",
      type: "Amistoso",
      data: "2026-03-29",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "23",
      homeLogo: "/times/magos.png",
      home: "Magos",
      awayLogo: "/times/sporting-guaicarafc.png",
      away: "Sporting Guaicara",
      score: "3 x 3",
      type: "Amistoso",
      data: "2026-03-28",
      hora: "16:00",
      local: "Arena ADC"
    },
    {
        id: "24",
      homeLogo: "/times/unidosanchieta.png",
      home: "Unidos Anchieta",
      awayLogo: "/times/juventudefc.png",
      away: "Juventude FC",
      score: "4 x 5",
      type: "Amistoso",
      data: "2026-03-28",
      hora: "09:30",
      local: "Campo Santa Rita"
    },
    {
        id: "25",
      homeLogo: "/times/amigos_da_bola.png",
      home: "Amigos da bola",
      awayLogo: "/times/bahea.png",
      away: "Bahea",
      score: "10 x 3",
      type: "Amistoso",
      data: "2026-03-22",
      hora: "08:30",
      local: "Avanhandava"
    },
    {
        id: "26",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/meninos_da_vila.png",
      away: "Meninos da Vila",
      score: "3 x 5",
      type: "Amistoso",
      data: "2026-03-22",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "27",
      homeLogo: "/times/bengala.png",
      home: "Bengala",
      awayLogo: "/times/the_best.png",
      away: "the best",
      score: "3 x 5",
      type: "Amistoso",
      data: "2026-03-15",
      hora: "08:30",
      local: "Promissão"
    },
    {
        id: "28",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/bulldogs.png",
      away: "Bulldogs",
      score: "9 x 3",
      type: "Amistoso",
      data: "2026-03-15",
      hora: "08:30",
      local: "Arena ADC"
    },
    {
        id: "29",
      homeLogo: "/times/renukaadc.png",
      home: "Renuka ADC",
      awayLogo: "/times/the_best.png",
      away: "The best",
      score: "5 x 2",
      type: "Amistoso",
      data: "2026-03-08",
      hora: "08:30",
      local: "Arena ADC"
    }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tipo = searchParams.get("tipo") // futuros | passados

  const agora = new Date()

  const parseDate = (j: any) =>
    new Date(`${j.data}T${j.hora || "00:00"}`)

  let resultado = jogos // ← isso aqui é obrigatório

  if (tipo === "futuros") {
    resultado = jogos.filter(j => parseDate(j) > agora)
  }

  if (tipo === "passados") {
    resultado = jogos.filter(j => parseDate(j) <= agora)
  }

  return NextResponse.json(resultado)
}