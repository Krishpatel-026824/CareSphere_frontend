import { parseAppointmentDate } from '../../utils/appointmentFormat'

export function generateDoctorNextVisitCard(visit) {
  if (!visit) return null

  const parsed = parseAppointmentDate(visit.dateLabel, visit.timeLabel)
  const isVideo = String(visit.visitType || '').toLowerCase().includes('video')

  return {
    ...visit,
    weekday: parsed ? parsed.toLocaleDateString('en-IN', { weekday: 'long' }) : '',
    timeZone: 'IST',
    typeHint: isVideo ? 'Video consult' : 'Consultation',
    roomHint: visit.floor || 'Ground Floor',
    cityLine: visit.cityLine || `${visit.location || 'Ahmedabad'}, Gujarat, India`,
    isVideo,
  }
}
