import { doctorPatientsMock } from '../mocks/doctorPatients'
import { parseAppointmentDate } from '../../utils/appointmentFormat'
import { generateDoctorVisitTimeline } from './doctorVisitTimelineGenerator'

const defaultTasks = [
  { id: 'checkin', label: 'Patient check-in at front desk', done: false },
  { id: 'vitals', label: 'Record vitals before consult', done: false },
  { id: 'history', label: 'Review medical history', done: false },
]

export function generateDoctorVisitDetail(visit) {
  if (!visit) return null

  const patient = doctorPatientsMock.find((item) => item.id === visit.patientId)
  const parsed = parseAppointmentDate(visit.dateLabel, visit.timeLabel)
  const isVideo = String(visit.visitType || '').toLowerCase().includes('video')
  const isCompleted = visit.status === 'Completed'

  const tasks = visit.tasks?.length
    ? visit.tasks
    : (visit.prepItems || []).map((label, index) => ({
        id: `prep-${index}`,
        label,
        done: isCompleted,
      }))

  return {
    weekday: parsed?.toLocaleDateString('en-IN', { weekday: 'long' }) || '',
    visitReason: visit.visitReason || '',
    patientMeta: patient
      ? {
          ageLabel: patient.ageLabel,
          gender: patient.gender,
          city: patient.city,
          phone: patient.phone,
        }
      : null,
    tasks: tasks.length ? tasks : defaultTasks,
    timeline: generateDoctorVisitTimeline(visit, tasks.length ? tasks : defaultTasks),
    duration: isVideo ? '20 min' : '30 min',
    checkInLabel: isVideo ? 'Join 5 minutes early' : 'Arrive 15 minutes early',
    specialty: visit.specialty || 'Cardiologist',
    cityLine: `${visit.location || 'Ahmedabad'}, Gujarat`,
  }
}
