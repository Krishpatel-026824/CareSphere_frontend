import { useMemo, useState } from 'react'
import { Eye, Search } from 'lucide-react'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

const SCROLL_ROW_THRESHOLD = 12

const patientStatusStyles = {
  Upcoming: 'bg-amber-100 text-amber-800 border-amber-200',
  Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Completed: 'bg-slate-100 text-slate-700 border-slate-200',
  Cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
}

function isActivePatient(patient) {
  const status = patient.nextVisit?.status
  return status === 'Upcoming' || status === 'Confirmed'
}

const COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'patient', label: 'Patient', center: false, width: '34%' },
  { key: 'date', label: 'Date', center: true, width: '16%' },
  { key: 'time', label: 'Time', center: true, width: '14%' },
  { key: 'status', label: 'Status', center: true, width: '14%' },
  { key: 'actions', label: 'Actions', center: true, width: '96px' },
]

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

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-[0_8px_30px_-12px_rgba(7,26,47,0.1)] overflow-hidden flex flex-col">
          <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

          <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white flex flex-col gap-3.5">
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

            <label className="flex items-center gap-3 rounded-xl bg-white border border-[#E6EBF1] px-4 min-h-12 shadow-sm focus-within:border-teal/40 focus-within:ring-2 focus-within:ring-teal/10 transition-shadow">
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
              <div className="flex-1 min-h-0 overflow-auto">
                <table className="w-full table-fixed min-w-[760px] border-collapse text-left">
                  <colgroup>
                    {COLUMNS.map((column) => (
                      <col key={column.key} style={{ width: column.width }} />
                    ))}
                  </colgroup>
                  <thead className="sticky top-0 z-10 bg-[#E8F7F6]/95 backdrop-blur-sm">
                    <tr>
                      {COLUMNS.map((column) => (
                        <th
                          key={column.key}
                          className={`px-3 sm:px-4 py-3.5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] text-teal-dark border-b border-teal/20 ${
                            column.center ? 'text-center' : 'text-left'
                          }`}
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
                          className="group bg-white even:bg-[#FAFCFD] hover:bg-[#F0FDFA] transition-colors"
                        >
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] text-center align-middle">
                            <span className="text-[15px] font-semibold text-body-gray tabular-nums">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] align-middle">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white shadow-sm">
                                <img
                                  src={patient.avatar}
                                  alt=""
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[16px] sm:text-[17px] font-bold text-navy truncate leading-snug tracking-tight">
                                  {patient.name}
                                </p>
                                {meta ? (
                                  <p className="text-[13px] sm:text-[14px] text-body-gray truncate mt-0.5 leading-snug">
                                    {meta}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] text-center align-middle">
                            <p className="text-[15px] sm:text-[16px] font-semibold text-navy whitespace-nowrap tabular-nums">
                              {next?.dateLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] text-center align-middle">
                            <p className="text-[15px] sm:text-[16px] font-medium text-navy whitespace-nowrap tabular-nums">
                              {next?.timeLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] text-center align-middle">
                            {next ? (
                              <span
                                className={`inline-flex text-[13px] font-semibold px-3 py-1 rounded-full border ${statusStyle}`}
                              >
                                {next.status}
                              </span>
                            ) : (
                              <span className="text-[15px] text-body-gray">—</span>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 py-4 border-b border-[#EEF2F6] text-center align-middle">
                            <button
                              type="button"
                              onClick={() => onSelectPatient?.(patient)}
                              className="w-10 h-10 rounded-xl bg-white text-body-gray border border-[#E6EBF1] hover:text-teal hover:border-teal/30 hover:bg-teal-light/30 inline-flex items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow"
                              aria-label={`View ${patient.name}`}
                            >
                              <Eye className="w-[18px] h-[18px]" strokeWidth={2} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <footer className="shrink-0 px-4 sm:px-5 py-3 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
                <p className="text-[13px] sm:text-[14px] text-body-gray">
                  Showing <span className="font-semibold text-navy">{filtered.length}</span> of{' '}
                  <span className="font-semibold text-navy">{patients.length}</span> patients in
                  clinic queue
                </p>
                {filtered.length > SCROLL_ROW_THRESHOLD ? (
                  <p className="text-[12px] sm:text-[13px] text-teal font-semibold">Scroll for more</p>
                ) : null}
              </footer>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
