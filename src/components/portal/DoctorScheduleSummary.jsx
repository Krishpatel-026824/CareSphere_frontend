import { Building2, Clock3, MapPin, Phone, X } from 'lucide-react'
import { appointmentStatusLabels } from '../../data/mocks/appointmentActions'
import { generateDoctorVisitDetail } from '../../data/generators/doctorVisitDetailGenerator'
import { generateDoctorVisitTimeline } from '../../data/generators/doctorVisitTimelineGenerator'
import { useDoctorVisitTasks } from '../../hooks/useDoctorVisitTasks'
import DoctorVisitActions from './DoctorVisitActions'
import DoctorVisitChecklist from './DoctorVisitChecklist'
import DoctorVisitTimeline from './DoctorVisitTimeline'

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#F7FAFC] px-3 py-2 flex items-center gap-2.5 min-w-0">
      <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-teal" strokeWidth={1.85} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-body-gray leading-none">
          {label}
        </p>
        <p className="text-[14px] font-semibold text-navy mt-1 truncate leading-snug tracking-tight">
          {value}
        </p>
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

  return (
    <aside
      className={
        asModal
          ? 'w-full bg-white flex flex-col min-h-0 max-h-[min(92dvh,820px)]'
          : 'w-full xl:w-[42%] shrink-0 self-start max-h-full overflow-y-auto scroll-y bg-white/85 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] flex flex-col'
      }
    >
      <div
        className={`shrink-0 bg-gradient-to-br from-[#0EA5A0] via-[#0C948E] to-[#0B6E6A] text-white ${
          asModal ? 'px-5 py-4' : 'px-4 py-3.5'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex items-center gap-3">
            <div
              className={`rounded-xl overflow-hidden bg-white/20 ring-2 ring-white/30 shrink-0 ${
                asModal ? 'w-12 h-12' : 'w-11 h-11'
              }`}
            >
              <img
                src={visit.patientPhoto}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                Selected visit
              </p>
              <p
                className={`font-display font-bold leading-[1.15] tracking-tight truncate mt-0.5 ${
                  asModal ? 'text-[24px]' : 'text-[22px]'
                }`}
              >
                {visit.patientName}
              </p>
              <p className="text-[13px] font-medium text-white/90 truncate mt-0.5 tracking-tight">
                {visit.timeLabel} · {visit.dateLabel}
              </p>
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close visit summary"
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          ) : null}
        </div>
        <div className="mt-2.5 inline-flex items-center rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[12px] font-semibold tracking-tight">
          {appointmentStatusLabels[visit.status] || visit.status}
        </div>
      </div>

      <div
        className={`flex flex-col ${
          asModal
            ? 'px-5 pt-3.5 pb-2 gap-3 overflow-y-auto scroll-y min-h-0'
            : 'p-4 gap-3'
        }`}
      >
        {visit.prepNote ? (
          <p className="text-[14px] font-medium text-navy leading-snug tracking-tight bg-[#F4F7FA] rounded-xl px-3.5 py-2.5">
            <span className="font-bold text-teal">Reason · </span>
            {visit.prepNote}
          </p>
        ) : null}

        <DoctorVisitTimeline steps={steps} tasks={tasks} compact />

        <DoctorVisitChecklist
          tasks={tasks}
          onToggleTask={visit.status !== 'Cancelled' ? toggleTask : undefined}
          compact
        />

        <div className="grid grid-cols-2 gap-2">
          <InfoTile icon={MapPin} label="Room" value={visit.room} />
          <InfoTile icon={Phone} label="Phone" value={visit.phone} />
          <InfoTile icon={Clock3} label="Duration" value={detail.duration} />
          <InfoTile icon={Building2} label="Clinic" value={visit.clinic} />
        </div>
      </div>

      <div className={`shrink-0 ${asModal ? 'px-5 pb-4 pt-1' : 'px-4 pb-4'}`}>
        <DoctorVisitActions
          visit={visit}
          canAccept={canAccept}
          canDecline={canDecline}
          canComplete={canComplete}
          showMessage={false}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          stacked
          compact
        />
      </div>
    </aside>
  )
}
