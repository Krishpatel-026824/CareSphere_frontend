import { createSlice } from '@reduxjs/toolkit'

const telemedicineSlice = createSlice({
  name: 'telemedicine',
  initialState: {
    specialty: '',
    clinics: [],
    locations: [],
    highRated: false,
    available: false,
  },
  reducers: {
    setSpecialty(state, action) {
      const specialty = action.payload
      state.specialty = state.specialty === specialty ? '' : specialty
    },
    toggleClinic(state, action) {
      const clinic = action.payload
      state.clinics = state.clinics.includes(clinic)
        ? state.clinics.filter((item) => item !== clinic)
        : [...state.clinics, clinic]
    },
    toggleLocation(state, action) {
      const location = action.payload
      state.locations = state.locations.includes(location)
        ? state.locations.filter((item) => item !== location)
        : [...state.locations, location]
    },
    toggleHighRated(state) {
      state.highRated = !state.highRated
    },
    toggleAvailable(state) {
      state.available = !state.available
    },
  },
})

export const { setSpecialty, toggleClinic, toggleLocation, toggleHighRated, toggleAvailable } =
  telemedicineSlice.actions

export default telemedicineSlice.reducer
