import { useMemo } from 'react'
import { Eye } from 'lucide-react'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

const patientStatusStyles = {
  Upcoming: 'bg-sky-100 text-sky-700 border border-sky-200',
  Confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
  Cancelled: 'bg-rose-100 text-rose-700 border border-rose-200',
}

function isActivePatient(patient) {
  const status = patient.nextVisit?.status
  return status === 'Upcoming' || status === 'Confirmed'
}

const COLUMNS = [
  { key: 'no', label: 'No.', width: '6%' },
  { key: 'patient', label: 'Patient', width: '38%' },
  { key: 'date', label: 'Date', width: '16%' },
  { key: 'time', label: 'Time', width: '14%' },
  { key: 'status', label: 'Status', width: '16%' },
  { key: 'actions', label: 'Actions', width: '10%' },
]

export default function DoctorPatientsScreen({ patients = [], onSelectPatient }) {
  const allWorkDone = useMemo(
    () => patients.length > 0 && patients.every((patient) => !isActivePatient(patient)),
    [patients],
  )

  const panelTitle = allWorkDone ? 'Patients' : 'Clinic queue'

  return (
    <div className="w-full h-full min-h-0 bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <div className="shrink-0">
          <AppointmentPageHeader title="Patients" />
        </div>

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
          {patients.length === 0 ? (
            <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
              No patients in your clinic queue yet.
            </p>
          ) : (
            <>
              <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none">
                  {panelTitle}
                </h2>
                <span className="text-[12px] font-semibold text-body-gray bg-white border border-[#E6EBF1] px-2.5 py-1 rounded-full tabular-nums">
                  {patients.length}
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-auto">
                <table className="w-full table-fixed min-w-[720px] border-collapse text-left">
                  <colgroup>
                    {COLUMNS.map((column) => (
                      <col key={column.key} style={{ width: column.width }} />
                    ))}
                  </colgroup>
                  <thead className="bg-[#E8F7F6] sticky top-0 z-10">
                    <tr>
                      {COLUMNS.map((column, index) => (
                        <th
                          key={column.key}
                          className={`px-3 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark border-b border-teal/20 ${
                            index === 1 ? 'text-left' : 'text-center'
                          }`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => {
                      const next = patient.nextVisit
                      const statusStyle =
                        patientStatusStyles[next?.status] ||
                        appointmentStatusStyles[next?.status] ||
                        patientStatusStyles.Upcoming
                      const meta = [patient.ageLabel, patient.city].filter(Boolean).join(' · ')

                      return (
                        <tr
                          key={patient.id}
                          className={`transition-colors hover:bg-[#F0FDFA] ${
                            index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                          }`}
                        >
                          <td className="px-3 py-3 border-b border-[#E6EBF1] text-center align-middle">
                            <span className="text-[14px] font-semibold text-body-gray tabular-nums">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-3 py-3 border-b border-[#E6EBF1] align-middle">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
                                <img
                                  src={patient.avatar}
                                  alt=""
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[15px] font-semibold text-navy truncate leading-snug">
                                  {patient.name}
                                </p>
                                {meta ? (
                                  <p className="text-[12px] text-body-gray truncate mt-0.5 leading-snug">
                                    {meta}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 border-b border-[#E6EBF1] text-center align-middle">
                            <p className="text-[14px] font-semibold text-navy whitespace-nowrap">
                              {next?.dateLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-[#E6EBF1] text-center align-middle">
                            <p className="text-[14px] font-semibold text-navy whitespace-nowrap">
                              {next?.timeLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-[#E6EBF1] text-center align-middle">
                            {next ? (
                              <span
                                className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle}`}
                              >
                                {next.status}
                              </span>
                            ) : (
                              <span className="text-[14px] text-body-gray">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3 border-b border-[#E6EBF1] text-center align-middle">
                            <button
                              type="button"
                              onClick={() => onSelectPatient?.(patient)}
                              className="w-9 h-9 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                              aria-label={`View ${patient.name}`}
                            >
                              <Eye className="w-4 h-4" strokeWidth={2} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="shrink-0 px-4 sm:px-5 py-2 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
                <p className="text-[12px] text-body-gray">
                  Showing <span className="font-semibold text-navy">{patients.length}</span> patients
                  in clinic queue
                </p>
                {patients.length > 12 ? (
                  <p className="text-[11px] text-teal font-medium">Scroll for more</p>
                ) : null}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
