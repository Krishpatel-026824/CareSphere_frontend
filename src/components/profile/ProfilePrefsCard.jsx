import { Bell, CalendarDays, Mail, MessageSquareText, SlidersHorizontal } from 'lucide-react'

const prefStyles = {
  calendar: { icon: 'bg-emerald-50 text-emerald-600', Icon: CalendarDays },
  mail: { icon: 'bg-violet-50 text-violet-600', Icon: Mail },
  message: { icon: 'bg-sky-50 text-sky-600', Icon: MessageSquareText },
  bell: { icon: 'bg-orange-50 text-orange-500', Icon: Bell },
}

export default function ProfilePrefsCard({ prefs = [], onToggle }) {
  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 min-w-0">
      <h2 className="text-base font-bold text-navy flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-teal" strokeWidth={2} />
        Preferences
      </h2>
      <p className="text-xs sm:text-[13px] text-body-gray mt-1">
        Manage how you receive updates and alerts.
      </p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {prefs.map((item) => {
          const style = prefStyles[item.icon] || prefStyles.bell
          const Icon = style.Icon
          return (
            <li key={item.id}>
              <button
                type="button"
                role="switch"
                aria-checked={item.on}
                aria-label={item.label}
                onClick={() => onToggle?.(item.id)}
                className="w-full flex items-center gap-3 rounded-xl border border-border-gray bg-[#F8FAFC] px-3 py-3 text-left cursor-pointer transition-colors hover:border-teal/30 hover:bg-white"
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.icon}`}>
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">{item.label}</p>
                  <p className="text-[11px] sm:text-xs text-body-gray mt-0.5 leading-snug">{item.hint}</p>
                </div>
                <span
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    item.on ? 'bg-teal' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm pointer-events-none transition-transform ${
                      item.on ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
