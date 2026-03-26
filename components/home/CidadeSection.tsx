import TimeCard from "./TimeCard"

type Time = {
  name: string
  logo: string
}

type Props = {
  cidade: string
  times: Time[]
}

export default function CidadeSection({ cidade, times }: Props) {
  return (
    <section>
      <h2 className="text-white text-lg font-bold mb-4">
        {cidade}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {times.map((time, i) => (
          <TimeCard key={i} {...time} />
        ))}
      </div>
    </section>
  )
}