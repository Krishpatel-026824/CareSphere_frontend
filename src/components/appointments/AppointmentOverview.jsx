import { CalendarClock, Check, NotebookPen } from 'lucide-react'
import {
  canCancelAppointment,
  canConfirmAppointment,
  canRescheduleAppointment,
} from '../../data/generators/appointmentActionsGenerator'
import AppointmentDetailHero from './AppointmentDetailHero'
import ClinicMapPreview from './ClinicMapPreview'

export default function AppointmentOverview({
  appointment,
  notes,
  onNotesChange,
  onReschedule,
  onCancel,
  onConfirm,
}) {
  const showConfirm = canConfirmAppointment(appointment)
  const showCancel = canCancelAppointment(appointment)
  const showReschedule = canRescheduleAppointment(appointment)
  const tasks = appointment.tasks || []
  const doneCount = tasks.filter((task) => task.done).length

  return (
    <div className="flex-1 min-h-0 min-w-0 px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-end justify-between gap-3 shrink-0">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">Overview</p>
          <h2 className="text-lg font-bold text-navy tracking-tight mt-0.5">Appointment Details</h2>
        </div>
      </div>

      <AppointmentDetailHero appointment={appointment} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch shrink-0">
        <div className="rounded-2xl border border-teal/10 bg-[#F7FCFB] px-4 py-4 flex flex-col min-h-[200px]">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <p className="text-sm font-bold text-navy">Upcoming Tasks</p>
            <span className="text-[11px] font-semibold text-teal bg-white px-2 py-0.5 rounded-full">
              {doneCount}/{tasks.length || 0} done
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm leading-snug ${
                  task.done ? 'bg-white text-navy' : 'bg-white/60 text-body-gray'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    task.done ? 'bg-teal border-teal text-white' : 'border-[#C5CED8] bg-white'
                  }`}
                >
                  {task.done ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
                </span>
                <span className={`break-words ${task.done ? 'font-medium' : ''}`}>{task.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-teal/10 bg-white px-4 py-4 flex flex-col min-h-[200px] shadow-[0_8px_24px_rgba(7,26,47,0.04)]">
          <p className="text-sm font-bold text-navy mb-3.5">Location</p>
          <ClinicMapPreview appointment={appointment} />
        </div>
      </div>

      <div className="flex-1 min-h-[120px] flex flex-col rounded-2xl border border-[#E4EBF2] bg-white px-4 py-3.5">
        <p className="text-sm font-bold text-navy mb-2.5 inline-flex items-center gap-2 shrink-0">
          <NotebookPen className="w-4 h-4 text-teal" strokeWidth={1.75} />
          My Notes
        </p>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Write a private note for this visit…"
          className="w-full flex-1 min-h-[100px] rounded-xl border border-[#E8EEF4] bg-[#F8FBFC] px-3.5 py-3 text-sm text-navy placeholder:text-body-gray/55 resize-none focus:outline-none focus:border-teal/40 focus:bg-white"
        />
      </div>

      {showConfirm || showReschedule || showCancel ? (
        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full">
          {showConfirm ? (
            <button
              type="button"
              onClick={() => onConfirm?.(appointment)}
              className="flex-1 min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark shadow-[0_8px_18px_rgba(14,165,160,0.28)]"
            >
              Confirm
            </button>
          ) : null}
          {showReschedule ? (
            <button
              type="button"
              onClick={() => onReschedule?.(appointment)}
              className={`flex-1 min-h-11 rounded-xl text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 ${
                showConfirm
                  ? 'border border-teal/40 bg-white text-teal hover:bg-teal-light/40'
                  : 'bg-teal text-white hover:bg-teal-dark shadow-[0_8px_18px_rgba(14,165,160,0.28)]'
              }`}
            >
              <CalendarClock className="w-4 h-4" strokeWidth={1.75} />
              Reschedule
            </button>
          ) : null}
          {showCancel ? (
            <button
              type="button"
              onClick={() => onCancel?.(appointment)}
              className="flex-1 min-h-11 rounded-xl border border-rose-200 bg-white text-rose-600 text-sm font-semibold cursor-pointer hover:bg-rose-50"
            >
              Cancel
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
