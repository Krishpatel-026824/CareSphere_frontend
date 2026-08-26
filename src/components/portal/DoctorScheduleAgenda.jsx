import { Eye, MoreVertical, Search } from 'lucide-react'
import {
  appointmentStatusLabels,
  appointmentStatusStyles,
} from '../../data/mocks/appointmentActions'

export default function DoctorScheduleAgenda({
  visits = [],
  dayLabel,
  query,
  onQueryChange,
  onSelect,
  onOpenMenu,
}) {
  return (
    <section className="flex-1 min-h-0 min-w-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="shrink-0 px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex flex-col gap-3.5">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-[26px] font-bold text-navy tracking-tight leading-none">
            Day agenda
          </h2>
          <p className="text-sm text-body-gray mt-1.5 truncate">
            {dayLabel} · {visits.length} visit{visits.length === 1 ? '' : 's'}
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-2xl bg-white border border-[#E6EBF1] px-4 min-h-14 shadow-sm">
          <Search className="w-5 h-5 text-body-gray shrink-0" strokeWidth={1.85} />
          <input
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder="Search patient or room"
            className="w-full bg-transparent text-base text-navy outline-none placeholder:text-body-gray/70"
          />
        </label>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {visits.length === 0 ? (
          <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-base text-body-gray text-center">
            No visits this day. Pick another date or clear filters.
          </p>
        ) : (
          <table className="w-full table-fixed min-w-[760px] border-collapse text-left">
            <colgroup>
              <col className="w-16" />
              <col className="w-[28%]" />
              <col className="w-[18%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-28" />
            </colgroup>
            <thead className="bg-[#CBD5E1] sticky top-0 z-10">
              <tr>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                  No.
                </th>
                <th className="px-4 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                  Patient
                </th>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                  Room
                </th>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                  Date
                </th>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                  Time
                </th>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                  Status
                </th>
                <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 text-center align-middle">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => {
                const statusStyle =
                  appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                const statusLabel = appointmentStatusLabels[visit.status] || visit.status

                return (
                  <tr key={visit.id} className="hover:bg-[#F0FDFA] transition-colors">
                    <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <span className="text-base font-semibold text-navy tabular-nums">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
                          <img
                            src={visit.patientPhoto}
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-navy truncate leading-snug">
                            {visit.patientName}
                          </p>
                          {visit.visitType ? (
                            <p className="text-[13px] text-body-gray truncate mt-0.5 leading-snug">
                              {visit.visitType}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                      <p className="text-base font-semibold text-navy truncate">
                        {visit.room || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                      <p className="text-base font-semibold text-navy whitespace-nowrap">
                        {visit.dateLabel || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                      <p className="text-base font-semibold text-navy whitespace-nowrap">
                        {visit.timeLabel || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <span
                        className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyle}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 border-b border-[#D5DEE8] text-center align-middle">
                      <div className="inline-flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onSelect?.(visit)}
                          className="w-10 h-10 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                          aria-label={`View ${visit.patientName}`}
                        >
                          <Eye className="w-5 h-5" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => onOpenMenu?.(visit, event)}
                          className="w-10 h-10 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                          aria-label={`More actions for ${visit.patientName}`}
                        >
                          <MoreVertical className="w-5 h-5" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
