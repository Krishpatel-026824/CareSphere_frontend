import { Bell, CalendarDays, FlaskConical, Mail, MessageSquareText, Pill, SlidersHorizontal } from 'lucide-react'

const prefIcons = {
  calendar: CalendarDays,
  lab: FlaskConical,
  pill: Pill,
  message: MessageSquareText,
  mail: Mail,
  bell: Bell,
}

export default function ProfilePrefsCard({ prefs = [], onToggle }) {
  return (
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden min-w-0">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
      <div className="p-4 sm:p-5">
        <h2 className="text-base font-bold text-navy flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-teal-light text-teal-dark inline-flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
          Preferences
        </h2>
        <p className="text-xs sm:text-[13px] text-body-gray mt-1.5 leading-snug">
          Manage how you receive updates and alerts. Turn a switch off to hide that type from Notifications.
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {prefs.map((item) => {
            const Icon = prefIcons[item.icon] || Bell
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(item.on)}
                  aria-label={`${item.label}, ${item.on ? 'on' : 'off'}`}
                  onClick={() => onToggle?.(item.id)}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#E6EBF1] bg-[#FAFCFD] px-3 py-3 text-left cursor-pointer transition-colors hover:border-teal/30 hover:bg-white"
                >
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-teal-light text-teal-dark">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy">{item.label}</p>
                    <p className="text-[11px] sm:text-xs text-body-gray mt-0.5 leading-snug">{item.hint}</p>
                  </div>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-bold ${item.on ? 'text-teal' : 'text-slate-400'}`}>
                      {item.on ? 'On' : 'Off'}
                    </span>
                    <span
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        item.on ? 'bg-teal' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm pointer-events-none transition-transform ${
                          item.on ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
