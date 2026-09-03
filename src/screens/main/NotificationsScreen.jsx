import { useState } from 'react'
import NotificationDeleteConfirm from '../../components/notifications/NotificationDeleteConfirm'
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
  const [pendingDelete, setPendingDelete] = useState(null)

  function confirmDelete() {
    if (!pendingDelete) return
    deleteNotification(pendingDelete.id)
    setPendingDelete(null)
  }

  return (
    <div className="w-full min-h-full bg-transparent">
      <div className="w-full max-w-[1440px] page-pad py-4 sm:py-5 lg:py-6 flex flex-col gap-4 sm:gap-5">
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
          onDelete={setPendingDelete}
          onShowAll={() => setActiveFilter('all')}
        />
      </div>

      <NotificationDeleteConfirm
        item={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
