import { ArrowRight, Eye } from 'lucide-react'
import {
  appointmentStatusLabels,
  appointmentStatusStyles,
} from '../../data/mocks/appointmentActions'

export default function DoctorTodayGlance({
  visits = [],
  onSelect,
  onViewSchedule,
}) {
  const items = visits.slice(0, 5)

  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-navy tracking-tight leading-none">
            Today at a glance
          </h2>
          <p className="text-sm text-body-gray mt-1.5">
            {items.length} next visit{items.length === 1 ? '' : 's'}
          </p>
        </div>
        {onViewSchedule ? (
          <button
            type="button"
            onClick={onViewSchedule}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark cursor-pointer"
          >
            View full schedule
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="m-4 rounded-xl border border-border-gray bg-[#F8FAFC] p-5 text-sm text-body-gray text-center">
          No more visits lined up for today.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead className="bg-[#CBD5E1]">
              <tr>
                <th className="px-3 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Time
                </th>
                <th className="px-3 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Patient
                </th>
                <th className="px-3 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Room
                </th>
                <th className="px-3 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Status
                </th>
                <th className="px-3 py-3 w-16 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 text-center">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((visit) => {
                const statusStyle =
                  appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                const statusLabel = appointmentStatusLabels[visit.status] || visit.status

                return (
                  <tr key={visit.id} className="hover:bg-[#F0FDFA] transition-colors">
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <p className="text-[15px] font-semibold text-navy whitespace-nowrap">
                        {visit.timeLabel || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] align-middle">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-teal-light">
                          <img
                            src={visit.patientPhoto}
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <p className="text-[15px] font-semibold text-navy truncate">
                          {visit.patientName}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <p className="text-[15px] font-semibold text-navy truncate">
                        {visit.room || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <span
                        className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-[#D5DEE8] text-center align-middle">
                      <button
                        type="button"
                        onClick={() => onSelect?.(visit)}
                        className="w-9 h-9 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                        aria-label={`View ${visit.patientName}`}
                      >
                        <Eye className="w-5 h-5" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
