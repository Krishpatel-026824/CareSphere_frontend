import { doctorVisitTimeSlotsMock } from '../../data/mocks/doctorVisits'
import { formatDateLabel } from '../../utils/appointmentFormat'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function generateBookVisitDateOptions(count = 14, now = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(now.getDate() + index)
    const label = formatDateLabel(date)
    return {
      id: label,
      label,
      weekday: WEEKDAYS[date.getDay()],
      day: date.getDate(),
      month: MONTHS[date.getMonth()],
      isToday: index === 0,
      isTomorrow: index === 1,
    }
  })
}

export function generateBookVisitTimeOptions() {
  return doctorVisitTimeSlotsMock.map((label) => ({ id: label, label }))
}

export function groupBookVisitTimeOptions(times = []) {
  const morning = []
  const afternoon = []

  times.forEach((slot) => {
    if (/AM/i.test(slot.label) || slot.label.startsWith('12:')) morning.push(slot)
    else afternoon.push(slot)
  })

  return { morning, afternoon }
}
