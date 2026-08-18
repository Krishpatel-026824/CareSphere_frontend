import DoctorStatCard from './DoctorStatCard'

export default function DoctorStatRow({ stats, onSelect, activeId }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map((item) => (
        <DoctorStatCard key={item.id} item={item} onSelect={onSelect} active={item.id === activeId} />
      ))}
    </section>
  )
}
