import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import {
  addPatientPrescriptionNote,
  selectPatientPrescriptionNotes,
} from '../../store/slices/doctorPatientRxSlice'
import DoctorPatientPrescriptionModal from './DoctorPatientPrescriptionModal'
import DoctorPatientPrescriptionDetailModal from './DoctorPatientPrescriptionDetailModal'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartThead,
  PatientChartToolbar,
} from './PatientChartTable'
import {
  buildVisitSummary,
  normalizePrescriptionNote,
  parseVisitLabel,
  prescriptionMatchesQuery,
} from '../../utils/prescriptionNoteFormat'

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

const PRESCRIPTION_COLUMNS = [
  { label: 'No.', width: '52px', center: true },
  { label: 'Date', width: '96px', center: true },
  { label: 'Time', width: '108px', center: true },
  { label: 'Visit', width: 'auto', center: false },
  { label: 'Clinic', width: '172px', center: true },
  { label: 'View', width: '96px', center: true },
]

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

  const allNotes = useMemo(() => [...savedNotes, ...legacyNotes], [savedNotes, legacyNotes])

  const notes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allNotes
    return allNotes.filter((item) => prescriptionMatchesQuery(item, q))
  }, [allNotes, query])

  const tableScroll = notes.length > 8

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
        subtitle="Previous prescription records for this patient"
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
          <PatientChartEmpty text="No prescription records yet. Tap Add prescription to write a new note." />
        ) : (
          <>
            <PatientChartTable
              fit={!tableScroll}
              fill={tableScroll}
              fixed
              minWidth="760px"
              className="text-[16px]"
            >
              <colgroup>
                {PRESCRIPTION_COLUMNS.map((column) => (
                  <col
                    key={column.label}
                    style={column.width === 'auto' ? undefined : { width: column.width }}
                  />
                ))}
              </colgroup>
              <PatientChartThead>
                <tr>
                  {PRESCRIPTION_COLUMNS.map((column) => (
                    <PatientChartTh
                      key={column.label}
                      center={column.center}
                      className="!text-[13px]"
                    >
                      {column.label}
                    </PatientChartTh>
                  ))}
                </tr>
              </PatientChartThead>
              <tbody>
                {notes.map((item, index) => {
                  const rx = normalizePrescriptionNote(item)
                  const visit = buildVisitSummary(rx)

                  return (
                    <tr
                      key={item.id}
                      className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
                    >
                      <PatientChartTd center className="!py-4 text-[16px] font-semibold text-navy">
                        {index + 1}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-4 text-[16px] font-semibold text-navy whitespace-nowrap">
                        {rx.dateLabel}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-4 text-[16px] font-semibold text-navy whitespace-nowrap">
                        {rx.timeLabel}
                      </PatientChartTd>
                      <PatientChartTd className="!py-4">
                        <p className="text-[16px] font-semibold text-navy leading-snug line-clamp-2">
                          {visit}
                        </p>
                      </PatientChartTd>
                      <PatientChartTd center className="!py-4 text-[16px] font-semibold text-navy whitespace-nowrap">
                        {rx.clinic}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedNote(item)}
                          className="min-h-10 px-4 rounded-xl text-[14px] font-semibold text-teal-dark bg-[#E8F7F6] border border-teal/15 hover:bg-teal hover:text-white hover:border-teal transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </PatientChartTd>
                    </tr>
                  )
                })}
              </tbody>
            </PatientChartTable>
            <PatientChartFooter
              showing={notes.length}
              total={allNotes.length}
              label="prescriptions"
            />
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
