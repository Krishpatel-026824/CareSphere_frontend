export default function DoctorHomeStatStrip({ stats = [], onSelect, activeId }) {
  const tones = {
    waiting: 'text-[#D97706] bg-[#FFF6EB] border-[#FDE68A]',
    upcoming: 'text-teal bg-[#E8F7F6] border-teal/20',
    done: 'text-body-gray bg-[#F4F7FA] border-[#E6EBF1]',
  }

  return (
    <div className="shrink-0 flex items-center gap-2 flex-wrap">
      {stats.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            className={`inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-1 py-1 border cursor-pointer transition-all whitespace-nowrap ${
              tones[item.id] || tones.upcoming
            } ${active ? 'ring-2 ring-teal/25' : 'hover:brightness-[0.98]'}`}
          >
            <span className="text-[12px] font-semibold">{item.label}</span>
            <span className="min-w-6 h-6 px-1.5 rounded-full bg-white/95 text-[12px] font-bold text-navy flex items-center justify-center tabular-nums">
              {item.value}
            </span>
          </button>
        )
      })}
    </div>
  )
}
