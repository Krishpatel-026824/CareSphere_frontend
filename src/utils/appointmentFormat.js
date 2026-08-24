import { appointmentsMock } from '../data/mocks/appointments'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ACTIVE_UPCOMING = new Set(['Upcoming', 'Confirmed'])
const LIST_RANK = { Confirmed: 0, Upcoming: 1, Completed: 2, Cancelled: 3 }

function startOfDay(date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function parseTimeParts(timeLabel = '') {
  const match = String(timeLabel)
    .trim()
    .match(/(\d{1,2}):(\d{2})\s*(?:-\s*\d{1,2}:\d{2}\s*)?(AM|PM)/i)
  if (!match) return { hours: 0, minutes: 0 }
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours < 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return { hours, minutes }
}

const SEED_APPOINTMENT_IDS = new Set(appointmentsMock.map((item) => item.id))

export function isUserBookedAppointment(appointment) {
  if (!appointment?.id) return false
  if (appointment.isUserBooked || appointment.isUserBooked) return true
  return !SEED_APPOINTMENT_IDS.has(appointment.id)
}

export function parseAppointmentDate(dateLabel = '', timeLabel = '', now = new Date()) {
  const raw = String(dateLabel).trim()
  if (!raw) return null

  const withYear = /\d{4}/.test(raw) ? raw.replace(/^[A-Za-z]{3}\s+/, '') : `${raw} ${now.getFullYear()}`
  const parsed = new Date(withYear)
  if (Number.isNaN(parsed.getTime())) return null

  if (!/\d{4}/.test(raw) && parsed < startOfDay(now)) {
    parsed.setFullYear(parsed.getFullYear() + 1)
  }

  const { hours, minutes } = parseTimeParts(timeLabel)
  parsed.setHours(hours, minutes, 0, 0)
  return parsed
}

export function formatDateLabel(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatSlotDate(date) {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

export function generateSlotDates(count = 5, startOffset = 1, now = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now)
    date.setDate(now.getDate() + startOffset + index)
    return formatSlotDate(date)
  })
}

export function formatBookingDateLabel(slotDate = '', now = new Date()) {
  const parsed = parseAppointmentDate(slotDate, '', now)
  return parsed ? formatDateLabel(parsed) : slotDate
}

export function applyBookingToAppointment(appointment, booking) {
  if (!appointment || !booking) return appointment

  const doctor = booking.doctor
  const template =
    appointmentsMock.find((item) => item.doctorId === doctor?.id) || appointment

  return {
    ...appointment,
    doctorId: doctor?.id || appointment.doctorId,
    doctorName: doctor?.name || appointment.doctorName,
    specialty: doctor?.specialty || appointment.specialty,
    clinic: template.clinic,
    clinicDetail: template.clinicDetail || template.clinic,
    location: template.location,
    visitType: template.visitType,
    address: template.address,
    fullAddress: template.fullAddress,
    mapCoords: template.mapCoords,
    phone: template.phone,
    room: template.room,
    landmark: template.landmark,
    prepNote: template.prepNote,
    prepItems: template.prepItems,
    dateLabel: formatBookingDateLabel(booking.selectedDate),
    timeLabel: booking.selectedTime,
    status: 'Confirmed',
    isUserBooked: true,
  }
}

export function isActiveUpcoming(appointment) {
  return ACTIVE_UPCOMING.has(appointment?.status)
}

export function getUpcomingAppointment(appointments = [], now = new Date()) {
  const today = startOfDay(now).getTime()

  return (
    appointments
      .filter(isActiveUpcoming)
      .map((item) => ({
        item,
        time: parseAppointmentDate(item.dateLabel, item.timeLabel, now)?.getTime() ?? Infinity,
      }))
      .filter(({ time }) => time >= today)
      .sort((left, right) => left.time - right.time)[0]?.item || null
  )
}

/** Earliest upcoming visit the user booked — used on the home page. */
export function getHomeBookedAppointment(appointments = [], now = new Date()) {
  const booked = appointments.filter(isUserBookedAppointment)
  return getUpcomingAppointment(booked, now)
}

export function sortAppointmentsForList(appointments = [], now = new Date()) {
  return [...appointments].sort((left, right) => {
    const rankLeft = LIST_RANK[left.status] ?? 9
    const rankRight = LIST_RANK[right.status] ?? 9
    if (rankLeft !== rankRight) return rankLeft - rankRight

    const timeLeft = parseAppointmentDate(left.dateLabel, left.timeLabel, now)?.getTime() || 0
    const timeRight = parseAppointmentDate(right.dateLabel, right.timeLabel, now)?.getTime() || 0
    if (left.status === 'Completed' || left.status === 'Cancelled') return timeRight - timeLeft
    return timeLeft - timeRight
  })
}

export function countUpcomingAppointments(appointments = [], now = new Date()) {
  const today = startOfDay(now).getTime()
  return appointments.filter((item) => {
    if (!isActiveUpcoming(item)) return false
    const time = parseAppointmentDate(item.dateLabel, item.timeLabel, now)?.getTime()
    return time == null || time >= today
  }).length
}

export function visitDayHeading(dateLabel, now = new Date()) {
  const parsed = parseAppointmentDate(dateLabel, '12:00 AM', now)
  if (!parsed) return dateLabel

  const diff = Math.round((startOfDay(parsed) - startOfDay(now)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  return dateLabel
}

export function groupVisitsByDate(visits = []) {
  const groups = []
  const map = new Map()

  visits.forEach((visit) => {
    const key = visit.dateLabel || 'Upcoming'
    if (!map.has(key)) {
      const group = { id: key, label: key, visits: [] }
      map.set(key, group)
      groups.push(group)
    }
    map.get(key).visits.push(visit)
  })

  return groups
}
