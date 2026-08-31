import { Pill } from 'lucide-react'

export const ADD_RX_COLUMNS = [
  { key: 'medicine', label: 'Medicine', center: false, width: '46%' },
  { key: 'details', label: 'Take for', center: false, width: '38%' },
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
          <p className="text-[15px] font-bold text-navy truncate leading-snug">{item.name}</p>
          {statusBadge}
        </div>
        {subtitle ? (
          <p className="text-[12px] text-body-gray truncate mt-0.5">{subtitle}</p>
        ) : null}
      </div>
    </div>
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

export function RxAddScheduleBar({
  dose,
  frequency,
  duration,
  doseOptions,
  frequencyOptions,
  durationOptions,
  onDoseChange,
  onFrequencyChange,
  onDurationChange,
}) {
  const fields = [
    { id: 'dose', label: 'Dose', value: dose, options: doseOptions, onChange: onDoseChange },
    {
      id: 'frequency',
      label: 'Often',
      value: frequency,
      options: frequencyOptions,
      onChange: onFrequencyChange,
    },
    {
      id: 'duration',
      label: 'Duration',
      value: duration,
      options: durationOptions,
      onChange: onDurationChange,
    },
  ]

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {fields.map((field) => (
        <label
          key={field.id}
          className="inline-flex items-center gap-2 rounded-lg border border-[#E6EBF1] bg-white px-3 py-1.5"
        >
          <span className="text-[11px] font-bold uppercase tracking-wide text-body-gray">
            {field.label}
          </span>
          <select
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            className="bg-transparent text-[14px] font-semibold text-navy outline-none cursor-pointer max-w-[130px]"
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ))}
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
