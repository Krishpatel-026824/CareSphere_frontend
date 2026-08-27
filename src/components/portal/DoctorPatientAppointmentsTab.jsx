import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'
import { bookDoctorVisit } from '../../store/slices/doctorScheduleSlice'
import { addPatientAuditEvent } from '../../store/slices/doctorPatientAuditSlice'
import DoctorPatientBookVisitPanel from './DoctorPatientBookVisitPanel'
import {
  PatientChartAddButton,
  PatientChartEmpty,
  PatientChartPanel,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
} from './PatientChartTable'

export default function DoctorPatientAppointmentsTab({ visits = [], patient }) {
  const dispatch = useDispatch()
  const [bookingOpen, setBookingOpen] = useState(false)

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
        count={visits.length}
        fill
        action={
          <PatientChartAddButton label="Add appoint" onClick={() => setBookingOpen(true)} />
        }
      >
        {!visits.length ? (
          <PatientChartEmpty text="No appointments on file for this patient yet." />
        ) : (
          <PatientChartTable fill>
            <thead className="bg-[#E8F7F6] sticky top-0 z-10">
              <tr>
                {['No.', 'Patient', 'Date', 'Time', 'Room', 'Status'].map((label, index) => (
                  <PatientChartTh key={label} center={index !== 1}>
                    {label}
                  </PatientChartTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => {
                const style =
                  appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
                return (
                  <tr key={visit.id} className={index % 2 ? 'bg-[#FAFCFD]' : 'bg-white'}>
                    <PatientChartTd center>{index + 1}</PatientChartTd>
                    <PatientChartTd>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-teal-light">
                          {visit.patientPhoto ? (
                            <img
                              src={visit.patientPhoto}
                              alt=""
                              className="w-full h-full object-cover object-top"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy truncate">{visit.patientName}</p>
                          <p className="text-[12px] text-body-gray truncate mt-0.5">
                            {[visit.visitType, visit.clinic].filter(Boolean).join(' · ') ||
                              'Clinic visit'}
                          </p>
                        </div>
                      </div>
                    </PatientChartTd>
                    <PatientChartTd center>{visit.dateLabel || '—'}</PatientChartTd>
                    <PatientChartTd center>{visit.timeLabel || '—'}</PatientChartTd>
                    <PatientChartTd center>{visit.room || '—'}</PatientChartTd>
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
