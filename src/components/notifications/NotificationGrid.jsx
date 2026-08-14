import { Bell } from 'lucide-react'
import NotificationCard from './NotificationCard'

export default function NotificationGrid({ items, onRead, onShowAll }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-gray bg-white px-6 py-16 text-center">
        <Bell className="w-9 h-9 text-body-gray/35 mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-sm font-medium text-navy">No notifications in this view.</p>
        <button
          type="button"
          onClick={onShowAll}
          className="mt-3 text-sm font-semibold text-teal cursor-pointer hover:opacity-80"
        >
          View all notifications
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <NotificationCard key={item.id} item={item} onRead={onRead} />
      ))}
    </div>
  )
}
