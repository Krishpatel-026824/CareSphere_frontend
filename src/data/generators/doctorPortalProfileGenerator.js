import {
  doctorClinicTeamMock,
  doctorProfileDetailsMock,
  doctorProfileFieldsMock,
  doctorProfileInfoRowsMock,
  doctorProfileMenuMock,
  doctorProfilePrefsMock,
  doctorProfileStatsMock,
} from '../mocks/doctorProfile'

function initialsFromName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'CS'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export function generateDoctorPortalProfileData() {
  return {
    details: { ...doctorProfileDetailsMock },
    prefs: doctorProfilePrefsMock.map((item) => ({ ...item })),
    stats: doctorProfileStatsMock,
    fields: doctorProfileFieldsMock,
    infoRows: doctorProfileInfoRowsMock,
    menu: doctorProfileMenuMock,
    careCircle: doctorClinicTeamMock.map((item) => ({ ...item })),
  }
}

export function withUpdatedDoctorDetails(details, patch) {
  const next = { ...details, ...patch }
  return { ...next, initials: initialsFromName(next.name) }
}
