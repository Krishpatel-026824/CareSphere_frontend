import { doctorAppointmentImageMap } from '../mocks/appointmentImages'

export function generateRescheduleDoctors(doctors = [], appointments = [], currentDoctorId) {
  const byId = new Map(appointments.map((item) => [item.doctorId, item]))

  const mapped = doctors.map((doctor) => {
    const appointment = byId.get(doctor.id)
    const images = doctorAppointmentImageMap[doctor.id] || {}

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
      status: appointment?.status || 'Available',
      visitType: appointment?.visitType || (doctor.videoConsult ? 'Video / In-clinic' : 'In-clinic'),
      nextDate: doctor.slots?.dates?.[0],
      nextTime: doctor.slots?.times?.[0],
    }
  })

  return mapped.sort((left, right) => {
    if (left.id === currentDoctorId) return -1
    if (right.id === currentDoctorId) return 1
    const leftBooked = Boolean(left.dateLabel)
    const rightBooked = Boolean(right.dateLabel)
    if (leftBooked !== rightBooked) return leftBooked ? -1 : 1
    return left.name.localeCompare(right.name)
  })
}
