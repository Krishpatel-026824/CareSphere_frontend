import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import HealthRecordsScreen from '../../screens/main/HealthRecordsScreen'
import LabTestsScreen from '../../screens/main/LabTestsScreen'
import LabBookingsScreen from '../../screens/main/LabBookingsScreen'
import PharmacyScreen from '../../screens/main/PharmacyScreen'
import { PATHS } from '../paths'

export function PharmacyPage() {
  const navigate = useNavigate()
  return <PharmacyScreen onBack={() => navigate(PATHS.home)} />
}

export function LabTestsPage() {
  const navigate = useNavigate()
  const { notifyLabBooking } = useAppStore()
  return (
    <LabTestsScreen
      onBack={() => navigate(PATHS.home)}
      onNavigateBookings={() => navigate(PATHS.labBookings)}
      onLabBooked={notifyLabBooking}
    />
  )
}

export function LabBookingsPage() {
  const navigate = useNavigate()
  return <LabBookingsScreen onBack={() => navigate(PATHS.labTests)} />
}

export function HealthRecordsPage() {
  const navigate = useNavigate()
  return <HealthRecordsScreen onBack={() => navigate(PATHS.home)} />
}
