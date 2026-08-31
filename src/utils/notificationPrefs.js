const PATIENT_PREF_TYPES = {
  reminders: ['appointment'],
  'lab-reports': ['lab'],
  medicine: ['medicine'],
  messages: ['message'],
}

const DOCTOR_PREF_TYPES = {
  reminders: ['reminder', 'cancellation', 'slot'],
  bookings: ['booking'],
  'lab-reports': ['report'],
  messages: ['message'],
}

function prefTypeMap(workspace) {
  return workspace === 'doctor' ? DOCTOR_PREF_TYPES : PATIENT_PREF_TYPES
}

function isTypeEnabled(type, prefs, workspace) {
  const map = prefTypeMap(workspace)
  const prefEntry = Object.entries(map).find(([, types]) => types.includes(type))
  if (!prefEntry) return true
  const pref = prefs.find((item) => item.id === prefEntry[0])
  return pref?.on !== false
}

export function filterNotificationsByPrefs(notifications = [], prefs = [], workspace = 'patient') {
  return notifications.filter((item) => isTypeEnabled(item.type, prefs, workspace))
}
