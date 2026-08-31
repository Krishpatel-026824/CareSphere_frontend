import { createSlice } from '@reduxjs/toolkit'
import {
  generateDoctorNotificationsData,
  generateNotificationsData,
} from '../../data/generators/notificationsGenerator'
import { doctorProfilePrefsMock } from '../../data/mocks/doctorProfile'
import { loadAuthWorkspace } from '../../utils/authStorage'
import { loadDoctorPrefs } from '../../utils/profilePrefsStorage'
import { filterNotificationsByPrefs } from '../../utils/notificationPrefs'

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
    doctorPrefs: loadDoctorPrefs(doctorProfilePrefsMock),
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
      const payload = action.payload
      if (!payload?.id) return
      const { _workspace, ...notification } = payload
      const key =
        _workspace === 'patient'
          ? 'items'
          : _workspace === 'doctor'
            ? 'doctorItems'
            : listKey(state)
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
    setDoctorNotificationPrefs(state, action) {
      state.doctorPrefs = action.payload
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
  setDoctorNotificationPrefs,
} = notificationsSlice.actions

export function selectActiveNotifications(state) {
  return state.notifications.workspace === 'doctor'
    ? state.notifications.doctorItems
    : state.notifications.items
}

export function selectVisibleNotifications(state) {
  const items = selectActiveNotifications(state)
  const isDoctor = state.notifications.workspace === 'doctor'
  const prefs = isDoctor ? state.notifications.doctorPrefs : state.profile.prefs
  return filterNotificationsByPrefs(items, prefs, isDoctor ? 'doctor' : 'patient')
}

export default notificationsSlice.reducer
