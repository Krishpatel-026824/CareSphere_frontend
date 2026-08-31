import { FlaskConical } from 'lucide-react'

export const labCollectionOptions = ['Home Collection', 'Visit Lab']
export const labPriorityOptions = ['Routine', 'Urgent']

export function generateLabOrderDefaults() {
  return {
    collectionType: labCollectionOptions[0],
    priority: labPriorityOptions[0],
  }
}

const MODES = [
  { id: 'previous', label: 'Previous reports' },
  { id: 'order', label: 'Order tests' },
  { id: 'selected', label: 'Selected list' },
]

export const ORDER_COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'test', label: 'Lab test', center: false, width: '30%' },
  { key: 'turnaround', label: 'Ready in', center: true, width: '12%' },
  { key: 'collection', label: 'Collection', center: true, width: '16%' },
  { key: 'priority', label: 'Priority', center: true, width: '12%' },
  { key: 'action', label: 'Action', center: true, width: '14%' },
]

export const SELECTED_LAB_COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'test', label: 'Lab test', center: false, width: '28%' },
  { key: 'ordered', label: 'Ordered on', center: true, width: '14%' },
  { key: 'collection', label: 'Collection', center: true, width: '16%' },
  { key: 'priority', label: 'Priority', center: true, width: '12%' },
  { key: 'status', label: 'Status', center: true, width: '12%' },
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

export function LabOrderRowSelect({
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
      className="w-full min-w-[100px] max-w-[150px] rounded-lg border border-[#E6EBF1] bg-white px-2 py-1.5 text-[13px] font-semibold text-navy outline-none cursor-pointer focus:border-teal focus:ring-1 focus:ring-teal/30"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function LabTestCell({ item, statusBadge = null }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E6EBF1] bg-white flex items-center justify-center shadow-sm">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <FlaskConical className="w-5 h-5 text-teal" strokeWidth={1.85} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <p className="text-[15px] sm:text-[16px] font-bold text-navy leading-snug">{item.title}</p>
          {statusBadge}
        </div>
        {item.subtitle ? (
          <p className="text-[12px] sm:text-[13px] text-body-gray mt-0.5 leading-snug line-clamp-2">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  )
}
