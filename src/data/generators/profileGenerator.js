import { generateCareCircleMembers } from './careCircleGenerator'
import {
  profileDetailsMock,
  profileFieldsMock,
  profileInfoRowsMock,
  profileMenuMock,
  profilePrefsMock,
  profileStatsMock,
} from '../mocks/profile'

function initialsFromName(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'CS'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export function generateProfileData() {
  return {
    details: { ...profileDetailsMock },
    prefs: profilePrefsMock.map((item) => ({ ...item })),
    stats: profileStatsMock,
    fields: profileFieldsMock,
    infoRows: profileInfoRowsMock,
    menu: profileMenuMock,
    careCircle: generateCareCircleMembers(),
  }
}

export function withUpdatedDetails(details, patch) {
  const next = { ...details, ...patch }
  return { ...next, initials: initialsFromName(next.name) }
}

export function withLiveProfileStats(stats = [], counts = {}) {
  return stats.map((item) => {
    if (counts[item.id] == null) return item
    return { ...item, value: String(counts[item.id]) }
  })
}
