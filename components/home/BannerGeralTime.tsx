import Image from "next/image"

export default function BannerGeralTime() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4">

      {/* 🟩 fundo suave */}
      <Image
        src="/fundo_clubs.png"
        alt="fundo"
        fill
        className="object-cover opacity-30 -z-10"
      />

      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* 📦 card central */}
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

        {/* 🏆 título */}
        <h1 className="text-2xl font-bold mb-2">
          Página em construção
        </h1>

        <p className="text-gray-600 mb-6">
          Este clube ainda está sendo configurado.
        </p>

        {/* ⚽ ícone / imagem */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <Image
              src="/central_varzea.png" // pode trocar depois
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 📞 contato */}
        <p className="text-gray-700 font-medium">
          Entre em contato com o administrador
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Em breve mais informações sobre o time.
        </p>

      </div>

    </main>
  )
}