import { Bell } from 'lucide-react'
import NotificationCard from './NotificationCard'

export default function NotificationGrid({ items, onRead, onDelete, onShowAll }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-gray bg-white px-6 py-16 text-left">
        <div className="w-11 h-11 rounded-xl bg-teal-light flex items-center justify-center mb-3">
          <Bell className="w-5 h-5 text-teal" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-semibold text-navy">No notifications here</p>
        <p className="text-[12px] text-body-gray mt-1">Try another filter or refresh the list.</p>
        <button
          type="button"
          onClick={onShowAll}
          className="mt-4 text-[13px] font-semibold text-teal cursor-pointer hover:text-teal-dark"
        >
          View all notifications
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border-gray bg-white overflow-hidden shadow-[0_4px_18px_rgba(7,26,47,0.06)]">
      <div className="px-4 sm:px-5 py-3 border-b border-border-gray bg-navy flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/90">Inbox</p>
        <p className="text-[11px] font-semibold text-teal-light tabular-nums">
          {items.length} {items.length === 1 ? 'update' : 'updates'}
        </p>
      </div>
      <ul className="divide-y divide-border-gray/80">
        {items.map((item) => (
          <li key={item.id}>
            <NotificationCard item={item} onRead={onRead} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  )
}
