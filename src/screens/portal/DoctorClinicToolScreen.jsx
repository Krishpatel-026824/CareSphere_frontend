import { useEffect, useState } from 'react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorClinicLabReportView from '../../components/portal/DoctorClinicLabReportView'
import DoctorClinicStatCard from '../../components/portal/DoctorClinicStatCard'
import DoctorClinicTaskCard from '../../components/portal/DoctorClinicTaskCard'
import DoctorClinicTaskPanel from '../../components/portal/DoctorClinicTaskPanel'

export default function DoctorClinicToolScreen({
  title,
  subtitle,
  listTitle,
  actionLabel,
  instructionsLabel,
  planLabel,
  viewReportLabel,
  backToOrderLabel,
  empty,
  stats = [],
  tasks = [],
  onBack,
  onSelectTask,
}) {
  const [filterId, setFilterId] = useState('all')
  const [selectedId, setSelectedId] = useState(tasks[0]?.id || null)
  const [showReport, setShowReport] = useState(false)
  const visible = filterId === 'all' ? tasks : tasks.filter((task) => task.badge === filterId)
  const selected = visible.find((task) => task.id === selectedId) || visible[0] || null
  const activeStat = stats.find((item) => item.id === filterId)
  const activeListTitle = filterId === 'all' ? listTitle : `${activeStat?.label || filterId}`

  useEffect(() => {
    setShowReport(false)
  }, [selected?.id, filterId])

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <QuickActionHeader title={title} subtitle={subtitle} onBack={onBack} />

        {stats.length ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            {stats.map((item) => (
              <DoctorClinicStatCard
                key={item.id}
                item={item}
                active={item.id === filterId}
                onSelect={setFilterId}
              />
            ))}
          </div>
        ) : null}

        {tasks.length === 0 ? (
          <section className="flex-1 min-h-0 bg-white rounded-[24px] border border-border-gray p-6 flex flex-col justify-center">
            <p className="text-sm text-body-gray">{empty}</p>
          </section>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4">
            <section className="xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-4 flex flex-col min-h-0">
              <div className="flex items-center justify-between gap-2 shrink-0 mb-3">
                <h2 className="text-lg font-bold text-navy">{activeListTitle}</h2>
                <span className="text-sm text-body-gray">{visible.length}</span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 max-h-[240px] xl:max-h-none">
                {visible.map((task) => (
                  <DoctorClinicTaskCard
                    key={task.id}
                    task={task}
                    selected={selected?.id === task.id}
                    onSelect={(item) => setSelectedId(item.id)}
                  />
                ))}
              </div>
            </section>
            <div className="flex-1 min-w-0 min-h-0">
              {showReport && selected?.labReport ? (
                <DoctorClinicLabReportView
                  report={selected.labReport}
                  backLabel={backToOrderLabel}
                  onBack={() => setShowReport(false)}
                />
              ) : (
                <DoctorClinicTaskPanel
                  task={selected}
                  instructionsLabel={instructionsLabel}
                  planLabel={planLabel}
                  actionLabel={actionLabel}
                  viewReportLabel={viewReportLabel}
                  onViewReport={selected?.labReport ? () => setShowReport(true) : undefined}
                  onOpenPatient={onSelectTask}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
