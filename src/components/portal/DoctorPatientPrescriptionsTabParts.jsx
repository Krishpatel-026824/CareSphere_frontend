import { Pill } from 'lucide-react'

const MODES = [
  { id: 'add', label: 'Add medicines' },
  { id: 'routine', label: 'Patient routine' },
]

export function RxModeTabs({ value, counts, onChange }) {
  return (
    <div className="shrink-0 mx-3 mt-3 flex gap-1.5 p-1 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1]">
      {MODES.map((mode) => {
        const active = value === mode.id
        const count = counts[mode.id]
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onChange(mode.id)}
            className={`flex-1 min-h-9 rounded-lg text-[12px] sm:text-[13px] font-semibold cursor-pointer transition-colors inline-flex items-center justify-center gap-1.5 ${
              active ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-white'
            }`}
          >
            <span className="truncate">{mode.label}</span>
            {count != null ? (
              <span
                className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold inline-flex items-center justify-center tabular-nums ${
                  active ? 'bg-white/20 text-white' : 'bg-white text-body-gray border border-[#E3EAF2]'
                }`}
              >
                {count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function RxMedicineCell({ item }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
        ) : (
          <Pill className="w-4 h-4 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-navy truncate leading-snug">{item.name}</p>
        {item.useFor || item.subtitle || item.pack ? (
          <p className="text-[12px] text-body-gray truncate mt-0.5">
            {item.useFor || item.subtitle || item.pack}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function matchesRxQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.name, item.useFor, item.subtitle, item.dose, item.frequency, item.pack]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}
