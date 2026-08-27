import { createSlice } from '@reduxjs/toolkit'

const doctorPatientLabsSlice = createSlice({
  name: 'doctorPatientLabs',
  initialState: {
    byPatientId: {},
  },
  reducers: {
    orderPatientLabs(state, action) {
      const { patientId, tests = [] } = action.payload || {}
      if (!patientId || !tests.length) return

      const existing = state.byPatientId[patientId] || []
      const existingIds = new Set(existing.map((item) => item.id))
      const next = [...existing]

      tests.forEach((test) => {
        if (!test?.id || existingIds.has(test.id)) return
        next.unshift({
          id: test.id,
          title: test.title || test.name || 'Lab test',
          subtitle: test.subtitle || test.description || '',
          turnaround: test.turnaround || '',
          dateLabel: test.dateLabel || '',
          status: 'Ordered',
          orderedAt: test.orderedAt || Date.now(),
        })
      })

      state.byPatientId[patientId] = next
    },
  },
})

export const { orderPatientLabs } = doctorPatientLabsSlice.actions

const EMPTY_LABS = []

export function selectOrderedLabsForPatient(state, patientId) {
  if (!patientId) return EMPTY_LABS
  return state.doctorPatientLabs.byPatientId[patientId] || EMPTY_LABS
}

export default doctorPatientLabsSlice.reducer
