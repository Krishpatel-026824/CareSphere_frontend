import { bottomNavTabs } from '../data/mocks/sidebarNav'

export default function BottomNav({ activeTab, onChange, messagesBadge = 0, tabs }) {
  const items = tabs || bottomNavTabs
  return (
    <nav className="w-full border-t border-border-gray bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(11,31,58,0.04)]">
      <ul
        className="h-[4.25rem] sm:h-16 grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const showBadge = tab.id === 'messages' && messagesBadge > 0

          return (
            <li key={tab.id} className="min-w-0">
              <button
                type="button"
                className="h-[4.25rem] sm:h-16 w-full flex flex-col items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-all duration-200 active:scale-95 px-0.5"
                onClick={() => onChange(tab.id)}
              >
                <span
                  className={[
                    'relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-200',
                    isActive ? 'bg-teal text-white shadow-sm shadow-teal/30' : 'text-body-gray',
                  ].join(' ')}
                >
                  <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" strokeWidth={1.75} />
                  {showBadge ? (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-orange-500 text-white text-[9px] font-bold leading-none flex items-center justify-center">
                      {messagesBadge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={[
                    'text-[9px] sm:text-[10px] font-medium leading-none truncate max-w-full px-0.5',
                    isActive ? 'text-teal font-semibold' : 'text-body-gray',
                  ].join(' ')}
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
