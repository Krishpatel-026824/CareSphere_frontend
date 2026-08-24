import NotificationFilterBar from '../../components/notifications/NotificationFilterBar'
import NotificationGrid from '../../components/notifications/NotificationGrid'
import NotificationHeader from '../../components/notifications/NotificationHeader'
import { useNotifications } from '../../hooks/useNotifications'

export default function NotificationsScreen() {
  const {
    notifications,
    filtered,
    activeFilter,
    setActiveFilter,
    unreadCount,
    viewedCount,
    subtitle,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleRefresh,
  } = useNotifications()

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[960px] mx-auto page-pad py-5 sm:py-6 flex flex-col gap-4">
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllAsRead}
          onRefresh={handleRefresh}
          subtitle={subtitle}
        />

        <NotificationFilterBar
          activeFilter={activeFilter}
          counts={{ all: notifications.length, unread: unreadCount, viewed: viewedCount }}
          onSelect={setActiveFilter}
        />

        <NotificationGrid
          items={filtered}
          onRead={markAsRead}
          onDelete={deleteNotification}
          onShowAll={() => setActiveFilter('all')}
        />
      </div>
    </div>
  )
}
