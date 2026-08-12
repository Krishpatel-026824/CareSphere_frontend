import { useState } from 'react'
import SplashScreen from './screens/auth/SplashScreen'
import Onboarding from './screens/auth/Onboarding'
import Login from './screens/auth/Login'
import SignUp from './screens/auth/SignUp'
import OtpVerification from './screens/auth/OtpVerification'
import ForgotPassword from './screens/auth/ForgotPassword'
import AppShell from './components/AppShell'
import HomeDashboard from './screens/main/HomeDashboard'
import NotificationsScreen from './screens/main/NotificationsScreen'
import SearchScreen from './screens/main/SearchScreen'
import MessagesScreen from './screens/main/MessagesScreen'
import AppointmentsScreen from './screens/main/AppointmentsScreen'
import AppointmentDetailsScreen from './screens/main/AppointmentDetailsScreen'
import TelemedicineScreen from './screens/main/TelemedicineScreen'
import PharmacyScreen from './screens/main/PharmacyScreen'
import LabTestsScreen from './screens/main/LabTestsScreen'
import HealthRecordsScreen from './screens/main/HealthRecordsScreen'
import DoctorCategories from './screens/doctor/DoctorCategories'
import DoctorSearchResults from './screens/doctor/DoctorSearchResults'
import DoctorProfile from './screens/doctor/DoctorProfile'
import AppointmentBooking from './screens/doctor/AppointmentBooking'
import AppointmentConfirmation from './screens/doctor/AppointmentConfirmation'
import { generateDoctorBookingData } from './data/generators/doctorBookingGenerator'
import { generateMessagesData } from './data/generators/messagesGenerator'
import { appointmentsMock } from './data/mocks/appointments'
import { applyBookingToAppointment, getUpcomingAppointment } from './utils/appointmentFormat'

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [activeTab, setActiveTab] = useState('home')
  const [activeHomeScreen, setActiveHomeScreen] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('Cardiologist')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [bookingSource, setBookingSource] = useState('profile')
  const [profileBackScreen, setProfileBackScreen] = useState('doctor-results')
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [appointments, setAppointments] = useState(appointmentsMock)
  const doctorFlowData = generateDoctorBookingData()
  const messagesData = generateMessagesData()
  const [messagesBadge, setMessagesBadge] = useState(messagesData.unreadCount)

  function findDoctorById(doctorId) {
    return doctorFlowData.doctors.find((doctor) => doctor.id === doctorId) || null
  }

  function openReschedule(appointment) {
    const doctor = findDoctorById(appointment?.doctorId)
    if (!doctor) return
    setSelectedDoctor(doctor)
    setSelectedAppointment(appointment)
    setBookingSource('home-reschedule')
    setActiveHomeScreen('doctor-booking')
    setActiveTab('home')
  }

  function openAppointmentDetails(appointment) {
    const latest = appointments.find((item) => item.id === appointment.id) || appointment
    setSelectedAppointment(latest)
    setActiveHomeScreen('appointment-details')
  }

  function persistReschedule(booking) {
    if (bookingSource !== 'home-reschedule' || !selectedAppointment?.id) return

    const updated = applyBookingToAppointment(selectedAppointment, booking)
    setAppointments((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    setSelectedAppointment(updated)
  }

  const upcomingAppointment = getUpcomingAppointment(appointments)

  function goHome() {
    setActiveHomeScreen('home')
    setActiveTab('home')
  }

  function openDoctorProfile(doctor, backScreen = 'doctor-results') {
    setSelectedDoctor(doctor)
    setSelectedCategory(doctor.specialty)
    setProfileBackScreen(backScreen)
    setActiveHomeScreen('doctor-profile')
  }

  function handleQuickAction(key) {
    switch (key) {
      case 'bookAppointment':
        setProfileBackScreen('doctor-categories')
        setActiveHomeScreen('doctor-categories')
        setActiveTab('home')
        break
      case 'telemedicine':
        setActiveHomeScreen('telemedicine')
        setActiveTab('home')
        break
      case 'pharmacy':
        setActiveHomeScreen('pharmacy')
        setActiveTab('home')
        break
      case 'labTests':
        setActiveHomeScreen('lab-tests')
        setActiveTab('home')
        break
      case 'healthRecords':
        setActiveHomeScreen('health-records')
        setActiveTab('home')
        break
      default:
        break
    }
  }

  const renderAppTab = () => {
    if (activeHomeScreen === 'appointment-details' && selectedAppointment) {
      return (
        <AppointmentDetailsScreen
          appointment={selectedAppointment}
          onBack={() => {
            setActiveHomeScreen(activeTab === 'appointments' ? 'appointments-list' : 'home')
          }}
          onReschedule={openReschedule}
        />
      )
    }

    if (activeHomeScreen === 'notifications') return <NotificationsScreen />
    if (activeHomeScreen === 'search') return <SearchScreen />
    if (activeHomeScreen === 'telemedicine') {
      return (
        <TelemedicineScreen
          doctors={doctorFlowData.doctors}
          onBack={goHome}
          onSelectDoctor={(doctor) => openDoctorProfile(doctor, 'telemedicine')}
        />
      )
    }
    if (activeHomeScreen === 'pharmacy') {
      return <PharmacyScreen onBack={goHome} />
    }
    if (activeHomeScreen === 'lab-tests') {
      return <LabTestsScreen onBack={goHome} />
    }
    if (activeHomeScreen === 'health-records') {
      return <HealthRecordsScreen onBack={goHome} />
    }
    if (activeHomeScreen === 'doctor-categories') {
      return (
        <DoctorCategories
          data={doctorFlowData}
          onBack={goHome}
          onOpenNotifications={() => setActiveHomeScreen('notifications')}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setActiveHomeScreen('doctor-results')
          }}
          onSelectDoctor={(doctor) => openDoctorProfile(doctor, 'doctor-categories')}
        />
      )
    }
    if (activeHomeScreen === 'doctor-results') {
      const filteredDoctors = doctorFlowData.doctors.filter((doctor) => doctor.specialty === selectedCategory)
      return (
        <DoctorSearchResults
          category={selectedCategory}
          doctors={filteredDoctors.length ? filteredDoctors : doctorFlowData.doctors}
          onBack={() => setActiveHomeScreen('doctor-categories')}
          onSelectDoctor={(doctor) => openDoctorProfile(doctor, 'doctor-results')}
        />
      )
    }
    if (activeHomeScreen === 'doctor-profile' && selectedDoctor) {
      return (
        <DoctorProfile
          doctor={selectedDoctor}
          onBack={() => setActiveHomeScreen(profileBackScreen)}
          onBook={() => {
            setBookingSource('profile')
            setActiveHomeScreen('doctor-booking')
          }}
        />
      )
    }
    if (activeHomeScreen === 'doctor-booking' && selectedDoctor) {
      return (
        <AppointmentBooking
          doctor={selectedDoctor}
          onBack={() => {
            if (bookingSource === 'home-reschedule') {
              setActiveHomeScreen(selectedAppointment ? 'appointment-details' : 'home')
              setBookingSource('profile')
              return
            }
            setActiveHomeScreen('doctor-profile')
          }}
          onContinue={(booking) => {
            persistReschedule(booking)
            setConfirmedBooking({
              ...booking,
              isReschedule: bookingSource === 'home-reschedule',
            })
            setActiveHomeScreen('doctor-confirmation')
          }}
        />
      )
    }
    if (activeHomeScreen === 'doctor-confirmation' && confirmedBooking) {
      return (
        <AppointmentConfirmation
          booking={confirmedBooking}
          onBackHome={() => {
            setActiveHomeScreen('home')
            setSelectedDoctor(null)
            setConfirmedBooking(null)
            setBookingSource('profile')
          }}
        />
      )
    }

    if (activeHomeScreen === 'appointments-list' || activeTab === 'appointments') {
      return (
        <AppointmentsScreen
          appointments={appointments}
          onSelectAppointment={(appointment) => openAppointmentDetails(appointment)}
        />
      )
    }

    if (activeTab === 'home' && activeHomeScreen === 'home') {
      return (
        <HomeDashboard
          onBellClick={() => setActiveHomeScreen('notifications')}
          onActionClick={handleQuickAction}
          onViewAllAppointments={() => {
            setActiveTab('appointments')
            setActiveHomeScreen('appointments-list')
          }}
          onRescheduleAppointment={openReschedule}
          onAppointmentDetails={openAppointmentDetails}
          upcomingAppointment={upcomingAppointment}
        />
      )
    }

    if (activeTab === 'messages') {
      return <MessagesScreen onUnreadChange={setMessagesBadge} />
    }

    return (
      <div className="h-full flex items-center justify-center px-6 text-center">
        <p className="text-body-gray text-base">This tab will be completed in upcoming phases.</p>
      </div>
    )
  }

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onNext={() => setScreen('login')} />
      case 'onboarding':
        return <Onboarding onNext={() => setScreen('login')} />
      case 'login':
        return (
          <Login
            onLogin={() => setScreen('home')}
            onSignUp={() => setScreen('signup')}
            onForgotPassword={() => setScreen('forgot')}
          />
        )
      case 'signup':
        return <SignUp onBack={() => setScreen('login')} onSignUp={() => setScreen('otp')} />
      case 'otp':
        return <OtpVerification onBack={() => setScreen('signup')} onVerify={() => setScreen('login')} />
      case 'forgot':
        return <ForgotPassword onBack={() => setScreen('login')} onSubmit={() => setScreen('login')} />
      case 'home':
        return (
          <AppShell
            activeTab={activeTab}
            messagesBadge={messagesBadge}
            onTabChange={(tabId) => {
              setActiveTab(tabId)
              setActiveHomeScreen(tabId === 'appointments' ? 'appointments-list' : 'home')
            }}
          >
            {renderAppTab()}
          </AppShell>
        )
      default:
        return null
    }
  }

  return <div className="app-viewport overflow-hidden bg-bg-gray">{renderScreen()}</div>
}
