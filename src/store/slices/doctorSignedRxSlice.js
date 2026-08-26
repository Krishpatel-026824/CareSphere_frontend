import { createSlice } from '@reduxjs/toolkit'

const doctorSignedRxSlice = createSlice({
  name: 'doctorSignedRx',
  initialState: {
    items: [],
  },
  reducers: {
    addSignedRx(state, action) {
      const task = action.payload
      if (!task?.id) return
      const exists = state.items.some((item) => item.id === task.id)
      if (exists) return

      state.items.unshift({
        id: task.id,
        patientId: task.patientId || '',
        patientName: task.patientName || 'Patient',
        avatar: task.avatar || '',
        medicine: task.title || '',
        badge: task.badge || 'Rx',
        dose: task.dose || '',
        frequency: task.frequency || '',
        duration: task.duration || '',
        visitLabel: task.visitLabel || '',
        instructions: task.instructions || '',
        signedAtLabel: task.signedAtLabel || '',
        signedAt: task.signedAt || Date.now(),
      })
    },
  },
})

export const { addSignedRx } = doctorSignedRxSlice.actions

export function selectSignedRxItems(state) {
  return state.doctorSignedRx.items
}

export function selectSignedRxIds(state) {
  return state.doctorSignedRx.items.map((item) => item.id)
}

export default doctorSignedRxSlice.reducer
