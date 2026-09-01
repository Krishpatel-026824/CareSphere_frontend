import { useEffect, useMemo, useState } from 'react'
import { Check, Search, X } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import MedicineThumb from './MedicineThumb'
import PrescriptionSchedulePicker from './PrescriptionSchedulePicker'
import {
  generateRxScheduleDefaults,
  rxDoseOptions,
  rxDurationOptions,
  rxFrequencyOptions,
} from '../../data/generators/doctorPatientRxGenerator'
import { formatDateLabel } from '../../utils/appointmentFormat'
import { formatPrescriptionTime } from '../../utils/prescriptionNoteFormat'
import { resolveMedicineImage } from '../../data/generators/medicineImageResolver'

function matchesQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.name, item.useFor, item.category].filter(Boolean).some((part) =>
    String(part).toLowerCase().includes(q),
  )
}

function visitReasonLabel(visit) {
  return visit?.prepNote || visit?.visitReason || visit?.visitType || 'Clinic visit'
}

function visitOptionLabel(visit) {
  return `${visit.dateLabel} · ${visit.timeLabel} · ${visitReasonLabel(visit)}`
}

export default function DoctorPatientPrescriptionModal({
  open,
  onClose,
  catalog = [],
  visits = [],
  onSave,
}) {
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [scheduleById, setScheduleById] = useState({})
  const [note, setNote] = useState('')

  const defaultVisitId = useMemo(() => {
    const preferred =
      visits.find((visit) => visit.status === 'Confirmed' || visit.status === 'Upcoming') ||
      visits[0]
    return preferred?.id || 'current'
  }, [visits])

  const [visitId, setVisitId] = useState(defaultVisitId)

  useEffect(() => {
    if (open) setVisitId(defaultVisitId)
  }, [open, defaultVisitId])

  const filtered = useMemo(
    () => catalog.filter((item) => matchesQuery(item, query)),
    [catalog, query],
  )

  function reset() {
    setQuery('')
    setSelectedIds([])
    setScheduleById({})
    setNote('')
    setVisitId(defaultVisitId)
  }

  function close() {
    reset()
    onClose?.()
  }

  function toggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function scheduleFor(item) {
    return scheduleById[item.id] || generateRxScheduleDefaults(item)
  }

  function updateSchedule(id, field, value) {
    setScheduleById((prev) => {
      const item = catalog.find((entry) => entry.id === id)
      const base = prev[id] || generateRxScheduleDefaults(item)
      return { ...prev, [id]: { ...base, [field]: value } }
    })
  }

  function handleSave() {
    if (!selectedIds.length) return

    const visit = visits.find((item) => item.id === visitId)
    const now = new Date()
    const medicines = catalog
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => {
        const schedule = scheduleFor(item)
        return {
          id: item.id,
          name: item.name,
          dose: schedule.dose,
          frequency: schedule.frequency,
          duration: schedule.duration,
          useFor: item.useFor,
          image: item.image || resolveMedicineImage(item.name, item.id),
        }
      })

    onSave?.({
      id: `rxn-${Date.now()}`,
      dateLabel: visit?.dateLabel || formatDateLabel(now),
      timeLabel: visit?.timeLabel || formatPrescriptionTime(now),
      visitType: visit?.visitType || 'In-clinic',
      visitReason: visitReasonLabel(visit),
      clinic: visit?.clinic || 'CareSphere Clinic',
      visitLabel: visit ? `${visit.dateLabel} · ${visit.timeLabel}` : undefined,
      prescribedAt: Date.now(),
      medicines,
      note: note.trim(),
      doctor: 'Dr. James Carter',
    })
    close()
  }

  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
      <div className="p-4 sm:p-5 max-h-[85dvh] flex flex-col">
        <div className="flex items-start justify-between gap-3 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-navy">Write prescription</h2>
            <p className="text-sm text-body-gray mt-0.5">Link visit details and add medicines for this patient.</p>
          </div>
          <button type="button" onClick={close} className="p-2 rounded-xl hover:bg-bg-gray cursor-pointer">
            <X className="w-5 h-5 text-body-gray" />
          </button>
        </div>

        <label className="mt-4 shrink-0 flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-body-gray">Visit</span>
          <select
            value={visitId}
            onChange={(event) => setVisitId(event.target.value)}
            className="min-h-11 rounded-xl border border-border-gray bg-white px-3 text-sm text-navy outline-none focus:border-teal"
          >
            {visits.length ? (
              visits.map((visit) => (
                <option key={visit.id} value={visit.id}>
                  {visitOptionLabel(visit)}
                </option>
              ))
            ) : (
              <option value="current">Today&apos;s visit</option>
            )}
          </select>
        </label>

        <label className="mt-3 flex items-center gap-2 rounded-xl border border-border-gray bg-[#F8FAFC] px-3 min-h-11 shrink-0">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search medicine"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
          />
        </label>

        <div className="mt-3 flex-1 min-h-0 overflow-y-auto scroll-y pr-1 space-y-2">
          {filtered.map((item) => {
            const selected = selectedIds.includes(item.id)
            const schedule = scheduleFor(item)
            return (
              <div
                key={item.id}
                className={`rounded-xl border px-3 py-3 transition-colors ${
                  selected ? 'border-teal bg-[#E8F7F6]' : 'border-border-gray bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 text-left cursor-pointer"
                >
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      selected ? 'bg-teal border-teal text-white' : 'border-border-gray bg-white'
                    }`}
                  >
                    {selected ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
                  </span>
                  <MedicineThumb src={item.image} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="text-sm font-bold text-navy block">{item.name}</span>
                    <span className="text-xs text-body-gray block">{item.useFor}</span>
                  </span>
                </button>

                {selected ? (
                  <PrescriptionSchedulePicker
                    schedule={schedule}
                    doseOptions={rxDoseOptions}
                    frequencyOptions={rxFrequencyOptions}
                    durationOptions={rxDurationOptions}
                    onChange={(field, value) => updateSchedule(item.id, field, value)}
                  />
                ) : null}
              </div>
            )
          })}
        </div>

        <label className="mt-3 shrink-0 flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-body-gray">Note for patient</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Add instructions for the patient."
            className="rounded-xl border border-border-gray bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-teal resize-none"
          />
        </label>

        <div className="mt-4 shrink-0 flex gap-2.5">
          <button
            type="button"
            onClick={close}
            className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedIds.length}
            className={`flex-1 min-h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 ${
              selectedIds.length
                ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
            }`}
          >
            Save prescription
          </button>
        </div>
      </div>
    </Dialog>
  )
}
