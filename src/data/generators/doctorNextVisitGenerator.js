import { parseAppointmentDate } from '../../utils/appointmentFormat'

export function generateDoctorNextVisitCard(visit) {
  if (!visit) return null

  const parsed = parseAppointmentDate(visit.dateLabel, visit.timeLabel)

  return {
    ...visit,
    weekday: parsed ? parsed.toLocaleDateString('en-IN', { weekday: 'long' }) : '',
    timeZone: 'IST',
    typeHint: 'Consultation',
    roomHint: visit.floor || 'Ground Floor',
    cityLine: visit.cityLine || `${visit.location || 'Ahmedabad'}, Gujarat, India`,
    isVideo: false,
  }
}
