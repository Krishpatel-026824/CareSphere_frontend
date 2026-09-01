import { createSlice } from '@reduxjs/toolkit'

const doctorPatientRxSlice = createSlice({
  name: 'doctorPatientRx',
  initialState: {
    byPatientId: {},
    notesByPatientId: {},
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
    addPatientPrescriptionNote(state, action) {
      const { patientId, note } = action.payload || {}
      if (!patientId || !note?.id) return
      const list = state.notesByPatientId[patientId] || []
      state.notesByPatientId[patientId] = [note, ...list]
    },
  },
})

export const { prescribePatientRoutine, addPatientPrescriptionNote } = doctorPatientRxSlice.actions

const EMPTY_RX = []
const EMPTY_NOTES = []

export function selectPatientRoutine(state, patientId) {
  if (!patientId) return EMPTY_RX
  return state.doctorPatientRx.byPatientId[patientId] || EMPTY_RX
}

export function selectPatientPrescriptionNotes(state, patientId) {
  if (!patientId) return EMPTY_NOTES
  return state.doctorPatientRx.notesByPatientId[patientId] || EMPTY_NOTES
}

export default doctorPatientRxSlice.reducer
