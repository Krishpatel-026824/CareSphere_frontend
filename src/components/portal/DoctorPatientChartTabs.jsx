import {
  CalendarDays,
  FileText,
  FlaskConical,
  History,
  Pill,
} from 'lucide-react'

const TABS = [
  { id: 'prescription', label: 'Prescriptions', short: 'Rx', Icon: FileText },
  { id: 'appointments', label: 'Appointments', short: 'Visits', Icon: CalendarDays },
  { id: 'labs', label: 'Lab reports', short: 'Labs', Icon: FlaskConical },
  { id: 'medicine', label: 'Medicine', short: 'Meds', Icon: Pill },
  { id: 'audit', label: 'Activity', short: 'Log', Icon: History },
]

function formatCount(count) {
  if (count == null || count <= 0) return null
  if (count > 99) return '99+'
  return String(count)
}

export default function DoctorPatientChartTabs({ value, counts = {}, onChange }) {
  return (
    <nav
      aria-label="Patient chart sections"
      className="rounded-2xl border border-border-gray bg-white p-1.5 shadow-sm"
    >
      <div className="flex gap-1.5 overflow-x-auto scroll-x snap-x snap-mandatory sm:grid sm:grid-cols-5 sm:overflow-visible">
        {TABS.map((tab) => {
          const active = value === tab.id
          const Icon = tab.Icon
          const badge = formatCount(counts[tab.id])

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(tab.id)}
              className={`snap-start shrink-0 sm:shrink sm:w-full min-w-[108px] sm:min-w-0 min-h-10 sm:min-h-11 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-[13px] font-semibold cursor-pointer transition-all ${
                active
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-[#F4F7FA] text-body-gray hover:bg-teal-light/60 hover:text-teal'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-teal'}`}
                strokeWidth={2}
              />
              <span className="truncate sm:hidden">{tab.short}</span>
              <span className="truncate hidden sm:inline">{tab.label}</span>
              {badge ? (
                <span
                  className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold inline-flex items-center justify-center tabular-nums shrink-0 ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-navy border border-border-gray'
                  }`}
                >
                  {badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
