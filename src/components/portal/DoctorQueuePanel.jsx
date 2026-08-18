import { CalendarDays, Clock } from 'lucide-react'

const statusStyles = {
  Confirmed: 'bg-[#DDF7E8] text-[#1F7A4D]',
  Upcoming: 'bg-[#DCEBFF] text-[#1D4ED8]',
  Completed: 'bg-[#E8E4EE] text-[#5B5670]',
  Cancelled: 'bg-rose-100 text-rose-700',
}

export default function DoctorQueuePanel({ visits = [], nextId, onSelect, fill = false }) {
  return (
    <section
      className={`bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] pl-4 pt-4 pb-4 pr-2.5 flex flex-col ${
        fill ? 'xl:h-full xl:min-h-0' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 shrink-0 mb-3">
        <h2 className="text-lg font-bold text-navy">Clinic queue</h2>
        <span className="text-sm text-body-gray">{visits.length} visits</span>
      </div>

      {visits.length === 0 ? (
        <p className="text-sm text-body-gray">No visits in the queue.</p>
      ) : (
        <ul
          className={`w-full min-w-0 flex flex-col gap-2 overflow-y-auto min-h-0 max-h-[240px] sm:max-h-[320px] ${
            fill ? 'xl:max-h-none xl:flex-1' : ''
          }`}
        >
          {visits.map((visit) => {
            const active = visit.id === nextId
            return (
              <li key={visit.id} className="w-full min-w-0">
                <button
                  type="button"
                  onClick={() => onSelect?.(visit)}
                  className={`w-full box-border text-left rounded-xl border px-3 py-2.5 flex items-center gap-2.5 cursor-pointer ${
                    active
                      ? 'bg-[#E7F6F5] border-teal'
                      : 'bg-white border-[#E6EBF1] hover:border-teal/40'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6]">
                    <img
                      src={visit.patientPhoto}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy truncate">{visit.patientName}</p>
                    <p className="text-[11px] text-body-gray mt-1 truncate">
                      {visit.visitType} • {visit.clinic}
                    </p>
                  </div>
                  <div className="shrink-0 hidden sm:flex flex-col items-end gap-1 text-[11px] text-body-gray">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" strokeWidth={1.75} />
                      {visit.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={1.75} />
                      {visit.timeLabel}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-px rounded-full shrink-0 ${
                      statusStyles[visit.status] || statusStyles.Upcoming
                    }`}
                  >
                    {visit.status}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
