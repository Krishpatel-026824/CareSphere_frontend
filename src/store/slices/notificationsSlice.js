import { createSlice } from '@reduxjs/toolkit'
import {
  generateDoctorNotificationsData,
  generateNotificationsData,
} from '../../data/generators/notificationsGenerator'
import { loadAuthWorkspace } from '../../utils/authStorage'

function listKey(state) {
  return state.workspace === 'doctor' ? 'doctorItems' : 'items'
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: generateNotificationsData(),
    doctorItems: generateDoctorNotificationsData(),
    workspace: loadAuthWorkspace(),
    activeFilter: 'all',
  },
  reducers: {
    setNotificationWorkspace(state, action) {
      state.workspace = action.payload === 'doctor' ? 'doctor' : 'patient'
      state.activeFilter = 'all'
    },
    setActiveFilter(state, action) {
      state.activeFilter = action.payload
    },
    markAsRead(state, action) {
      const id = action.payload
      const key = listKey(state)
      state[key] = state[key].map((item) => (item.id === id ? { ...item, unread: false } : item))
    },
    markAllAsRead(state) {
      const key = listKey(state)
      state[key] = state[key].map((item) => ({ ...item, unread: false }))
    },
    addNotification(state, action) {
      const notification = action.payload
      if (!notification?.id) return
      const key = listKey(state)
      state[key] = [notification, ...state[key]]
    },
    deleteNotification(state, action) {
      const id = action.payload
      const key = listKey(state)
      state[key] = state[key].filter((item) => item.id !== id)
    },
    refreshNotifications(state) {
      const key = listKey(state)
      state[key] =
        key === 'doctorItems' ? generateDoctorNotificationsData() : generateNotificationsData()
      state.activeFilter = 'all'
    },
  },
})

export const {
  setNotificationWorkspace,
  setActiveFilter,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  refreshNotifications,
} = notificationsSlice.actions

export function selectActiveNotifications(state) {
  return state.notifications.workspace === 'doctor'
    ? state.notifications.doctorItems
    : state.notifications.items
}

export default notificationsSlice.reducer
