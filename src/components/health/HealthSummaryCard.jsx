const surfaces = {
  total: 'bg-gradient-to-br from-emerald-100 via-emerald-50 to-white border-emerald-300 shadow-emerald-100/50',
  month: 'bg-gradient-to-br from-violet-100 via-violet-50 to-white border-violet-300 shadow-violet-100/50',
  ready: 'bg-gradient-to-br from-sky-100 via-sky-50 to-white border-sky-300 shadow-sky-100/50',
}

const accentBar = {
  total: 'bg-emerald-500',
  month: 'bg-violet-500',
  ready: 'bg-sky-500',
}

export default function HealthSummaryCard({ item }) {
  const trend = item.trend || { label: '− No change', up: false }
  const surface = surfaces[item.id] || surfaces.total
  const bar = accentBar[item.id] || accentBar.total

  return (
    <article className={`rounded-2xl border px-5 py-4 shadow-lg flex items-center gap-4 relative overflow-hidden ${surface}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${bar}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-bold text-navy truncate">{item.label}</p>
          <p className="text-xs font-medium text-body-gray shrink-0">{item.hint}</p>
        </div>
        <span className={`mt-3 w-full inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-bold ${item.pillTone}`}>
          {trend.label}
        </span>
      </div>
      <p className={`text-[44px] font-extrabold leading-none tracking-tight tabular-nums shrink-0 ${item.valueTone}`}>
        {item.value}
      </p>
    </article>
  )
}
