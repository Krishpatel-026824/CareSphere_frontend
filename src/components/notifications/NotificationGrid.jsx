import { Bell } from 'lucide-react'
import NotificationCard from './NotificationCard'

export default function NotificationGrid({ items, onRead, onDelete, onShowAll }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#E6EBF1] bg-white px-6 py-14 text-center">
        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2.5" strokeWidth={1.5} />
        <p className="text-sm font-medium text-navy">No notifications here</p>
        <button
          type="button"
          onClick={onShowAll}
          className="mt-2.5 text-sm font-semibold text-teal cursor-pointer hover:opacity-80"
        >
          View all notifications
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <NotificationCard key={item.id} item={item} onRead={onRead} onDelete={onDelete} />
      ))}
    </div>
  )
}
