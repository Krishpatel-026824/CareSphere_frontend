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
}

export const DOCTOR_TAB_PATHS = {
  home: DOCTOR_PATHS.home,
  schedule: DOCTOR_PATHS.schedule,
  patients: DOCTOR_PATHS.patients,
  messages: DOCTOR_PATHS.messages,
  profile: DOCTOR_PATHS.profile,
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
