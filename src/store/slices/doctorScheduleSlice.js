import { createSlice } from '@reduxjs/toolkit'
import { generateDoctorExtraVisits, mergeDoctorVisits } from '../../data/generators/doctorScheduleGenerator'
import { DEFAULT_DOCTOR_ID } from '../../data/mocks/doctorSession'
import { getUpcomingAppointment } from '../../utils/appointmentFormat'

const ACTIVE = new Set(['Upcoming', 'Confirmed'])

const defaultTasks = [
  { id: 'checkin', label: 'Patient check-in at front desk', done: false },
  { id: 'vitals', label: 'Record vitals before consult', done: false },
  { id: 'history', label: 'Review medical history', done: false },
]

function setStatus(items, id, status, fromStatuses) {
  return items.map((item) =>
    item.id === id && fromStatuses.has(item.status) ? { ...item, status } : item,
  )
}

function resolveVisitTasks(visit) {
  if (visit.tasks?.length) return visit.tasks
  if (visit.prepItems?.length) {
    return visit.prepItems.map((label, index) => ({
      id: `prep-${index}`,
      label,
      done: visit.status === 'Completed',
    }))
  }
  return defaultTasks
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
    toggleDoctorVisitTask(state, action) {
      const { visitId, taskId } = action.payload
      state.extras = state.extras.map((visit) => {
        if (visit.id !== visitId) return visit
        const tasks = resolveVisitTasks(visit).map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task,
        )
        return { ...visit, tasks }
      })
    },
  },
})

export const {
  acceptDoctorVisit,
  declineDoctorVisit,
  completeDoctorVisit,
  toggleDoctorVisitTask,
} = doctorScheduleSlice.actions

export function selectDoctorVisits(state) {
  const doctorId = state.auth.user?.doctorId || DEFAULT_DOCTOR_ID
  return mergeDoctorVisits(state.appointments.items, state.doctorSchedule.extras, doctorId)
}

export function selectDoctorNextVisit(state) {
  return getUpcomingAppointment(selectDoctorVisits(state))
}

export default doctorScheduleSlice.reducer
