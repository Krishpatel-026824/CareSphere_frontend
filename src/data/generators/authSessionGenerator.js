import { AUTH_ROLE_DOCTOR, doctorSessionMock, patientSessionMock } from '../mocks/authRoles'

export function generateAuthSession(roleType = 'patient', extra = {}) {
  const isDoctor = roleType === AUTH_ROLE_DOCTOR
  const base = isDoctor ? doctorSessionMock : patientSessionMock
  return {
    ...base,
    ...extra,
    roleType: isDoctor ? AUTH_ROLE_DOCTOR : 'patient',
  }
}
