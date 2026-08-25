import { doctorSessionMock } from '../mocks/authRoles'

export function generatePatientVisitResponseNotice(type, visit) {
  if (!visit?.id) return null
  if (type !== 'accept' && type !== 'decline') return null

  const doctorName =
    visit.doctorName && visit.doctorName !== visit.patientName
      ? visit.doctorName
      : doctorSessionMock.name || 'Your doctor'
  const date = visit.dateLabel || ''
  const time = visit.timeLabel || ''
  const when = [date, time].filter(Boolean).join(' at ')

  if (type === 'accept') {
    return {
      id: `notif-accepted-${visit.linkedAppointmentId || visit.id}-${Date.now()}`,
      type: 'appointment',
      title: 'Appointment accepted',
      message: when
        ? `${doctorName} accepted your request for ${when}. Status is now Accepted.`
        : `${doctorName} accepted your appointment request. Status is now Accepted.`,
      timeLabel: 'Just now',
      unread: true,
      _workspace: 'patient',
    }
  }

  return {
    id: `notif-rejected-${visit.linkedAppointmentId || visit.id}-${Date.now()}`,
    type: 'cancellation',
    title: 'Appointment rejected',
    message: when
      ? `${doctorName} rejected your request for ${when}. Status is now Rejected.`
      : `${doctorName} rejected your appointment request. Status is now Rejected.`,
    timeLabel: 'Just now',
    unread: true,
    _workspace: 'patient',
  }
}
