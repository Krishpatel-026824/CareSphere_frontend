import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Eye } from 'lucide-react'
import {
  doctorPortalPatientLabBookPath,
  doctorPortalPatientLabBookedPath,
} from '../../routes/paths'
import { selectOrderedLabsForPatient } from '../../store/slices/doctorPatientLabsSlice'
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

export default function DoctorPatientLabsTab({ previousReports = [], patientId }) {
  const navigate = useNavigate()
  const ordered = useSelector((state) => selectOrderedLabsForPatient(state, patientId))
  const [query, setQuery] = useState('')
  const [viewReport, setViewReport] = useState(null)

  const previousRows = useMemo(
    () => previousReports.filter((item) => matchesLabQuery(item, query)),
    [previousReports, query],
  )

  const previousScroll = previousRows.length > 8
  const bookedCount = ordered.length

  return (
    <>
      <PatientChartPanel
        title="Lab reports"
        subtitle="Previous results for this patient"
        fill
        action={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(doctorPortalPatientLabBookedPath(patientId))}
              className="shrink-0 min-h-9 px-3.5 rounded-xl border border-teal/25 bg-[#E8F7F6] text-teal-dark text-[12px] sm:text-[13px] font-semibold cursor-pointer hover:bg-teal hover:text-white hover:border-teal transition-colors inline-flex items-center gap-1.5"
            >
              Booked reports
              {bookedCount ? (
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-white/80 text-teal-dark text-[11px] font-bold inline-flex items-center justify-center tabular-nums border border-teal/15">
                  {bookedCount}
                </span>
              ) : null}
            </button>
            <PatientChartAddButton
              label="New lab report"
              onClick={() => navigate(doctorPortalPatientLabBookPath(patientId))}
            />
          </div>
        }
      >
        <PatientChartToolbar>
          <PatientChartSearch
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search previous reports"
            aria-label="Search lab reports"
          />
        </PatientChartToolbar>

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

      <DoctorPatientLabReportViewer report={viewReport} onClose={() => setViewReport(null)} />
    </>
  )
}
