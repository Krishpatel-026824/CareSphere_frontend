import { FlaskConical } from 'lucide-react'

const MODES = [
  { id: 'previous', label: 'Previous reports' },
  { id: 'order', label: 'Order tests' },
  { id: 'selected', label: 'Selected list' },
]

export const ORDER_COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '8%' },
  { key: 'test', label: 'Lab test', center: false, width: '48%' },
  { key: 'turnaround', label: 'Ready in', center: true, width: '22%' },
  { key: 'action', label: '', center: true, width: '22%' },
]

export function matchesLabQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.title, item.subtitle, item.turnaround, item.status]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export function LabModeTabs({ value, counts, onChange }) {
  return (
    <div className="shrink-0 px-4 sm:px-5 pt-3 pb-1">
      <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl bg-[#DDE4EC]">
        {MODES.map((mode) => {
          const active = value === mode.id
          const count = counts[mode.id]
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`min-h-10 rounded-lg text-[12px] sm:text-[13px] font-semibold cursor-pointer transition-all inline-flex items-center justify-center gap-1.5 px-2 ${
                active
                  ? 'bg-teal-dark text-white shadow-md shadow-teal-dark/20'
                  : 'text-navy/75 hover:text-navy hover:bg-white/60'
              }`}
            >
              <span className="truncate">{mode.label}</span>
              {count != null ? (
                <span
                  className={`min-w-[20px] h-5 px-1 rounded-full text-[11px] font-bold inline-flex items-center justify-center tabular-nums ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-body-gray border border-[#D0D9E3]'
                  }`}
                >
                  {count}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function LabTestCell({ item, statusBadge = null }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <FlaskConical className="w-4 h-4 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <p className="font-semibold text-navy truncate leading-snug">{item.title}</p>
          {statusBadge}
        </div>
        {item.subtitle ? (
          <p className="text-[12px] text-body-gray truncate mt-0.5">{item.subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}
