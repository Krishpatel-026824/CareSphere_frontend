import { useMemo, useState } from 'react'
import { Check, CheckCircle2, ClipboardCheck, Clock3, Eye, Search, X, XCircle } from 'lucide-react'
import {
  appointmentStatusStyles,
  patientAppointmentStatusLabels,
} from '../../data/mocks/appointmentActions'
import { sortAppointmentsForList } from '../../utils/appointmentFormat'

const FILTERS = [
  { id: 'All', label: 'All', Icon: ClipboardCheck },
  { id: 'Upcoming', label: 'Requested', Icon: Clock3 },
  { id: 'Confirmed', label: 'Accepted', Icon: CheckCircle2 },
  { id: 'Cancelled', label: 'Rejected', Icon: XCircle },
  { id: 'Completed', label: 'Completed', Icon: CheckCircle2 },
]

function statusLabel(status) {
  return patientAppointmentStatusLabels[status] || status
}

export default function DoctorHomeAppointmentsTable({
  visits = [],
  onAccept,
  onDecline,
  onView,
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const sorted = useMemo(() => sortAppointmentsForList(visits), [visits])

  const counts = useMemo(() => {
    const next = { All: sorted.length, Upcoming: 0, Confirmed: 0, Cancelled: 0, Completed: 0 }
    sorted.forEach((visit) => {
      if (next[visit.status] != null) next[visit.status] += 1
    })
    return next
  }, [sorted])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((visit) => {
      if (filter !== 'All' && visit.status !== filter) return false
      if (!q) return true
      return [visit.patientName, visit.room, visit.clinic, visit.dateLabel, visit.timeLabel, statusLabel(visit.status)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [sorted, filter, query])

  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex flex-col gap-3.5">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none">
            Appointment records
          </h2>
          <p className="text-sm text-body-gray mt-1.5">
            Patient bookings — requested, accepted, rejected, and past visits
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-2xl bg-white border border-[#E6EBF1] px-4 min-h-12 shadow-sm">
          <Search className="w-5 h-5 text-body-gray shrink-0" strokeWidth={1.85} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patient, room, date, or status"
            className="w-full bg-transparent text-base text-navy outline-none placeholder:text-body-gray/70"
          />
        </label>

        <div className="rounded-2xl border border-[#E6EBF1] bg-white p-2">
          <div className="flex items-center gap-2 overflow-x-auto">
          {FILTERS.map((item) => {
            const active = filter === item.id
            const Icon = item.Icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`shrink-0 h-10 inline-flex items-center gap-2 rounded-full px-4 text-[14px] font-semibold cursor-pointer transition-all border ${
                  active
                    ? 'bg-navy text-white border-navy shadow-[0_2px_10px_rgba(15,23,42,0.18)]'
                    : 'bg-white text-navy border-[#DCE5EF] hover:border-teal/45 hover:bg-teal-light/25'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                {item.label}
                <span
                  className={`min-w-[22px] h-[22px] px-1 rounded-full text-[11px] font-bold inline-flex items-center justify-center tabular-nums ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F4F7FA] text-body-gray border border-[#E3EAF2]'
                  }`}
                >
                  {counts[item.id] || 0}
                </span>
              </button>
            )
          })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
          No appointment records match your search.
        </p>
      ) : (
        <div className="max-h-[520px] overflow-y-auto overflow-x-hidden">
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-14" />
              <col className="w-[24%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[140px]" />
            </colgroup>
            <thead className="bg-[#CBD5E1]">
              <tr>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  No.
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Patient
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Date
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Time
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Room
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  Status
                </th>
                <th className="px-3 py-3.5 text-[13px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((visit, index) => {
                const canDecide = visit.status === 'Upcoming'
                const style =
                  appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming

                return (
                  <tr key={visit.id} className="hover:bg-[#F0FDFA] transition-colors">
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <span className="text-[15px] font-semibold text-navy tabular-nums">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] align-middle">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-teal-light">
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
                      <p className="text-[15px] font-semibold text-navy whitespace-nowrap">
                        {visit.dateLabel || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <p className="text-[15px] font-semibold text-navy whitespace-nowrap">
                        {visit.timeLabel || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <p className="text-[14px] font-semibold text-navy truncate">
                        {visit.room || '—'}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8] text-center align-middle">
                      <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${style}`}>
                        {statusLabel(visit.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3 border-b border-[#D5DEE8] text-center align-middle">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        {canDecide ? (
                          <>
                            <button
                              type="button"
                              onClick={() => onAccept?.(visit)}
                              className="w-9 h-9 rounded-lg bg-teal text-white hover:bg-teal-dark inline-flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                              aria-label={`Accept ${visit.patientName}`}
                              title={`Accept ${visit.patientName}`}
                            >
                              <Check className="w-4 h-4" strokeWidth={2.2} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDecline?.(visit)}
                              className="w-9 h-9 rounded-lg bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 inline-flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                              aria-label={`Reject ${visit.patientName}`}
                              title={`Reject ${visit.patientName}`}
                            >
                              <X className="w-4 h-4" strokeWidth={2.2} />
                            </button>
                          </>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => onView?.(visit)}
                          className="w-9 h-9 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                          aria-label={`View ${visit.patientName}`}
                        >
                          <Eye className="w-5 h-5" strokeWidth={2} />
                        </button>
                      </div>
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
