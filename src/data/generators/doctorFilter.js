const topRatedDoctorOrder = ['doc-104', 'doc-101', 'doc-105', 'doc-106', 'doc-102']

export function filterDoctorsByQuickFilter(doctors, filterId) {
  const list = Array.isArray(doctors) ? [...doctors] : []

  switch (filterId) {
    case 'available':
      return list
        .filter((doctor) => doctor.availableToday === true)
        .sort((a, b) => b.rating - a.rating)
    case 'rated':
      return list
        .filter((doctor) => Number(doctor.rating) >= 4.7)
        .sort(
          (a, b) =>
            topRatedDoctorOrder.indexOf(a.id) - topRatedDoctorOrder.indexOf(b.id) ||
            b.rating - a.rating
        )
    case 'near':
      return list
        .filter((doctor) => Number(doctor.distanceKm) <= 5)
        .sort((a, b) => a.distanceKm - b.distanceKm)
    case 'video':
      return list
        .filter((doctor) => doctor.videoConsult === true)
        .sort((a, b) => b.rating - a.rating)
    default:
      return list
  }
}

export const doctorFilterTitles = {
  available: 'Available Today',
  rated: 'Top Rated Doctors',
  near: 'Doctors Near You',
  video: 'Video Consult Doctors',
}

export const doctorFilterHints = {
  available: 'Doctors with open slots today',
  rated: 'Highest rated doctors nearby',
  near: 'Closest doctors within 5 km',
  video: 'Doctors available for video consult',
}
