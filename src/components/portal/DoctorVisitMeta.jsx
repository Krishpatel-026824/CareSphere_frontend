export default function DoctorVisitMeta({ items = [] }) {
  if (!items.length) return null

  return (
    <div className="shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="min-w-0 flex items-start gap-2.5 px-1 py-1">
            <span className="w-9 h-9 rounded-2xl bg-[#E8F7F6] text-teal flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" strokeWidth={1.85} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-body-gray">{item.label}</p>
              <p className="text-sm font-bold text-navy leading-snug break-words">{item.value}</p>
              {item.hint ? <p className="text-[11px] text-body-gray mt-0.5 truncate">{item.hint}</p> : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
