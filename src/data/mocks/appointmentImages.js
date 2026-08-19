const doctorRohan = 'https://randomuser.me/api/portraits/men/32.jpg'
const doctorAmit = 'https://randomuser.me/api/portraits/men/45.jpg'
const doctorKavya = 'https://randomuser.me/api/portraits/women/44.jpg'
const doctorJay = 'https://randomuser.me/api/portraits/men/52.jpg'
const doctorMeera = 'https://randomuser.me/api/portraits/women/65.jpg'

export const doctorAppointmentImageMap = {
  'doc-101': { doctorPhoto: doctorRohan },
  'doc-102': { doctorPhoto: doctorAmit },
  'doc-103': { doctorPhoto: 'https://randomuser.me/api/portraits/men/60.jpg' },
  'doc-104': { doctorPhoto: doctorKavya },
  'doc-105': { doctorPhoto: doctorJay },
  'doc-106': { doctorPhoto: doctorMeera },
  'doc-107': { doctorPhoto: 'https://randomuser.me/api/portraits/men/75.jpg' },
  'doc-108': { doctorPhoto: 'https://randomuser.me/api/portraits/women/50.jpg' },
  'doc-109': { doctorPhoto: 'https://randomuser.me/api/portraits/men/22.jpg' },
}

export const appointmentImageMap = {
  'apt-1': doctorAppointmentImageMap['doc-101'],
  'apt-2': doctorAppointmentImageMap['doc-104'],
  'apt-3': doctorAppointmentImageMap['doc-106'],
  'apt-4': doctorAppointmentImageMap['doc-102'],
  'apt-5': doctorAppointmentImageMap['doc-105'],
}

export function resolveAppointmentImages(appointment) {
  if (!appointment) return appointment

  const images =
    doctorAppointmentImageMap[appointment.doctorId] || appointmentImageMap[appointment.id] || {}

  return {
    ...appointment,
    doctorPhoto: images.doctorPhoto || appointment.doctorPhoto,
  }
}

export function resolveAppointmentsImages(appointments = []) {
  return appointments.map(resolveAppointmentImages)
}
