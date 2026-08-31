const PATIENT_PREFS_KEY = 'caresphere.patientPrefs'
const DOCTOR_PREFS_KEY = 'caresphere.doctorPrefs'

function readPrefs(key, defaults) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return defaults.map((item) => ({ ...item }))
    const saved = JSON.parse(raw)
    return defaults.map((item) => ({
      ...item,
      on: typeof saved[item.id] === 'boolean' ? saved[item.id] : item.on,
    }))
  } catch {
    return defaults.map((item) => ({ ...item }))
  }
}

function writePrefs(key, prefs) {
  try {
    const payload = Object.fromEntries(prefs.map((item) => [item.id, item.on]))
    window.localStorage.setItem(key, JSON.stringify(payload))
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadPatientPrefs(defaults) {
  return readPrefs(PATIENT_PREFS_KEY, defaults)
}

export function savePatientPrefs(prefs) {
  writePrefs(PATIENT_PREFS_KEY, prefs)
}

export function loadDoctorPrefs(defaults) {
  return readPrefs(DOCTOR_PREFS_KEY, defaults)
}

export function saveDoctorPrefs(prefs) {
  writePrefs(DOCTOR_PREFS_KEY, prefs)
}
