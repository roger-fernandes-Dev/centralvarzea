export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-1">
          Painel administrativo da Central Várzea
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-zinc-500 text-sm">
            Notícias
          </h2>

          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-zinc-500 text-sm">
            Jogos
          </h2>

          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-zinc-500 text-sm">
            Visualizações
          </h2>

          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold mb-4">
          Atividades recentes
        </h2>

        <p className="text-zinc-500">
          Nenhuma atividade ainda.
        </p>
      </div>
    </div>
  )
}