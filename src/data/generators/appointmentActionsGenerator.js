import { appointmentActionCopy } from '../mocks/appointmentActions'

const ACTIVE = new Set(['Upcoming', 'Confirmed'])

export function canConfirmAppointment(appointment) {
  return appointment?.status === 'Upcoming'
}

export function canCancelAppointment(appointment) {
  return ACTIVE.has(appointment?.status)
}

export function canRescheduleAppointment(appointment) {
  return canCancelAppointment(appointment)
}

export function appointmentMenuOptions(appointment) {
  const options = []
  if (canConfirmAppointment(appointment)) {
    options.push({ id: 'confirm', label: appointmentActionCopy.menuConfirm, danger: false })
  }
  if (canCancelAppointment(appointment)) {
    options.push({ id: 'cancel', label: appointmentActionCopy.menuCancel, danger: true })
  }
  return options
}

export function appointmentDialogCopy(type, appointment) {
  const name = appointment?.doctorName || 'this doctor'
  const date = appointment?.dateLabel || ''
  const time = appointment?.timeLabel || ''

  if (type === 'confirm') {
    return {
      title: appointmentActionCopy.confirmTitle,
      body: appointmentActionCopy.confirmBody.replace('{name}', name),
      confirm: appointmentActionCopy.confirmAction,
      danger: false,
    }
  }

  return {
    title: appointmentActionCopy.cancelTitle,
    body: appointmentActionCopy.cancelBody
      .replace('{name}', name)
      .replace('{date}', date)
      .replace('{time}', time),
    confirm: appointmentActionCopy.cancelAction,
    danger: true,
  }
}
