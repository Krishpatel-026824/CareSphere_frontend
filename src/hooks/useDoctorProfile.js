import { useState } from 'react'
import { generateDoctorPortalProfileData, withUpdatedDoctorDetails } from '../data/generators/doctorPortalProfileGenerator'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { setWorkspace } from '../store/slices/messagesSlice'
import { setNotificationWorkspace } from '../store/slices/notificationsSlice'
import { DOCTOR_AVATAR_KEY, readStoredAvatar, writeStoredAvatar } from '../utils/profileAvatarStorage'

const profileMeta = generateDoctorPortalProfileData()
const DOCTOR_PREFS_KEY = 'caresphere.doctorPrefs'

function loadDoctorDetails() {
  return {
    ...profileMeta.details,
    avatar: readStoredAvatar(DOCTOR_AVATAR_KEY, profileMeta.details.avatar),
  }
}

function loadDoctorPrefs() {
  try {
    const raw = window.localStorage.getItem(DOCTOR_PREFS_KEY)
    if (!raw) return profileMeta.prefs
    const saved = JSON.parse(raw)
    return profileMeta.prefs.map((item) => ({
      ...item,
      on: typeof saved[item.id] === 'boolean' ? saved[item.id] : item.on,
    }))
  } catch {
    return profileMeta.prefs
  }
}

function saveDoctorPrefs(prefs) {
  try {
    const payload = Object.fromEntries(prefs.map((item) => [item.id, item.on]))
    window.localStorage.setItem(DOCTOR_PREFS_KEY, JSON.stringify(payload))
  } catch {
    /* ignore quota / private mode */
  }
}

export function useDoctorProfile() {
  const dispatch = useAppDispatch()
  const [details, setDetails] = useState(loadDoctorDetails)
  const [prefs, setPrefs] = useState(loadDoctorPrefs)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(details)

  function startEdit() {
    setDraft(details)
    setIsEditing(true)
  }

  function cancelEdit() {
    setDraft(details)
    setIsEditing(false)
  }

  function saveEdit() {
    setDetails(withUpdatedDoctorDetails(details, draft))
    setIsEditing(false)
  }

  function updateDraft(key, value) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function togglePref(id) {
    setPrefs((current) => {
      const next = current.map((item) => (item.id === id ? { ...item, on: !item.on } : item))
      saveDoctorPrefs(next)
      return next
    })
  }

  function updateAvatar(avatar) {
    writeStoredAvatar(DOCTOR_AVATAR_KEY, avatar)
    setDetails((current) => ({ ...current, avatar }))
    setDraft((current) => ({ ...current, avatar }))
  }

  function logoutUser() {
    dispatch(setWorkspace('patient'))
    dispatch(setNotificationWorkspace('patient'))
    dispatch(logout())
  }

  return {
    details,
    prefs,
    stats: profileMeta.stats,
    fields: profileMeta.fields,
    infoRows: profileMeta.infoRows,
    menu: profileMeta.menu,
    careCircle: profileMeta.careCircle,
    isEditing,
    draft,
    startEdit,
    cancelEdit,
    saveEdit,
    updateDraft,
    updateAvatar,
    togglePref,
    logoutUser,
  }
}
