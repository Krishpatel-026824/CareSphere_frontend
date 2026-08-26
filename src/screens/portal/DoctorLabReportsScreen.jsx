import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorClinicLabReportView from '../../components/portal/DoctorClinicLabReportView'
import DoctorLabReportCard from '../../components/portal/DoctorLabReportCard'

export default function DoctorLabReportsScreen({
  title,
  subtitle,
  listTitle,
  empty,
  reports = [],
  onBack,
}) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(reports[0]?.id || null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return reports
    return reports.filter((item) =>
      [item.patientName, item.title, item.status, item.dateLabel]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    )
  }, [query, reports])

  const selected =
    filtered.find((item) => item.id === selectedId) || filtered[0] || null

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={title} subtitle={subtitle} />

        {reports.length === 0 ? (
          <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] p-6 flex flex-col justify-center">
            <p className="text-sm text-body-gray">{empty}</p>
          </section>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4">
            <section className="xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-4 flex flex-col min-h-0">
              <div className="flex items-center justify-between gap-2 shrink-0 mb-3">
                <h2 className="text-lg font-bold text-navy">{listTitle}</h2>
                <span className="text-sm text-body-gray">{filtered.length}</span>
              </div>

              <label className="shrink-0 mb-3 flex items-center gap-2.5 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1] px-3 min-h-11">
                <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search patient or test"
                  className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
                />
              </label>

              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 max-h-[240px] xl:max-h-none">
                {filtered.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] p-4 text-sm text-body-gray text-center">
                    No reports match your search.
                  </p>
                ) : (
                  filtered.map((item) => (
                    <DoctorLabReportCard
                      key={item.id}
                      item={item}
                      selected={selected?.id === item.id}
                      onSelect={(report) => setSelectedId(report.id)}
                    />
                  ))
                )}
              </div>
            </section>

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
              ) : null}

              {selected?.report ? (
                <div className="flex-1 min-h-0">
                  <DoctorClinicLabReportView report={selected.report} showBack={false} />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
