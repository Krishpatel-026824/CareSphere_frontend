import { useEffect, useState } from 'react'
import { generateDoctorPortalProfileData, withUpdatedDoctorDetails } from '../data/generators/doctorPortalProfileGenerator'
import { doctorProfilePrefsMock } from '../data/mocks/doctorProfile'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { setWorkspace } from '../store/slices/messagesSlice'
import { setDoctorNotificationPrefs, setNotificationWorkspace } from '../store/slices/notificationsSlice'
import { DOCTOR_AVATAR_KEY, readStoredAvatar, writeStoredAvatar } from '../utils/profileAvatarStorage'
import { loadDoctorPrefs, saveDoctorPrefs } from '../utils/profilePrefsStorage'

const profileMeta = generateDoctorPortalProfileData()

function loadDoctorDetails() {
  return {
    ...profileMeta.details,
    avatar: readStoredAvatar(DOCTOR_AVATAR_KEY, profileMeta.details.avatar),
  }
}

export function useDoctorProfile() {
  const dispatch = useAppDispatch()
  const [details, setDetails] = useState(loadDoctorDetails)
  const [prefs, setPrefs] = useState(() => loadDoctorPrefs(doctorProfilePrefsMock))
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(details)

  useEffect(() => {
    dispatch(setDoctorNotificationPrefs(prefs))
  }, [dispatch, prefs])

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
