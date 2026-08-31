import { useMemo, useState } from 'react'
import { ChevronDown, Eye, Search } from 'lucide-react'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

const SCROLL_ROW_THRESHOLD = 12

const patientStatusStyles = {
  Upcoming: 'bg-amber-200/90 text-amber-950 border-amber-400',
  Confirmed: 'bg-emerald-200/90 text-emerald-950 border-emerald-400',
  Completed: 'bg-slate-200/90 text-slate-800 border-slate-400',
  Cancelled: 'bg-rose-200/90 text-rose-950 border-rose-400',
}

function isActivePatient(patient) {
  const status = patient.nextVisit?.status
  return status === 'Upcoming' || status === 'Confirmed'
}

const COLUMNS = [
  { key: 'no', label: 'No.', align: 'center', width: '56px' },
  { key: 'patient', label: 'Patient', align: 'left', width: '36%' },
  { key: 'date', label: 'Date', align: 'center', width: '15%' },
  { key: 'time', label: 'Time', align: 'center', width: '13%' },
  { key: 'status', label: 'Status', align: 'center', width: '15%' },
  { key: 'actions', label: 'Actions', align: 'center', width: '104px' },
]

const TH_CELL =
  'px-4 py-3.5 text-[12px] font-bold uppercase tracking-[0.07em] text-white border-b border-teal-dark border-r border-white/15 last:border-r-0 whitespace-nowrap'
const TD_CELL =
  'px-4 py-3.5 border-b border-[#C5D0DC] border-r border-[#D4DCE6] last:border-r-0 align-middle h-[68px]'

function cellAlignClass(align) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

