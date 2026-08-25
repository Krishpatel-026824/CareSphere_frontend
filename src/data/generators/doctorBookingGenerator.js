import { extraDoctorAvatars } from '../mocks/doctorAvatars'
import { doctorBookingMock, doctorCategoriesMock } from '../mocks/doctorBooking'
import { extraDoctorsMock } from '../mocks/doctorsExtra'
import { generateSlotDates } from '../../utils/appointmentFormat'

const defaultTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '04:00 PM']

function withDoctorDefaults(doctor) {
  const merged = {
    languages: ['English', 'Spanish'],
    availableToday: true,
    patientsCount: '800+',
    ...doctor,
    avatar: extraDoctorAvatars[doctor.id] || doctor.avatar,
  }

  return {
    ...merged,
    slots: {
      dates: generateSlotDates(merged.slots?.dates?.length || 4, 1),
      times: merged.slots?.times || defaultTimes,
    },
  }
}

function uniqueByDoctorId(doctors = []) {
  const seen = new Set()
  return doctors.filter((doctor) => {
    if (!doctor?.id || seen.has(doctor.id)) return false
    seen.add(doctor.id)
    return true
  })
}

export function generateDoctorBookingData() {
  return {
    location: 'Ahmedabad',
    categories: doctorCategoriesMock,
    doctors: uniqueByDoctorId([...doctorBookingMock, ...extraDoctorsMock]).map(withDoctorDefaults),
  }
}

export function generateDoctorsForSpecialty(doctors = [], specialty = 'All') {
  if (!specialty || specialty === 'All') return doctors
  return doctors.filter((doctor) => doctor.specialty === specialty)
}
