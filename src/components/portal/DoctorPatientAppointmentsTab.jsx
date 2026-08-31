import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'
import { bookDoctorVisit } from '../../store/slices/doctorScheduleSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import DoctorPatientBookVisitPanel from './DoctorPatientBookVisitPanel'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartToolbar,
} from './PatientChartTable'

function matchesVisitQuery(visit, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [visit.patientName, visit.dateLabel, visit.timeLabel, visit.room, visit.status, visit.visitType]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export default function DoctorPatientAppointmentsTab({ visits = [], patient }) {
  const dispatch = useDispatch()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => visits.filter((visit) => matchesVisitQuery(visit, query)),
    [visits, query],
  )

  function handleBook({ dateLabel, timeLabel }) {
    if (!patient?.id) return
    dispatch(
      bookDoctorVisit({
        patientId: patient.id,
        patientName: patient.name,
        patientPhoto: patient.avatar,
        dateLabel,
        timeLabel,
        status: 'Confirmed',
      }),
    )
    dispatch(
      addPatientAuditEvent({
        patientId: patient.id,
        type: 'visit',
        action: 'Visit booked',
        detail: `${dateLabel} · ${timeLabel} · Confirmed`,
        actor: 'Dr. James Carter',
      }),
    )
    setBookingOpen(false)
  }

  return (
    <>
      <PatientChartPanel
        title="Appointment list"
        subtitle="Upcoming and past visits for this patient"
        count={filtered.length}
        fill
        action={
          <PatientChartAddButton label="Add appoint" onClick={() => setBookingOpen(true)} />
        }
      >
        <PatientChartToolbar>
          <PatientChartSearch
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search date, time, room, or status"
            aria-label="Search appointments"
          />
        </PatientChartToolbar>

        {!visits.length ? (
          <PatientChartEmpty text="No appointments on file for this patient yet." />
        ) : !filtered.length ? (
          <PatientChartEmpty text="No appointments match your search." />
        ) : (
          <>
            <PatientChartTable fill>
              <thead className="bg-[#E8F7F6]/95 backdrop-blur-sm sticky top-0 z-10">
                <tr>
                  {['No.', 'Patient', 'Date', 'Time', 'Room', 'Status'].map((label, index) => (
                    <PatientChartTh key={label} center={index !== 1}>
                      {label}
                    </PatientChartTh>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((visit, index) => {
                  const style =
                    appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                  return (
                    <tr
                      key={visit.id}
                      className={`transition-colors hover:bg-[#F0FAF9] ${
                        index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'
                      }`}
                    >
                      <PatientChartTd center>
                        <span className="text-[13px] font-semibold text-body-gray tabular-nums">
                          {index + 1}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white shadow-sm">
                            {visit.patientPhoto ? (
                              <img
                                src={visit.patientPhoto}
                                alt=""
                                className="w-full h-full object-cover object-top"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-navy truncate">
                              {visit.patientName}
                            </p>
                            <p className="text-[12px] text-body-gray truncate mt-0.5">
                              {[visit.visitType, visit.clinic].filter(Boolean).join(' · ') ||
                                'Clinic visit'}
                            </p>
                          </div>
                        </div>
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-semibold text-navy tabular-nums">
                          {visit.dateLabel || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[13px] font-medium text-navy tabular-nums">
                          {visit.timeLabel || '—'}
                        </span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span className="text-[12px] text-body-gray">{visit.room || '—'}</span>
                      </PatientChartTd>
                      <PatientChartTd center>
                        <span
                          className={`inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full ${style}`}
                        >
                          {visit.status}
                        </span>
                      </PatientChartTd>
                    </tr>
                  )
                })}
              </tbody>
            </PatientChartTable>
            <PatientChartFooter showing={filtered.length} total={visits.length} label="appointments" />
          </>
        )}
      </PatientChartPanel>

      {bookingOpen ? (
        <DoctorPatientBookVisitPanel
          patientName={patient?.name}
          onClose={() => setBookingOpen(false)}
          onBook={handleBook}
        />
      ) : null}
    </>
  )
}
