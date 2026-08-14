import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import HealthRecordsScreen from '../../screens/main/HealthRecordsScreen'
import LabTestsScreen from '../../screens/main/LabTestsScreen'
import PharmacyScreen from '../../screens/main/PharmacyScreen'
import TelemedicineScreen from '../../screens/main/TelemedicineScreen'
import { PATHS, doctorProfilePath } from '../paths'

export function TelemedicinePage() {
  const navigate = useNavigate()
  const { doctorFlowData } = useAppStore()

  return (
    <TelemedicineScreen
      doctors={doctorFlowData.doctors}
      onBack={() => navigate(PATHS.home)}
      onSelectDoctor={(doctor) =>
        navigate(doctorProfilePath(doctor.id), { state: { from: PATHS.telemedicine } })
      }
    />
  )
}

export function PharmacyPage() {
  const navigate = useNavigate()
  return <PharmacyScreen onBack={() => navigate(PATHS.home)} />
}

export function LabTestsPage() {
  const navigate = useNavigate()
  return <LabTestsScreen onBack={() => navigate(PATHS.home)} />
}

export function HealthRecordsPage() {
  const navigate = useNavigate()
  return <HealthRecordsScreen onBack={() => navigate(PATHS.home)} />
}
