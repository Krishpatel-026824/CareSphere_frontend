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

const SCROLL_ROW_THRESHOLD = 8

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

  const shouldScroll = filtered.length > SCROLL_ROW_THRESHOLD

  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden">
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
                      ? 'bg-teal text-white border-teal shadow-sm'
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
        <p className="m-4 sm:m-5 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
          No appointment records match your search.
        </p>
      ) : (
        <>
          <div
            className={`overflow-x-auto ${
              shouldScroll ? 'max-h-[min(520px,calc(100dvh-280px))] overflow-y-auto' : ''
            }`}
          >
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                <tr>
                  {['No.', 'Patient', 'Date', 'Time', 'Room', 'Status', 'Actions'].map((label, index) => (
                    <th
                      key={label}
                      className={`px-3 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark border-b border-teal/20 ${
                        index < 6 ? 'border-r border-teal/10' : ''
                      } ${index === 0 || index >= 2 ? 'text-center' : 'text-left'}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((visit, index) => {
                  const canDecide = visit.status === 'Upcoming'
                  const style =
                    appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                  const rowTone = index % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFD]'

                  return (
                    <tr key={visit.id} className={`${rowTone} hover:bg-[#F0FDFA] transition-colors`}>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <span className="text-[14px] font-semibold text-navy tabular-nums">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] align-middle">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
                            <img
                              src={visit.patientPhoto}
                              alt=""
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <p className="text-[14px] font-semibold text-navy truncate">
                            {visit.patientName}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <p className="text-[14px] font-semibold text-navy whitespace-nowrap">
                          {visit.dateLabel || '—'}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <p className="text-[14px] font-semibold text-navy whitespace-nowrap">
                          {visit.timeLabel || '—'}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <p className="text-[13px] font-medium text-body-gray truncate">
                          {visit.room || '—'}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <span className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full ${style}`}>
                          {statusLabel(visit.status)}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 border-b border-[#E6EBF1] text-center align-middle">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {canDecide ? (
                            <>
                              <button
                                type="button"
                                onClick={() => onAccept?.(visit)}
                                className="w-8 h-8 rounded-lg bg-teal text-white hover:bg-teal-dark inline-flex items-center justify-center cursor-pointer transition-colors"
                                aria-label={`Accept ${visit.patientName}`}
                              >
                                <Check className="w-4 h-4" strokeWidth={2.2} />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDecline?.(visit)}
                                className="w-8 h-8 rounded-lg bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 inline-flex items-center justify-center cursor-pointer transition-colors"
                                aria-label={`Reject ${visit.patientName}`}
                              >
                                <X className="w-4 h-4" strokeWidth={2.2} />
                              </button>
                            </>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => onView?.(visit)}
                            className="w-8 h-8 rounded-lg text-navy/60 hover:text-teal hover:bg-teal-light/50 inline-flex items-center justify-center cursor-pointer transition-colors"
                            aria-label={`View ${visit.patientName}`}
                          >
                            <Eye className="w-4 h-4" strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-5 py-2.5 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
            <p className="text-[12px] text-body-gray">
              Showing <span className="font-semibold text-navy">{filtered.length}</span> of{' '}
              <span className="font-semibold text-navy">{sorted.length}</span> records
            </p>
            {shouldScroll ? (
              <p className="text-[11px] text-teal font-medium">Scroll for more</p>
            ) : null}
          </div>
        </>
      )}
    </section>
  )
}
