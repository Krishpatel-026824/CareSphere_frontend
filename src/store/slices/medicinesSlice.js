import { createSlice } from '@reduxjs/toolkit'
import {
  countPendingReminders,
  generateMedicineRemindersData,
} from '../../data/generators/medicineRemindersGenerator'
import { withPharmacyMedicineImage } from '../../data/generators/medicineImageResolver'

const initial = generateMedicineRemindersData()

const medicinesSlice = createSlice({
  name: 'medicines',
  initialState: {
    items: initial.medicines,
    takenById: {},
    startIndex: initial.startIndex,
  },
  reducers: {
    markAsTaken(state, action) {
      const id = action.payload
      if (state.takenById[id]) return
      const current = state.items.find((item) => item.id === id)
      if (!current || current.remainingCount <= 0) return
      state.items = state.items.map((item) => {
        if (item.id !== id) return item
        const remainingCount = item.remainingCount - 1
        return { ...item, remainingCount, remaining: `${remainingCount} left` }
      })
      state.takenById[id] = true
    },
    addMedicine(state, action) {
      state.items.push(withPharmacyMedicineImage(action.payload))
    },
    updateMedicine(state, action) {
      const updated = withPharmacyMedicineImage(action.payload)
      state.items = state.items.map((item) => (item.id === updated.id ? { ...item, ...updated } : item))
    },
    removeMedicine(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { markAsTaken, addMedicine, updateMedicine, removeMedicine } = medicinesSlice.actions

export function selectMedicines(state) {
  return state.medicines.items
}

export function selectTakenById(state) {
  return state.medicines.takenById
}

export function selectMedicineStartIndex(state) {
  return state.medicines.startIndex
}

export function selectPendingReminders(state) {
  return countPendingReminders(state.medicines.items, state.medicines.takenById)
}

export default medicinesSlice.reducer
