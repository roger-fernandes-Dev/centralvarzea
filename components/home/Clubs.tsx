export default function Clubs() {
  return (
    <section className="bg-white p-6 rounded-xl shadow">

      {/* título */}
      

      {/* grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 bg-yellow-400 rounded-full 
                       shadow-sm hover:scale-105 transition"
          />
        ))}

      </div>

    </section>
  )
}