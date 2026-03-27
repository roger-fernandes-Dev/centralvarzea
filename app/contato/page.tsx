"use client"

import Image from "next/image"

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <Image
            src="/central_varzea.png" // troca pela sua logo
            alt="Logo central varzea"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Fale com a gente
      </h1>

      <p className="text-gray-500 mb-8">
        Estamos sempre abertos a novas conexões
      </p>

      {/* Card de contato */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">

        {/* Instagram */}
        <div>
          <p className="text-sm text-gray-500">Instagram</p>
          <a
            href="https://instagram.com/centralvarzea.of/"
            target="_blank"
            className="text-lg font-semibold text-black hover:underline"
          >
            @centralvarzea.of
          </a>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-semibold text-black">
            centralvarzea2025@gmail.com
          </p>
        </div>

      </div>

      {/* Frase final */}
      <div className="mt-10">
        <p className="text-gray-600 leading-relaxed">
          Nosso compromisso é fortalecer o futebol de várzea e criar conexões reais
          dentro e fora de campo. Times, empresas e parceiros são sempre bem-vindos
          para fazer parte desse projeto e crescer junto com a gente.
        </p>
      </div>

    </div>
  )
}