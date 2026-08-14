import { createSlice } from '@reduxjs/toolkit'
import { generateDoctorBookingData } from '../../data/generators/doctorBookingGenerator'

const doctorFlowData = generateDoctorBookingData()

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    flow: doctorFlowData,
    discoveryQuery: '',
    discoveryFilter: 'all',
  },
  reducers: {
    setDiscoveryQuery(state, action) {
      state.discoveryQuery = action.payload
    },
    setDiscoveryFilter(state, action) {
      state.discoveryFilter = action.payload
    },
  },
})

export const { setDiscoveryQuery, setDiscoveryFilter } = doctorsSlice.actions

export function selectDoctorFlow(state) {
  return state.doctors.flow
}

export function selectDoctorById(state, doctorId) {
  return state.doctors.flow.doctors.find((doctor) => doctor.id === doctorId) || null
}

export default doctorsSlice.reducer
