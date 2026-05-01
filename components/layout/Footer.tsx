export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 mt-16 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LOGO / SOBRE */}
          <div className="space-y-3">
            <h2 className="text-white text-lg font-semibold">
              Central Várzea
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed">
              A casa do futebol amador. Notícias, jogos e campeonatos da várzea em um só lugar.
            </p>
          </div>

          {/* LINKS */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase">
              Navegação
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Início
                </a>
              </li>
              <li>
                <a href="/times" className="hover:text-white transition">
                  Times
                </a>
              </li>
              <li>
                <a href="/noticias" className="hover:text-white transition">
                  Notícias
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL + LEGAL */}
          <div className="space-y-4">
            <div>
              <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-2">
                Redes
              </h3>

              <a
                href="https://www.instagram.com/centralvarzea.of"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm9.5 1.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>

                @centralvarzea.of
              </a>
            </div>

            {/* LEGAL */}
            <div className="text-sm space-y-1">
              <a href="/termos" className="block hover:text-white transition">
                Termos de Uso
              </a>
              <a href="/privacidade" className="block hover:text-white transition">
                Política de Privacidade
              </a>
            </div>
          </div>

        </div>

        {/* DIVISOR */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © 2026 Central Várzea. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  )
}