import { Check, X } from 'lucide-react'

export default function DoctorHomeTriagePanel({
  visits = [],
  onAccept,
  onDecline,
}) {
  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#E6EBF1] bg-[#FFF6EB] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-navy tracking-tight leading-none">
            Needs your decision
          </h2>
          <p className="text-sm text-body-gray mt-1.5">
            Upcoming bookings waiting for Accept or Decline
          </p>
        </div>
        <span className="shrink-0 min-w-8 h-8 px-2 rounded-full bg-[#F97316] text-white text-sm font-bold inline-flex items-center justify-center tabular-nums">
          {visits.length}
        </span>
      </div>

      {visits.length === 0 ? (
        <p className="m-4 rounded-xl border border-border-gray bg-[#F8FAFC] p-5 text-sm text-body-gray text-center">
          No bookings need a decision right now.
        </p>
      ) : (
        <ul className="divide-y divide-[#E6EBF1]">
          {visits.map((visit) => (
            <li
              key={visit.id}
              className="px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
                  <img
                    src={visit.patientPhoto}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-navy truncate">{visit.patientName}</p>
                  <p className="text-[13px] text-body-gray truncate mt-0.5">
                    {visit.timeLabel} · {visit.dateLabel}
                    {visit.room ? ` · ${visit.room}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0">
                <button
                  type="button"
                  onClick={() => onAccept?.(visit)}
                  className="flex-1 sm:flex-none min-h-10 px-3.5 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" strokeWidth={2} />
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => onDecline?.(visit)}
                  className="flex-1 sm:flex-none min-h-10 px-3.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-sm font-semibold cursor-pointer hover:bg-rose-100 inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
