import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  addBookedAppointment as addBookedAppointmentAction,
  persistReschedule as persistRescheduleAction,
  selectAppointmentPrefs,
  selectAppointments,
  selectUpcomingAppointment,
  updateAppointmentPrefs as updatePrefsAction,
} from './slices/appointmentsSlice'
import { selectDoctorFlow } from './slices/doctorsSlice'
import { addLabReports, selectHealthRecords } from './slices/healthSlice'
import { selectMessagesBadge } from './slices/messagesSlice'

export function useAppStore() {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.auth.user)
  const appointments = useAppSelector(selectAppointments)
  const appointmentPrefs = useAppSelector(selectAppointmentPrefs)
  const upcomingAppointment = useAppSelector(selectUpcomingAppointment)
  const doctorFlowData = useAppSelector(selectDoctorFlow)
  const healthRecords = useAppSelector(selectHealthRecords)
  const messagesBadge = useAppSelector(selectMessagesBadge)
  const doctors = useAppSelector((state) => state.doctors.flow.doctors)

  const findDoctorById = useCallback(
    (doctorId) => doctors.find((doctor) => doctor.id === doctorId) || null,
    [doctors],
  )

  function persistReschedule(selectedAppointment, booking) {
    dispatch(persistRescheduleAction({ selectedAppointment, booking }))
  }

  function addBookedAppointment(booking) {
    dispatch(addBookedAppointmentAction({ ...booking, patientName: authUser?.name || 'Krish Patel' }))
  }

  function updateAppointmentPrefs(appointmentId, next) {
    dispatch(updatePrefsAction({ appointmentId, next }))
  }

  function handleLabReportsGenerated(reports) {
    dispatch(addLabReports(reports))
  }

  return {
    appointments,
    healthRecords,
    doctorFlowData,
    messagesBadge,
    upcomingAppointment,
    findDoctorById,
    persistReschedule,
    addBookedAppointment,
    appointmentPrefs,
    updateAppointmentPrefs,
    handleLabReportsGenerated,
  }
}
