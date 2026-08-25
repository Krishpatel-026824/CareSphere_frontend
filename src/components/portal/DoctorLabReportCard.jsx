import { clinicTaskBadgeStyles } from '../../data/mocks/doctorClinicTools'

export default function DoctorLabReportCard({ item, selected, onSelect }) {
  const badgeClass = clinicTaskBadgeStyles[item.badge] || clinicTaskBadgeStyles.Review

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={`w-full text-left rounded-2xl border px-3.5 py-3 flex items-center gap-3 cursor-pointer transition-all ${
        selected
          ? 'bg-[#E7F6F5] border-teal shadow-sm'
          : 'bg-white border-[#E6EBF1] hover:border-teal/40'
      }`}
    >
      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light">
        {item.avatar ? (
          <img src={item.avatar} alt="" className="w-full h-full object-cover object-top" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-sm font-bold text-navy truncate">{item.patientName}</h2>
          {item.badge ? (
            <span className={`text-[10px] font-semibold px-2 py-px rounded-full shrink-0 ${badgeClass}`}>
              {item.badge}
            </span>
          ) : null}
        </div>
        <p className="text-[13px] font-semibold text-navy truncate mt-0.5">{item.title}</p>
        <p className="text-[12px] text-body-gray truncate">
          {item.dateLabel} · {item.status}
        </p>
      </div>
    </button>
  )
}
