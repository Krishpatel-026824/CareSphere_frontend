const LAB_REPORTS_KEY = 'caresphere.labReports'
const LAB_BOOKINGS_KEY = 'labBookings'

function loadJson(key, fallback = []) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function saveJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore storage failures */
  }
}

export function loadStoredLabReports() {
  return loadJson(LAB_REPORTS_KEY, [])
}

export function saveStoredLabReports(reports = []) {
  saveJson(LAB_REPORTS_KEY, reports)
}

export function loadStoredLabBookings() {
  return loadJson(LAB_BOOKINGS_KEY, [])
}

export function sortHealthRecords(records = []) {
  return [...records].sort((left, right) => {
    const leftTime = Date.parse(left?.dateLabel || '') || 0
    const rightTime = Date.parse(right?.dateLabel || '') || 0
    return rightTime - leftTime
  })
}

export function mergeLabReports(existing = [], incoming = []) {
  const map = new Map(existing.map((report) => [report.id, report]))
  incoming.forEach((report) => {
    if (report?.id) map.set(report.id, report)
  })
  return [...map.values()]
}

export function mergeHealthRecords(baseRecords = [], labReports = []) {
  const existingIds = new Set(baseRecords.map((record) => record.id))
  const fresh = labReports
    .map((report) => report.healthRecord || report)
    .filter((record) => record?.id && !existingIds.has(record.id))

  return sortHealthRecords([...fresh, ...baseRecords])
}
