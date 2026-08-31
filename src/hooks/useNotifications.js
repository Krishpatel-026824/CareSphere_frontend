import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  deleteNotification,
  markAllAsRead,
  markAsRead,
  refreshNotifications,
  selectVisibleNotifications,
  setActiveFilter,
} from '../store/slices/notificationsSlice'

export function useNotifications() {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectVisibleNotifications)
  const activeFilter = useAppSelector((state) => state.notifications.activeFilter)
  const isDoctor = useAppSelector((state) => state.notifications.workspace === 'doctor')

  const unreadCount = notifications.filter((item) => item.unread).length
  const viewedCount = notifications.filter((item) => !item.unread).length

  const filtered = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter((item) => item.unread)
    if (activeFilter === 'viewed') return notifications.filter((item) => !item.unread)
    return notifications
  }, [activeFilter, notifications])

  return {
    notifications,
    filtered,
    activeFilter,
    isDoctor,
    subtitle: isDoctor
      ? 'Clinic bookings, patient messages, and visit alerts'
      : 'All your updates and alerts in one place',
    setActiveFilter: (value) => dispatch(setActiveFilter(value)),
    unreadCount,
    viewedCount,
    markAsRead: (id) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
    handleRefresh: () => dispatch(refreshNotifications()),
  }
}
