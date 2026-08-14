import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import AppointmentBooking from '../../screens/doctor/AppointmentBooking'
import AppointmentConfirmation from '../../screens/doctor/AppointmentConfirmation'
import DoctorCategories from '../../screens/doctor/DoctorCategories'
import DoctorProfile from '../../screens/doctor/DoctorProfile'
import DoctorSearchResults from '../../screens/doctor/DoctorSearchResults'
import {
  PATHS,
  appointmentDetailsPath,
  doctorBookingPath,
  doctorCategoryPath,
  doctorProfilePath,
} from '../paths'

function flowState(location, extra = {}) {
  return {
    source: location.state?.source || 'profile',
    returnTo: location.state?.returnTo || PATHS.home,
    ...extra,
  }
}

export function DoctorCategoriesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { doctorFlowData } = useAppStore()
  const state = flowState(location)

  return (
    <DoctorCategories
      data={doctorFlowData}
      onBack={() => navigate(state.returnTo)}
      onOpenNotifications={() => navigate(PATHS.notifications)}
      onSelectCategory={(category) => navigate(doctorCategoryPath(category), { state })}
      onSelectDoctor={(doctor) =>
        navigate(doctorProfilePath(doctor.id), { state: { ...state, from: PATHS.doctors } })
      }
    />
  )
}

export function DoctorSearchResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category || '')
  const { doctorFlowData } = useAppStore()
  const filteredDoctors = doctorFlowData.doctors.filter((doctor) => doctor.specialty === decodedCategory)
  const state = flowState(location)

  return (
    <DoctorSearchResults
      category={decodedCategory}
      doctors={filteredDoctors}
      onBack={() => navigate(PATHS.doctors, { state })}
      onSelectDoctor={(doctor) =>
        navigate(doctorProfilePath(doctor.id), {
          state: { ...state, from: doctorCategoryPath(decodedCategory) },
        })
      }
    />
  )
}

export function DoctorProfilePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { doctorId } = useParams()
  const { findDoctorById } = useAppStore()
  const doctor = findDoctorById(doctorId)
  const state = flowState(location)
  const backPath = location.state?.from || PATHS.doctors

  if (!doctor) {
    return <Navigate to={PATHS.doctors} replace />
  }

  return (
    <DoctorProfile
      doctor={doctor}
      onBack={() => navigate(backPath, { state })}
      onBook={() => navigate(doctorBookingPath(doctor.id), { state: { ...state, source: state.source } })}
    />
  )
}

export function DoctorBookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { doctorId } = useParams()
  const { findDoctorById, persistReschedule, addBookedAppointment } = useAppStore()
  const doctor = findDoctorById(doctorId)
  const state = flowState(location)
  const appointment = location.state?.appointment || null

  if (!doctor) {
    return <Navigate to={PATHS.doctors} replace />
  }

  return (
    <AppointmentBooking
      doctor={doctor}
      onBack={() => {
        if (state.source === 'reschedule') {
          navigate(PATHS.reschedule, { state: { appointment } })
          return
        }
        navigate(doctorProfilePath(doctor.id), { state })
      }}
      onContinue={(booking) => {
        if (state.source === 'reschedule') {
          persistReschedule(appointment, booking)
        } else {
          addBookedAppointment(booking)
        }
        navigate(PATHS.bookingConfirmation, {
          state: {
            ...state,
            booking: {
              ...booking,
              isReschedule: state.source === 'reschedule',
            },
          },
        })
      }}
    />
  )
}

export function BookingConfirmationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state?.booking
  const returnTo = location.state?.returnTo || PATHS.home
  const fromAppointments = returnTo === PATHS.appointments
  const newAppointmentId = booking?.appointmentId ? `apt-${booking.appointmentId}` : null

  if (!booking) {
    return <Navigate to={PATHS.home} replace />
  }

  return (
    <AppointmentConfirmation
      booking={booking}
      actionLabel={fromAppointments ? 'View appointments' : 'Back to Home'}
      onBackHome={() =>
        navigate(
          fromAppointments && newAppointmentId
            ? appointmentDetailsPath(newAppointmentId)
            : returnTo,
          { replace: true },
        )
      }
    />
  )
}
