import { doctorPatientsMock } from '../mocks/doctorPatients'
import { visitsForPatient } from './doctorScheduleGenerator'

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
}
