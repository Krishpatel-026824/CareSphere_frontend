import { createSlice } from '@reduxjs/toolkit'
import { generateAppointmentFromBooking } from '../../data/generators/appointmentsGenerator'
import { appointmentsMock } from '../../data/mocks/appointments'
import { resolveAppointmentImages, resolveAppointmentsImages } from '../../data/mocks/appointmentImages'
import { applyBookingToAppointment, getUpcomingAppointment } from '../../utils/appointmentFormat'

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: resolveAppointmentsImages(appointmentsMock),
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
      const rest = state.items
        .filter((item) => item.id !== updated.id)
        .map((item) => (item.status === 'Confirmed' ? { ...item, status: 'Upcoming' } : item))
      state.items = [updated, ...rest]
    },
    addBookedAppointment(state, action) {
      const appointment = generateAppointmentFromBooking(action.payload)
      if (!appointment?.id) return
      if (state.items.some((item) => item.id === appointment.id)) return
      state.items = [resolveAppointmentImages(appointment), ...state.items]
    },
    updateAppointmentPrefs(state, action) {
      const { appointmentId, next } = action.payload
      if (!appointmentId) return
      state.prefs[appointmentId] = next
    },
  },
})

export const { persistReschedule, addBookedAppointment, updateAppointmentPrefs } = appointmentsSlice.actions

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
