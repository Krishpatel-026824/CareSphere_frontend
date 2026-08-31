import { Eye } from 'lucide-react'
import {
  appointmentStatusLabels,
  appointmentStatusStyles,
} from '../../data/mocks/appointmentActions'

const COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'patient', label: 'Patient', center: false, width: '26%' },
  { key: 'room', label: 'Room', center: true, width: '16%' },
  { key: 'date', label: 'Date', center: true, width: '14%' },
  { key: 'time', label: 'Time', center: true, width: '12%' },
  { key: 'status', label: 'Status', center: true, width: '12%' },
  { key: 'actions', label: 'Actions', center: true, width: '88px' },
]

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
    <section className="flex-1 min-h-0 min-w-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-tight">
              {searchActive ? 'Schedule results' : 'Day agenda'}
            </h2>
            <p className="text-[13px] sm:text-sm text-body-gray mt-1 truncate">{subtitle}</p>
          </div>
          <span className="self-start sm:self-auto shrink-0 text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-3 py-1.5 rounded-full tabular-nums">
            {badgeLabel}
          </span>
        </div>
      </div>

      {visits.length === 0 ? (
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
                {visits.map((visit, index) => (
                  <AgendaRow key={visit.id} visit={visit} index={index} onSelect={onSelect} />
                ))}
              </tbody>
            </table>
          </div>

          <footer className="shrink-0 px-4 sm:px-5 py-2.5 border-t border-[#E6EBF1] bg-[#F8FAFC]">
            <p className="text-[12px] sm:text-[13px] text-body-gray">
              {searchActive ? (
                <>
                  Showing <span className="font-semibold text-navy">{visits.length}</span> of{' '}
                  <span className="font-semibold text-navy">{totalInRange}</span> visits across{' '}
                  {daySpan} days
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-navy">{visits.length}</span> visit
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
  const statusStyle = appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
  const statusLabel = appointmentStatusLabels[visit.status] || visit.status

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
          <div className="min-w-0">
            <p className="text-[14px] sm:text-[15px] font-semibold text-navy truncate">
              {visit.patientName}
            </p>
            {visit.visitType ? (
              <p className="text-[12px] text-body-gray truncate mt-0.5">{visit.visitType}</p>
            ) : null}
          </div>
        </div>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <p className="text-[12px] sm:text-[13px] font-medium text-body-gray truncate">
          {visit.room || '—'}
        </p>
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
        <span className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full border border-transparent ${statusStyle}`}>
          {statusLabel}
        </span>
      </td>
      <td className="px-3 sm:px-4 py-3 border-b border-[#EEF2F6] text-center align-middle">
        <button
          type="button"
          onClick={() => onSelect?.(visit)}
          aria-label={`View ${visit.patientName}`}
          className="w-8 h-8 rounded-lg inline-flex items-center justify-center cursor-pointer transition-colors bg-white text-body-gray border border-[#E6EBF1] hover:text-teal hover:border-teal/30 hover:bg-teal-light/30"
        >
          <Eye className="w-4 h-4" strokeWidth={2} />
        </button>
      </td>
    </tr>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
      <p className="rounded-2xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] px-6 py-5 text-sm text-body-gray text-center max-w-sm">
        {searchActive
          ? 'No visits match your search across the 10-day calendar.'
          : 'No visits this day. Pick another date on the calendar.'}
      </p>
    </div>
  )
}
