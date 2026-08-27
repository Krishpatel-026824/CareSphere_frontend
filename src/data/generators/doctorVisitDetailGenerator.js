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
  const isCompleted = visit.status === 'Completed'
  const isLocked = visit.status === 'Completed' || visit.status === 'Cancelled'

  const rawTasks = visit.tasks?.length
    ? visit.tasks
    : (visit.prepItems || []).map((label, index) => ({
        id: `prep-${index}`,
        label,
        done: isCompleted,
      }))

  const tasks = (rawTasks.length ? rawTasks : defaultTasks).map((task) => ({
    ...task,
    done: isCompleted ? true : Boolean(task.done),
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
    tasks,
    timeline: generateDoctorVisitTimeline(visit, tasks),
    duration: '30 min',
    checkInLabel: 'Arrive 15 minutes early',
    specialty: visit.specialty || 'Cardiologist',
    cityLine: `${visit.location || 'Ahmedabad'}, Gujarat`,
    checklistLocked: isLocked,
  }
}
