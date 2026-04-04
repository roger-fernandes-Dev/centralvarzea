"use client"

import Image from "next/image"
import { FaInstagram, FaEnvelope } from "react-icons/fa"

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="relative w-28 h-28">
          <Image
            src="/central_varzea.png" // troque pela sua logo
            alt="Logo Central Várzea"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-3">
        Fale com a gente
      </h1>

      <p className="text-gray-500 text-center mb-10">
        Estamos sempre abertos a novas conexões
      </p>

      {/* Cards de contato */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Instagram */}
        <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <div className="text-yellow-600 text-3xl">
            <FaInstagram />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Instagram</p>
            <a
              href="https://instagram.com/centralvarzea.of/"
              target="_blank"
              className="text-black font-semibold text-lg hover:text-yellow-600 transition"
            >
              @centralvarzea.of
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <div className="text-yellow-600 text-3xl">
            <FaEnvelope />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Email</p>
            <p className="text-black font-semibold text-lg">
              centralvarzea2025@gmail.com
            </p>
          </div>
        </div>

      </div>

      {/* Frase final */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
          Nosso compromisso é fortalecer o futebol de várzea e criar conexões reais dentro e fora de campo. Times, empresas e parceiros são sempre bem-vindos para fazer parte desse projeto e crescer junto com a gente.
        </p>
      </div>

    </div>
  )
}