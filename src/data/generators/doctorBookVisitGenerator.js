import { doctorVisitTimeSlotsMock } from '../../data/mocks/doctorVisits'
import { formatDateLabel } from '../../utils/appointmentFormat'

export function generateBookVisitDateOptions(count = 14, now = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(now.getDate() + index)
    const label = formatDateLabel(date)
    return {
      id: label,
      label,
      isToday: index === 0,
    }
  })
}

export function generateBookVisitTimeOptions() {
  return doctorVisitTimeSlotsMock.map((label) => ({ id: label, label }))
}
