export const AUTH_ROLE_PATIENT = 'patient'
export const AUTH_ROLE_DOCTOR = 'doctor'

export const authRoleOptions = [
  { id: AUTH_ROLE_PATIENT, label: 'Patient' },
  { id: AUTH_ROLE_DOCTOR, label: 'Doctor' },
]

export const patientSessionMock = {
  name: 'Krish',
  roleType: AUTH_ROLE_PATIENT,
  role: 'Care member',
  initials: 'KP',
  doctorId: null,
  avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
}

export const doctorSessionMock = {
  id: 'doc-101',
  doctorId: 'doc-101',
  name: 'Dr. James Carter',
  roleType: AUTH_ROLE_DOCTOR,
  role: 'Cardiologist',
  initials: 'JC',
  email: 'james.carter@caresphere.com',
  phone: '(901) 425-9878',
  hospital: 'CareSphere Heart Center',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
}
