import { appointmentsMock } from '../data/mocks/appointments'

export function formatBookingDateLabel(slotDate = '') {
  if (/\d{4}/.test(slotDate)) {
    return slotDate.replace(/^[A-Za-z]+\s+/, '')
  }

  const parts = slotDate.trim().split(/\s+/)
  if (parts.length >= 3) {
    return `${parts[1]} ${parts[2]} 2025`
  }

  return slotDate
}

export function applyBookingToAppointment(appointment, booking) {
  if (!appointment || !booking) return appointment

  const doctor = booking.doctor
  const template =
    appointmentsMock.find((item) => item.doctorId === doctor?.id) || appointment

  return {
    ...appointment,
    doctorId: doctor?.id || appointment.doctorId,
    doctorName: doctor?.name || appointment.doctorName,
    specialty: doctor?.specialty || appointment.specialty,
    clinic: template.clinic,
    clinicDetail: template.clinicDetail || template.clinic,
    location: template.location,
    visitType: template.visitType,
    address: template.address,
    fullAddress: template.fullAddress,
    mapCoords: template.mapCoords,
    phone: template.phone,
    room: template.room,
    landmark: template.landmark,
    prepNote: template.prepNote,
    prepItems: template.prepItems,
    dateLabel: formatBookingDateLabel(booking.selectedDate),
    timeLabel: booking.selectedTime,
    status: 'Confirmed',
  }
}

export function getUpcomingAppointment(appointments = []) {
  return (
    appointments.find((item) => item.status === 'Confirmed') ||
    appointments.find((item) => item.status === 'Upcoming') ||
    appointments.find((item) => item.status !== 'Completed') ||
    appointments[0] ||
    null
  )
}
