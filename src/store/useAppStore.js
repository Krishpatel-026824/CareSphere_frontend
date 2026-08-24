import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  addBookedAppointment as addBookedAppointmentAction,
  emptyRecycleBin as emptyRecycleBinAction,
  permanentDeleteAppointment as permanentDeleteAction,
  persistReschedule as persistRescheduleAction,
  restoreAppointment as restoreAppointmentAction,
  softDeleteAppointment as softDeleteAction,
  updateAppointment as updateAppointmentAction,
  selectAppointmentPrefs,
  selectAppointments,
  selectRecycleBin,
  selectUpcomingAppointment,
  updateAppointmentPrefs as updatePrefsAction,
} from './slices/appointmentsSlice'
import { selectDoctorFlow } from './slices/doctorsSlice'
import { addLabReports, selectHealthRecords } from './slices/healthSlice'
import { addIncomingMessage, selectMessagesBadge } from './slices/messagesSlice'
import { addNotification as addNotificationAction } from './slices/notificationsSlice'
import { generateLabBookingNotification } from '../data/generators/labBookingNotificationGenerator'
import { generateAppointmentUpdateNotice } from '../data/generators/appointmentUpdateNoticeGenerator'

export function useAppStore() {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.auth.user)
  const appointments = useAppSelector(selectAppointments)
  const appointmentPrefs = useAppSelector(selectAppointmentPrefs)
  const upcomingAppointment = useAppSelector(selectUpcomingAppointment)
  const recycleBin = useAppSelector(selectRecycleBin)
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
    const doctorName = booking.doctor?.name || 'your doctor'
    const patientName = authUser?.name || 'Krish'
    const date = booking.selectedDate || ''
    const time = booking.selectedTime || ''
    const now = new Date()
    const timeLabel = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    dispatch(addNotificationAction({
      id: `notif-appt-${Date.now()}`,
      type: 'appointment',
      title: 'Appointment Booked',
      message: `Your appointment with ${doctorName} is confirmed for ${date} at ${time}. Please arrive 10 minutes early.`,
      timeLabel: 'Just now',
      unread: true,
    }))

    if (booking.doctor?.id) {
      dispatch(addIncomingMessage({
        doctorId: booking.doctor.id,
        doctorName,
        avatar: booking.doctor.photo || '',
        message: {
          id: `msg-appt-${Date.now()}`,
          from: 'them',
          text: `Hello ${patientName}, your appointment with me on ${date} at ${time} has been confirmed. Please arrive 10 minutes early and bring any recent reports. Looking forward to seeing you! 😊`,
          time: timeLabel,
        },
      }))
    }
  }

  function updateAppointment(updated) {
    if (!updated?.id) return
    const previous = appointments.find((item) => item.id === updated.id)
    dispatch(updateAppointmentAction(updated))

    const notice = generateAppointmentUpdateNotice({
      previous,
      next: { ...previous, ...updated },
      patientName: authUser?.name?.split(' ')[0] || 'Krish',
    })
    if (!notice) return

    dispatch(addNotificationAction(notice.notification))
    if (notice.chat) dispatch(addIncomingMessage(notice.chat))
  }

  function updateAppointmentPrefs(appointmentId, next) {
    dispatch(updatePrefsAction({ appointmentId, next }))
  }

  function softDeleteAppointment(id) {
    dispatch(softDeleteAction(id))
  }

  function restoreAppointment(id) {
    dispatch(restoreAppointmentAction(id))
  }

  function permanentDeleteAppointment(id) {
    dispatch(permanentDeleteAction(id))
  }

  function emptyRecycleBin() {
    dispatch(emptyRecycleBinAction())
  }

  function handleLabReportsGenerated(reports) {
    dispatch(addLabReports(reports))
  }

  function notifyLabBooking(booking) {
    const notification = generateLabBookingNotification(booking)
    if (notification) dispatch(addNotificationAction(notification))
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
    updateAppointment,
    softDeleteAppointment,
    restoreAppointment,
    permanentDeleteAppointment,
    emptyRecycleBin,
    recycleBin,
    appointmentPrefs,
    updateAppointmentPrefs,
    handleLabReportsGenerated,
    notifyLabBooking,
  }
}
