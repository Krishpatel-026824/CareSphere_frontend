import { doctorClinicDefaultsMock, doctorLinkedPatientMock, doctorVisitTimeSlotsMock } from '../mocks/doctorVisits'
import { doctorPatientsMock } from '../mocks/doctorPatients'
import { DEFAULT_DOCTOR_ID } from '../mocks/doctorSession'
import { formatDateLabel, parseAppointmentDate, visitDayHeading } from '../../utils/appointmentFormat'

export function generateDoctorExtraVisits(now = new Date()) {
  return doctorPatientsMock.map((patient, index) => {
    const statusCycle = ['Upcoming', 'Confirmed', 'Completed', 'Cancelled']
    const status = statusCycle[index % statusCycle.length]
    const dayOffset =
      status === 'Completed' || status === 'Cancelled'
        ? -(Math.floor(index / 4) + 1)
        : Math.floor(index / 3)
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + dayOffset)

    return toDoctorVisit({
      id: `dvis-${patient.id}`,
      doctorId: DEFAULT_DOCTOR_ID,
      patientId: patient.id,
      patientName: patient.name,
      patientPhoto: patient.avatar,
      dateLabel: formatDateLabel(date),
      timeLabel: doctorVisitTimeSlotsMock[index % doctorVisitTimeSlotsMock.length],
      status,
      ...doctorClinicDefaultsMock,
      room: `Consultation Room ${(index % 5) + 1}`,
      prepNote: `Consult for ${patient.name}. Review latest notes and vitals.`,
      prepItems: ['Valid photo ID', 'Previous prescriptions'],
    })
  })
}

export function toDoctorVisit(visit, patient) {
  const person = patient || {
    id: visit.patientId,
    name: visit.patientName,
    avatar: visit.patientPhoto,
  }

  return {
    ...visit,
    patientId: person.id,
    patientName: person.name,
    patientPhoto: person.avatar,
    doctorName: person.name,
    doctorPhoto: person.avatar,
  }
}

export function mapAppointmentToDoctorVisit(appointment, patient = doctorLinkedPatientMock) {
  if (!appointment) return null

  return toDoctorVisit(
    {
      ...appointment,
      linkedAppointmentId: appointment.id,
      patientId: patient.id,
      patientName: patient.name,
      patientPhoto: patient.avatar,
      visitReason: patient.visitReason,
      visitType: appointment.visitType || doctorClinicDefaultsMock.visitType,
      room:
        appointment.room && !String(appointment.room).toLowerCase().includes('video')
          ? appointment.room
          : doctorClinicDefaultsMock.room,
    },
    patient,
  )
}

export function mergeDoctorVisits(appointments = [], extraVisits = [], doctorId = DEFAULT_DOCTOR_ID) {
  const linked = appointments
    .filter((item) => item.doctorId === doctorId)
    .map((item) => mapAppointmentToDoctorVisit(item))
    .filter(Boolean)

  const linkedIds = new Set(linked.map((item) => item.linkedAppointmentId))
  const linkedPatientIds = new Set(linked.map((item) => item.patientId).filter(Boolean))

  const extras = extraVisits
    .filter((item) => item.doctorId === doctorId)
    .filter((item) => !linkedIds.has(item.id))
    .filter((item) => !linkedPatientIds.has(item.patientId))
    .map((item) => toDoctorVisit(item))

  return [...linked, ...extras]
}

export function visitsForPatient(visits = [], patientId) {
  return visits.filter((item) => item.patientId === patientId)
}

export function generateDoctorScheduleSummary(visits = [], now = new Date()) {
  const todayLabel = formatDateLabel(now)
  return {
    todayLabel,
    dateLine: now.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    todayCount: visits.filter((item) => item.dateLabel === todayLabel).length,
    confirmedCount: visits.filter((item) => item.status === 'Confirmed').length,
    upcomingCount: visits.filter((item) => item.status === 'Upcoming').length,
    totalCount: visits.length,
  }
}

export function generateDoctorScheduleDays(visits = [], now = new Date(), dayCount = 10) {
  const todayLabel = formatDateLabel(now)
  const activeStatuses = new Set(['Upcoming', 'Confirmed'])
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - 3)

  return Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    const dateLabel = formatDateLabel(date)
    const dayVisits = visits.filter(
      (visit) => visit.dateLabel === dateLabel && activeStatuses.has(visit.status),
    )

    return {
      id: dateLabel,
      dateLabel,
      weekday: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: String(date.getDate()),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      heading: visitDayHeading(dateLabel, now),
      isToday: dateLabel === todayLabel,
      count: dayVisits.length,
      sortKey: date.getTime(),
    }
  })
}
