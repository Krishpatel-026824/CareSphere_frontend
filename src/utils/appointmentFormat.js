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

  return {
    ...appointment,
    dateLabel: formatBookingDateLabel(booking.selectedDate),
    timeLabel: booking.selectedTime,
    status: 'Confirmed',
  }
}

export function getUpcomingAppointment(appointments = []) {
  return (
    appointments.find((item) => item.status === 'Confirmed' || item.status === 'Upcoming') ||
    appointments.find((item) => item.status !== 'Completed') ||
    appointments[0] ||
    null
  )
}
