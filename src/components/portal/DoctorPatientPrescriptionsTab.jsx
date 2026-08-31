import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, Check } from 'lucide-react'
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
import ChartSelectMark, { ChartRowStatusBadge } from './ChartSelectMark'
import {
  ADD_RX_COLUMNS,
  matchesRxQuery,
  RxAddMedicineCell,
  RxAddRowDetailsCell,
  RxAddScheduleBar,
  RxMedicineCell,
} from './DoctorPatientPrescriptionsTabParts'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartToolbar,
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

  const selectableIds = useMemo(
    () => selectedIds.filter((id) => !routineIds.has(id)),
    [selectedIds, routineIds],
  )

  const routineMap = useMemo(() => {
    const map = new Map()
    routine.forEach((item) => map.set(item.id, item))
    return map
  }, [routine])

  const addRows = useMemo(
    () =>
      catalog
        .filter((item) => matchesRxQuery(item, query))
        .map((item) => {
          const inRoutine = routineMap.get(item.id)
          return {
            ...item,
            alreadyInRoutine: Boolean(inRoutine),
            routineSchedule: inRoutine
              ? {
                  dose: inRoutine.dose,
                  frequency: inRoutine.frequency,
                  duration: inRoutine.duration,
                }
              : null,
          }
        }),
    [catalog, query, routineMap],
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
    if (routineIds.has(id)) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function handleAddToRoutine() {
    if (!patientId || !selectableIds.length) return
    const medicines = catalog
      .filter((item) => selectableIds.includes(item.id))
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
      subtitle={
        mode === 'add'
          ? 'Select medicines below, then add to routine'
          : 'Previous prescriptions and active routine for this patient'
      }
      count={mode === 'add' ? selectableIds.length : routineRows.length}
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
              disabled={!selectableIds.length}
              className={`shrink-0 min-h-9 px-3 rounded-xl text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                selectableIds.length
                  ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                  : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
              {selectableIds.length
                ? `Add to routine (${selectableIds.length})`
                : 'Add to routine'}
            </button>
          </div>
        )
      }
    >
      {mode === 'routine' ? (
        <>
          <PatientChartToolbar>
            <PatientChartSearch
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search previous prescriptions"
              aria-label="Search previous prescriptions"
            />
          </PatientChartToolbar>

          {!routineRows.length ? (
            <PatientChartEmpty text="No previous prescriptions for this patient. Tap New to add medicines to their routine." />
          ) : (
            <>
              <PatientChartTable fill>
                <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
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
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#F0FAF9] ${
                      index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                    }`}
                  >
                    <PatientChartTd center>
                      <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                        {index + 1}
                      </span>
                    </PatientChartTd>
                    <PatientChartTd>
                      <RxMedicineCell item={item} />
                    </PatientChartTd>
                    <PatientChartTd center>
                      <span className="font-semibold text-navy">{item.dose || '—'}</span>
                    </PatientChartTd>
                    <PatientChartTd center>{item.frequency || '—'}</PatientChartTd>
                    <PatientChartTd center>{item.duration || '—'}</PatientChartTd>
                    <PatientChartTd center>
                      <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-light text-teal-dark border border-teal/10">
                        {item.badge || 'Previous'}
                      </span>
                    </PatientChartTd>
                  </tr>
                ))}
              </tbody>
              </PatientChartTable>
              <PatientChartFooter
                showing={routineRows.length}
                total={routine.length + existing.length}
                label="prescriptions"
              />
            </>
          )}
        </>
      ) : (
        <>
          <PatientChartToolbar compact>
            <PatientChartSearch
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search medicine (Dolo, Cetirizine…)"
              aria-label="Search medicines"
            />

            <RxAddScheduleBar
              dose={dose}
              frequency={frequency}
              duration={duration}
              doseOptions={rxDoseOptions}
              frequencyOptions={rxFrequencyOptions}
              durationOptions={rxDurationOptions}
              onDoseChange={setDose}
              onFrequencyChange={setFrequency}
              onDurationChange={setDuration}
            />
          </PatientChartToolbar>

          {!addRows.length ? (
            <PatientChartEmpty text="No medicines match your search." />
          ) : (
            <>
              <PatientChartTable minWidth="100%" fill fixed className="text-[15px]">
                <colgroup>
                  {ADD_RX_COLUMNS.map((column) => (
                    <col key={column.key} style={{ width: column.width }} />
                  ))}
                </colgroup>
                <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
                <tr>
                  {ADD_RX_COLUMNS.map((column) => (
                    <PatientChartTh
                      key={column.key}
                      center={column.center}
                      className="!text-[13px] !py-3.5"
                    >
                      {column.label}
                    </PatientChartTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {addRows.map((item, index) => {
                  const locked = item.alreadyInRoutine
                  const selected = selectedIds.includes(item.id)
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        locked
                          ? 'bg-[#F8FAFC]/90'
                          : selected
                            ? 'bg-[#E8F7F6] shadow-[inset_3px_0_0_0_#0EA5A0]'
                            : index % 2
                              ? 'bg-[#FAFCFD] hover:bg-[#F0FAF9]'
                              : 'bg-white hover:bg-[#F0FAF9]'
                      }`}
                    >
                      <PatientChartTd className="py-3 px-3 sm:px-4">
                        <RxAddMedicineCell
                          item={item}
                          statusBadge={
                            locked ? (
                              <ChartRowStatusBadge tone="success">In routine</ChartRowStatusBadge>
                            ) : null
                          }
                        />
                      </PatientChartTd>
                      <PatientChartTd className="py-3 px-3 sm:px-4">
                        <RxAddRowDetailsCell
                          useFor={item.useFor}
                          active={selected && !locked}
                        />
                      </PatientChartTd>
                      <PatientChartTd className="py-3 px-3 sm:px-4 w-[1%] whitespace-nowrap">
                        <div className="flex justify-end">
                          <ChartSelectMark
                            selected={selected}
                            locked={locked}
                            lockedLabel="In routine"
                            label="Select"
                            selectedLabel="Selected"
                            onToggle={() => toggleOne(item.id)}
                          />
                        </div>
                      </PatientChartTd>
                    </tr>
                  )
                })}
              </tbody>
              </PatientChartTable>
              <PatientChartFooter
                showing={addRows.length}
                total={catalog.length}
                label="medicines"
                extra={
                  selectableIds.length
                    ? `${selectableIds.length} selected for routine`
                    : null
                }
              />
            </>
          )}
        </>
      )}
    </PatientChartPanel>
  )
}
