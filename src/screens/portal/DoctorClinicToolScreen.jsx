import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorClinicTaskCard from '../../components/portal/DoctorClinicTaskCard'

export default function DoctorClinicToolScreen({ title, subtitle, tasks = [], onBack, onSelectTask }) {
  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1100px] mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <QuickActionHeader title={title} subtitle={subtitle} onBack={onBack} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tasks.map((task) => (
            <DoctorClinicTaskCard key={task.id} task={task} onSelect={onSelectTask} />
          ))}
        </div>
      </div>
    </div>
  )
}
