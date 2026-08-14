import { ClipboardList, FolderOpen, LayoutDashboard, Settings2, Stethoscope } from 'lucide-react'
import { appointmentNavTabs } from '../../data/mocks/appointmentNav'

const iconMap = {
  overview: LayoutDashboard,
  doctor: Stethoscope,
  notes: ClipboardList,
  records: FolderOpen,
  settings: Settings2,
}

export default function AppointmentDetailNav({ activeTab = 'overview', onChange }) {
  return (
    <nav className="w-full md:w-[88px] shrink-0 rounded-2xl bg-white border border-border-gray px-2 py-2 md:py-3 flex flex-row md:flex-col items-center justify-start gap-1.5 overflow-x-auto md:overflow-visible md:h-full">
      {appointmentNavTabs.map((tab) => {
        const Icon = iconMap[tab.id]
        const active = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`w-[72px] h-[64px] md:w-full shrink-0 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              active ? 'bg-teal-light text-teal' : 'text-[#6B7280] hover:bg-[#F7F8FA] hover:text-navy'
            }`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            <span className="text-[10px] font-semibold leading-none tracking-wide">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
