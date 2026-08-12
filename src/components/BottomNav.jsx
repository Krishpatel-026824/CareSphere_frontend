import {
  CalendarClock,
  CircleUserRound,
  LayoutDashboard,
  MessageSquareText,
  Stethoscope,
} from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appts', icon: CalendarClock },
  { id: 'health', label: 'Health', icon: Stethoscope },
  { id: 'messages', label: 'Messages', icon: MessageSquareText },
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
]

export default function BottomNav({ activeTab, onChange, messagesBadge = 0 }) {
  return (
    <nav className="min-h-[64px] sm:min-h-[72px] border-t border-border-gray bg-white/95 backdrop-blur-md px-0.5 sm:px-1 shrink-0 shadow-[0_-4px_20px_rgba(11,31,58,0.04)]">
      <ul className="h-full min-h-[64px] sm:min-h-[72px] grid grid-cols-5 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const showBadge = tab.id === 'messages' && messagesBadge > 0
          return (
            <li key={tab.id} className="h-full">
              <button
                type="button"
                className="h-full w-full flex flex-col items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-all duration-200 active:scale-95 py-1"
                onClick={() => onChange(tab.id)}
              >
                <span
                  className={`relative flex items-center justify-center w-9 h-7 sm:w-10 sm:h-8 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-teal text-white shadow-sm shadow-teal/30' : 'text-body-gray'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={1.75} />
                  {showBadge ? (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-orange-500 text-white text-[9px] font-bold leading-none flex items-center justify-center">
                      {messagesBadge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-medium transition-colors leading-tight truncate max-w-full px-0.5 ${
                    isActive ? 'text-teal font-semibold' : 'text-body-gray'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
