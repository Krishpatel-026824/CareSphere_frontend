import { doctorAppointmentImageMap } from '../mocks/appointmentImages'

const rescheduleDoctorIds = ['doc-101', 'doc-104', 'doc-106', 'doc-102', 'doc-105']

export function generateRescheduleDoctors(doctors = [], appointments = []) {
  return rescheduleDoctorIds
    .map((id) => {
      const doctor = doctors.find((item) => item.id === id)
      const appointment = appointments.find((item) => item.doctorId === id)
      const images = doctorAppointmentImageMap[id] || {}
      if (!doctor) return null

      return {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        clinic: appointment?.clinic || doctor.hospital,
        photo: images.doctorPhoto || appointment?.doctorPhoto || doctor.avatar,
        fee: doctor.fee,
        rating: doctor.rating,
        reviewCount: doctor.reviewCount,
        experience: doctor.experience,
        dateLabel: appointment?.dateLabel,
        timeLabel: appointment?.timeLabel,
        status: appointment?.status,
        visitType: appointment?.visitType,
        nextDate: doctor.slots?.dates?.[0],
        nextTime: doctor.slots?.times?.[0],
      }
    })
    .filter(Boolean)
}
