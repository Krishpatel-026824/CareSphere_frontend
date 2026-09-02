import { Building2, Clock3, MapPin, Phone, X } from 'lucide-react'
import { appointmentStatusLabels } from '../../data/mocks/appointmentActions'
import { generateDoctorVisitDetail } from '../../data/generators/doctorVisitDetailGenerator'
import { generateDoctorVisitTimeline } from '../../data/generators/doctorVisitTimelineGenerator'
import { useDoctorVisitTasks } from '../../hooks/useDoctorVisitTasks'
import DoctorVisitActions from './DoctorVisitActions'
import DoctorVisitChecklist from './DoctorVisitChecklist'
import DoctorVisitTimeline from './DoctorVisitTimeline'

function MetaItem({ icon: Icon, label, value }) {
  if (!value) return null

  return (
    <div className="min-w-0 flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.85} />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-body-gray leading-none">
          {label}
        </p>
        <p className="text-[13px] font-semibold text-navy truncate mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function DoctorScheduleSummary({
  visit,
  canAccept,
  canDecline,
  canComplete,
  onAccept,
  onDecline,
  onComplete,
  onClose,
  asModal = false,
}) {
  const { tasks, toggleTask } = useDoctorVisitTasks(visit)
  if (!visit) return null

  const detail = generateDoctorVisitDetail(visit)
  const steps = generateDoctorVisitTimeline(visit, tasks)
  const checklistActive = visit.status === 'Upcoming' || visit.status === 'Confirmed'
  const doneCount = tasks.filter((task) => task.done).length

  return (
    <aside
      className={
        asModal
          ? 'w-full bg-white flex flex-col min-h-0 max-h-[min(92dvh,760px)]'
          : 'w-full xl:w-[42%] shrink-0 self-start max-h-full overflow-y-auto scroll-y bg-white/85 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] flex flex-col'
      }
    >
      <div
        className={`shrink-0 bg-gradient-to-br from-[#0EA5A0] via-[#0C948E] to-[#0B6E6A] text-white ${
          asModal ? 'px-4 py-3.5' : 'px-4 py-3.5'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/20 ring-2 ring-white/30 shrink-0">
              <img
                src={visit.patientPhoto}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                Selected visit
              </p>
              <p className="font-display font-bold text-[22px] leading-tight tracking-tight truncate mt-0.5">
                {visit.patientName}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-[12px] font-medium text-white/90 truncate">
                  {visit.timeLabel} · {visit.dateLabel}
                </p>
                <span className="inline-flex items-center rounded-full bg-white/15 border border-white/20 px-2 py-0.5 text-[11px] font-semibold">
                  {appointmentStatusLabels[visit.status] || visit.status}
                </span>
              </div>
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close visit summary"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={`flex flex-col ${
          asModal
            ? 'px-4 pt-3 pb-2 gap-2.5 overflow-y-auto scroll-y min-h-0'
            : 'p-4 gap-3'
        }`}
      >
        {visit.prepNote ? (
          <p className="text-[13px] text-navy leading-snug bg-[#F4F7FA] rounded-lg px-3 py-2">
            <span className="font-bold text-teal">Reason · </span>
            {visit.prepNote}
          </p>
        ) : null}

        <div className="rounded-xl border border-[#E6EBF1] bg-[#FAFCFD] p-3 space-y-2.5">
          <DoctorVisitTimeline
            steps={steps}
            tasks={tasks}
            compact
            showHint={!checklistActive || !tasks.length || doneCount === tasks.length}
          />

          {checklistActive && tasks.length ? (
            <div className="pt-2 border-t border-[#E6EBF1]">
              {doneCount < tasks.length ? (
                <p className="text-[12px] text-body-gray mb-2">
                  Tick checklist items to finish check-in ({doneCount}/{tasks.length})
                </p>
              ) : null}
              <DoctorVisitChecklist
                tasks={tasks}
                onToggleTask={checklistActive ? toggleTask : undefined}
                compact
              />
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-[#E6EBF1] bg-white px-3 py-2.5 grid grid-cols-2 gap-3">
          <MetaItem icon={MapPin} label="Room" value={visit.room} />
          <MetaItem icon={Clock3} label="Duration" value={detail.duration} />
          <MetaItem icon={Building2} label="Clinic" value={visit.clinic} />
          <MetaItem icon={Phone} label="Phone" value={visit.phone} />
        </div>
      </div>

      <div className={`shrink-0 border-t border-[#E6EBF1] bg-[#FAFCFD] ${asModal ? 'px-4 py-3' : 'px-4 pb-4 pt-1'}`}>
        <DoctorVisitActions
          visit={visit}
          canAccept={canAccept}
          canDecline={canDecline}
          canComplete={canComplete}
          showMessage={false}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          stacked={false}
          compact
        />
      </div>
    </aside>
  )
}
