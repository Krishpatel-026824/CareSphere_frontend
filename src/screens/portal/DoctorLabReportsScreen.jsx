import { useEffect, useMemo, useState } from 'react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorClinicLabReportView from '../../components/portal/DoctorClinicLabReportView'
import DoctorLabReportActions from '../../components/portal/DoctorLabReportActions'
import DoctorLabReportsListPanel from '../../components/portal/DoctorLabReportsListPanel'
import { downloadHealthReport } from '../../utils/downloadRecord'
import {
  labReportFilterCounts,
  matchesLabReportFilter,
  matchesLabReportQuery,
  nextLabReportAfterVerify,
  sortLabReportQueue,
} from '../../utils/doctorLabReportQueue'

export default function DoctorLabReportsScreen({
  title,
  subtitle,
  listTitle,
  empty,
  caughtUp = 'You’re caught up — no reports left in this queue.',
  reports = [],
}) {
  const [items, setItems] = useState(reports)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('needs')
  const [feedback, setFeedback] = useState('')
  const [selectedId, setSelectedId] = useState(() => {
    const sorted = sortLabReportQueue(
      reports.filter((item) => item.status === 'Ready for review'),
    )
    return sorted[0]?.id || reports[0]?.id || null
  })

  useEffect(() => {
    setItems(reports)
  }, [reports])

  useEffect(() => {
    if (!feedback) return undefined
    const timer = window.setTimeout(() => setFeedback(''), 2800)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const filterCounts = useMemo(() => labReportFilterCounts(items), [items])
  const filtered = useMemo(() => {
    const next = items.filter(
      (item) => matchesLabReportFilter(item, filter) && matchesLabReportQuery(item, query),
    )
    return sortLabReportQueue(next)
  }, [items, filter, query])

  const selected =
    filtered.find((item) => item.id === selectedId) ||
    items.find((item) => item.id === selectedId) ||
    filtered[0] ||
    null

  useEffect(() => {
    if (!selectedId) return
    if (filtered.some((item) => item.id === selectedId)) return
    setSelectedId(filtered[0]?.id || null)
  }, [filtered, selectedId])

  function updateSelected(patch) {
    if (!selected) return
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== selected.id) return item
        const next = { ...item, ...patch }
        if (patch.status) {
          next.report = { ...item.report, status: patch.status }
        }
        return next
      }),
    )
  }

  function handleVerify() {
    if (!selected || selected.status !== 'Ready for review') return
    const nextId = nextLabReportAfterVerify(items, selected.id)
    updateSelected({ status: 'Verified' })
    setFeedback(
      nextId
        ? `Verified ${selected.patientName}. Opening next report.`
        : `Verified ${selected.patientName}. Queue is clear.`,
    )
    setFilter('needs')
    setSelectedId(nextId)
  }

  function handleDownload() {
    if (!selected?.report) return
    const report = selected.report
    downloadHealthReport({
      title: report.testName,
      reportId: report.bookingRef || report.id,
      dateLabel: report.sample?.reportDate,
      timeLabel: report.sample?.reportTime,
      doctorName: report.doctorName,
      hospital: report.lab?.name,
      interpretation: report.interpretation,
      parameters: report.parameters,
      verifiedBy: report.doctorName,
    })
    setFeedback('Report download started.')
  }

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={title} subtitle={subtitle} />

        {items.length === 0 ? (
          <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] p-6 flex flex-col justify-center">
            <p className="text-sm text-body-gray">{empty}</p>
          </section>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4">
            <DoctorLabReportsListPanel
              listTitle={listTitle}
              filtered={filtered}
              filter={filter}
              filterCounts={filterCounts}
              query={query}
              selectedId={selected?.id}
              caughtUp={caughtUp}
              onFilterChange={setFilter}
              onQueryChange={setQuery}
              onSelect={(report) => {
                setSelectedId(report.id)
                setFeedback('')
              }}
            />

            <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-3">
              {selected ? (
                <div className="shrink-0 rounded-2xl bg-white border border-[#E6EBF1] shadow-sm px-4 py-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light">
                    {selected.avatar ? (
                      <img
                        src={selected.avatar}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-body-gray">
                      Patient report
                    </p>
                    <p className="text-base font-bold text-navy truncate mt-0.5">
                      {selected.patientName}
                    </p>
                    <p className="text-sm text-body-gray truncate">
                      {selected.title} · {selected.dateLabel}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D0D9E3] bg-white p-6 text-sm text-body-gray">
                  {caughtUp}
                </div>
              )}

              {selected?.report ? (
                <div className="flex-1 min-h-0">
                  <DoctorClinicLabReportView
                    report={selected.report}
                    showBack={false}
                    hideDownload
                    footerSlot={
                      <DoctorLabReportActions
                        status={selected.status}
                        feedback={feedback}
                        onVerify={handleVerify}
                        onDownload={handleDownload}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
