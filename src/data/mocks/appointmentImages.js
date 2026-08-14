import clinicAmit from '../../assets/appointments/clinic-amit.jpg'
import clinicJay from '../../assets/appointments/clinic-jay.jpg'
import clinicKavya from '../../assets/appointments/clinic-kavya.jpg'
import clinicMeera from '../../assets/appointments/clinic-meera.jpg'
import clinicRohan from '../../assets/appointments/clinic-rohan.jpg'
import doctorAmit from '../../assets/appointments/doctor-amit.jpg'
import doctorJay from '../../assets/appointments/doctor-jay.jpg'
import doctorKavya from '../../assets/appointments/doctor-kavya.jpg'
import doctorMeera from '../../assets/appointments/doctor-meera.jpg'
import doctorRohan from '../../assets/appointments/doctor-rohan.jpg'
import heroAmit from '../../assets/appointments/hero-amit.jpg'
import heroJay from '../../assets/appointments/hero-jay.jpg'
import heroKavya from '../../assets/appointments/hero-kavya.jpg'
import heroMeera from '../../assets/appointments/hero-meera.jpg'
import heroRohan from '../../assets/appointments/hero-rohan.jpg'
import mapAmit from '../../assets/appointments/map-amit.jpg'
import mapJay from '../../assets/appointments/map-jay.jpg'
import mapKavya from '../../assets/appointments/map-kavya.jpg'
import mapMeera from '../../assets/appointments/map-meera.jpg'
import mapRohan from '../../assets/appointments/map-rohan.jpg'

export const doctorAppointmentImageMap = {
  'doc-101': {
    doctorPhoto: doctorRohan,
    heroImage: heroRohan,
    mapImage: mapRohan,
    clinicImage: clinicRohan,
  },
  'doc-102': {
    doctorPhoto: doctorAmit,
    heroImage: heroAmit,
    mapImage: mapAmit,
    clinicImage: clinicAmit,
  },
  'doc-104': {
    doctorPhoto: doctorKavya,
    heroImage: heroKavya,
    mapImage: mapKavya,
    clinicImage: clinicKavya,
  },
  'doc-105': {
    doctorPhoto: doctorJay,
    heroImage: heroJay,
    mapImage: mapJay,
    clinicImage: clinicJay,
  },
  'doc-106': {
    doctorPhoto: doctorMeera,
    heroImage: heroMeera,
    mapImage: mapMeera,
    clinicImage: clinicMeera,
  },
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
    heroImage: images.heroImage || appointment.heroImage,
    mapImage: images.mapImage || appointment.mapImage,
    clinicImage: images.clinicImage || appointment.clinicImage,
  }
}

export function resolveAppointmentsImages(appointments = []) {
  return appointments.map(resolveAppointmentImages)
}
