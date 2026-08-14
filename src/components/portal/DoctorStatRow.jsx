import DoctorStatCard from './DoctorStatCard'

export default function DoctorStatRow({ stats, onSelect }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((item) => (
        <DoctorStatCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </section>
  )
}
