import { createSlice } from '@reduxjs/toolkit'
import {
  generateDoctorNotificationsData,
  generateNotificationsData,
} from '../../data/generators/notificationsGenerator'

function listKey(state) {
  return state.workspace === 'doctor' ? 'doctorItems' : 'items'
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: generateNotificationsData(),
    doctorItems: generateDoctorNotificationsData(),
    workspace: 'patient',
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
  markAsRead,
  markAllAsRead,
  refreshNotifications,
} = notificationsSlice.actions

export function selectActiveNotifications(state) {
  return state.notifications.workspace === 'doctor'
    ? state.notifications.doctorItems
    : state.notifications.items
}

export default notificationsSlice.reducer
