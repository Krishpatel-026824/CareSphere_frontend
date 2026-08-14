import {
  Bell,
  CalendarCheck2,
  CalendarPlus,
  CalendarX2,
  Clock,
  FileText,
  FlaskConical,
  MessageSquare,
  Pill,
  ShieldAlert,
  Tag,
  UserRound,
  Video,
} from 'lucide-react'

const typeStyles = {
  appointment: { icon: CalendarCheck2, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  medicine: { icon: Pill, bg: 'bg-sky-50', iconColor: 'text-sky-600' },
  lab: { icon: FlaskConical, bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  message: { icon: MessageSquare, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  offer: { icon: Tag, bg: 'bg-rose-50', iconColor: 'text-rose-600' },
  security: { icon: ShieldAlert, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  booking: { icon: CalendarPlus, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  cancellation: { icon: CalendarX2, bg: 'bg-rose-50', iconColor: 'text-rose-600' },
  report: { icon: FileText, bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  video: { icon: Video, bg: 'bg-sky-50', iconColor: 'text-sky-600' },
  reminder: { icon: Bell, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  slot: { icon: Clock, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
}

export default function NotificationCard({ item, onRead }) {
  const style = typeStyles[item.type] || { icon: Bell, bg: 'bg-gray-50', iconColor: 'text-gray-600' }
  const Icon = item.type === 'lab' && item.title.includes('Sample') ? UserRound : style.icon

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${item.title}. ${item.unread ? 'Unread. ' : 'Read. '}${item.message}`}
      onClick={() => onRead(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onRead(item.id)
        }
      }}
      className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-[0_1px_8px_rgba(11,31,58,0.04)] hover:shadow-md transition-all cursor-pointer min-h-[108px] ${
        item.unread ? 'border-teal/20 bg-[#F3FAF9]' : 'border-border-gray/70 bg-white'
      }`}
    >
      {item.unread ? (
        <span className="absolute left-0 top-0 bottom-0 w-[5px] bg-teal" aria-hidden="true" />
      ) : null}

      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-[18px] h-[18px] ${style.iconColor}`} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
              <h2 className="text-[15px] font-bold text-navy leading-snug">{item.title}</h2>
              {item.unread ? (
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-teal bg-teal-light px-2 py-0.5 rounded-full">
                  New
                </span>
              ) : null}
            </div>
            <span className="text-[11px] text-body-gray/80 leading-none shrink-0 pt-1 whitespace-nowrap">
              {item.timeLabel}
            </span>
          </div>
          <p className="text-[13px] mt-1.5 leading-relaxed text-body-gray line-clamp-2">{item.message}</p>
        </div>
      </div>
    </article>
  )
}
