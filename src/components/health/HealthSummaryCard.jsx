export default function HealthSummaryCard({ item }) {
  const trend = item.trend || { label: '− No change', up: false }

  return (
    <article className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(7,26,47,0.05)] flex items-center gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-navy truncate">{item.label}</p>
          <p className="text-xs text-body-gray shrink-0">{item.hint}</p>
        </div>
        <span className={`mt-3 w-full inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold ${item.pillTone}`}>
          {trend.label}
        </span>
      </div>
      <p className={`text-[44px] font-bold leading-none tracking-tight tabular-nums shrink-0 ${item.valueTone}`}>
        {item.value}
      </p>
    </article>
  )
}
