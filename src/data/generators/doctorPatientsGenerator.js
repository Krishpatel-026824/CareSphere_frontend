import { doctorPatientsMock } from '../mocks/doctorPatients'
import { parseAppointmentDate } from '../../utils/appointmentFormat'
import { visitsForPatient } from './doctorScheduleGenerator'

function visitSortTime(visit) {
  if (!visit) return Number.POSITIVE_INFINITY
  return (
    parseAppointmentDate(visit.dateLabel, visit.timeLabel)?.getTime() ?? Number.POSITIVE_INFINITY
  )
}

export function generateDoctorPatients(visits = []) {
  return doctorPatientsMock
    .map((patient) => {
      const history = visitsForPatient(visits, patient.id)
      if (history.length === 0) return null
      const next = history.find((item) => item.status === 'Upcoming' || item.status === 'Confirmed')
      return {
        ...patient,
        visitCount: history.length,
        nextVisit: next || history[0],
      }
    })
    .filter(Boolean)
    .sort((left, right) => visitSortTime(left.nextVisit) - visitSortTime(right.nextVisit))
}
