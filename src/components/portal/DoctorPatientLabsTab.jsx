import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Check, Eye, X } from 'lucide-react'
import { formatDateLabel } from '../../utils/appointmentFormat'
import {
  orderPatientLabs,
  selectOrderedLabsForPatient,
} from '../../store/slices/doctorPatientLabsSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import ChartSelectMark from './ChartSelectMark'
import DoctorPatientLabReportViewer from './DoctorPatientLabReportViewer'
import {
  LabModeTabs,
  LabTestCell,
  ORDER_COLUMNS,
  matchesLabQuery,
} from './DoctorPatientLabsTabParts'
import {
  PatientChartEmpty,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
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
  const [selectedIds, setSelectedIds] = useState([])
  const [viewReport, setViewReport] = useState(null)

  const orderedMap = useMemo(() => {
    const map = new Map()
    ordered.forEach((item) => map.set(item.id, item))
    return map
  }, [ordered])

  const selectedItems = useMemo(
    () => catalog.filter((item) => selectedIds.includes(item.id)),
    [catalog, selectedIds],
  )

  const orderRows = useMemo(
    () =>
      catalog
        .filter((item) => matchesLabQuery(item, query))
        .map((item) => {
          const given = orderedMap.get(item.id)
          return {
            ...item,
            status: given ? 'Ordered' : 'Available',
            dateLabel: given?.dateLabel || '',
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

  function toggleOne(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  function handleOrder() {
    if (!patientId || !selectedIds.length) return
    const selectedTests = catalog
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => ({
        ...item,
        dateLabel: formatDateLabel(new Date()),
      }))
    dispatch(orderPatientLabs({ patientId, tests: selectedTests }))
    selectedTests.forEach((test) => {
      dispatch(
        addPatientAuditEvent({
          patientId,
          type: 'lab',
          action: 'Lab ordered',
          detail: `${test.title}${test.turnaround ? ` · Ready in ${test.turnaround}` : ''}`,
          actor: 'Dr. James Carter',
        }),
      )
    })
    setSelectedIds([])
    setMode('selected')
  }

  const modeCounts = {
    order: catalog.length,
    selected: ordered.length,
    previous: previousReports.length,
  }

  return (
    <>
      <PatientChartPanel
        title="Lab reports"
        count={ordered.length + previousReports.length}
        fill
        action={
          mode === 'order' ? (
            <button
              type="button"
              onClick={handleOrder}
              disabled={!selectedIds.length}
              className={`shrink-0 min-h-9 px-3 rounded-xl text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                selectedIds.length
                  ? 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
                  : 'bg-[#E6EBF1] text-body-gray cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.25} />
              {selectedIds.length ? `Order selected (${selectedIds.length})` : 'Order selected'}
            </button>
          ) : null
        }
      >
        <LabModeTabs value={mode} counts={modeCounts} onChange={setMode} />

        <div className="shrink-0 px-4 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC]">
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
        </div>

        {mode === 'order' && selectedItems.length ? (
          <div className="shrink-0 mx-3 mb-2 rounded-xl border border-teal/20 bg-[#E8F7F6] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-[12px] font-bold text-teal-dark">
                Selected for patient ({selectedItems.length})
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
                  <span className="truncate">{item.title}</span>
                  <X className="w-3 h-3 shrink-0 text-body-gray" strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {mode === 'order' ? (
          !orderRows.length ? (
            <PatientChartEmpty text="No lab tests match your search." />
          ) : (
            <PatientChartTable minWidth="100%" fill fixed>
              <colgroup>
                {ORDER_COLUMNS.map((column) => (
                  <col key={column.key} style={{ width: column.width }} />
                ))}
              </colgroup>
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                <tr>
                  {ORDER_COLUMNS.map((column) => (
                    <PatientChartTh key={column.key} center={column.center}>
                      {column.label}
                    </PatientChartTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderRows.map((item, index) => {
                  const orderedRow = item.status === 'Ordered'
                  const selected = selectedIds.includes(item.id)
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        if (!orderedRow) toggleOne(item.id)
                      }}
                      className={`transition-colors ${
                        orderedRow
                          ? 'bg-[#F8FAFC]'
                          : selected
                            ? 'bg-[#E8F7F6] cursor-pointer'
                            : index % 2
                              ? 'bg-[#FAFCFD] cursor-pointer hover:bg-[#F0FAF9]'
                              : 'bg-white cursor-pointer hover:bg-[#F0FAF9]'
                      }`}
                    >
                      <PatientChartTd center>
                        <ChartSelectMark selected={selected} locked={orderedRow} />
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                          {index + 1}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd>
                        <LabTestCell item={item} />
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-medium text-navy">
                          {item.turnaround || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        {orderedRow ? (
                          <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            Ordered{item.dateLabel ? ` · ${item.dateLabel}` : ''}
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
          )
        ) : null}

        {mode === 'selected' ? (
          !orderedRows.length ? (
            <PatientChartEmpty text="No labs ordered for this patient yet. Select tests and tap Order selected." />
          ) : (
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                <tr>
                  {['No.', 'Lab test', 'Ordered on', 'Ready in', 'Status'].map((label, index) => (
                    <PatientChartTh key={label} center={index !== 1}>
                      {label}
                    </PatientChartTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderedRows.map((item, index) => (
                  <tr key={item.id} className={index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                    <PatientChartTd center>{index + 1}</PatientChartTd>
                    <PatientChartTd>
                      <LabTestCell item={item} />
                    </PatientChartTd>
                    <PatientChartTd center>{item.dateLabel || '—'}</PatientChartTd>
                    <PatientChartTd center>{item.turnaround || '—'}</PatientChartTd>
                    <PatientChartTd center>
                      <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        Ordered
                      </span>
                    </PatientChartTd>
                  </tr>
                ))}
              </tbody>
            </PatientChartTable>
          )
        ) : null}

        {mode === 'previous' ? (
          !previousRows.length ? (
            <PatientChartEmpty text="No previous lab reports for this patient." />
          ) : (
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
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
                  <tr key={item.id} className={index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                    <PatientChartTd center>{index + 1}</PatientChartTd>
                    <PatientChartTd>
                      <LabTestCell item={item} />
                    </PatientChartTd>
                    <PatientChartTd center>{item.dateLabel || '—'}</PatientChartTd>
                    <PatientChartTd center>
                      <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                        {item.status || 'Verified'}
                      </span>
                    </PatientChartTd>
                    <PatientChartTd center>
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
          )
        ) : null}
      </PatientChartPanel>

      <DoctorPatientLabReportViewer report={viewReport} onClose={() => setViewReport(null)} />
    </>
  )
}
