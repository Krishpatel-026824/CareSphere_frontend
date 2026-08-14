import { createSlice } from '@reduxjs/toolkit'
import { labReportToHealthRecord } from '../../data/generators/labReportGenerator'
import { generateHealthRecordsData } from '../../data/generators/quickActionsGenerator'

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    records: generateHealthRecordsData().records,
    bin: [],
    labReports: [],
  },
  reducers: {
    addLabReports(state, action) {
      const reports = action.payload || []
      state.labReports = reports
      const nextRecords = reports.map(labReportToHealthRecord)
      const existingIds = new Set(state.records.map((record) => record.id))
      const freshRecords = nextRecords.filter((record) => !existingIds.has(record.id))
      state.records = [...freshRecords, ...state.records]
    },
    moveToBin(state, action) {
      const id = action.payload
      const index = state.records.findIndex((record) => record.id === id)
      if (index < 0) return
      const [record] = state.records.splice(index, 1)
      state.bin.unshift(record)
    },
    restoreFromBin(state, action) {
      const id = action.payload
      const index = state.bin.findIndex((record) => record.id === id)
      if (index < 0) return
      const [record] = state.bin.splice(index, 1)
      state.records.unshift(record)
    },
    deleteForever(state, action) {
      const id = action.payload
      state.bin = state.bin.filter((record) => record.id !== id)
    },
  },
})

export const { addLabReports, moveToBin, restoreFromBin, deleteForever } = healthSlice.actions

export function selectHealthRecords(state) {
  return state.health.records
}

export function selectHealthBin(state) {
  return state.health.bin
}

export default healthSlice.reducer
