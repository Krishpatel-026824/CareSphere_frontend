import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { getAppointmentNoteDraft } from '../../data/generators/appointmentNotesGenerator'
import AppointmentDetailNav from './AppointmentDetailNav'
import AppointmentDoctorTab from './AppointmentDoctorTab'
import AppointmentNotesTab from './AppointmentNotesTab'
import AppointmentOverview from './AppointmentOverview'
import AppointmentRecordsTab from './AppointmentRecordsTab'
import AppointmentSettingsTab from './AppointmentSettingsTab'

export default function AppointmentDetailPanel({ appointment, onReschedule, onCancel, onConfirm }) {
  const { findDoctorById } = useAppStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setActiveTab('overview')
    setNotes(getAppointmentNoteDraft(appointment?.id))
  }, [appointment?.id])

  if (!appointment) return null

  const doctor = findDoctorById?.(appointment.doctorId)

  return (
    <div className="flex-1 min-w-0 min-h-[560px] sm:min-h-[600px] lg:min-h-0 h-full flex flex-col md:flex-row gap-3">
      <AppointmentDetailNav activeTab={activeTab} onChange={setActiveTab} />

      <section className="flex-1 min-w-0 min-h-0 rounded-2xl border border-border-gray bg-white shadow-sm overflow-hidden flex flex-col">
        {activeTab === 'overview' ? (
          <AppointmentOverview
            appointment={appointment}
            notes={notes}
            onNotesChange={setNotes}
            onReschedule={onReschedule}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        ) : null}
        {activeTab === 'doctor' ? <AppointmentDoctorTab appointment={appointment} doctor={doctor} /> : null}
        {activeTab === 'notes' ? (
          <AppointmentNotesTab appointment={appointment} notes={notes} onNotesChange={setNotes} />
        ) : null}
        {activeTab === 'records' ? <AppointmentRecordsTab appointment={appointment} /> : null}
        {activeTab === 'settings' ? (
          <AppointmentSettingsTab appointment={appointment} doctor={doctor} />
        ) : null}
      </section>
    </div>
  )
}
