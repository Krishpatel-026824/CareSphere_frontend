import { useState } from 'react'
import { generateProfileData, withLiveProfileStats } from '../data/generators/profileGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { selectPendingReminders } from '../store/slices/medicinesSlice'
import { saveProfile, togglePref } from '../store/slices/profileSlice'

const profileMeta = generateProfileData()

export function useProfile() {
  const dispatch = useAppDispatch()
  const details = useAppSelector((state) => state.profile.details)
  const prefs = useAppSelector((state) => state.profile.prefs)
  const pendingReminders = useAppSelector(selectPendingReminders)
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
    dispatch(saveProfile(draft))
    setIsEditing(false)
  }

  function updateDraft(key, value) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return {
    details,
    prefs,
    stats: withLiveProfileStats(profileMeta.stats, { reminders: pendingReminders }),
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
    togglePref: (id) => dispatch(togglePref(id)),
    logoutUser: () => dispatch(logout()),
  }
}
