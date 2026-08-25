import {
  Building2,
  CalendarDays,
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
import DoctorVisitTimeline from './DoctorVisitTimeline'

export default function DoctorNextVisitPanel({
  visit,
  onOpen,
  onAccept,
  fillHeight = false,
  quickActions = [],
  onActionClick,
}) {
  const { tasks, toggleTask } = useDoctorVisitTasks(visit)

  if (!visit) {
    return (
      <section
        className={`relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-sm border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-6 sm:p-8 flex flex-col gap-3 ${
          fillHeight ? 'h-full' : ''
        }`}
      >
        <span className="w-12 h-12 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <Clock3 className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <h2 className="font-display text-2xl font-bold text-navy">No upcoming patients</h2>
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
    <section
      className={`relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-sm border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] flex flex-col min-h-0 ${
        fillHeight ? 'h-full' : ''
      }`}
    >
      <div className="relative shrink-0 bg-gradient-to-br from-[#0EA5A0] via-[#0C948E] to-[#0B6E6A] px-4 sm:px-5 py-4 text-white">
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">Up next</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-2.5 py-1 text-[11px] font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            {card.status}
          </span>
        </div>

        <div className="relative mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-white/20 ring-2 ring-white/35 shrink-0">
              <img
                src={card.patientPhoto}
                alt={card.patientName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl font-bold leading-tight truncate">
                {card.patientName}
              </p>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" strokeWidth={1.85} />
                  {card.visitType}
                </span>
                <span className="opacity-50">·</span>
                <span className="truncate">{card.clinic}</span>
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[28px] sm:text-[34px] font-bold leading-none tracking-tight">
              {card.timeLabel}
            </p>
            <p className="text-xs font-semibold text-white/80 mt-1">{card.dateLabel}</p>
          </div>
        </div>
      </div>

      <div className={`px-4 sm:px-5 py-3.5 flex flex-col gap-3 min-h-0 ${fillHeight ? 'flex-1' : ''}`}>
        <div className="shrink-0 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-navy">
          <span className="inline-flex items-center gap-2 min-w-0">
            <DoorOpen className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
            <span className="font-semibold truncate">
              {card.room}
              {card.roomHint ? ` · ${card.roomHint}` : ''}
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
            <span className="font-semibold">{card.phone}</span>
          </span>
        </div>

        {card.prepNote ? (
          <p className="shrink-0 text-sm text-navy leading-snug bg-[#F4F7FA] rounded-2xl px-3.5 py-2.5">
            <span className="font-bold text-teal">Reason · </span>
            {card.prepNote}
          </p>
        ) : null}

        <div className="shrink-0">
          <DoctorVisitTimeline steps={steps} />
        </div>

        <div className={`min-h-0 ${fillHeight ? 'flex-1 overflow-y-auto scroll-y' : ''}`}>
          <DoctorVisitChecklist tasks={tasks} onToggleTask={toggleTask} />
        </div>

        {quickActions.length ? (
          <div className="shrink-0 flex flex-wrap gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon || CalendarDays
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onActionClick?.(action.key)}
                  className={`inline-flex items-center gap-2 min-h-9 rounded-full px-3 text-xs font-semibold cursor-pointer transition-colors hover:brightness-[0.97] ${action.tone}`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.85} />
                  {action.label}
                </button>
              )
            })}
          </div>
        ) : null}

        <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
          {canAccept ? (
            <button
              type="button"
              onClick={() => onAccept?.(visit)}
              className="flex-1 min-h-11 rounded-2xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 transition-colors"
            >
              <CircleCheck className="w-5 h-5" strokeWidth={1.9} />
              Accept
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onOpen?.(visit)}
            className="flex-1 min-h-11 rounded-2xl border border-teal bg-white text-teal text-sm font-semibold cursor-pointer hover:bg-teal-light inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Info className="w-5 h-5" strokeWidth={1.9} />
            Open visit
          </button>
        </div>
      </div>
    </section>
  )
}
