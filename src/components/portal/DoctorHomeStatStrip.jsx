export default function DoctorHomeStatStrip({ stats = [], onSelect, activeId }) {
  const tones = {
    waiting: 'text-[#D97706] bg-[#FFF6EB]',
    upcoming: 'text-teal bg-[#E8F7F6]',
    done: 'text-[#16A34A] bg-[#F0FDF4]',
  }

  return (
    <div className="shrink-0 flex flex-wrap items-center gap-2">
      {stats.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            className={`inline-flex items-center gap-2 rounded-full pl-3 pr-1.5 py-1.5 cursor-pointer transition-all ${
              tones[item.id] || tones.upcoming
            } ${active ? 'ring-2 ring-teal/30' : 'hover:brightness-[0.98]'}`}
          >
            <span className="text-xs font-semibold">{item.label}</span>
            <span className="min-w-7 h-7 rounded-full bg-white/90 text-sm font-bold text-navy flex items-center justify-center tabular-nums">
              {item.value}
            </span>
          </button>
        )
      })}
    </div>
  )
}
