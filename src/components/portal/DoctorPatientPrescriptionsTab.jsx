import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import {
  addPatientPrescriptionNote,
  selectPatientPrescriptionNotes,
} from '../../store/slices/doctorPatientRxSlice'
import DoctorPatientPrescriptionModal from './DoctorPatientPrescriptionModal'
import DoctorPatientPrescriptionDetailModal from './DoctorPatientPrescriptionDetailModal'
import DoctorPatientPrescriptionNoteCard from './DoctorPatientPrescriptionNoteCard'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartToolbar,
} from './PatientChartTable'
import { parseVisitLabel, prescriptionMatchesQuery } from '../../utils/prescriptionNoteFormat'

function mapLegacyPrescription(item) {
  const parsed = parseVisitLabel(item.visitLabel)
  return {
    id: item.id,
    dateLabel: parsed.dateLabel || item.dateLabel || 'Previous visit',
    timeLabel: parsed.timeLabel || '—',
    visitType: 'In-clinic',
    visitReason: item.useFor || item.subtitle || 'Clinic visit',
    clinic: 'CareSphere Clinic',
    visitLabel: item.visitLabel,
    medicines: [
      {
        id: item.id,
        name: item.name,
        dose: item.dose,
        frequency: item.frequency,
        duration: item.duration,
        useFor: item.useFor || item.subtitle,
        image: item.image,
      },
    ],
    note: item.instructions || '',
    doctor: 'Dr. James Carter',
    readOnly: true,
  }
}

export default function DoctorPatientPrescriptionsTab({
  catalog = [],
  existing = [],
  patientId,
  visits = [],
}) {
  const dispatch = useDispatch()
  const savedNotes = useSelector((state) => selectPatientPrescriptionNotes(state, patientId))
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const legacyNotes = useMemo(() => existing.map(mapLegacyPrescription), [existing])

  const notes = useMemo(() => {
    const merged = [...savedNotes, ...legacyNotes]
    const q = query.trim().toLowerCase()
    if (!q) return merged
    return merged.filter((item) => prescriptionMatchesQuery(item, q))
  }, [savedNotes, legacyNotes, query])

  function handleSave(note) {
    if (!patientId) return
    dispatch(addPatientPrescriptionNote({ patientId, note }))
    dispatch(
      addPatientAuditEvent({
        patientId,
        type: 'rx',
        action: 'Prescription note added',
        detail: `${note.dateLabel} · ${note.timeLabel} · ${note.medicines.map((med) => med.name).join(', ')}${note.note ? ` · ${note.note}` : ''}`,
        actor: note.doctor || 'Dr. James Carter',
      }),
    )
  }

  return (
    <>
      <PatientChartPanel
        title="Prescriptions"
        subtitle="Prescription notes written for this patient"
        count={notes.length}
        fill
        action={<PatientChartAddButton label="Add prescription" onClick={() => setModalOpen(true)} />}
      >
        <PatientChartToolbar>
          <PatientChartSearch
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prescriptions or medicines"
            aria-label="Search prescriptions"
          />
        </PatientChartToolbar>

        {!notes.length ? (
          <PatientChartEmpty text="No prescription notes yet. Tap Add prescription to write a new note." />
        ) : (
          <>
            <div className="flex-1 min-h-0 overflow-y-auto scroll-y p-3 sm:p-4 flex flex-col gap-2 bg-[#FAFCFD]">
              {notes.map((item) => (
                <DoctorPatientPrescriptionNoteCard
                  key={item.id}
                  note={item}
                  onOpen={setSelectedNote}
                />
              ))}
            </div>
            <PatientChartFooter showing={notes.length} total={notes.length} label="prescriptions" />
          </>
        )}
      </PatientChartPanel>

      <DoctorPatientPrescriptionDetailModal
        open={Boolean(selectedNote)}
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      <DoctorPatientPrescriptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        catalog={catalog}
        visits={visits}
        onSave={handleSave}
      />
    </>
  )
}
