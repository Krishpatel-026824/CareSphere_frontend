import { createSlice } from '@reduxjs/toolkit'

const doctorPatientRxSlice = createSlice({
  name: 'doctorPatientRx',
  initialState: {
    byPatientId: {},
  },
  reducers: {
    prescribePatientRoutine(state, action) {
      const { patientId, medicines = [] } = action.payload || {}
      if (!patientId || !medicines.length) return

      const existing = state.byPatientId[patientId] || []
      const existingIds = new Set(existing.map((item) => item.id))
      const next = [...existing]

      medicines.forEach((med) => {
        if (!med?.id || existingIds.has(med.id)) return
        next.unshift({
          id: med.id,
          name: med.name || 'Medicine',
          subtitle: med.subtitle || med.useFor || '',
          dose: med.dose || '—',
          frequency: med.frequency || 'Once daily',
          duration: med.duration || 'As advised',
          useFor: med.useFor || '',
          image: med.image || '',
          badge: 'Routine',
          instructions:
            med.instructions ||
            `Add ${med.name || 'this medicine'} to your daily routine as advised by your doctor.`,
          prescribedAt: med.prescribedAt || Date.now(),
          dateLabel: med.dateLabel || '',
        })
      })

      state.byPatientId[patientId] = next
    },
  },
})

export const { prescribePatientRoutine } = doctorPatientRxSlice.actions

const EMPTY_RX = []

export function selectPatientRoutine(state, patientId) {
  if (!patientId) return EMPTY_RX
  return state.doctorPatientRx.byPatientId[patientId] || EMPTY_RX
}

export default doctorPatientRxSlice.reducer
