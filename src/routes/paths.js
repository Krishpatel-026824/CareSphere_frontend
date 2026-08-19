import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'

export const PATHS = {
  splash: '/',
  onboarding: '/onboarding',
  login: '/login',
  signup: '/signup',
  otp: '/otp',
  forgotPassword: '/forgot-password',
  home: '/home',
  notifications: '/notifications',
  search: '/search',
  messages: '/messages',
  appointments: '/appointments',
  newAppointment: '/appointments/new',
  newAppointmentBook: '/appointments/new/:doctorId',
  appointmentDetails: '/appointments/:id',
  reschedule: '/reschedule',
  telemedicine: '/telemedicine',
  pharmacy: '/pharmacy',
  labTests: '/lab-tests',
  healthRecords: '/health-records',
  doctors: '/doctors',
  doctorCategory: '/doctors/category/:category',
  doctorProfile: '/doctors/:doctorId',
  doctorBooking: '/doctors/:doctorId/book',
  bookingConfirmation: '/booking/confirmation',
  profile: '/profile',
}

export const TAB_PATHS = {
  home: PATHS.home,
  appointments: PATHS.appointments,
  pharmacy: PATHS.pharmacy,
  labTests: PATHS.labTests,
  health: PATHS.healthRecords,
  messages: PATHS.messages,
  profile: PATHS.profile,
}

export const DOCTOR_PATHS = {
  home: '/doctor/home',
  schedule: '/doctor/schedule',
  visit: '/doctor/schedule/:id',
  patients: '/doctor/patients',
  patient: '/doctor/patients/:patientId',
  messages: '/doctor/messages',
  profile: '/doctor/profile',
  notifications: '/doctor/notifications',
  consult: '/doctor/consult',
  prescribe: '/doctor/tools/prescribe',
  labs: '/doctor/tools/labs',
  notes: '/doctor/tools/notes',
  clinicTool: '/doctor/tools/:tool',
}

export const DOCTOR_TAB_PATHS = {
  home: DOCTOR_PATHS.home,
  schedule: DOCTOR_PATHS.schedule,
  patients: DOCTOR_PATHS.patients,
  messages: DOCTOR_PATHS.messages,
  profile: DOCTOR_PATHS.profile,
}

export function homePathForRole(roleType) {
  return roleType === AUTH_ROLE_DOCTOR ? DOCTOR_PATHS.home : PATHS.home
}

export function appointmentDetailsPath(id) {
  return `/appointments/${id}`
}

export function doctorCategoryPath(category) {
  return `/doctors/category/${encodeURIComponent(category)}`
}

export function doctorProfilePath(doctorId) {
  return `/doctors/${doctorId}`
}

export function doctorBookingPath(doctorId) {
  return `/doctors/${doctorId}/book`
}

export function newAppointmentBookPath(doctorId) {
  return `/appointments/new/${doctorId}`
}

export function doctorPortalVisitPath(id) {
  return `/doctor/schedule/${id}`
}

export function doctorPortalPatientPath(patientId) {
  return `/doctor/patients/${patientId}`
}

export function doctorClinicToolPath(tool) {
  return `/doctor/tools/${tool}`
}
