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
  { id: 'audit', label: 'Audit', short: 'Audit', Icon: History },
]

export default function DoctorPatientChartTabs({ value, onChange }) {
  return (
    <nav
      aria-label="Patient chart sections"
      className="rounded-2xl border border-border-gray bg-white p-1.5 shadow-sm"
    >
      <div className="flex gap-1.5 overflow-x-auto scroll-x snap-x snap-mandatory sm:grid sm:grid-cols-5 sm:overflow-visible">
        {TABS.map((tab) => {
          const active = value === tab.id
          const Icon = tab.Icon

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
            </button>
          )
        })}
      </div>
    </nav>
  )
}
