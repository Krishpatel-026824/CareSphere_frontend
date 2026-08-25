import {
  doctorPatientProfileDefaults,
  doctorPatientProfilesMock,
} from '../mocks/doctorPatientProfiles'

export function generateDoctorPatientProfile(patient) {
  if (!patient) return null
  const extras = doctorPatientProfilesMock[patient.id] || doctorPatientProfileDefaults

  return {
    ...patient,
    ...doctorPatientProfileDefaults,
    ...extras,
  }
}
