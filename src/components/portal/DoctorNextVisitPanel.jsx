import {
  Building2,
  CircleCheck,
  Clock3,
  DoorOpen,
  Info,
  Phone,
} from 'lucide-react'
import { generateDoctorNextVisitCard } from '../../data/generators/doctorNextVisitGenerator'
import { generateDoctorVisitTimeline } from '../../data/generators/doctorVisitTimelineGenerator'
import { useDoctorVisitTasks } from '../../hooks/useDoctorVisitTasks'
import DoctorVisitChecklist from './DoctorVisitChecklist'
import DoctorVisitPrepPanel from './DoctorVisitPrepPanel'
import DoctorVisitTimeline from './DoctorVisitTimeline'

export default function DoctorNextVisitPanel({ visit, onOpen, onAccept }) {
  const { tasks, toggleTask } = useDoctorVisitTasks(visit)

  if (!visit) {
    return (
      <section className="relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-sm border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-5 flex flex-col gap-2">
        <span className="w-11 h-11 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <Clock3 className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <h2 className="font-display text-xl font-bold text-navy">No upcoming patients</h2>
        <p className="text-sm text-body-gray max-w-md">
          New bookings from patients will show up in your clinic queue.
        </p>
      </section>
    )
  }

  const card = generateDoctorNextVisitCard(visit)
  const canAccept = card.status === 'Upcoming'
  const steps = generateDoctorVisitTimeline(visit, tasks)

  return (
    <section className="relative rounded-3xl bg-white/85 backdrop-blur-sm border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] flex flex-col overflow-hidden">
      <div className="relative shrink-0 bg-gradient-to-br from-[#0EA5A0] via-[#0C948E] to-[#0B6E6A] px-4 sm:px-5 py-3 text-white">
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">Up next</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-2.5 py-1 text-[11px] font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            {card.status}
          </span>
        </div>

        <div className="relative mt-2 flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white/20 ring-2 ring-white/35 shrink-0">
              <img
                src={card.patientPhoto}
                alt={card.patientName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base sm:text-lg font-bold leading-tight truncate">
                {card.patientName}
              </p>
              <p className="text-xs text-white/80 mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <span className="inline-flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" strokeWidth={1.85} />
                  {card.visitType}
                </span>
                <span className="opacity-50">·</span>
                <span className="truncate">{card.clinic}</span>
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[24px] sm:text-[28px] font-bold leading-none tracking-tight">
              {card.timeLabel}
            </p>
            <p className="text-[11px] font-semibold text-white/80 mt-1">{card.dateLabel}</p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-navy">
          <span className="inline-flex items-center gap-1.5 min-w-0">
            <DoorOpen className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
            <span className="font-semibold truncate">
              {card.room}
              {card.roomHint ? ` · ${card.roomHint}` : ''}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
            <span className="font-semibold">{card.phone}</span>
          </span>
        </div>

        {card.prepNote ? (
          <p className="text-[13px] text-navy leading-snug bg-[#F4F7FA] rounded-xl px-3 py-2">
            <span className="font-bold text-teal">Reason · </span>
            {card.prepNote}
          </p>
        ) : null}

        <DoctorVisitTimeline steps={steps} tasks={tasks} compact />
        <DoctorVisitChecklist tasks={tasks} onToggleTask={toggleTask} compact />
        <DoctorVisitPrepPanel visit={visit} compact />

        <div className="flex flex-col sm:flex-row gap-2 pt-0.5">
          {canAccept ? (
            <button
              type="button"
              onClick={() => onAccept?.(visit)}
              className="flex-1 min-h-10 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 transition-colors"
            >
              <CircleCheck className="w-4 h-4" strokeWidth={1.9} />
              Accept
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onOpen?.(visit)}
            className="flex-1 min-h-10 rounded-xl border border-teal bg-white text-teal text-sm font-semibold cursor-pointer hover:bg-teal-light inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Info className="w-4 h-4" strokeWidth={1.9} />
            Open visit
          </button>
        </div>
      </div>
    </section>
  )
}
