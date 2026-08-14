import { Check } from 'lucide-react'
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

  return (
    <div className="flex-1 min-h-0 min-w-0 px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-6 flex flex-col gap-5 overflow-y-auto">
      <h2 className="text-[15px] font-bold text-navy tracking-tight shrink-0">Appointment Details</h2>

      <AppointmentDetailHero appointment={appointment} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch shrink-0">
        <div className="rounded-lg border border-[#D7DEE7] bg-white px-4 py-4 sm:px-5 sm:py-4 flex flex-col min-h-[188px]">
          <p className="text-sm font-bold text-navy mb-3">Upcoming Tasks</p>
          <ul className="flex flex-col gap-3">
            {(appointment.tasks || []).map((task) => (
              <li key={task.id} className="flex items-start gap-3 text-sm text-body-gray leading-snug">
                <span
                  className={`mt-0.5 w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 ${
                    task.done ? 'bg-teal border-teal text-white' : 'border-[#C5CED8] bg-white'
                  }`}
                >
                  {task.done ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
                </span>
                <span className="break-words">{task.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[#D7DEE7] bg-white px-4 py-4 sm:px-5 sm:py-4 flex flex-col min-h-[188px]">
          <p className="text-sm font-bold text-navy mb-3">Location</p>
          <ClinicMapPreview appointment={appointment} />
        </div>
      </div>

      <div className="flex-1 min-h-[108px] flex flex-col">
        <p className="text-sm font-bold text-navy mb-3 shrink-0">My Notes</p>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Enter your polished text here."
          className="w-full flex-1 min-h-[108px] rounded-lg border border-[#D7DEE7] bg-white px-4 py-3 text-sm text-navy placeholder:text-body-gray/60 resize-none focus:outline-none focus:border-teal/40"
        />
      </div>

      {showConfirm || showReschedule || showCancel ? (
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full pt-1">
          {showConfirm ? (
            <button
              type="button"
              onClick={() => onConfirm?.(appointment)}
              className="flex-1 min-h-11 rounded-lg bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
            >
              Confirm
            </button>
          ) : null}
          {showReschedule ? (
            <button
              type="button"
              onClick={() => onReschedule?.(appointment)}
              className={`flex-1 min-h-11 rounded-lg text-sm font-semibold cursor-pointer ${
                showConfirm
                  ? 'border border-teal bg-white text-teal hover:bg-teal-light/50'
                  : 'bg-teal text-white hover:bg-teal-dark'
              }`}
            >
              Reschedule
            </button>
          ) : null}
          {showCancel ? (
            <button
              type="button"
              onClick={() => onCancel?.(appointment)}
              className="flex-1 min-h-11 rounded-lg border border-rose-300 bg-white text-rose-600 text-sm font-semibold cursor-pointer hover:bg-rose-50"
            >
              Cancel
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
