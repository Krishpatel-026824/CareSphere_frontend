import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { generateDoctorsForSpecialty } from '../../data/generators/doctorBookingGenerator'
import { generateRescheduleDoctors } from '../../data/generators/rescheduleDoctorsGenerator'
import AppointmentBooking from '../../screens/doctor/AppointmentBooking'
import AppointmentsScreen from '../../screens/main/AppointmentsScreen'
import NewAppointmentScreen from '../../screens/main/NewAppointmentScreen'
import RescheduleDoctorScreen from '../../screens/main/RescheduleDoctorScreen'
import {
  PATHS,
  appointmentDetailsPath,
  doctorBookingPath,
  newAppointmentBookPath,
} from '../paths'

function goToReschedule(navigate, appointment) {
  navigate(PATHS.reschedule, { state: { appointment } })
}

function goToNewAppointment(navigate) {
  navigate(PATHS.newAppointment)
}

export function AppointmentsPage() {
  const navigate = useNavigate()
  const { appointments } = useAppStore()

  return (
    <AppointmentsScreen
      appointments={appointments}
      onSelectAppointment={(appointment) => navigate(appointmentDetailsPath(appointment.id))}
      onReschedule={(appointment) => goToReschedule(navigate, appointment)}
      onNewAppointment={() => goToNewAppointment(navigate)}
    />
  )
}

export function AppointmentDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { appointments } = useAppStore()

  if (!appointments.find((item) => item.id === id)) {
    return <Navigate to={PATHS.appointments} replace />
  }

  return (
    <AppointmentsScreen
      appointments={appointments}
      selectedId={id}
      onSelectAppointment={(appointment) => navigate(appointmentDetailsPath(appointment.id))}
      onReschedule={(appointment) => goToReschedule(navigate, appointment)}
      onNewAppointment={() => goToNewAppointment(navigate)}
    />
  )
}

export function NewAppointmentPage() {
  const navigate = useNavigate()
  const { doctorFlowData } = useAppStore()
  const [specialty, setSpecialty] = useState('All')
  const doctors = generateDoctorsForSpecialty(doctorFlowData.doctors, specialty)

  return (
    <NewAppointmentScreen
      categories={doctorFlowData.categories}
      doctors={doctors}
      specialty={specialty}
      onSpecialtyChange={setSpecialty}
      onBack={() => navigate(PATHS.appointments)}
      onSelectDoctor={(doctor) => navigate(newAppointmentBookPath(doctor.id))}
    />
  )
}

export function NewAppointmentBookPage() {
  const navigate = useNavigate()
  const { doctorId } = useParams()
  const { findDoctorById, addBookedAppointment } = useAppStore()
  const doctor = findDoctorById(doctorId)

  if (!doctor) {
    return <Navigate to={PATHS.newAppointment} replace />
  }

  return (
    <AppointmentBooking
      doctor={doctor}
      variant="appointments"
      onBack={() => navigate(PATHS.newAppointment)}
      onContinue={(booking) => {
        addBookedAppointment(booking)
        navigate(PATHS.bookingConfirmation, {
          state: {
            source: 'appointments',
            returnTo: PATHS.appointments,
            booking: { ...booking, isReschedule: false },
          },
        })
      }}
    />
  )
}

export function RescheduleDoctorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { appointments, doctorFlowData, upcomingAppointment } = useAppStore()
  const appointment = location.state?.appointment || upcomingAppointment
  const doctors = generateRescheduleDoctors(doctorFlowData.doctors, appointments)

  if (!appointment) {
    return <Navigate to={PATHS.home} replace />
  }

  return (
    <RescheduleDoctorScreen
      doctors={doctors}
      appointment={appointment}
      onBack={() => navigate(PATHS.home)}
      onSelectDoctor={(doctor) =>
        navigate(doctorBookingPath(doctor.id), {
          state: { source: 'reschedule', appointment },
        })
      }
    />
  )
}
