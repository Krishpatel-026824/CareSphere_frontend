import { useState } from 'react'
import { generateDoctorPortalProfileData, withUpdatedDoctorDetails } from '../data/generators/doctorPortalProfileGenerator'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { setWorkspace } from '../store/slices/messagesSlice'
import { setNotificationWorkspace } from '../store/slices/notificationsSlice'

const profileMeta = generateDoctorPortalProfileData()

export function useDoctorProfile() {
  const dispatch = useAppDispatch()
  const [details, setDetails] = useState(profileMeta.details)
  const [prefs, setPrefs] = useState(profileMeta.prefs)
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
    setPrefs((current) => current.map((item) => (item.id === id ? { ...item, on: !item.on } : item)))
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
    togglePref,
    logoutUser,
  }
}
