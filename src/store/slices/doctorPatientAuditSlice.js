import { createSlice } from '@reduxjs/toolkit'
import { formatDateLabel } from '../../utils/appointmentFormat'

function formatAuditWhen(now = new Date()) {
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return `${formatDateLabel(now)} · ${time}`
}

const doctorPatientAuditSlice = createSlice({
  name: 'doctorPatientAudit',
  initialState: {
    byPatientId: {},
  },
  reducers: {
    addPatientAuditEvent(state, action) {
      const {
        patientId,
        action: actionLabel,
        detail,
        type = 'note',
        actor = 'Dr. James Carter',
        at,
        id,
      } = action.payload || {}

      if (!patientId || !actionLabel) return

      const existing = state.byPatientId[patientId] || []
      const event = {
        id: id || `audit-live-${patientId}-${Date.now()}-${existing.length}`,
        at: at || formatAuditWhen(),
        action: actionLabel,
        detail: detail || '—',
        actor,
        type,
        createdAt: Date.now(),
      }

      state.byPatientId[patientId] = [event, ...existing]
    },
  },
})

export const { addPatientAuditEvent } = doctorPatientAuditSlice.actions

const EMPTY_AUDIT = []

export function selectPatientAudit(state, patientId) {
  if (!patientId) return EMPTY_AUDIT
  return state.doctorPatientAudit.byPatientId[patientId] || EMPTY_AUDIT
}

export default doctorPatientAuditSlice.reducer
