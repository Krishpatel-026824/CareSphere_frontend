import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, Check, Search, X } from 'lucide-react'
import { formatDateLabel } from '../../utils/appointmentFormat'
import {
  generateRxScheduleDefaults,
  rxDoseOptions,
  rxDurationOptions,
  rxFrequencyOptions,
} from '../../data/generators/doctorPatientRxGenerator'
import {
  prescribePatientRoutine,
  selectPatientRoutine,
} from '../../store/slices/doctorPatientRxSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import ChartSelectMark from './ChartSelectMark'
import { matchesRxQuery, RxMedicineCell } from './DoctorPatientPrescriptionsTabParts'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartPanel,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
} from './PatientChartTable'

export default function DoctorPatientPrescriptionsTab({
  catalog = [],
  existing = [],
  patientId,
}) {
  const dispatch = useDispatch()
  const routine = useSelector((state) => selectPatientRoutine(state, patientId))
  const [mode, setMode] = useState('routine')
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [dose, setDose] = useState(rxDoseOptions[0])
  const [frequency, setFrequency] = useState(rxFrequencyOptions[0])
  const [duration, setDuration] = useState(rxDurationOptions[1])

  const routineIds = useMemo(() => new Set(routine.map((item) => item.id)), [routine])

  const selectedItems = useMemo(
    () => catalog.filter((item) => selectedIds.includes(item.id)),
    [catalog, selectedIds],
  )

  const addRows = useMemo(
    () =>
      catalog
        .filter((item) => matchesRxQuery(item, query))
        .map((item) => ({
          ...item,
          alreadyInRoutine: routineIds.has(item.id),
        })),
    [catalog, query, routineIds],
  )

  const routineRows = useMemo(() => {
    const merged = [
      ...routine,
      ...existing.filter(
        (item) => !routine.some((row) => row.id === item.id || row.name === item.name),
      ),
    ]
    return merged.filter((item) => matchesRxQuery(item, query))
  }, [routine, existing, query])

  function openNewMedicines() {
    setQuery('')
    setSelectedIds([])
    setDose(rxDoseOptions[0])
    setFrequency(rxFrequencyOptions[0])
    setDuration(rxDurationOptions[1])
    setMode('add')
  }

  function backToRoutine() {
    setQuery('')
    setSelectedIds([])
    setMode('routine')
  }

  function toggleOne(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function handleAddToRoutine() {
    if (!patientId || !selectedIds.length) return
    const medicines = catalog
      .filter((item) => selectedIds.includes(item.id) && !routineIds.has(item.id))
      .map((item) => {
        const defaults = generateRxScheduleDefaults(item)
        const chosenDose = dose || defaults.dose
        return {
          ...item,
          dose: chosenDose,
          frequency: frequency || defaults.frequency,
          duration: duration || defaults.duration,
          dateLabel: formatDateLabel(new Date()),
          badge: 'Routine',
          instructions: `Add ${item.name} to your medicine routine as per doctor: ${chosenDose}, ${frequency}, for ${duration}.`,
        }
      })
    dispatch(prescribePatientRoutine({ patientId, medicines }))
    medicines.forEach((med) => {
      dispatch(
        addPatientAuditEvent({
          patientId,
          type: 'rx',
          action: 'Rx added to routine',
          detail: `${med.name} · ${med.dose} · ${med.frequency} · ${med.duration}`,
          actor: 'Dr. James Carter',
        }),
      )
    })
    setSelectedIds([])
    setMode('routine')
    setQuery('')
  }

  return (
    <PatientChartPanel
      title={mode === 'add' ? 'Add medicines' : 'Prescriptions'}
      count={mode === 'add' ? selectedIds.length : routineRows.length}
      fill
      action={
        mode === 'routine' ? (
          <PatientChartAddButton label="New" onClick={openNewMedicines} />
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={backToRoutine}
              className="shrink-0 min-h-9 px-3 rounded-xl border border-[#E6EBF1] bg-white text-navy text-[12px] font-semibold cursor-pointer hover:bg-[#F4F7FA] inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.25} />
              Back
            </button>
            <button
              type="button"
              onClick={handleAddToRoutine}
              disabled={!selectedIds.length}
              className={`shrink-0 min-h-9 px-3 rounded-xl text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                selectedIds.length
                  ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                  : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
              {selectedIds.length ? `Add to routine (${selectedIds.length})` : 'Add to routine'}
            </button>
          </div>
        )
      }
    >
      {mode === 'routine' ? (
        <>
          <label className="shrink-0 mx-3 mt-3 mb-2 flex items-center gap-2.5 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1] px-3 min-h-11">
            <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search previous prescriptions"
              className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
              aria-label="Search previous prescriptions"
            />
          </label>

          {!routineRows.length ? (
            <PatientChartEmpty text="No previous prescriptions for this patient. Tap New to add medicines to their routine." />
          ) : (
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                <tr>
                  {['No.', 'Medicine', 'Dose', 'Schedule', 'Duration', 'Type'].map(
                    (label, index) => (
                      <PatientChartTh key={label} center={index !== 1}>
                        {label}
                      </PatientChartTh>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {routineRows.map((item, index) => (
                  <tr key={item.id} className={index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                    <PatientChartTd center>{index + 1}</PatientChartTd>
                    <PatientChartTd>
                      <RxMedicineCell item={item} />
                    </PatientChartTd>
                    <PatientChartTd center>{item.dose || '—'}</PatientChartTd>
                    <PatientChartTd center>{item.frequency || '—'}</PatientChartTd>
                    <PatientChartTd center>{item.duration || '—'}</PatientChartTd>
                    <PatientChartTd center>
                      <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-light text-teal-dark">
                        {item.badge || 'Previous'}
                      </span>
                    </PatientChartTd>
                  </tr>
                ))}
              </tbody>
            </PatientChartTable>
          )}
        </>
      ) : (
        <>
          <label className="shrink-0 mx-3 mt-3 mb-2 flex items-center gap-2.5 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1] px-3 min-h-11">
            <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search medicine (Dolo, Cetirizine…)"
              className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
              aria-label="Search medicines"
            />
          </label>

          <div className="shrink-0 mx-3 mb-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="flex flex-col gap-1 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark">
                Dose
              </span>
              <select
                value={dose}
                onChange={(event) => setDose(event.target.value)}
                className="bg-transparent text-sm font-semibold text-navy outline-none cursor-pointer"
              >
                {rxDoseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark">
                How often
              </span>
              <select
                value={frequency}
                onChange={(event) => setFrequency(event.target.value)}
                className="bg-transparent text-sm font-semibold text-navy outline-none cursor-pointer"
              >
                {rxFrequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 py-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark">
                Duration
              </span>
              <select
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                className="bg-transparent text-sm font-semibold text-navy outline-none cursor-pointer"
              >
                {rxDurationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedItems.length ? (
            <div className="shrink-0 mx-3 mb-2 rounded-xl border border-teal/20 bg-[#E8F7F6] px-3 py-2.5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-[12px] font-bold text-teal-dark">
                  Selected for routine ({selectedItems.length})
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="text-[11px] font-semibold text-body-gray hover:text-navy cursor-pointer inline-flex items-center gap-1"
                >
                  <X className="w-3 h-3" strokeWidth={2} />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleOne(item.id)}
                    className="inline-flex items-center gap-1 max-w-full rounded-full bg-white border border-teal/20 px-2.5 py-1 text-[12px] font-semibold text-navy cursor-pointer hover:border-teal"
                  >
                    <span className="truncate">{item.name}</span>
                    <X className="w-3 h-3 shrink-0 text-body-gray" strokeWidth={2} />
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-navy mt-2">
                Patient will take these as:{' '}
                <span className="font-semibold">{dose}</span> ·{' '}
                <span className="font-semibold">{frequency}</span> ·{' '}
                <span className="font-semibold">{duration}</span>
              </p>
            </div>
          ) : null}

          {!addRows.length ? (
            <PatientChartEmpty text="No medicines match your search." />
          ) : (
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                <tr>
                  {['', 'No.', 'Medicine', 'Pack dose', 'Use for', 'Status'].map((label, index) => (
                    <PatientChartTh key={`${label}-${index}`} center={index !== 2}>
                      {label}
                    </PatientChartTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {addRows.map((item, index) => {
                  const selected = selectedIds.includes(item.id)
                  const locked = item.alreadyInRoutine
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        if (!locked) toggleOne(item.id)
                      }}
                      className={`transition-colors ${
                        locked
                          ? 'bg-[#F8FAFC]'
                          : selected
                            ? 'bg-[#E8F7F6] cursor-pointer'
                            : index % 2
                              ? 'bg-[#FAFCFD] cursor-pointer hover:bg-[#F0FAF9]'
                              : 'bg-white cursor-pointer hover:bg-[#F0FAF9]'
                      }`}
                    >
                      <PatientChartTd center>
                        <ChartSelectMark selected={selected} locked={locked} />
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                          {index + 1}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd>
                        <RxMedicineCell item={item} />
                      </PatientChartTd>
                      <PatientChartTd center>{item.dose || '—'}</PatientChartTd>
                      <PatientChartTd center>
                        <span className="inline-flex max-w-full truncate text-[12px] font-semibold text-teal-dark bg-[#E8F7F6] border border-teal/15 px-2 py-0.5 rounded-full">
                          {item.useFor || 'As advised'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        {locked ? (
                          <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            In routine
                          </span>
                        ) : selected ? (
                          <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal text-white">
                            Selected
                          </span>
                        ) : (
                          <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-body-gray">
                            Tap to select
                          </span>
                        )}
                      </PatientChartTd>
                    </tr>
                  )
                })}
              </tbody>
            </PatientChartTable>
          )}
        </>
      )}
    </PatientChartPanel>
  )
}
