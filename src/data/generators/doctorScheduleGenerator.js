import { doctorExtraVisitsMock, doctorLinkedPatientMock } from '../mocks/doctorVisits'
import { DEFAULT_DOCTOR_ID } from '../mocks/doctorSession'

export function generateDoctorExtraVisits() {
  return doctorExtraVisitsMock.map((visit) => toDoctorVisit(visit))
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
  const extras = extraVisits
    .filter((item) => item.doctorId === doctorId)
    .filter((item) => !linkedIds.has(item.id))
    .map((item) => toDoctorVisit(item))

  return [...linked, ...extras]
}

export function visitsForPatient(visits = [], patientId) {
  return visits.filter((item) => item.patientId === patientId)
}
