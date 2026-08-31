import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Eye } from 'lucide-react'
import { formatDateLabel } from '../../utils/appointmentFormat'
import {
  orderPatientLabs,
  selectOrderedLabsForPatient,
} from '../../store/slices/doctorPatientLabsSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import ChartSelectMark, { ChartRowStatusBadge } from './ChartSelectMark'
import DoctorPatientLabReportViewer from './DoctorPatientLabReportViewer'
import {
  LabModeTabs,
  LabTestCell,
  ORDER_COLUMNS,
  matchesLabQuery,
} from './DoctorPatientLabsTabParts'
import {
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

  const orderedMap = useMemo(() => {
    const map = new Map()
    ordered.forEach((item) => map.set(item.id, item))
    return map
  }, [ordered])

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

  function orderOneTest(item) {
    if (!patientId || orderedMap.has(item.id)) return
    const test = {
      ...item,
      dateLabel: formatDateLabel(new Date()),
    }
    dispatch(orderPatientLabs({ patientId, tests: [test] }))
    dispatch(
      addPatientAuditEvent({
        patientId,
        type: 'lab',
        action: 'Lab ordered',
        detail: `${test.title}${test.turnaround ? ` · Ready in ${test.turnaround}` : ''}`,
        actor: 'Dr. James Carter',
      }),
    )
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
        subtitle="Order tests and review previous results"
        count={ordered.length + previousReports.length}
        fill
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
            <PatientChartTable minWidth="100%" fill fixed>
              <colgroup>
                {ORDER_COLUMNS.map((column) => (
                  <col key={column.key} style={{ width: column.width }} />
                ))}
              </colgroup>
              <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
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
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        orderedRow
                          ? 'bg-[#F8FAFC] opacity-75'
                          : index % 2
                            ? 'bg-[#FAFCFD]'
                            : 'bg-white'
                      }`}
                    >
                      <PatientChartTd center>
                        <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                          {index + 1}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd>
                        <LabTestCell
                          item={item}
                          statusBadge={
                            orderedRow ? (
                              <ChartRowStatusBadge tone="success">
                                Ordered{item.dateLabel ? ` · ${item.dateLabel}` : ''}
                              </ChartRowStatusBadge>
                            ) : null
                          }
                        />
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-medium text-navy">
                          {item.turnaround || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        <ChartSelectMark
                          locked={orderedRow}
                          lockedLabel="Ordered"
                          label="Order test"
                          onAction={() => orderOneTest(item)}
                        />
                      </PatientChartTd>
                    </tr>
                  )
                })}
              </tbody>
            </PatientChartTable>
            <PatientChartFooter showing={orderRows.length} total={catalog.length} label="tests" />
            </>
          )
        ) : null}

        {mode === 'selected' ? (
          !orderedRows.length ? (
            <PatientChartEmpty text="No labs ordered for this patient yet. Use Order test on the Order tests tab." />
          ) : (
            <>
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
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
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#F0FAF9] ${
                      index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                    }`}
                  >
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
            <PatientChartFooter showing={orderedRows.length} total={ordered.length} label="orders" />
            </>
          )
        ) : null}

        {mode === 'previous' ? (
          !previousRows.length ? (
            <PatientChartEmpty text="No previous lab reports for this patient." />
          ) : (
            <>
            <PatientChartTable fill>
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
                    className={`transition-colors hover:bg-[#F0FAF9] ${
                      index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                    }`}
                  >
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
