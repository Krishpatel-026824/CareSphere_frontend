import { RefreshCw } from 'lucide-react'
import NotificationFilterBar from '../../components/notifications/NotificationFilterBar'
import NotificationGrid from '../../components/notifications/NotificationGrid'
import NotificationHeader from '../../components/notifications/NotificationHeader'
import NotificationStatRow from '../../components/notifications/NotificationStatRow'
import { useNotifications } from '../../hooks/useNotifications'
import { DOCTOR_PATHS, PATHS } from '../../routes/paths'

export default function NotificationsScreen() {
  const {
    notifications,
    filtered,
    activeFilter,
    setActiveFilter,
    unreadCount,
    viewedCount,
    isDoctor,
    subtitle,
    markAsRead,
    markAllAsRead,
    handleRefresh,
  } = useNotifications()

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-5 sm:gap-6">
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllAsRead}
          subtitle={subtitle}
          homePath={isDoctor ? DOCTOR_PATHS.home : PATHS.home}
        />

        <NotificationStatRow
          unreadCount={unreadCount}
          viewedCount={viewedCount}
          total={notifications.length}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />

        <NotificationFilterBar
          activeFilter={activeFilter}
          counts={{ all: notifications.length, unread: unreadCount, viewed: viewedCount }}
          onSelect={setActiveFilter}
        />

        <NotificationGrid
          items={filtered}
          onRead={markAsRead}
          onShowAll={() => setActiveFilter('all')}
        />

        <div className="flex justify-center pt-1 pb-4">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 min-h-11 px-6 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={2} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
