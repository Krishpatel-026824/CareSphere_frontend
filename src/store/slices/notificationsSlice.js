import { createSlice } from '@reduxjs/toolkit'
import { generateNotificationsData } from '../../data/generators/notificationsGenerator'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: generateNotificationsData(),
    activeFilter: 'all',
  },
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload
    },
    markAsRead(state, action) {
      const id = action.payload
      state.items = state.items.map((item) => (item.id === id ? { ...item, unread: false } : item))
    },
    markAllAsRead(state) {
      state.items = state.items.map((item) => ({ ...item, unread: false }))
    },
    refreshNotifications(state) {
      state.items = generateNotificationsData()
      state.activeFilter = 'all'
    },
  },
})

export const { setActiveFilter, markAsRead, markAllAsRead, refreshNotifications } =
  notificationsSlice.actions

export default notificationsSlice.reducer
