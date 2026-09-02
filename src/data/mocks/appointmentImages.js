import { getProfilePhotoDisplayUrl } from '../../utils/profilePhotoUrl'

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
  'doc-110': { doctorPhoto: 'https://randomuser.me/api/portraits/men/36.jpg' },
  'doc-111': { doctorPhoto: 'https://randomuser.me/api/portraits/women/55.jpg' },
  'doc-112': { doctorPhoto: 'https://randomuser.me/api/portraits/men/41.jpg' },
  'doc-113': { doctorPhoto: 'https://randomuser.me/api/portraits/women/62.jpg' },
  'doc-114': { doctorPhoto: 'https://randomuser.me/api/portraits/women/70.jpg' },
  'doc-115': { doctorPhoto: 'https://randomuser.me/api/portraits/men/58.jpg' },
  'doc-116': { doctorPhoto: 'https://randomuser.me/api/portraits/women/42.jpg' },
  'doc-117': { doctorPhoto: 'https://randomuser.me/api/portraits/men/29.jpg' },
  'doc-118': { doctorPhoto: 'https://randomuser.me/api/portraits/women/38.jpg' },
  'doc-119': { doctorPhoto: 'https://randomuser.me/api/portraits/women/48.jpg' },
  'doc-120': { doctorPhoto: 'https://randomuser.me/api/portraits/women/53.jpg' },
  'doc-121': { doctorPhoto: 'https://randomuser.me/api/portraits/women/60.jpg' },
  'doc-122': { doctorPhoto: 'https://randomuser.me/api/portraits/men/66.jpg' },
  'doc-123': { doctorPhoto: 'https://randomuser.me/api/portraits/women/35.jpg' },
  'doc-124': { doctorPhoto: 'https://randomuser.me/api/portraits/men/55.jpg' },
  'doc-125': { doctorPhoto: 'https://randomuser.me/api/portraits/men/47.jpg' },
  'doc-126': { doctorPhoto: 'https://randomuser.me/api/portraits/women/45.jpg' },
  'doc-127': { doctorPhoto: 'https://randomuser.me/api/portraits/men/25.jpg' },
  'doc-210': { doctorPhoto: 'https://randomuser.me/api/portraits/men/36.jpg' },
  'doc-211': { doctorPhoto: 'https://randomuser.me/api/portraits/women/55.jpg' },
  'doc-212': { doctorPhoto: 'https://randomuser.me/api/portraits/men/41.jpg' },
  'doc-213': { doctorPhoto: 'https://randomuser.me/api/portraits/women/62.jpg' },
  'doc-214': { doctorPhoto: 'https://randomuser.me/api/portraits/women/70.jpg' },
  'doc-215': { doctorPhoto: 'https://randomuser.me/api/portraits/men/58.jpg' },
  'doc-216': { doctorPhoto: 'https://randomuser.me/api/portraits/women/42.jpg' },
  'doc-217': { doctorPhoto: 'https://randomuser.me/api/portraits/men/29.jpg' },
  'doc-218': { doctorPhoto: 'https://randomuser.me/api/portraits/women/38.jpg' },
  'doc-219': { doctorPhoto: 'https://randomuser.me/api/portraits/women/48.jpg' },
  'doc-220': { doctorPhoto: 'https://randomuser.me/api/portraits/women/53.jpg' },
  'doc-221': { doctorPhoto: 'https://randomuser.me/api/portraits/women/60.jpg' },
  'doc-222': { doctorPhoto: 'https://randomuser.me/api/portraits/men/66.jpg' },
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

  const doctorPhoto = images.doctorPhoto || appointment.doctorPhoto

  return {
    ...appointment,
    doctorPhoto: doctorPhoto ? getProfilePhotoDisplayUrl(doctorPhoto) : doctorPhoto,
  }
}

export function resolveAppointmentsImages(appointments = []) {
  return appointments.map(resolveAppointmentImages)
}
