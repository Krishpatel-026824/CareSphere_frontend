import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [keptUnreadIds, setKeptUnreadIds] = useState(() => new Set())
  const prevFilterRef = useRef(activeFilter)

  useEffect(() => {
    if (prevFilterRef.current === 'unread' && activeFilter !== 'unread') {
      setKeptUnreadIds(new Set())
    }
    prevFilterRef.current = activeFilter
  }, [activeFilter])

  const unreadCount = notifications.filter((item) => item.unread).length
  const viewedCount = notifications.filter((item) => !item.unread).length

  const filtered = useMemo(() => {
    if (activeFilter === 'unread') {
      return notifications.filter((item) => item.unread || keptUnreadIds.has(item.id))
    }
    if (activeFilter === 'viewed') return notifications.filter((item) => !item.unread)
    return notifications
  }, [activeFilter, notifications, keptUnreadIds])

  function handleMarkAsRead(id) {
    if (activeFilter === 'unread') {
      setKeptUnreadIds((prev) => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
    }
    dispatch(markAsRead(id))
  }

  function handleMarkAllAsRead() {
    setKeptUnreadIds(new Set())
    dispatch(markAllAsRead())
  }

  function handleDelete(id) {
    setKeptUnreadIds((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    dispatch(deleteNotification(id))
  }

  function handleRefresh() {
    setKeptUnreadIds(new Set())
    dispatch(refreshNotifications())
  }

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
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDelete,
    handleRefresh,
  }
}
