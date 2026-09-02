import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Check, Search } from 'lucide-react'
import { formatDateLabel } from '../../utils/appointmentFormat'
import { orderPatientLabs } from '../../store/slices/doctorPatientLabsSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import LabBookTestCard from './LabBookTestCard'
import {
  generateLabOrderDefaults,
  matchesLabQuery,
} from './DoctorPatientLabsTabParts'

export default function DoctorPatientLabBookPanel({
  catalog = [],
  orderedMap = new Map(),
  patientId,
  onCancel,
  onBooked,
}) {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [optionsById, setOptionsById] = useState({})

  const orderRows = useMemo(
    () =>
      catalog
        .filter((item) => matchesLabQuery(item, query))
        .map((item) => {
          const given = orderedMap.get(item.id)
          return {
            ...item,
            alreadyOrdered: Boolean(given),
            orderedOn: given?.dateLabel || '',
          }
        }),
    [catalog, orderedMap, query],
  )

  const selectableIds = useMemo(
    () => selectedIds.filter((id) => !orderedMap.has(id)),
    [selectedIds, orderedMap],
  )

  function resolveOptions(item) {
    return optionsById[item.id] || generateLabOrderDefaults()
  }

  function updateOption(itemId, field, value) {
    setOptionsById((prev) => {
      const base = prev[itemId] || generateLabOrderDefaults()
      return { ...prev, [itemId]: { ...base, [field]: value } }
    })
  }

  function toggleOne(id) {
    if (orderedMap.has(id)) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function handleBook() {
    if (!patientId || !selectableIds.length) return

    const bookedOn = formatDateLabel(new Date())
    const tests = catalog
      .filter((item) => selectableIds.includes(item.id))
      .map((item) => ({
        ...item,
        ...resolveOptions(item),
        dateLabel: bookedOn,
      }))

    dispatch(orderPatientLabs({ patientId, tests }))
    tests.forEach((test) => {
      dispatch(
        addPatientAuditEvent({
          patientId,
          type: 'lab',
          action: 'Lab report booked',
          detail: `${test.title} · ${test.collectionType} · ${test.priority}`,
          actor: 'Dr. James Carter',
        }),
      )
    })

    onBooked?.(tests.length)
  }

  return (
    <>
      <label className="flex items-center gap-2 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 min-h-11">
        <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search lab tests (CBC, lipid, thyroid…)"
          className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
          aria-label="Search lab tests"
        />
      </label>

      <div className="flex-1 min-h-0 overflow-y-auto scroll-y mt-4 space-y-2.5">
        {!orderRows.length ? (
          <p className="text-sm text-body-gray text-center py-8">No lab tests match your search.</p>
        ) : (
          orderRows.map((item) => (
            <LabBookTestCard
              key={item.id}
              item={item}
              selected={selectedIds.includes(item.id)}
              locked={item.alreadyOrdered}
              options={resolveOptions(item)}
              onToggle={() => toggleOne(item.id)}
              onChangeOption={(field, value) => updateOption(item.id, field, value)}
            />
          ))
        )}
      </div>

      {selectableIds.length ? (
        <p className="shrink-0 mt-3 text-xs text-teal-dark font-medium text-center">
          <span className="font-bold text-navy">
            {selectableIds.length} test{selectableIds.length === 1 ? '' : 's'} selected
          </span>
        </p>
      ) : null}

      <div className="shrink-0 mt-4 pt-4 border-t border-[#E6EBF1] flex gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 min-h-11 rounded-xl border border-[#E6EBF1] bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleBook}
          disabled={!selectableIds.length}
          className={`flex-1 min-h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 ${
            selectableIds.length
              ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
              : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" strokeWidth={2.25} />
          {selectableIds.length ? `Book report (${selectableIds.length})` : 'Book report'}
        </button>
      </div>
    </>
  )
}
