export const DOCTOR_AVATAR_KEY = 'caresphere.doctorAvatar'
export const PATIENT_AVATAR_KEY = 'caresphere.patientAvatar'

export function readStoredAvatar(key, fallback = '') {
  try {
    return window.localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

export function writeStoredAvatar(key, avatar) {
  try {
    window.localStorage.setItem(key, avatar)
  } catch {
    /* ignore quota / private mode */
  }
}
