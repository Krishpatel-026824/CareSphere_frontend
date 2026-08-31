import { createSlice } from '@reduxjs/toolkit'
import { generateProfileData, withUpdatedDetails } from '../../data/generators/profileGenerator'
import { profilePrefsMock } from '../../data/mocks/profile'
import { PATIENT_AVATAR_KEY, readStoredAvatar } from '../../utils/profileAvatarStorage'
import { loadPatientPrefs, savePatientPrefs } from '../../utils/profilePrefsStorage'

const generated = generateProfileData()
const initial = {
  ...generated,
  details: {
    ...generated.details,
    avatar: readStoredAvatar(PATIENT_AVATAR_KEY, generated.details.avatar),
  },
  prefs: loadPatientPrefs(profilePrefsMock),
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    details: initial.details,
    prefs: initial.prefs,
  },
  reducers: {
    saveProfile(state, action) {
      state.details = withUpdatedDetails(state.details, action.payload)
    },
    togglePref(state, action) {
      state.prefs = state.prefs.map((item) =>
        item.id === action.payload ? { ...item, on: !item.on } : item,
      )
      savePatientPrefs(state.prefs)
    },
  },
})

export const { saveProfile, togglePref } = profileSlice.actions

export function selectProfileDetails(state) {
  return state.profile.details
}

export default profileSlice.reducer
