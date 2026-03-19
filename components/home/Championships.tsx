export default function Championships() {
  return (
    <section className="bg-black rounded-xl shadow p-3">

      <h2 className="font-bold text-lg mb-6 text-white">
        Campeonatos
      </h2>

      <div className="flex flex-col divide-y divide-gray-800">

        <div className="py-3 cursor-pointer hover:bg-gray-900 px-2 rounded text-white">
          Liga A
        </div>

        <div className="py-3 cursor-pointer hover:bg-gray-900 px-2 rounded text-white">
          Liga B
        </div>

        <div className="py-3 cursor-pointer hover:bg-gray-900 px-2 rounded text-white">
          Liga C
        </div>

        <div className="py-3 cursor-pointer hover:bg-gray-900 px-2 rounded text-white">
          Liga D
        </div>

        <div className="py-3 cursor-pointer hover:bg-gray-900 px-2 rounded text-white">
          Liga E
        </div>

      </div>

    </section>
  )
}