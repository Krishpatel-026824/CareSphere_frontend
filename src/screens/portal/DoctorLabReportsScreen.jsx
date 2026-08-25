import { useState } from 'react'
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
  const [selectedId, setSelectedId] = useState(reports[0]?.id || null)
  const selected = reports.find((item) => item.id === selectedId) || reports[0] || null

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={title} subtitle={subtitle} onBack={onBack} />

        {reports.length === 0 ? (
          <section className="flex-1 min-h-0 bg-white rounded-[24px] border border-border-gray p-6 flex flex-col justify-center">
            <p className="text-sm text-body-gray">{empty}</p>
          </section>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4">
            <section className="xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-4 flex flex-col min-h-0">
              <div className="flex items-center justify-between gap-2 shrink-0 mb-3">
                <h2 className="text-lg font-bold text-navy">{listTitle}</h2>
                <span className="text-sm text-body-gray">{reports.length}</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 max-h-[240px] xl:max-h-none">
                {reports.map((item) => (
                  <DoctorLabReportCard
                    key={item.id}
                    item={item}
                    selected={selected?.id === item.id}
                    onSelect={(report) => setSelectedId(report.id)}
                  />
                ))}
              </div>
            </section>

            <div className="flex-1 min-w-0 min-h-0">
              {selected?.report ? (
                <DoctorClinicLabReportView report={selected.report} showBack={false} />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
