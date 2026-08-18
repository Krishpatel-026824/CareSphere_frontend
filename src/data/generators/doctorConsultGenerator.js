import { generateDoctorNextVisitCard } from './doctorNextVisitGenerator'
import { doctorConsultPageMock } from '../mocks/doctorConsult'

export function generateDoctorConsultPage(visit) {
  const card = generateDoctorNextVisitCard(visit)
  if (!card) {
    return { ...doctorConsultPageMock, visit: null }
  }

  const visitReason = card.visitReason || card.prepNote || ''
  const prepNote = card.prepNote && card.prepNote !== visitReason ? card.prepNote : ''

  return {
    ...doctorConsultPageMock,
    subtitle: `Join ${card.patientName} · ${card.timeLabel}`,
    visit: {
      ...card,
      visitReason,
      prepNote,
    },
  }
}
