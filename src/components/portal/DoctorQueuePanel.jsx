import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'
import { groupVisitsByDate, visitDayHeading } from '../../utils/appointmentFormat'

function splitTime(label = '') {
  const match = String(label).trim().match(/^(\d{1,2}:\d{2})\s*(AM|PM)?/i)
  return { time: match?.[1] || label, period: (match?.[2] || '').toUpperCase() }
}

export default function DoctorQueuePanel({ visits = [], nextId, onSelect, fill = false }) {
  const groups = groupVisitsByDate(visits)

  return (
    <section
      className={`bg-white/85 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-3.5 sm:p-4 flex flex-col min-h-0 ${
        fill ? 'h-full' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2 shrink-0 px-1 mb-3">
        <h2 className="text-base sm:text-lg font-bold text-navy">Clinic queue</h2>
        <span className="text-[11px] font-semibold text-teal bg-[#E8F7F6] px-2.5 py-1 rounded-full shrink-0">
          {visits.length}
        </span>
      </div>

      {visits.length === 0 ? (
        <p className="text-sm text-body-gray px-1 py-6 text-center rounded-2xl bg-[#F4F7FA]">
          No visits in the queue.
        </p>
      ) : (
        <div className={`scroll-y flex flex-col gap-3.5 overflow-y-auto min-h-0 flex-1 pr-1 ${fill ? '' : 'max-h-[340px]'}`}>
          {groups.map((group) => (
            <div key={group.id} className="flex flex-col gap-2">
              <p className="px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-body-gray">
                {visitDayHeading(group.label)}
              </p>
              {group.visits.map((visit) => {
                const active = visit.id === nextId
                const { time, period } = splitTime(visit.timeLabel)
                return (
                  <button
                    key={visit.id}
                    type="button"
                    onClick={() => onSelect?.(visit)}
                    className={`w-full text-left rounded-2xl px-2.5 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all ${
                      active
                        ? 'bg-[#E8F7F6] shadow-[inset_0_0_0_1.5px_#0EA5A0]'
                        : 'bg-[#F7FAFC] hover:bg-white hover:shadow-[inset_0_0_0_1px_#D0D9E3]'
                    }`}
                  >
                    <div
                      className={`w-[52px] shrink-0 rounded-xl py-1.5 text-center ${
                        active ? 'bg-teal text-white' : 'bg-white text-navy'
                      }`}
                    >
                      <p className="text-[13px] font-bold leading-none">{time}</p>
                      {period ? (
                        <p className="text-[9px] font-semibold mt-1 tracking-wide">{period}</p>
                      ) : null}
                    </div>
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6]">
                      <img
                        src={visit.patientPhoto}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-navy truncate">{visit.patientName}</p>
                      <p className="text-[11px] text-body-gray mt-0.5 truncate">
                        {visit.room || visit.clinic}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                        appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                      }`}
                    >
                      {visit.status}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
