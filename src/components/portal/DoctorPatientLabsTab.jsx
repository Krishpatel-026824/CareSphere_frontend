import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Eye } from 'lucide-react'
import { selectOrderedLabsForPatient } from '../../store/slices/doctorPatientLabsSlice'
import DoctorPatientLabBookModal from './DoctorPatientLabBookModal'
import DoctorPatientLabReportViewer from './DoctorPatientLabReportViewer'
import { LabTestCell, matchesLabQuery } from './DoctorPatientLabsTabParts'
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

export default function DoctorPatientLabsTab({
  catalog = [],
  previousReports = [],
  patientId,
}) {
  const ordered = useSelector((state) => selectOrderedLabsForPatient(state, patientId))
  const [query, setQuery] = useState('')
  const [viewReport, setViewReport] = useState(null)
  const [bookOpen, setBookOpen] = useState(false)

  const orderedMap = useMemo(() => {
    const map = new Map()
    ordered.forEach((item) => map.set(item.id, item))
    return map
  }, [ordered])

  const previousRows = useMemo(
    () => previousReports.filter((item) => matchesLabQuery(item, query)),
    [previousReports, query],
  )

  const pendingRows = useMemo(
    () => ordered.filter((item) => matchesLabQuery(item, query)),
    [ordered, query],
  )

  const previousScroll = previousRows.length > 8

  return (
    <>
      <PatientChartPanel
        title="Lab reports"
        subtitle="Previous results for this patient"
        fill
        action={<PatientChartAddButton label="New lab report" onClick={() => setBookOpen(true)} />}
      >
        <PatientChartToolbar>
          <PatientChartSearch
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search previous reports"
            aria-label="Search lab reports"
          />
        </PatientChartToolbar>

        {pendingRows.length ? (
          <div className="shrink-0 px-4 sm:px-5 pt-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal mb-2">
              Booked reports
            </p>
            <div className="rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] divide-y divide-[#E6EBF1]">
              {pendingRows.map((item) => (
                <div key={item.id} className="px-3 py-2.5 flex items-center justify-between gap-3">
                  <LabTestCell item={item} />
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full shrink-0">
                    Booked · {item.dateLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {!previousRows.length ? (
          <PatientChartEmpty text="No previous lab reports yet. Tap New lab report to book tests for this patient." />
        ) : (
          <>
            <PatientChartTable fit={!previousScroll} fill={previousScroll}>
              <PatientChartThead>
                <tr>
                  {['No.', 'Report', 'Date', 'Status', 'View'].map((label, index) => (
                    <PatientChartTh key={label} center={index !== 1}>
                      {label}
                    </PatientChartTh>
                  ))}
                </tr>
              </PatientChartThead>
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
              label="previous reports"
            />
          </>
        )}
      </PatientChartPanel>

      <DoctorPatientLabBookModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        catalog={catalog}
        orderedMap={orderedMap}
        patientId={patientId}
      />

      <DoctorPatientLabReportViewer report={viewReport} onClose={() => setViewReport(null)} />
    </>
  )
}
