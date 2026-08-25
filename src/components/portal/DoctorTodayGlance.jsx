import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

function splitTime(label = '') {
  const match = String(label).trim().match(/^(\d{1,2}:\d{2})\s*(AM|PM)?/i)
  return { time: match?.[1] || label, period: (match?.[2] || '').toUpperCase() }
}

export default function DoctorTodayGlance({ visits = [], onSelect }) {
  const items = visits.slice(0, 3)
  if (!items.length) return null

  return (
    <section className="rounded-3xl bg-white/85 backdrop-blur-sm border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-3.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <h2 className="text-base font-bold text-navy">Later today</h2>
        <span className="text-[11px] font-semibold text-teal bg-[#E8F7F6] px-2.5 py-1 rounded-full">
          Next {items.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {items.map((visit) => {
          const { time, period } = splitTime(visit.timeLabel)
          return (
            <button
              key={visit.id}
              type="button"
              onClick={() => onSelect?.(visit)}
              className="w-full text-left rounded-2xl bg-[#F7FAFC] hover:bg-white hover:shadow-[inset_0_0_0_1px_#D0D9E3] px-2.5 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all"
            >
              <div className="w-[48px] shrink-0 rounded-xl bg-white py-1.5 text-center text-navy">
                <p className="text-[12px] font-bold leading-none">{time}</p>
                {period ? (
                  <p className="text-[9px] font-semibold mt-1 tracking-wide">{period}</p>
                ) : null}
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6]">
                <img
                  src={visit.patientPhoto}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-navy truncate">{visit.patientName}</p>
                <p className="text-[11px] text-body-gray truncate mt-0.5">{visit.room || visit.clinic}</p>
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
    </section>
  )
}
