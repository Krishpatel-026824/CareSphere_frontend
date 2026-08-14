import { createSlice } from '@reduxjs/toolkit'
import { generateDoctorExtraVisits, mergeDoctorVisits } from '../../data/generators/doctorScheduleGenerator'
import { DEFAULT_DOCTOR_ID } from '../../data/mocks/doctorSession'
import { getUpcomingAppointment } from '../../utils/appointmentFormat'

const ACTIVE = new Set(['Upcoming', 'Confirmed'])

function setStatus(items, id, status, fromStatuses) {
  return items.map((item) =>
    item.id === id && fromStatuses.has(item.status) ? { ...item, status } : item,
  )
}

const doctorScheduleSlice = createSlice({
  name: 'doctorSchedule',
  initialState: {
    extras: generateDoctorExtraVisits(),
  },
  reducers: {
    acceptDoctorVisit(state, action) {
      state.extras = setStatus(state.extras, action.payload, 'Confirmed', new Set(['Upcoming']))
    },
    declineDoctorVisit(state, action) {
      state.extras = setStatus(state.extras, action.payload, 'Cancelled', ACTIVE)
    },
    completeDoctorVisit(state, action) {
      state.extras = setStatus(state.extras, action.payload, 'Completed', ACTIVE)
    },
  },
})

export const { acceptDoctorVisit, declineDoctorVisit, completeDoctorVisit } = doctorScheduleSlice.actions

export function selectDoctorVisits(state) {
  const doctorId = state.auth.user?.doctorId || DEFAULT_DOCTOR_ID
  return mergeDoctorVisits(state.appointments.items, state.doctorSchedule.extras, doctorId)
}

export function selectDoctorNextVisit(state) {
  return getUpcomingAppointment(selectDoctorVisits(state))
}

export default doctorScheduleSlice.reducer
