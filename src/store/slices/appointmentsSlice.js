import { createSlice } from '@reduxjs/toolkit'
import { generateAppointmentFromBooking } from '../../data/generators/appointmentsGenerator'
import { appointmentsMock } from '../../data/mocks/appointments'
import { resolveAppointmentImages, resolveAppointmentsImages } from '../../data/mocks/appointmentImages'
import { applyBookingToAppointment, getUpcomingAppointment } from '../../utils/appointmentFormat'

const STORAGE_KEY = 'caresphere.appointments'

function loadStoredAppointments() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveAppointmentsToStorage(items) {
  try {
    const serializable = items.map(({ doctorPhoto, heroImage, mapImage, clinicImage, ...rest }) => rest)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch {
    // silently fail
  }
}

const storedItems = resolveAppointmentsImages(loadStoredAppointments())
const defaultItems = resolveAppointmentsImages(appointmentsMock)
const mergedItems = storedItems.length
  ? [...storedItems.filter((stored) => !defaultItems.some((def) => def.id === stored.id)), ...defaultItems]
  : defaultItems

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: mergedItems,
    prefs: {},
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
  updateAppointmentPrefs,
  toggleAppointmentTask,
} = appointmentsSlice.actions

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
