import { generateDoctorNextVisitCard } from './doctorNextVisitGenerator'
import { doctorConsultPageMock } from '../mocks/doctorConsult'

export function generateDoctorConsultPage(visit) {
  return {
    ...doctorConsultPageMock,
    visit: generateDoctorNextVisitCard(visit),
  }
}
