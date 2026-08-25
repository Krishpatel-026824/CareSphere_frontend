import { doctorPatientHistoryMock } from '../mocks/doctorPatientHistory'
import { sortAppointmentsForList } from '../../utils/appointmentFormat'
import { toDoctorVisit, visitsForPatient } from './doctorScheduleGenerator'

const fallbackHistory = [
  {
    dateLabel: '12 Mar 2026',
    timeLabel: '10:00 AM',
    prepNote: 'Follow-up completed. Continue current plan.',
    prepItems: ['Prescription copy'],
  },
  {
    dateLabel: '08 Nov 2025',
    timeLabel: '11:30 AM',
    prepNote: 'Baseline consult. History and vitals recorded.',
    prepItems: ['Valid photo ID'],
  },
]

export function generatePatientChartVisits(visits = [], patient) {
  if (!patient) return []

  const live = visitsForPatient(visits, patient.id)
  const seed = live[0]
  if (!seed) return []

  const rows = doctorPatientHistoryMock[patient.id] || fallbackHistory
  const history = rows.map((row, index) =>
    toDoctorVisit(
      {
        ...seed,
        ...row,
        id: `${patient.id}-hist-${index}`,
        linkedAppointmentId: undefined,
        visitType: row.visitType || 'In-clinic',
        status: 'Completed',
        patientId: patient.id,
        patientName: patient.name,
        patientPhoto: patient.avatar,
      },
      patient,
    ),
  )

  return sortAppointmentsForList([...live, ...history])
}
