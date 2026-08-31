import { Pill } from 'lucide-react'

export const ROUTINE_RX_COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'medicine', label: 'Medicine', center: false, width: '34%' },
  { key: 'dose', label: 'Dose', center: true, width: '12%' },
  { key: 'schedule', label: 'Schedule', center: true, width: '18%' },
  { key: 'duration', label: 'Duration', center: true, width: '14%' },
  { key: 'type', label: 'Type', center: true, width: '14%' },
]

export const ADD_RX_COLUMNS = [
  { key: 'medicine', label: 'Medicine', center: false, width: '26%' },
  { key: 'details', label: 'Take for', center: false, width: '16%' },
  { key: 'dose', label: 'Dose', center: true, width: '14%' },
  { key: 'frequency', label: 'Often', center: true, width: '14%' },
  { key: 'duration', label: 'Duration', center: true, width: '14%' },
  { key: 'action', label: 'Action', center: true, width: '16%' },
]

export function RxMedicineCell({ item, statusBadge = null, compact = false }) {
  const subtitle = compact
    ? item.pack || item.subtitle || null
    : item.useFor || item.subtitle || item.pack || null

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-white shadow-sm flex items-center justify-center ring-1 ring-black/[0.03]">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
        ) : (
          <Pill className="w-4 h-4 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <p className="text-[15px] sm:text-[16px] font-bold text-navy truncate leading-snug">
            {item.name}
          </p>
          {statusBadge}
        </div>
        {subtitle ? (
          <p className="text-[12px] sm:text-[13px] text-body-gray truncate mt-0.5">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}

export function RxRoutineBadge({ badge = 'Previous' }) {
  const isRoutine = String(badge).toLowerCase() === 'routine'

  return (
    <span
      className={`inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${
        isRoutine
          ? 'bg-teal text-white border-teal shadow-sm'
          : 'bg-[#E8F7F6] text-teal-dark border-teal/15'
      }`}
    >
      {badge}
    </span>
  )
}

export function RxAddMedicineCell({ item, statusBadge = null }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-white flex items-center justify-center shadow-sm">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
        ) : (
          <Pill className="w-5 h-5 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <p className="text-[16px] sm:text-[17px] font-bold text-navy leading-snug">{item.name}</p>
          {statusBadge}
        </div>
        {item.pack ? (
          <p className="text-[13px] text-body-gray mt-0.5 leading-snug">{item.pack}</p>
        ) : null}
      </div>
    </div>
  )
}

export function RxAddRowDetailsCell({ useFor, active = false }) {
  const label = useFor || 'As advised'

  return (
    <span
      className={`inline-flex max-w-full text-[14px] font-semibold text-teal-dark bg-[#E8F7F6] border border-teal/20 px-3 py-1.5 rounded-full leading-snug ${
        active ? 'ring-2 ring-teal/25 bg-white' : ''
      }`}
    >
      {label}
    </span>
  )
}

export function RxAddRowScheduleSelect({
  value,
  options,
  onChange,
  disabled = false,
  lockedValue,
}) {
  if (disabled) {
    return (
      <span className="text-[13px] font-semibold text-navy whitespace-nowrap">{lockedValue || value}</span>
    )
  }

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full min-w-[92px] max-w-[140px] rounded-lg border border-[#E6EBF1] bg-white px-2 py-1.5 text-[13px] font-semibold text-navy outline-none cursor-pointer focus:border-teal focus:ring-1 focus:ring-teal/30"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function matchesRxQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.name, item.useFor, item.subtitle, item.dose, item.frequency, item.pack]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}
