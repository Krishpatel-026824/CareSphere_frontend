import { CheckCircle2, Eye, Mail } from 'lucide-react'
import NotificationStatCard from './NotificationStatCard'

export default function NotificationStatRow({ unreadCount, viewedCount, total, activeFilter, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      <NotificationStatCard
        label="Unread"
        count={unreadCount}
        sublabel="New notifications"
        icon={Mail}
        iconWrap="bg-teal-light"
        iconColor="text-teal"
        active={activeFilter === 'unread'}
        onClick={() => onSelect('unread')}
      />
      <NotificationStatCard
        label="Viewed"
        count={viewedCount}
        sublabel="Already read"
        icon={Eye}
        iconWrap="bg-amber-light"
        iconColor="text-amber"
        active={activeFilter === 'viewed'}
        onClick={() => onSelect('viewed')}
      />
      <NotificationStatCard
        label="All"
        count={total}
        sublabel="Total notifications"
        icon={CheckCircle2}
        iconWrap="bg-teal"
        iconColor="text-white"
        active={activeFilter === 'all'}
        onClick={() => onSelect('all')}
      />
    </div>
  )
}
