import {
  ClipboardList,
  FileText,
  FlaskConical,
  History,
  Pill,
} from 'lucide-react'

const TABS = [
  { id: 'prescription', label: 'Prescription', short: 'Rx', Icon: FileText },
  { id: 'appointments', label: 'Appoint list', short: 'Appoint', Icon: ClipboardList },
  { id: 'labs', label: 'Lab reports', short: 'Labs', Icon: FlaskConical },
  { id: 'medicine', label: 'Medicine', short: 'Meds', Icon: Pill },
  { id: 'audit', label: 'Audit', short: 'Audit', Icon: History },
]

export default function DoctorPatientChartTabs({ value, counts = {}, onChange }) {
  return (
    <div className="rounded-2xl border border-[#E6EBF1] bg-[#DDE4EC] p-1.5 shadow-sm">
      <div className="grid grid-cols-5 gap-1.5">
        {TABS.map((tab) => {
          const active = value === tab.id
          const Icon = tab.Icon
          const count = counts[tab.id]

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange?.(tab.id)}
              className={`w-full min-h-11 sm:min-h-12 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-lg px-1.5 sm:px-2 py-2 text-[11px] sm:text-[13px] font-semibold cursor-pointer transition-all ${
                active
                  ? 'bg-teal-dark text-white shadow-md shadow-teal-dark/25'
                  : 'text-navy/75 hover:text-navy hover:bg-white/60'
              }`}
            >
              <span className="inline-flex items-center gap-1 sm:gap-1.5 min-w-0">
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${active ? 'text-white' : 'text-body-gray'}`}
                  strokeWidth={2.2}
                />
                <span className="truncate sm:hidden">{tab.short}</span>
                <span className="truncate hidden sm:inline">{tab.label}</span>
              </span>
              {count != null ? (
                <span
                  className={`min-w-[20px] h-5 px-1 rounded-full text-[10px] sm:text-[11px] font-bold inline-flex items-center justify-center tabular-nums shrink-0 ${
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
