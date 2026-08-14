import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  markAllAsRead,
  markAsRead,
  refreshNotifications,
  setActiveFilter,
} from '../store/slices/notificationsSlice'

export function useNotifications() {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.items)
  const activeFilter = useAppSelector((state) => state.notifications.activeFilter)

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
    setActiveFilter: (value) => dispatch(setActiveFilter(value)),
    unreadCount,
    viewedCount,
    markAsRead: (id) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
    handleRefresh: () => dispatch(refreshNotifications()),
  }
}
