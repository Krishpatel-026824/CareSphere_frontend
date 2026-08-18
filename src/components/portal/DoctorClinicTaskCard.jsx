import { clinicTaskBadgeStyles } from '../../data/mocks/doctorClinicTools'

export default function DoctorClinicTaskCard({ task, selected, onSelect }) {
  const badgeClass = clinicTaskBadgeStyles[task.badge] || clinicTaskBadgeStyles.New

  return (
    <button
      type="button"
      onClick={() => onSelect?.(task)}
      className={`w-full text-left rounded-2xl border px-3.5 py-3 flex items-center gap-3 cursor-pointer transition-all ${
        selected
          ? 'bg-[#E7F6F5] border-teal shadow-sm'
          : 'bg-white border-[#E6EBF1] hover:border-teal/40'
      }`}
    >
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light">
        {task.avatar ? (
          <img src={task.avatar} alt="" className="w-full h-full object-cover object-top" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-sm font-bold text-navy truncate">{task.patientName}</h2>
          {task.badge ? (
            <span className={`text-[10px] font-semibold px-2 py-px rounded-full shrink-0 ${badgeClass}`}>
              {task.badge}
            </span>
          ) : null}
        </div>
        <p className="text-[13px] font-semibold text-navy truncate mt-0.5">{task.title}</p>
        <p className="text-[12px] text-body-gray truncate">{task.subtitle}</p>
      </div>
    </button>
  )
}
