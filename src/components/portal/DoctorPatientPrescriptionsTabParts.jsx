import { Pill } from 'lucide-react'

export function RxMedicineCell({ item }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-white shadow-sm flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
        ) : (
          <Pill className="w-4 h-4 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-navy truncate leading-snug">{item.name}</p>
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
