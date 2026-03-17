export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow">

      <div className="font-bold text-lg">
        KLEO
      </div>

      <nav className="flex gap-6 text-sm">
        <a>Calendário</a>
        <a>Resultados</a>
        <a>Atletas</a>
        <a>Classificação</a>
      </nav>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-gray-200">
          Entrar
        </button>

        <button className="px-4 py-2 rounded-lg bg-yellow-400">
          Registrar
        </button>
      </div>

    </header>
  )
}