import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
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

function goToReschedule(navigate, appointment, returnTo) {
  navigate(PATHS.reschedule, { state: { appointment, returnTo } })
}

function goToNewAppointment(navigate) {
  navigate(PATHS.newAppointment)
}

export function AppointmentsPage() {
  const { appointments: allAppointments, doctorFlowData, addBookedAppointment } = useAppStore()
  const authUser = useAppSelector((state) => state.auth.user)
  const appointments =
    authUser?.roleType === 'patient' && authUser?.name
      ? allAppointments.filter(
          (item) => !item.patientName || item.patientName.toLowerCase() === authUser.name.toLowerCase(),
        )
      : allAppointments

  return (
    <AppointmentsScreen
      appointments={appointments}
      doctors={doctorFlowData.doctors}
      doctorCategories={doctorFlowData.categories}
      currentUserName={authUser?.name || 'Krish Patel'}
      onCreateAppointment={addBookedAppointment}
    />
  )
}

export function AppointmentDetailsPage() {
  const { id } = useParams()
  const { appointments: allAppointments, doctorFlowData, addBookedAppointment } = useAppStore()
  const authUser = useAppSelector((state) => state.auth.user)
  const appointments =
    authUser?.roleType === 'patient' && authUser?.name
      ? allAppointments.filter(
          (item) => !item.patientName || item.patientName.toLowerCase() === authUser.name.toLowerCase(),
        )
      : allAppointments

  if (!appointments.find((item) => item.id === id)) {
    return <Navigate to={PATHS.appointments} replace />
  }

  return (
    <AppointmentsScreen
      appointments={appointments}
      doctors={doctorFlowData.doctors}
      doctorCategories={doctorFlowData.categories}
      currentUserName={authUser?.name || 'Krish Patel'}
      onCreateAppointment={addBookedAppointment}
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
  const returnTo = location.state?.returnTo || PATHS.appointments
  const doctors = generateRescheduleDoctors(
    doctorFlowData.doctors,
    appointments,
    appointment?.doctorId,
  )

  if (!appointment) {
    return <Navigate to={returnTo} replace />
  }

  return (
    <RescheduleDoctorScreen
      doctors={doctors}
      appointment={appointment}
      onBack={() => navigate(returnTo)}
      onSelectDoctor={(doctor) =>
        navigate(doctorBookingPath(doctor.id), {
          state: { source: 'reschedule', appointment, returnTo },
        })
      }
    />
  )
}
