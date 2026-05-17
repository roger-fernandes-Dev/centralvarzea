export default function JogosAdminPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Jogos
        </h1>

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Novo jogo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-100">
            <tr>
              <th className="text-left p-4">Mandante</th>
              <th className="text-left p-4">Visitante</th>
              <th className="text-left p-4">Data</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Time A</td>
              <td className="p-4">Time B</td>
              <td className="p-4">10/05/2026</td>
              <td className="p-4">Agendado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}