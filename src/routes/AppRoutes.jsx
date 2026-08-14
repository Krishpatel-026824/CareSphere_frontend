import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ForgotPassword from '../screens/auth/ForgotPassword'
import Login from '../screens/auth/Login'
import Onboarding from '../screens/auth/Onboarding'
import OtpVerification from '../screens/auth/OtpVerification'
import SignUp from '../screens/auth/SignUp'
import SplashScreen from '../screens/auth/SplashScreen'
import MessagesScreen from '../screens/main/MessagesScreen'
import NotificationsScreen from '../screens/main/NotificationsScreen'
import SearchScreen from '../screens/main/SearchScreen'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'
import { AppointmentDetailsPage, AppointmentsPage, NewAppointmentBookPage, NewAppointmentPage, RescheduleDoctorPage } from './pages/AppointmentsPages'
import {
  BookingConfirmationPage,
  DoctorBookingPage,
  DoctorCategoriesPage,
  DoctorProfilePage,
  DoctorSearchResultsPage,
} from './pages/DoctorPages'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import {
  HealthRecordsPage,
  LabTestsPage,
  PharmacyPage,
  TelemedicinePage,
} from './pages/ServicePages'
import { PATHS } from './paths'

function SplashRoute() {
  const navigate = useNavigate()
  return <SplashScreen onNext={() => navigate(PATHS.login)} />
}

function OnboardingRoute() {
  const navigate = useNavigate()
  return <Onboarding onNext={() => navigate(PATHS.login)} />
}

function LoginRoute() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <Login
      onLogin={(user) => {
        dispatch(login(user || { name: 'Krish' }))
        navigate(PATHS.home)
      }}
      onSignUp={() => navigate(PATHS.signup)}
      onForgotPassword={() => navigate(PATHS.forgotPassword)}
    />
  )
}

function SignUpRoute() {
  const navigate = useNavigate()
  return (
    <SignUp
      onBack={() => navigate(PATHS.login)}
      onSignUp={() => navigate(PATHS.otp)}
    />
  )
}

function OtpRoute() {
  const navigate = useNavigate()
  return (
    <OtpVerification
      onBack={() => navigate(PATHS.signup)}
      onVerify={() => navigate(PATHS.login)}
    />
  )
}

function ForgotPasswordRoute() {
  const navigate = useNavigate()
  return (
    <ForgotPassword
      onBack={() => navigate(PATHS.login)}
      onSubmit={() => navigate(PATHS.login)}
    />
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.splash} element={<SplashRoute />} />
      <Route path={PATHS.onboarding} element={<OnboardingRoute />} />
      <Route path={PATHS.login} element={<LoginRoute />} />
      <Route path={PATHS.signup} element={<SignUpRoute />} />
      <Route path={PATHS.otp} element={<OtpRoute />} />
      <Route path={PATHS.forgotPassword} element={<ForgotPasswordRoute />} />

      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.notifications} element={<NotificationsScreen />} />
        <Route path={PATHS.search} element={<SearchScreen />} />
        <Route path={PATHS.messages} element={<MessagesScreen />} />
        <Route path={PATHS.appointments} element={<AppointmentsPage />} />
        <Route path={PATHS.newAppointment} element={<NewAppointmentPage />} />
        <Route path={PATHS.newAppointmentBook} element={<NewAppointmentBookPage />} />
        <Route path={PATHS.appointmentDetails} element={<AppointmentDetailsPage />} />
        <Route path={PATHS.reschedule} element={<RescheduleDoctorPage />} />
        <Route path={PATHS.telemedicine} element={<TelemedicinePage />} />
        <Route path={PATHS.pharmacy} element={<PharmacyPage />} />
        <Route path={PATHS.labTests} element={<LabTestsPage />} />
        <Route path={PATHS.healthRecords} element={<HealthRecordsPage />} />
        <Route path={PATHS.doctors} element={<DoctorCategoriesPage />} />
        <Route path={PATHS.doctorCategory} element={<DoctorSearchResultsPage />} />
        <Route path={PATHS.doctorProfile} element={<DoctorProfilePage />} />
        <Route path={PATHS.doctorBooking} element={<DoctorBookingPage />} />
        <Route path={PATHS.bookingConfirmation} element={<BookingConfirmationPage />} />
        <Route path={PATHS.profile} element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to={PATHS.splash} replace />} />
    </Routes>
  )
}