function matchesPatientQuery(patient, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const next = patient.nextVisit
  return [patient.name, patient.ageLabel, patient.city, next?.dateLabel, next?.timeLabel, next?.status]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export default function DoctorPatientsScreen({ patients = [], onSelectPatient }) {
  const [query, setQuery] = useState('')

  const allWorkDone = useMemo(
    () => patients.length > 0 && patients.every((patient) => !isActivePatient(patient)),
    [patients],
  )

  const filtered = useMemo(
    () => patients.filter((patient) => matchesPatientQuery(patient, query)),
    [patients, query],
  )

  const panelTitle = allWorkDone ? 'All patients' : 'Clinic queue'
  const panelSubtitle = allWorkDone
    ? 'Every visit in this list is completed or closed'
    : 'Today’s patients — open a chart to review or prescribe'

  return (
    <div className="w-full h-full min-h-0 bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <div className="shrink-0">
          <AppointmentPageHeader title="Patients" />
        </div>

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#C5D0DC] shadow-[0_10px_32px_-14px_rgba(7,26,47,0.18)] overflow-hidden flex flex-col">
          <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

          <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#C5D0DC] bg-gradient-to-b from-[#EEF2F6] to-[#F8FAFC] flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <h2 className="font-display text-[22px] sm:text-[26px] font-bold text-navy tracking-tight leading-tight">
                    {panelTitle}
                  </h2>
                  <span className="shrink-0 text-[13px] font-bold text-teal-dark bg-[#E8F7F6] border border-teal/20 px-3 py-1 rounded-full tabular-nums shadow-sm">
                    {filtered.length}
                  </span>
                </div>
                <p className="text-[14px] sm:text-[15px] text-body-gray mt-1.5 leading-snug">{panelSubtitle}</p>
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-xl bg-white border border-[#C5D0DC] px-4 min-h-12 shadow-sm focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15 transition-shadow">
              <Search className="w-[18px] h-[18px] text-body-gray shrink-0" strokeWidth={2} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search patient, date, time, or status"
                className="w-full bg-transparent text-[15px] sm:text-[16px] text-navy outline-none placeholder:text-body-gray/60"
                aria-label="Search clinic queue"
              />
            </label>
          </div>

          {patients.length === 0 ? (
            <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
              <p className="rounded-2xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] px-6 py-5 text-[15px] text-body-gray text-center max-w-sm">
                No patients in your clinic queue yet.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
              <p className="rounded-2xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] px-6 py-5 text-[15px] text-body-gray text-center max-w-sm">
                No patients match your search.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 min-h-0 overflow-auto bg-[#F4F7FA] border-t border-[#C5D0DC]">
                <table className="w-full table-fixed min-w-[820px] border-collapse bg-white">
                  <colgroup>
                    {COLUMNS.map((column) => (
                      <col key={column.key} style={{ width: column.width }} />
                    ))}
                  </colgroup>
                  <thead className="sticky top-0 z-10 bg-teal-dark shadow-[0_2px_6px_rgba(7,26,47,0.18)]">
                    <tr>
                      {COLUMNS.map((column) => (
                        <th
                          key={column.key}
                          className={`${TH_CELL} ${cellAlignClass(column.align)}`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((patient, index) => {
                      const next = patient.nextVisit
                      const statusStyle =
                        patientStatusStyles[next?.status] ||
                        appointmentStatusStyles[next?.status] ||
                        patientStatusStyles.Upcoming
                      const meta = [patient.ageLabel, patient.city].filter(Boolean).join(' · ')

                      return (
                        <tr
                          key={patient.id}
                          className="group bg-white even:bg-[#EEF2F6] hover:bg-[#D8F4F1] transition-colors"
                        >
                          <td className={`${TD_CELL} text-center`}>
                            <span className="inline-flex w-full justify-center text-[15px] font-bold text-navy/70 tabular-nums">
                              {index + 1}
                            </span>
                          </td>
                          <td className={TD_CELL}>
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-[#C5D0DC] shadow-md">
                                <img
                                  src={patient.avatar}
                                  alt=""
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[15px] sm:text-[16px] font-bold text-navy truncate leading-snug tracking-tight">
                                  {patient.name}
                                </p>
                                {meta ? (
                                  <p className="text-[13px] sm:text-[14px] text-navy/60 truncate mt-0.5 leading-snug font-medium">
                                    {meta}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className={`${TD_CELL} text-center`}>
                            <p className="text-[15px] sm:text-[16px] font-semibold text-navy whitespace-nowrap tabular-nums">
                              {next?.dateLabel || '—'}
                            </p>
                          </td>
                          <td className={`${TD_CELL} text-center`}>
                            <p className="text-[15px] sm:text-[16px] font-medium text-navy whitespace-nowrap tabular-nums">
                              {next?.timeLabel || '—'}
                            </p>
                          </td>
                          <td className={`${TD_CELL} text-center`}>
                            {next ? (
                              <span
                                className={`inline-flex min-w-[96px] justify-center text-[12px] font-bold px-3 py-1.5 rounded-full border shadow-sm ${statusStyle}`}
                              >
                                {next.status}
                              </span>
                            ) : (
                              <span className="text-[15px] font-medium text-navy/50">—</span>
                            )}
                          </td>
                          <td className={`${TD_CELL} text-center`}>
                            <div className="flex justify-center">
                              <button
                                type="button"
                                onClick={() => onSelectPatient?.(patient)}
                                className="w-9 h-9 rounded-lg bg-[#F8FAFC] text-navy/70 border border-[#C5D0DC] hover:text-teal-dark hover:border-teal hover:bg-teal-light/50 inline-flex items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow-md active:scale-95"
                                aria-label={`View ${patient.name}`}
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

              <footer className="shrink-0 px-4 sm:px-5 py-3 border-t border-[#C5D0DC] bg-[#EEF2F6] flex items-center justify-between gap-2">
                <p className="text-[13px] sm:text-[14px] text-navy/65 font-medium">
                  Showing <span className="font-bold text-navy">{filtered.length}</span> of{' '}
                  <span className="font-bold text-navy">{patients.length}</span> patients in
                  clinic queue
                </p>
                {filtered.length > SCROLL_ROW_THRESHOLD ? (
                  <p className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] text-teal-dark font-bold">
                    Scroll for more
                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </p>
                ) : null}
              </footer>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
