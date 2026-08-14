import { CalendarDays, Clock } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorQueuePanel({ visits = [], nextId, onSelect }) {
  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-3 h-full min-h-[280px]">
      <div className="flex items-center justify-between gap-2 shrink-0">
        <h2 className="text-sm sm:text-base font-semibold text-navy">Clinic queue</h2>
        <span className="text-[11px] font-semibold text-body-gray">{visits.length} visits</span>
      </div>

      {visits.length === 0 ? (
        <p className="text-sm text-body-gray m-auto">No visits in the queue.</p>
      ) : (
        <ul className="flex flex-col gap-2 min-h-0 flex-1 overflow-y-auto pr-0.5">
          {visits.map((visit) => {
            const active = visit.id === nextId
            return (
              <li key={visit.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(visit)}
                  className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 cursor-pointer ${
                    active
                      ? 'bg-teal-light border-teal/25'
                      : 'bg-white border-border-gray hover:border-teal/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-teal-light">
                    <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[13px] font-bold text-navy truncate">{visit.patientName}</p>
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-px rounded-full shrink-0 ${
                          appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                        }`}
                      >
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-body-gray mt-0.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {visit.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {visit.timeLabel}
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
