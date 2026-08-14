import { appointmentsMock } from '../mocks/appointments'
import { appointmentClinicDefaultsMock, newAppointmentTasksMock } from '../mocks/appointmentClinics'
import { doctorAppointmentImageMap } from '../mocks/appointmentImages'
import { formatBookingDateLabel } from '../../utils/appointmentFormat'

export function generateAppointmentsData() {
  return {
    upcoming: appointmentsMock.filter((item) => item.status !== 'Completed'),
    all: appointmentsMock,
  }
}

export function generateAppointmentFromBooking(booking) {
  const doctor = booking?.doctor
  if (!doctor) return null

  const template = appointmentsMock.find((item) => item.doctorId === doctor.id)
  const clinic = appointmentClinicDefaultsMock[doctor.id] || {}
  const images = doctorAppointmentImageMap[doctor.id] || {
    doctorPhoto: doctor.avatar,
    heroImage: doctor.avatar,
    mapImage: null,
    clinicImage: doctor.avatar,
  }

  const source = template || clinic

  return {
    id: `apt-${booking.appointmentId || Date.now()}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    dateLabel: formatBookingDateLabel(booking.selectedDate),
    timeLabel: booking.selectedTime,
    status: 'Confirmed',
    clinic: source.clinic || doctor.hospital,
    clinicDetail: source.clinicDetail || source.clinic || doctor.hospital,
    location: source.location || 'Ahmedabad',
    visitType: source.visitType || 'In-clinic',
    address: source.address || `${doctor.hospital}, Ahmedabad`,
    fullAddress: source.fullAddress || `${doctor.hospital}, Ahmedabad`,
    mapCoords: source.mapCoords || { lat: 23.0225, lng: 72.5714 },
    phone: source.phone || '(901) 425-9878',
    room: source.room || 'Consultation Room 1',
    landmark: source.landmark || 'Ahmedabad',
    prepNote: source.prepNote || 'Arrive 15 minutes early. Bring your ID.',
    prepItems: source.prepItems || ['Valid photo ID', 'Insurance card'],
    ...images,
    tasks: (source.tasks || newAppointmentTasksMock).map((task, index) => ({
      ...task,
      id: `t${index + 1}`,
    })),
  }
}
