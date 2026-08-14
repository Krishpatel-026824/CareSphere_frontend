import { getVideoConsultDoctors } from './quickActionsGenerator'

export function filterTelemedicineDoctors(doctors, filters) {
  return getVideoConsultDoctors(doctors).filter((doctor) => {
    if (filters.specialty && doctor.specialty !== filters.specialty) return false
    if (filters.clinics.length > 0 && !filters.clinics.some((clinic) => doctor.hospital.includes(clinic))) {
      return false
    }
    if (filters.locations.length > 0 && !filters.locations.some((loc) => doctor.hospital.includes(loc))) {
      return false
    }
    if (filters.highRated && Number(doctor.rating) < 4) return false
    if (filters.available && doctor.availableToday !== true) return false
    return true
  })
}
