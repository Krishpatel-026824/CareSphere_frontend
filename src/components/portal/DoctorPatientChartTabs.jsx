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
    <div className="rounded-2xl border border-[#E6EBF1] bg-white p-1 shadow-sm">
      <div className="grid grid-cols-5 gap-1">
        {TABS.map((tab) => {
          const active = value === tab.id
          const Icon = tab.Icon
          const count = counts[tab.id]

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange?.(tab.id)}
              className={`w-full min-h-[52px] sm:min-h-[56px] inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl px-2 sm:px-3 py-2 text-[12px] sm:text-[14px] font-semibold cursor-pointer transition-all ${
                active
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-navy hover:bg-[#F0FDFA]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                <span className="truncate sm:hidden">{tab.short}</span>
                <span className="truncate hidden sm:inline">{tab.label}</span>
              </span>
              {count != null ? (
                <span
                  className={`min-w-[22px] h-5 px-1.5 rounded-full text-[11px] font-bold inline-flex items-center justify-center tabular-nums shrink-0 ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F1F5F9] text-body-gray'
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
