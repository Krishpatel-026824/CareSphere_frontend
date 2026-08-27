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
    <div className="rounded-2xl border border-[#E6EBF1] bg-white p-1.5 shadow-sm">
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
              className={`w-full min-h-11 sm:min-h-12 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-1 sm:px-3 text-[11px] sm:text-[13px] font-semibold cursor-pointer transition-colors border ${
                active
                  ? 'bg-teal text-white border-teal shadow-sm'
                  : 'bg-[#F8FAFC] text-navy border-[#E6EBF1] hover:bg-[#F0FDFA] hover:border-teal/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={2} />
              <span className="truncate sm:hidden">{tab.short}</span>
              <span className="truncate hidden sm:inline">{tab.label}</span>
              {count != null ? (
                <span
                  className={`min-w-[18px] sm:min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold inline-flex items-center justify-center tabular-nums shrink-0 ${
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
    </div>
  )
}
