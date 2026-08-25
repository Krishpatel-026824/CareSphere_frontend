export const appointmentStatusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-800',
  Upcoming: 'bg-amber-100 text-amber-800',
  Completed: 'bg-sky-100 text-sky-800',
  Cancelled: 'bg-rose-100 text-rose-800',
}

/** Doctor portal labels */
export const appointmentStatusLabels = {
  Confirmed: 'Confirmed',
  Upcoming: 'Pending',
  Completed: 'Done',
  Cancelled: 'Reject',
}

/** Patient portal labels — request flow */
export const patientAppointmentStatusLabels = {
  Upcoming: 'Requested',
  Confirmed: 'Accepted',
  Cancelled: 'Rejected',
  Completed: 'Completed',
}

export const patientAppointmentStatusStyles = {
  Upcoming: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-rose-100 text-rose-800',
  Completed: 'bg-sky-100 text-sky-800',
}

export function getPatientAppointmentStatusLabel(status) {
  return patientAppointmentStatusLabels[status] || status
}

export function getPatientAppointmentStatusStyle(status) {
  return patientAppointmentStatusStyles[status] || patientAppointmentStatusStyles.Upcoming
}

export const appointmentActionCopy = {
  menuConfirm: 'Confirm appointment',
  menuCancel: 'Cancel appointment',
  confirmTitle: 'Confirm this appointment?',
  confirmBody: 'This visit with {name} will be marked as confirmed.',
  confirmAction: 'Confirm',
  cancelTitle: 'Cancel this appointment?',
  cancelBody: 'This visit with {name} on {date} at {time} will be cancelled.',
  cancelAction: 'Cancel appointment',
  keep: 'Keep appointment',
}
