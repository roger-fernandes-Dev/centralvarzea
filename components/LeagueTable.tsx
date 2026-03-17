export default function LeagueTable() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">

      <h2 className="font-semibold mb-4">
        Classificação
      </h2>

      <table className="w-full text-sm">

        <thead className="text-left border-b">
          <tr>
            <th>Time</th>
            <th>Pts</th>
            <th>Jogos</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-b">
            <td>Real Promissão</td>
            <td>10</td>
            <td>4</td>
          </tr>

          <tr>
            <td>União FC</td>
            <td>8</td>
            <td>4</td>
          </tr>

        </tbody>

      </table>

    </div>
  )
}