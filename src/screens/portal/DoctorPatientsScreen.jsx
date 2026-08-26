import { useMemo } from 'react'
import { Eye } from 'lucide-react'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

const patientStatusStyles = {
  Upcoming: 'bg-sky-100 text-sky-700 border border-sky-200',
  Confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
}

function isActivePatient(patient) {
  const status = patient.nextVisit?.status
  return status === 'Upcoming' || status === 'Confirmed'
}

export default function DoctorPatientsScreen({ patients = [], onSelectPatient }) {
  const allWorkDone = useMemo(
    () => patients.length > 0 && patients.every((patient) => !isActivePatient(patient)),
    [patients],
  )

  const panelTitle = allWorkDone ? 'Patients' : 'Clinic queue'

  return (
    <div className="w-full min-h-full bg-transparent">
      <div className="page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <AppointmentPageHeader title="Patients" />

        <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden">
          {patients.length === 0 ? (
            <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
              No patients in your clinic queue yet.
            </p>
          ) : (
            <>
              <div className="px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC]">
                <h2 className="text-2xl sm:text-[26px] font-bold text-navy tracking-tight leading-none">
                  {panelTitle}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed min-w-[680px] border-collapse text-left">
                  <colgroup>
                    <col className="w-16" />
                    <col className="w-[30%]" />
                    <col className="w-[17%]" />
                    <col className="w-[15%]" />
                    <col className="w-[18%]" />
                    <col className="w-24" />
                  </colgroup>
                  <thead className="bg-[#CBD5E1]">
                    <tr>
                      <th className="px-3 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                        No.
                      </th>
                      <th className="px-4 py-4 text-[15px] font-bold uppercase tracking-[0.05em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                        Patient
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
                    {patients.map((patient, index) => {
                      const next = patient.nextVisit
                      const statusStyle =
                        patientStatusStyles[next?.status] ||
                        appointmentStatusStyles[next?.status] ||
                        patientStatusStyles.Upcoming
                      const meta = [patient.ageLabel, patient.city].filter(Boolean).join(' · ')

                      return (
                        <tr key={patient.id} className="hover:bg-[#F0FDFA] transition-colors">
                          <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                            <span className="text-base font-semibold text-navy tabular-nums">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
                                <img
                                  src={patient.avatar}
                                  alt=""
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-base font-semibold text-navy truncate leading-snug">
                                  {patient.name}
                                </p>
                                {meta ? (
                                  <p className="text-[13px] text-body-gray truncate mt-0.5 leading-snug">
                                    {meta}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                            <p className="text-base font-semibold text-navy whitespace-nowrap">
                              {next?.dateLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                            <p className="text-base font-semibold text-navy whitespace-nowrap">
                              {next?.timeLabel || '—'}
                            </p>
                          </td>
                          <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                            {next ? (
                              <span
                                className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyle}`}
                              >
                                {next.status}
                              </span>
                            ) : (
                              <span className="text-base text-body-gray">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3.5 border-b border-[#D5DEE8] text-center align-middle">
                            <button
                              type="button"
                              onClick={() => onSelectPatient?.(patient)}
                              className="w-10 h-10 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 inline-flex items-center justify-center cursor-pointer transition-colors"
                              aria-label={`View ${patient.name}`}
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
            </>
          )}
        </section>
      </div>
    </div>
  )
}
