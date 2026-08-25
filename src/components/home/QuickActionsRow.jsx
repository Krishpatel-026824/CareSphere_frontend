import { CalendarDays, CircleUserRound, FileText, FlaskConical, MessageCircleMore, Pill, Users } from 'lucide-react'

const icons = {
  book: CalendarDays,
  pharmacy: Pill,
  lab: FlaskConical,
  records: FileText,
  schedule: CalendarDays,
  patients: Users,
  messages: MessageCircleMore,
  profile: CircleUserRound,
}

export default function QuickActionsRow({ actions, onActionClick }) {
  return (
    <section className="shrink-0 flex flex-col">
      <h2 className="text-sm sm:text-base font-semibold text-navy mb-4">Quick actions</h2>
      <div className={`grid gap-3 sm:gap-4 ${
        actions.length <= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      }`}>
        {actions.map((action) => {
          const Icon = icons[action.id]
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onActionClick?.(action.key)}
              className="min-h-[88px] sm:min-h-[96px] rounded-2xl border border-border-gray bg-white p-4 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-teal/40"
            >
              <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.tone}`}>
                <Icon className="w-5 h-5" strokeWidth={1.6} />
              </span>
              <span className="text-[12px] sm:text-[13px] font-semibold text-navy text-center leading-snug">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
