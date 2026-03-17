export default function Cards() {
  return (
    <section className="grid grid-cols-3 gap-6">

      <div className="bg-yellow-400 p-6 rounded-xl">
        <h3 className="font-semibold">
          Último Campeão
        </h3>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold">
          Destaque da rodada
        </h3>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold">
          Artilheiro
        </h3>
      </div>

    </section>
  )
}
