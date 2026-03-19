export default function Header() {
  return (
    <header className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <div className="font-bold text-lg">
          Central Várzea
        </div>

        <nav className="hidden md:flex gap-6 text-sm">

          <a href="/noticias">Notícias</a>
          <a href="/campeonatos">Campeonatos</a>
          <a href="/clubes">Clubes</a>
          <a href="/jogos">Jogos</a>

        </nav>

        <div className="flex gap-2">

          <a
            href="/login"
            className="px-3 py-1 rounded bg-gray-200 text-sm"
          >
            Entrar
          </a>

          <a
            href="/cadastro"
            className="px-3 py-1 rounded bg-yellow-400 text-sm"
          >
            Cadastre-se
          </a>

        </div>

      </div>

    </header>
  )
}