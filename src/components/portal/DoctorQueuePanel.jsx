import { CalendarDays, Clock } from 'lucide-react'

const statusStyles = {
  Confirmed: 'bg-[#DDF7E8] text-[#1F7A4D]',
  Upcoming: 'bg-[#DCEBFF] text-[#1D4ED8]',
  Completed: 'bg-[#E8E4EE] text-[#5B5670]',
  Cancelled: 'bg-rose-100 text-rose-700',
}

export default function DoctorQueuePanel({ visits = [], nextId, onSelect }) {
  return (
    <section className="bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 flex flex-col h-full min-h-[280px]">
      <div className="flex items-center justify-between gap-2 shrink-0 mb-4">
        <h2 className="text-lg font-bold text-navy">Clinic queue</h2>
        <span className="text-sm text-body-gray">{visits.length} visits</span>
      </div>

      {visits.length === 0 ? (
        <p className="text-sm text-body-gray">No visits in the queue.</p>
      ) : (
        <ul className="flex flex-col gap-3 shrink-0">
          {visits.map((visit) => {
            const active = visit.id === nextId
            return (
              <li key={visit.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(visit)}
                  className={`w-full text-left rounded-2xl border px-3.5 py-3 flex items-center gap-3 cursor-pointer ${
                    active
                      ? 'bg-[#E7F6F5] border-teal'
                      : 'bg-white border-[#E6EBF1] hover:border-teal/40'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6]">
                    <img
                      src={visit.patientPhoto}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="text-[15px] font-bold text-navy truncate">{visit.patientName}</p>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                          statusStyles[visit.status] || statusStyles.Upcoming
                        }`}
                      >
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-body-gray mt-1.5 flex items-center gap-4">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.75} />
                        {visit.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
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
