import { Building2, MapPin, Phone } from 'lucide-react'
import { generateDoctorVisitDetail } from '../../data/generators/doctorVisitDetailGenerator'
import { generateDoctorVisitTimeline } from '../../data/generators/doctorVisitTimelineGenerator'
import { useDoctorVisitTasks } from '../../hooks/useDoctorVisitTasks'
import DoctorVisitActions from './DoctorVisitActions'
import DoctorVisitChecklist from './DoctorVisitChecklist'
import DoctorVisitHero from './DoctorVisitHero'
import DoctorVisitMeta from './DoctorVisitMeta'
import DoctorVisitPatientSnapshot from './DoctorVisitPatientSnapshot'
import DoctorVisitTimeline from './DoctorVisitTimeline'

export default function DoctorVisitPanel({
  visit,
  hideIdentity = false,
  fillHeight = false,
  className = '',
  readOnly = false,
  canAccept,
  canDecline,
  canComplete,
  onAccept,
  onDecline,
  onComplete,
  onMessage,
  onBack,
}) {
  const { tasks, toggleTask } = useDoctorVisitTasks(visit)

  if (!visit) return null

  const detail = generateDoctorVisitDetail(visit)
  const showMessage = visit.status !== 'Completed' && Boolean(onMessage)
  const details = [
    { icon: MapPin, label: 'Room', value: visit.room, hint: detail.cityLine },
    { icon: Phone, label: 'Phone', value: visit.phone, hint: visit.visitType },
  ]

  return (
    <section
      className={`bg-white/85 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-4 sm:p-5 flex flex-col gap-4 min-h-0 min-w-0 ${
        fillHeight ? 'h-full' : ''
      } ${className}`}
    >
      <DoctorVisitHero visit={visit} detail={detail} hideIdentity={hideIdentity} onBack={onBack} />
      <DoctorVisitTimeline steps={generateDoctorVisitTimeline(visit, tasks)} tasks={tasks} />
      <DoctorVisitMeta items={details} />

      <div className={`flex flex-col gap-4 min-h-0 min-w-0 ${fillHeight ? 'flex-1 overflow-y-auto scroll-y pr-0.5' : ''}`}>
        <DoctorVisitChecklist
          tasks={tasks}
          onToggleTask={
            readOnly || visit.status === 'Completed' || visit.status === 'Cancelled'
              ? undefined
              : toggleTask
          }
        />
        <DoctorVisitPatientSnapshot patientMeta={detail.patientMeta} detail={detail} />

        {visit.fullAddress || visit.landmark ? (
          <div className="flex items-start gap-2 px-0.5">
            <Building2 className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
            <div className="min-w-0">
              {visit.fullAddress ? (
                <p className="text-sm font-semibold text-navy leading-snug break-words">{visit.fullAddress}</p>
              ) : null}
              {visit.landmark ? <p className="text-xs text-body-gray mt-0.5 break-words">{visit.landmark}</p> : null}
            </div>
          </div>
        ) : null}
      </div>

      {readOnly ? (
        showMessage ? (
          <DoctorVisitActions
            visit={visit}
            showMessage
            onMessage={onMessage}
          />
        ) : null
      ) : (
        <DoctorVisitActions
          visit={visit}
          canAccept={canAccept}
          canDecline={canDecline}
          canComplete={canComplete}
          showMessage={showMessage}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          onMessage={onMessage}
        />
      )}
    </section>
  )
}
