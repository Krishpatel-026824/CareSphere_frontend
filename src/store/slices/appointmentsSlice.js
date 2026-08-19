import { createSlice } from '@reduxjs/toolkit'
import { generateAppointmentFromBooking } from '../../data/generators/appointmentsGenerator'
import { appointmentsMock } from '../../data/mocks/appointments'
import { resolveAppointmentImages, resolveAppointmentsImages } from '../../data/mocks/appointmentImages'
import { applyBookingToAppointment, getUpcomingAppointment } from '../../utils/appointmentFormat'

const STORAGE_KEY = 'caresphere.appointments'
const RECYCLE_KEY = 'caresphere.appointments.recyclebin'

function loadStored(key) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function loadStoredAppointments() {
  return loadStored(STORAGE_KEY)
}

const stripImages = ({ doctorPhoto, heroImage, mapImage, clinicImage, ...rest }) => rest

function saveAppointmentsToStorage(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(stripImages)))
  } catch { /* silently fail */ }
}

function saveRecycleBinToStorage(items) {
  try {
    window.localStorage.setItem(RECYCLE_KEY, JSON.stringify(items.map(stripImages)))
  } catch { /* silently fail */ }
}

const storedItems = resolveAppointmentsImages(loadStoredAppointments())
const defaultItems = resolveAppointmentsImages(appointmentsMock)
const mergedItems = storedItems.length
  ? [...storedItems.filter((stored) => !defaultItems.some((def) => def.id === stored.id)), ...defaultItems]
  : defaultItems

const storedRecycleBin = resolveAppointmentsImages(loadStored(RECYCLE_KEY))

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: mergedItems,
    prefs: {},
    recycleBin: storedRecycleBin,
  },
  reducers: {
    persistReschedule(state, action) {
      const { selectedAppointment, booking } = action.payload
      if (!selectedAppointment?.id && !booking?.doctor?.id) return

      const target =
        state.items.find((item) => item.doctorId === booking?.doctor?.id) ||
        state.items.find((item) => item.id === selectedAppointment?.id) ||
        selectedAppointment
      if (!target?.id) return

      const updated = resolveAppointmentImages(applyBookingToAppointment(target, booking))
      state.items = [updated, ...state.items.filter((item) => item.id !== updated.id)]
    },
    addBookedAppointment(state, action) {
      const appointment = generateAppointmentFromBooking(action.payload)
      if (!appointment?.id) return
      if (state.items.some((item) => item.id === appointment.id)) return
      state.items = [resolveAppointmentImages(appointment), ...state.items]
      saveAppointmentsToStorage(state.items)
    },
    confirmAppointment(state, action) {
      const id = action.payload
      state.items = state.items.map((item) =>
        item.id === id && item.status === 'Upcoming' ? { ...item, status: 'Confirmed' } : item,
      )
    },
    cancelAppointment(state, action) {
      const id = action.payload
      state.items = state.items.map((item) =>
        item.id === id && (item.status === 'Upcoming' || item.status === 'Confirmed')
          ? { ...item, status: 'Cancelled' }
          : item,
      )
    },
    completeAppointment(state, action) {
      const id = action.payload
      state.items = state.items.map((item) =>
        item.id === id && (item.status === 'Upcoming' || item.status === 'Confirmed')
          ? { ...item, status: 'Completed' }
          : item,
      )
    },
    toggleAppointmentTask(state, action) {
      const { appointmentId, taskId } = action.payload
      state.items = state.items.map((item) => {
        if (item.id !== appointmentId || !item.tasks?.length) return item
        return {
          ...item,
          tasks: item.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task,
          ),
        }
      })
    },
    updateAppointment(state, action) {
      const updated = action.payload
      if (!updated?.id) return
      state.items = state.items.map((item) => item.id === updated.id ? { ...item, ...updated } : item)
      saveAppointmentsToStorage(state.items)
    },
    softDeleteAppointment(state, action) {
      const id = action.payload
      const item = state.items.find((a) => a.id === id)
      if (!item) return
      state.recycleBin = [{ ...item, deletedAt: Date.now() }, ...state.recycleBin]
      state.items = state.items.filter((a) => a.id !== id)
      saveAppointmentsToStorage(state.items)
      saveRecycleBinToStorage(state.recycleBin)
    },
    restoreAppointment(state, action) {
      const id = action.payload
      const item = state.recycleBin.find((a) => a.id === id)
      if (!item) return
      const { deletedAt, ...restored } = item
      state.items = [resolveAppointmentImages(restored), ...state.items]
      state.recycleBin = state.recycleBin.filter((a) => a.id !== id)
      saveAppointmentsToStorage(state.items)
      saveRecycleBinToStorage(state.recycleBin)
    },
    permanentDeleteAppointment(state, action) {
      const id = action.payload
      state.recycleBin = state.recycleBin.filter((a) => a.id !== id)
      saveRecycleBinToStorage(state.recycleBin)
    },
    emptyRecycleBin(state) {
      state.recycleBin = []
      saveRecycleBinToStorage([])
    },
    updateAppointmentPrefs(state, action) {
      const { appointmentId, next } = action.payload
      if (!appointmentId) return
      state.prefs[appointmentId] = next
    },
  },
})

export const {
  persistReschedule,
  addBookedAppointment,
  confirmAppointment,
  cancelAppointment,
  completeAppointment,
  softDeleteAppointment,
  restoreAppointment,
  permanentDeleteAppointment,
  emptyRecycleBin,
  updateAppointment,
  updateAppointmentPrefs,
  toggleAppointmentTask,
} = appointmentsSlice.actions

export function selectRecycleBin(state) {
  return state.appointments.recycleBin
}

export function selectAppointments(state) {
  return state.appointments.items
}

export function selectAppointmentPrefs(state) {
  return state.appointments.prefs
}

export function selectUpcomingAppointment(state) {
  return getUpcomingAppointment(state.appointments.items)
}

export default appointmentsSlice.reducer
