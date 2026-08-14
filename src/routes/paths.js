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
