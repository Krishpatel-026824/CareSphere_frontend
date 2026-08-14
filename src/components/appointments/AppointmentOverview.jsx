import { CalendarDays, Check, Clock, DoorOpen, MapPin, Phone } from 'lucide-react'
import ClinicMapPreview from './ClinicMapPreview'

export default function AppointmentOverview({ appointment, notes, onNotesChange, onReschedule, onCancel }) {
  return (
    <div className="flex-1 min-h-0 min-w-0 p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-4 overflow-y-auto">
      <h2 className="text-sm font-bold text-navy shrink-0">Appointment Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,1fr)] gap-3 sm:gap-4 shrink-0">
        <div className="rounded-xl overflow-hidden border border-border-gray h-36 sm:h-40 lg:h-[200px]">
          <img
            src={appointment.heroImage}
            alt={`${appointment.doctorName} consultation`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-navy">{appointment.doctorName}</h3>
          <p className="text-sm text-body-gray mt-1">
            {appointment.specialty} • {appointment.clinicDetail || appointment.clinic}
          </p>
          <p className="text-sm text-body-gray mt-2.5 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
            <span>{appointment.fullAddress}</span>
          </p>
          <p className="text-sm text-body-gray mt-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            {appointment.phone}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <MetaChip icon={CalendarDays} label={appointment.dateLabel} />
            <MetaChip icon={Clock} label={appointment.timeLabel} />
            {appointment.room ? <MetaChip icon={DoorOpen} label={appointment.room} /> : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_minmax(200px,280px)] xl:grid-cols-[1fr_minmax(240px,320px)] gap-3 sm:gap-4 items-stretch shrink-0">
        <div className="rounded-xl border border-border-gray px-3.5 py-3 sm:px-4 sm:py-3.5">
          <p className="text-sm font-bold text-navy mb-2.5">Upcoming Tasks</p>
          <ul className="flex flex-col gap-2.5">
            {appointment.tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-2.5 text-sm text-body-gray">
                <span
                  className={`mt-0.5 w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                    task.done ? 'bg-teal border-teal text-white' : 'border-border-gray bg-white'
                  }`}
                >
                  {task.done ? <Check className="w-3 h-3" strokeWidth={3} /> : null}
                </span>
                {task.label}
              </li>
            ))}
          </ul>
        </div>
        <ClinicMapPreview appointment={appointment} />
      </div>

      <div className="flex-1 min-h-[96px] flex flex-col">
        <p className="text-sm font-bold text-navy mb-2 shrink-0">My Notes</p>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Enter your polished text here."
          className="w-full flex-1 min-h-[96px] rounded-xl border border-border-gray bg-white px-3.5 py-3 text-sm text-navy placeholder:text-body-gray/60 resize-none focus:outline-none focus:border-teal/40"
        />
      </div>

      {appointment.status !== 'Completed' ? (
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 shrink-0 w-full">
          <button
            type="button"
            onClick={() => onReschedule?.(appointment)}
            className="flex-1 min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
          >
            Reschedule
          </button>
          <button
            type="button"
            onClick={() => onCancel?.(appointment)}
            className="flex-1 min-h-11 rounded-xl border border-teal/40 bg-white text-teal text-sm font-semibold cursor-pointer hover:bg-teal-light/40"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  )
}

function MetaChip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F5F7] px-2.5 py-1 text-[12px] font-medium text-navy">
      {Icon ? <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} /> : null}
      {label}
    </span>
  )
}
