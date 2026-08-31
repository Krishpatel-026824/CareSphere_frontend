import { Eye } from 'lucide-react'
import {
  appointmentStatusLabels,
  appointmentStatusStyles,
} from '../../data/mocks/appointmentActions'

const COLUMNS = [
  { key: 'no', label: 'No.', align: 'center', width: '56px' },
  { key: 'patient', label: 'Patient', align: 'left', width: '28%' },
  { key: 'room', label: 'Room', align: 'center', width: '16%' },
  { key: 'date', label: 'Date', align: 'center', width: '14%' },
  { key: 'time', label: 'Time', align: 'center', width: '12%' },
  { key: 'status', label: 'Status', align: 'center', width: '13%' },
  { key: 'actions', label: 'Actions', align: 'center', width: '104px' },
]

const TH_CELL =
  'px-4 py-3.5 text-[12px] font-bold uppercase tracking-[0.07em] text-white border-b border-teal-dark border-r border-white/15 last:border-r-0 whitespace-nowrap'
const TD_CELL =
  'px-4 py-3.5 border-b border-[#C5D0DC] border-r border-[#D4DCE6] last:border-r-0 align-middle h-[68px]'

const agendaStatusStyles = {
  Upcoming: 'bg-amber-200/90 text-amber-950 border-amber-400',
  Confirmed: 'bg-emerald-200/90 text-emerald-950 border-emerald-400',
  Completed: 'bg-slate-200/90 text-slate-800 border-slate-400',
  Cancelled: 'bg-rose-200/90 text-rose-950 border-rose-400',
}

function cellAlignClass(align) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

export default function DoctorScheduleAgenda({
  visits = [],
  dayLabel,
  searchActive = false,
  totalInRange = 0,
  daySpan = 10,
  onSelect,
}) {
  const badgeLabel = searchActive
    ? `${visits.length} match${visits.length === 1 ? '' : 'es'}`
    : `${visits.length} visit${visits.length === 1 ? '' : 's'}`

  const subtitle = searchActive
    ? `Across ${daySpan} days · ${visits.length} result${visits.length === 1 ? '' : 's'}`
    : `${dayLabel} · ${visits.length} visit${visits.length === 1 ? '' : 's'}`

  return (
    <section className="flex-1 min-h-0 min-w-0 bg-white rounded-2xl border border-[#C5D0DC] shadow-[0_10px_32px_-14px_rgba(7,26,47,0.18)] overflow-hidden flex flex-col">
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#C5D0DC] bg-gradient-to-b from-[#EEF2F6] to-[#F8FAFC]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-tight">
              {searchActive ? 'Schedule results' : 'Day agenda'}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-navy/65 mt-1 truncate font-medium">{subtitle}</p>
          </div>
          <span className="self-start sm:self-auto shrink-0 text-[13px] font-bold text-teal-dark bg-[#E8F7F6] border border-teal/25 px-3 py-1.5 rounded-full tabular-nums shadow-sm">
            {badgeLabel}
          </span>
        </div>
      </div>

      {visits.length === 0 ? (
        <EmptyState searchActive={searchActive} />
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-auto bg-[#F4F7FA] border-t border-[#C5D0DC]">
            <table className="w-full min-w-[820px] border-collapse table-fixed bg-white">
              <colgroup>
                {COLUMNS.map((col) => (
                  <col key={col.key} style={{ width: col.width }} />
                ))}
              </colgroup>
              <thead className="sticky top-0 z-10 bg-teal-dark shadow-[0_2px_6px_rgba(7,26,47,0.18)]">
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={`${TH_CELL} ${cellAlignClass(col.align)}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, index) => (
                  <AgendaRow key={visit.id} visit={visit} index={index} onSelect={onSelect} />
                ))}
              </tbody>
            </table>
          </div>

          <footer className="shrink-0 px-4 sm:px-5 py-3 border-t border-[#C5D0DC] bg-[#EEF2F6]">
            <p className="text-[13px] sm:text-[14px] text-navy/65 font-medium">
              {searchActive ? (
                <>
                  Showing <span className="font-bold text-navy">{visits.length}</span> of{' '}
                  <span className="font-bold text-navy">{totalInRange}</span> visits across{' '}
                  {daySpan} days
                </>
              ) : (
                <>
                  Showing <span className="font-bold text-navy">{visits.length}</span> visit
                  {visits.length === 1 ? '' : 's'} for this day
                </>
              )}
            </p>
          </footer>
        </>
      )}
    </section>
  )
}

function AgendaRow({ visit, index, onSelect }) {
  const statusStyle =
    agendaStatusStyles[visit.status] ||
    appointmentStatusStyles[visit.status] ||
    agendaStatusStyles.Upcoming
  const statusLabel = appointmentStatusLabels[visit.status] || visit.status

  return (
    <tr className="group bg-white even:bg-[#EEF2F6] hover:bg-[#D8F4F1] transition-colors">
      <td className={`${TD_CELL} text-center`}>
        <span className="inline-flex w-full justify-center text-[15px] font-bold text-navy/70 tabular-nums">
          {index + 1}
        </span>
      </td>
      <td className={TD_CELL}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-[#C5D0DC] shadow-md">
            <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] sm:text-[16px] font-bold text-navy truncate leading-snug">
              {visit.patientName}
            </p>
            {visit.visitType ? (
              <p className="text-[13px] sm:text-[14px] text-navy/60 truncate mt-0.5 font-medium">
                {visit.visitType}
              </p>
            ) : null}
          </div>
        </div>
      </td>
      <td className={`${TD_CELL} text-center`}>
        <p className="text-[14px] sm:text-[15px] font-semibold text-navy/75 truncate">
          {visit.room || '—'}
        </p>
      </td>
      <td className={`${TD_CELL} text-center`}>
        <p className="text-[15px] sm:text-[16px] font-semibold text-navy whitespace-nowrap tabular-nums">
          {visit.dateLabel || '—'}
        </p>
      </td>
      <td className={`${TD_CELL} text-center`}>
        <p className="text-[15px] sm:text-[16px] font-semibold text-navy whitespace-nowrap tabular-nums">
          {visit.timeLabel || '—'}
        </p>
      </td>
      <td className={`${TD_CELL} text-center`}>
        <span
          className={`inline-flex min-w-[96px] justify-center text-[12px] font-bold px-3 py-1.5 rounded-full border shadow-sm ${statusStyle}`}
        >
          {statusLabel}
        </span>
      </td>
      <td className={`${TD_CELL} text-center`}>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onSelect?.(visit)}
            aria-label={`View ${visit.patientName}`}
            className="w-9 h-9 rounded-lg bg-[#F8FAFC] text-navy/70 border border-[#C5D0DC] hover:text-teal-dark hover:border-teal hover:bg-teal-light/50 inline-flex items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Eye className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  )
}

function EmptyState({ searchActive = false }) {
  return (
    <div className="flex-1 min-h-[200px] flex items-center justify-center p-6 bg-[#F4F7FA]">
      <p className="rounded-2xl border border-dashed border-[#C5D0DC] bg-white px-6 py-5 text-[15px] text-navy/65 text-center max-w-sm font-medium">
        {searchActive
          ? 'No visits match your search across the 10-day calendar.'
          : 'No visits this day. Pick another date on the calendar.'}
      </p>
    </div>
  )
}
