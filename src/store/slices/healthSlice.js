import { createSlice } from '@reduxjs/toolkit'
import {
  generateLabReportFromBooking,
  generateLabReportsFromBookings,
  labReportToHealthRecord,
} from '../../data/generators/labReportGenerator'
import { generateHealthRecordsData } from '../../data/generators/quickActionsGenerator'
import {
  loadStoredLabBookings,
  loadStoredLabReports,
  mergeHealthRecords,
  mergeLabReports,
  saveStoredLabReports,
  sortHealthRecords,
} from '../../utils/healthRecordsStorage'

function buildInitialHealthState() {
  const baseRecords = generateHealthRecordsData().records
  const storedReports = loadStoredLabReports()
  const bookingReports = generateLabReportsFromBookings(loadStoredLabBookings())
  const labReports = mergeLabReports(storedReports, bookingReports)

  if (labReports.length !== storedReports.length) {
    saveStoredLabReports(labReports)
  }

  return {
    records: mergeHealthRecords(
      baseRecords,
      labReports.map((report) => labReportToHealthRecord(report)),
    ),
    bin: [],
    labReports,
  }
}

function appendLabReports(state, incoming = []) {
  const reports = incoming.filter(Boolean)
  if (!reports.length) return

  state.labReports = mergeLabReports(state.labReports, reports)
  saveStoredLabReports(state.labReports)

  const nextRecords = reports.map(labReportToHealthRecord)
  const existingIds = new Set(state.records.map((record) => record.id))
  const freshRecords = nextRecords.filter((record) => !existingIds.has(record.id))
  state.records = sortHealthRecords([...freshRecords, ...state.records])
}

const healthSlice = createSlice({
  name: 'health',
  initialState: buildInitialHealthState(),
  reducers: {
    addLabReports(state, action) {
      appendLabReports(state, action.payload || [])
    },
    addLabReportFromBooking(state, action) {
      const report = generateLabReportFromBooking(action.payload)
      if (report) appendLabReports(state, [report])
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
      state.records = sortHealthRecords([record, ...state.records])
    },
    deleteForever(state, action) {
      const id = action.payload
      state.bin = state.bin.filter((record) => record.id !== id)
    },
  },
})

export const { addLabReports, addLabReportFromBooking, moveToBin, restoreFromBin, deleteForever } =
  healthSlice.actions

export function selectHealthRecords(state) {
  return state.health.records
}

export function selectHealthBin(state) {
  return state.health.bin
}

export function selectLabReports(state) {
  return state.health.labReports
}

export default healthSlice.reducer
