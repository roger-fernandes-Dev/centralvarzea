type Props = {
  name: string
  logo: string
}

export default function TimeCard({ name, logo }: Props) {
  return (
    <div className="bg-white rounded-lg p-3 shadow hover:scale-105 transition">
      <img
        src={logo}
        alt={name}
        className="w-full h-24 object-contain"
      />
      <h3 className="mt-2 font-semibold text-black">
        {name}
      </h3>
    </div>
  )
}