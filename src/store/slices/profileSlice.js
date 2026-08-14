import { createSlice } from '@reduxjs/toolkit'
import { generateProfileData, withUpdatedDetails } from '../../data/generators/profileGenerator'

const initial = generateProfileData()

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
    },
  },
})

export const { saveProfile, togglePref } = profileSlice.actions

export function selectProfileDetails(state) {
  return state.profile.details
}

export default profileSlice.reducer
