import { useMemo, useState } from 'react'
import { Check, CheckCircle2, ClipboardCheck, Clock3, Eye, Search, X, XCircle } from 'lucide-react'
import {
  getPatientAppointmentStatusLabel,
  getPatientAppointmentStatusStyle,
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

const COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'patient', label: 'Patient', center: false, width: '22%' },
  { key: 'date', label: 'Date', center: true, width: '14%' },
  { key: 'time', label: 'Time', center: true, width: '12%' },
  { key: 'room', label: 'Room', center: true, width: '16%' },
  { key: 'status', label: 'Status', center: true, width: '12%' },
  { key: 'actions', label: 'Actions', center: true, width: '120px' },
]

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
      const status = getPatientAppointmentStatusLabel(visit.status)
      return [visit.patientName, visit.room, visit.clinic, visit.dateLabel, visit.timeLabel, status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [sorted, filter, query])

  const shouldScroll = filtered.length > SCROLL_ROW_THRESHOLD

  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-tight">
              Appointment records
            </h2>
            <p className="text-[13px] sm:text-sm text-body-gray mt-1">
              Patient bookings — requested, accepted, rejected, and past visits
            </p>
          </div>
          <span className="self-start sm:self-auto shrink-0 text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-3 py-1.5 rounded-full tabular-nums">
            {sorted.length} total
          </span>
        </div>

        <label className="flex items-center gap-3 rounded-xl bg-white border border-[#E6EBF1] px-3.5 min-h-11 shadow-sm focus-within:border-teal/40 focus-within:ring-2 focus-within:ring-teal/10 transition-shadow">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patient, room, date, or status"
            className="w-full bg-transparent text-[14px] sm:text-[15px] text-navy outline-none placeholder:text-body-gray/60"
          />
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-1.5 p-1.5 rounded-xl bg-[#DDE4EC]">
          {FILTERS.map((item) => (
            <FilterChip
              key={item.id}
              item={item}
              active={filter === item.id}
              count={counts[item.id] || 0}
              onSelect={() => setFilter(item.id)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full min-w-[720px] border-collapse table-fixed text-left">
              <colgroup>
                {COLUMNS.map((col) => (
                  <col key={col.key} style={{ width: col.width }} />
                ))}
              </colgroup>
              <thead className="sticky top-0 z-10 bg-[#E8F7F6]/95 backdrop-blur-sm">
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`px-3 sm:px-4 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-teal-dark border-b border-teal/20 ${
                        col.center ? 'text-center' : 'text-left'
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((visit, index) => (
                  <AppointmentRow
                    key={visit.id}
                    visit={visit}
                    index={index}
                    onAccept={onAccept}
                    onDecline={onDecline}
                    onView={onView}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <footer className="shrink-0 px-4 sm:px-5 py-2.5 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
            <p className="text-[12px] sm:text-[13px] text-body-gray">
              Showing <span className="font-semibold text-navy">{filtered.length}</span> of{' '}
              <span className="font-semibold text-navy">{sorted.length}</span> records
            </p>
            {shouldScroll ? (
              <p className="text-[11px] sm:text-[12px] text-teal font-semibold">Scroll for more</p>
            ) : null}
          </footer>
        </>
      )}
    </section>
  )
}

function FilterChip({ item, active, count, onSelect }) {
  const Icon = item.Icon
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full min-h-10 sm:min-h-11 inline-flex items-center justify-center gap-1.5 rounded-lg px-2 sm:px-3 text-[13px] sm:text-[14px] font-semibold cursor-pointer transition-all ${
        active
          ? 'bg-teal-dark text-white shadow-md shadow-teal-dark/25'
          : 'text-navy/75 hover:text-navy hover:bg-white/50'
      }`}
    >
      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${active ? 'text-white' : 'text-body-gray'}`} strokeWidth={2.2} />
      <span className="truncate">{item.label}</span>
      <span
        className={`min-w-[22px] h-5 px-1 rounded-full text-[11px] font-bold inline-flex items-center justify-center tabular-nums ${
          active ? 'bg-white/20 text-white' : 'bg-white text-body-gray border border-[#D0D9E3]'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function AppointmentRow({ visit, index, onAccept, onDecline, onView }) {
  const canDecide = visit.status === 'Upcoming'
  const statusStyle = getPatientAppointmentStatusStyle(visit.status)
  const statusText = getPatientAppointmentStatusLabel(visit.status)

  return (
    <tr className="group bg-white even:bg-[#FAFCFD] hover:bg-[#F0FDFA] transition-colors">
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <span className="text-[13px] font-semibold text-body-gray tabular-nums">{index + 1}</span>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] align-middle">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white shadow-sm">
            <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-[14px] sm:text-[15px] font-semibold text-navy truncate">{visit.patientName}</p>
        </div>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <p className="text-[13px] sm:text-[14px] font-semibold text-navy whitespace-nowrap tabular-nums">
          {visit.dateLabel || '—'}
        </p>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <p className="text-[13px] sm:text-[14px] font-medium text-navy whitespace-nowrap tabular-nums">
          {visit.timeLabel || '—'}
        </p>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <p className="text-[12px] sm:text-[13px] font-medium text-body-gray truncate">{visit.room || '—'}</p>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <span className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full border border-transparent ${statusStyle}`}>
          {statusText}
        </span>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <div className="inline-flex items-center justify-center gap-1.5">
          {canDecide ? (
            <>
              <ActionButton
                tone="accept"
                onClick={() => onAccept?.(visit)}
                label={`Accept ${visit.patientName}`}
              >
                <Check className="w-4 h-4" strokeWidth={2} />
              </ActionButton>
              <ActionButton
                tone="reject"
                onClick={() => onDecline?.(visit)}
                label={`Reject ${visit.patientName}`}
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </ActionButton>
            </>
          ) : null}
          <ActionButton tone="view" onClick={() => onView?.(visit)} label={`View ${visit.patientName}`}>
            <Eye className="w-4 h-4" strokeWidth={2} />
          </ActionButton>
        </div>
      </td>
    </tr>
  )
}

function ActionButton({ children, onClick, label, tone }) {
  const tones = {
    accept:
      'bg-white text-teal border border-teal/25 hover:bg-teal hover:text-white hover:border-teal',
    reject:
      'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300',
    view:
      'bg-white text-body-gray border border-[#E6EBF1] hover:text-teal hover:border-teal/30 hover:bg-teal-light/30',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-8 h-8 rounded-lg inline-flex items-center justify-center cursor-pointer border transition-all duration-150 hover:shadow-sm active:scale-95 ${tones[tone]}`}
    >
      {children}
    </button>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
      <p className="rounded-2xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] px-6 py-5 text-sm text-body-gray text-center max-w-sm">
        No appointment records match your search.
      </p>
    </div>
  )
}
