import { doctorVisitTimeSlotsMock } from '../mocks/doctorVisits'
import { formatDateLabel, parseAppointmentDate } from '../../utils/appointmentFormat'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function startOfDay(date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function buildBookVisitCalendarMonth(viewDate = new Date(), now = new Date()) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const leading = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = startOfDay(now)
  const cells = []

  for (let index = 0; index < leading; index += 1) {
    cells.push({ key: `empty-${index}`, empty: true })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = startOfDay(new Date(year, month, day))
    const label = formatDateLabel(date)
    cells.push({
      key: label,
      day,
      label,
      weekday: WEEKDAYS[date.getDay()],
      month: MONTHS[month],
      isToday: date.getTime() === today.getTime(),
      isPast: date < today,
    })
  }

  return {
    month,
    year,
    monthLabel: `${MONTH_NAMES[month]} ${year}`,
    weekdayHeaders: WEEKDAY_HEADERS,
    cells,
  }
}

export function getDefaultBookVisitDate(now = new Date()) {
  const date = startOfDay(now)
  date.setDate(date.getDate() + 1)
  return formatDateLabel(date)
}

export function getBookVisitDateSummary(label, now = new Date()) {
  const parsed = parseAppointmentDate(label, '', now)
  if (!parsed) {
    return { label, weekday: '—', day: '—', month: '—', isToday: false, isTomorrow: false }
  }

  const today = startOfDay(now)
  const tomorrow = startOfDay(now)
  tomorrow.setDate(today.getDate() + 1)
  const date = startOfDay(parsed)

  return {
    label,
    weekday: WEEKDAYS[date.getDay()],
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    isToday: date.getTime() === today.getTime(),
    isTomorrow: date.getTime() === tomorrow.getTime(),
  }
}

export function generateBookVisitDateOptions(count = 14, now = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = startOfDay(now)
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
