import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Check, Eye } from 'lucide-react'
import { formatDateLabel } from '../../utils/appointmentFormat'
import {
  orderPatientLabs,
  selectOrderedLabsForPatient,
} from '../../store/slices/doctorPatientLabsSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import ChartSelectMark, { ChartRowStatusBadge } from './ChartSelectMark'
import DoctorPatientLabReportViewer from './DoctorPatientLabReportViewer'
import {
  generateLabOrderDefaults,
  labCollectionOptions,
  labPriorityOptions,
  LabModeTabs,
  LabOrderRowSelect,
  LabTestCell,
  ORDER_COLUMNS,
  SELECTED_LAB_COLUMNS,
  matchesLabQuery,
} from './DoctorPatientLabsTabParts'
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

export default function DoctorPatientLabsTab({
  catalog = [],
  previousReports = [],
  patientId,
}) {
  const dispatch = useDispatch()
  const ordered = useSelector((state) => selectOrderedLabsForPatient(state, patientId))
  const [mode, setMode] = useState('previous')
  const [query, setQuery] = useState('')
  const [viewReport, setViewReport] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [optionsById, setOptionsById] = useState({})

  const orderedMap = useMemo(() => {
    const map = new Map()
    ordered.forEach((item) => map.set(item.id, item))
    return map
  }, [ordered])

  const selectableIds = useMemo(
    () => selectedIds.filter((id) => !orderedMap.has(id)),
    [selectedIds, orderedMap],
  )

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

  const previousRows = useMemo(
    () => previousReports.filter((item) => matchesLabQuery(item, query)),
    [previousReports, query],
  )

  const orderedRows = useMemo(
    () => ordered.filter((item) => matchesLabQuery(item, query)),
    [ordered, query],
  )

  const orderScroll = orderRows.length > 8
  const selectedScroll = orderedRows.length > 8
  const previousScroll = previousRows.length > 8

  const modeCounts = {
    order: catalog.length,
    selected: ordered.length,
    previous: previousReports.length,
  }

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

  function handleOrderSelected() {
    if (!patientId || !selectableIds.length) return

    const tests = catalog
      .filter((item) => selectableIds.includes(item.id))
      .map((item) => {
        const options = resolveOptions(item)
        return {
          ...item,
          ...options,
          dateLabel: formatDateLabel(new Date()),
        }
      })

    dispatch(orderPatientLabs({ patientId, tests }))
    tests.forEach((test) => {
      dispatch(
        addPatientAuditEvent({
          patientId,
          type: 'lab',
          action: 'Lab ordered',
          detail: `${test.title} · ${test.collectionType} · ${test.priority}`,
          actor: 'Dr. James Carter',
        }),
      )
    })

    setSelectedIds([])
    setOptionsById({})
    setQuery('')
    setMode('selected')
  }

  return (
    <>
      <PatientChartPanel
        title="Lab reports"
        subtitle={
          mode === 'order'
            ? 'Select tests below, then order for this patient'
            : 'Order tests and review previous results'
        }
        count={mode === 'order' ? selectableIds.length : ordered.length + previousReports.length}
        fill
        action={
          mode === 'order' ? (
            <button
              type="button"
              onClick={handleOrderSelected}
              disabled={!selectableIds.length}
              className={`shrink-0 min-h-9 px-3 rounded-xl text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                selectableIds.length
                  ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                  : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
              {selectableIds.length
                ? `Order selected (${selectableIds.length})`
                : 'Order selected'}
            </button>
          ) : mode !== 'order' ? (
            <PatientChartAddButton label="Order tests" onClick={() => setMode('order')} />
          ) : null
        }
      >
        <LabModeTabs value={mode} counts={modeCounts} onChange={setMode} />

        <PatientChartToolbar>
          <PatientChartSearch
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              mode === 'previous'
                ? 'Search previous reports'
                : mode === 'selected'
                  ? 'Search selected list'
                  : 'Search lab tests (CBC, lipid, thyroid…)'
            }
            aria-label="Search labs"
          />
        </PatientChartToolbar>

        {mode === 'order' ? (
          !orderRows.length ? (
            <PatientChartEmpty text="No lab tests match your search." />
          ) : (
            <>
              <PatientChartTable
                minWidth="980px"
                fixed
                fit={!orderScroll}
                fill={orderScroll}
                className="text-[15px]"
              >
                <colgroup>
                  {ORDER_COLUMNS.map((column) => (
                    <col key={column.key} style={{ width: column.width }} />
                  ))}
                </colgroup>
                <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
                  <tr>
                    {ORDER_COLUMNS.map((column) => (
                      <PatientChartTh
                        key={column.key}
                        center={column.center}
                        className="!text-[12px] !py-3.5"
                      >
                        {column.label}
                      </PatientChartTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderRows.map((item, index) => {
                    const locked = item.alreadyOrdered
                    const selected = selectedIds.includes(item.id)
                    const options = locked
                      ? {
                          collectionType: orderedMap.get(item.id)?.collectionType,
                          priority: orderedMap.get(item.id)?.priority,
                        }
                      : resolveOptions(item)

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
                        <PatientChartTd center className="!py-3.5">
                          <span className="text-[14px] font-semibold text-body-gray tabular-nums">
                            {index + 1}
                          </span>
                        </PatientChartTd>
                        <PatientChartTd className="!py-3.5">
                          <LabTestCell
                            item={item}
                            statusBadge={
                              locked ? (
                                <ChartRowStatusBadge tone="success">
                                  Ordered{item.orderedOn ? ` · ${item.orderedOn}` : ''}
                                </ChartRowStatusBadge>
                              ) : null
                            }
                          />
                        </PatientChartTd>
                        <PatientChartTd center className="!py-3.5">
                          <span className="text-[14px] font-semibold text-navy">
                            {item.turnaround || '—'}
                          </span>
                        </PatientChartTd>
                        <PatientChartTd center className="!py-3 px-2">
                          <div className="flex justify-center">
                            <LabOrderRowSelect
                              value={options.collectionType}
                              options={labCollectionOptions}
                              disabled={locked}
                              lockedValue={orderedMap.get(item.id)?.collectionType}
                              onChange={(value) => updateOption(item.id, 'collectionType', value)}
                            />
                          </div>
                        </PatientChartTd>
                        <PatientChartTd center className="!py-3 px-2">
                          <div className="flex justify-center">
                            <LabOrderRowSelect
                              value={options.priority}
                              options={labPriorityOptions}
                              disabled={locked}
                              lockedValue={orderedMap.get(item.id)?.priority}
                              onChange={(value) => updateOption(item.id, 'priority', value)}
                            />
                          </div>
                        </PatientChartTd>
                        <PatientChartTd center className="!py-3.5">
                          <ChartSelectMark
                            selected={selected}
                            locked={locked}
                            lockedLabel="Ordered"
                            label="Select"
                            selectedLabel="Selected"
                            onToggle={() => toggleOne(item.id)}
                          />
                        </PatientChartTd>
                      </tr>
                    )
                  })}
                </tbody>
              </PatientChartTable>
              <PatientChartFooter
                showing={orderRows.length}
                total={catalog.length}
                label="tests"
                extra={
                  selectableIds.length
                    ? `${selectableIds.length} selected for order`
                    : null
                }
              />
            </>
          )
        ) : null}

        {mode === 'selected' ? (
          !orderedRows.length ? (
            <PatientChartEmpty text="No labs ordered for this patient yet. Select tests on the Order tests tab." />
          ) : (
            <>
              <PatientChartTable
                minWidth="900px"
                fixed
                fit={!selectedScroll}
                fill={selectedScroll}
                className="text-[15px]"
              >
                <colgroup>
                  {SELECTED_LAB_COLUMNS.map((column) => (
                    <col key={column.key} style={{ width: column.width }} />
                  ))}
                </colgroup>
                <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
                  <tr>
                    {SELECTED_LAB_COLUMNS.map((column) => (
                      <PatientChartTh
                        key={column.key}
                        center={column.center}
                        className="!text-[12px] !py-3.5"
                      >
                        {column.label}
                      </PatientChartTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderedRows.map((item, index) => (
                    <tr
                      key={item.id}
                      className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
                    >
                      <PatientChartTd center className="!py-3.5">
                        {index + 1}
                      </PatientChartTd>
                      <PatientChartTd className="!py-3.5">
                        <LabTestCell item={item} />
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="text-[14px] font-semibold text-navy tabular-nums">
                          {item.dateLabel || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="text-[13px] font-semibold text-navy">
                          {item.collectionType || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="text-[13px] font-semibold text-navy">
                          {item.priority || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Ordered
                        </span>
                      </PatientChartTd>
                    </tr>
                  ))}
                </tbody>
              </PatientChartTable>
              <PatientChartFooter showing={orderedRows.length} total={ordered.length} label="orders" />
            </>
          )
        ) : null}

        {mode === 'previous' ? (
          !previousRows.length ? (
            <PatientChartEmpty text="No previous lab reports for this patient." />
          ) : (
            <>
              <PatientChartTable fit={!previousScroll} fill={previousScroll}>
                <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
                  <tr>
                    {['No.', 'Report', 'Date', 'Status', 'View'].map((label, index) => (
                      <PatientChartTh key={label} center={index !== 1}>
                        {label}
                      </PatientChartTh>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previousRows.map((item, index) => (
                    <tr
                      key={item.id}
                      className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
                    >
                      <PatientChartTd center className="!py-3.5">
                        {index + 1}
                      </PatientChartTd>
                      <PatientChartTd className="!py-3.5">
                        <LabTestCell item={item} />
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        {item.dateLabel || '—'}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                          {item.status || 'Verified'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <button
                          type="button"
                          disabled={!item.report}
                          onClick={() => setViewReport(item.report)}
                          className={`w-9 h-9 rounded-xl inline-flex items-center justify-center transition-colors ${
                            item.report
                              ? 'text-navy/70 hover:text-teal hover:bg-teal-light/60 cursor-pointer'
                              : 'text-body-gray/40 cursor-not-allowed'
                          }`}
                          aria-label={`View ${item.title}`}
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </PatientChartTd>
                    </tr>
                  ))}
                </tbody>
              </PatientChartTable>
              <PatientChartFooter
                showing={previousRows.length}
                total={previousReports.length}
                label="reports"
              />
            </>
          )
        ) : null}
      </PatientChartPanel>

      <DoctorPatientLabReportViewer report={viewReport} onClose={() => setViewReport(null)} />
    </>
  )
}
