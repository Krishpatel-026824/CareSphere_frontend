import { ChevronRight } from 'lucide-react'

export default function DoctorClinicTaskCard({ task, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(task)}
      className="w-full text-left rounded-2xl border border-border-gray bg-white p-3.5 flex items-center gap-3 cursor-pointer hover:border-teal/30 hover:shadow-sm"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-teal-light">
        {task.avatar ? (
          <img src={task.avatar} alt="" className="w-full h-full object-cover object-top" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-navy truncate">{task.patientName}</h2>
          {task.badge ? (
            <span className="text-[9px] font-semibold px-1.5 py-px rounded-full shrink-0 bg-teal-light text-teal-dark">
              {task.badge}
            </span>
          ) : null}
        </div>
        <p className="text-[13px] font-semibold text-navy truncate mt-0.5">{task.title}</p>
        <p className="text-[12px] text-body-gray truncate">{task.subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-body-gray shrink-0" />
    </button>
  )
}
