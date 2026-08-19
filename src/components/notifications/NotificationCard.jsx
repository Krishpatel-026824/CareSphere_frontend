import { useState } from 'react'
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
  Trash2,
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

export default function NotificationCard({ item, onRead, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const style = typeStyles[item.type] || { icon: Bell, bg: 'bg-gray-50', iconColor: 'text-gray-600' }
  const Icon = item.type === 'lab' && item.title.includes('Sample') ? UserRound : style.icon

  function handleClick() {
    if (item.unread) onRead(item.id)
    setExpanded((prev) => !prev)
  }

  function handleDelete(e) {
    e.stopPropagation()
    onDelete(item.id)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      className={`group rounded-xl border transition-all cursor-pointer ${
        item.unread
          ? 'border-teal/20 bg-[#F3FAF9] hover:border-teal/40'
          : 'border-[#E6EBF1] bg-white hover:border-[#CBD5E1]'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {item.unread ? (
          <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
        ) : (
          <span className="w-2 h-2 shrink-0" />
        )}

        <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-[17px] h-[17px] ${style.iconColor}`} strokeWidth={1.75} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-navy truncate">{item.title}</h3>
            {item.unread ? (
              <span className="text-[9px] font-bold uppercase tracking-wide text-teal bg-teal-light px-1.5 py-0.5 rounded-full shrink-0">
                New
              </span>
            ) : null}
          </div>
          {!expanded ? (
            <p className="text-[12px] text-body-gray truncate mt-0.5">{item.message}</p>
          ) : null}
        </div>

        <span className="text-[11px] text-body-gray/70 whitespace-nowrap shrink-0">{item.timeLabel}</span>

        <button
          type="button"
          onClick={handleDelete}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-all shrink-0"
          aria-label="Delete notification"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      {expanded ? (
        <div className="px-4 pb-3.5 pl-[4.25rem]">
          <p className="text-[12.5px] leading-relaxed text-[#475569]">{item.message}</p>
          <p className="text-[11px] text-body-gray/60 mt-2">
            {item.unread ? 'Marked as read' : 'Read'} · {item.timeLabel}
          </p>
        </div>
      ) : null}
    </article>
  )
}
