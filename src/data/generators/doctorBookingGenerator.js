import { extraDoctorAvatars } from '../mocks/doctorAvatars'
import { doctorBookingMock, doctorCategoriesMock } from '../mocks/doctorBooking'
import { extraDoctorsMock } from '../mocks/doctorsExtra'

const defaultSlots = {
  dates: ['Mon 26 May', 'Tue 27 May', 'Wed 28 May'],
  times: ['10:00 AM', '10:30 AM', '11:00 AM', '04:00 PM'],
}

function withDoctorDefaults(doctor) {
  return {
    languages: ['English', 'Spanish'],
    availableToday: true,
    videoConsult: true,
    patientsCount: '800+',
    slots: defaultSlots,
    ...doctor,
    avatar: extraDoctorAvatars[doctor.id] || doctor.avatar,
  }
}

export function generateDoctorBookingData() {
  return {
    location: 'Ahmedabad',
    categories: doctorCategoriesMock,
    doctors: [...doctorBookingMock, ...extraDoctorsMock].map(withDoctorDefaults),
  }
}

export function generateDoctorsForSpecialty(doctors = [], specialty = 'All') {
  if (!specialty || specialty === 'All') return doctors
  return doctors.filter((doctor) => doctor.specialty === specialty)
}
