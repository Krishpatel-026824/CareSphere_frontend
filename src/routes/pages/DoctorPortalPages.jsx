import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import NotificationsScreen from '../../screens/main/NotificationsScreen'
import MessagesScreen from '../../screens/main/MessagesScreen'
import ProfileScreen from '../../screens/main/ProfileScreen'
import DoctorClinicToolScreen from '../../screens/portal/DoctorClinicToolScreen'
import DoctorConsultScreen from '../../screens/portal/DoctorConsultScreen'
import DoctorHomeScreen from '../../screens/portal/DoctorHomeScreen'
import DoctorPatientDetailScreen from '../../screens/portal/DoctorPatientDetailScreen'
import DoctorPatientsScreen from '../../screens/portal/DoctorPatientsScreen'
import DoctorScheduleScreen from '../../screens/portal/DoctorScheduleScreen'
import { generateDoctorClinicTool } from '../../data/generators/doctorClinicToolsGenerator'
import { doctorHomeStatFilters, filterDoctorHomeQueue } from '../../data/generators/doctorHomeGenerator'
import { generatePatientChartVisits } from '../../data/generators/doctorPatientHistoryGenerator'
import { generateDoctorPatients } from '../../data/generators/doctorPatientsGenerator'
import { useDoctorProfile } from '../../hooks/useDoctorProfile'
import { useDoctorSchedule } from '../../hooks/useDoctorSchedule'
import {
  DOCTOR_PATHS,
  PATHS,
  doctorPortalPatientPath,
  doctorPortalVisitPath,
} from '../paths'

const doctorMenuRoutes = {
  schedule: DOCTOR_PATHS.schedule,
  patients: DOCTOR_PATHS.patients,
  messages: DOCTOR_PATHS.messages,
  notifications: DOCTOR_PATHS.notifications,
}

export function DoctorHomePage() {
  const navigate = useNavigate()
  const schedule = useDoctorSchedule()
  const [selectedId, setSelectedId] = useState(null)
  const [homeStat, setHomeStat] = useState(null)
  const selectedVisit = schedule.visits.find((visit) => visit.id === selectedId) || null

  return (
    <DoctorHomeScreen
      visits={schedule.visits}
      nextVisit={schedule.nextVisit}
      selectedVisit={selectedVisit}
      homeStat={homeStat}
      onBellClick={() => navigate(DOCTOR_PATHS.notifications)}
      onOpenVisit={(visit) => setSelectedId(visit.id)}
      onSelectVisit={(visit) => setSelectedId(visit.id)}
      onClearVisit={() => setSelectedId(null)}
      onClearStat={() => {
        setHomeStat(null)
        setSelectedId(null)
      }}
      onAcceptVisit={(visit) => schedule.requestAction('accept', visit)}
      onActionClick={(key) => {
        const path = DOCTOR_PATHS[key]
        if (path) navigate(path)
      }}
      onStatClick={(id) => {
        const match = filterDoctorHomeQueue(schedule.visits, doctorHomeStatFilters[id])[0]
        setHomeStat(id)
        setSelectedId(match?.id || null)
      }}
      onMessage={() => navigate(DOCTOR_PATHS.messages)}
      actions={schedule}
      dialog={schedule.dialog}
      onCloseDialog={schedule.closeDialog}
      onSubmitDialog={schedule.submitDialog}
    />
  )
}

export function DoctorSchedulePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const schedule = useDoctorSchedule()

  return (
    <DoctorScheduleScreen
      visits={schedule.visits}
      selectedId={id}
      onSelectVisit={(visit) => navigate(doctorPortalVisitPath(visit.id), { replace: true })}
      onMessage={() => navigate(DOCTOR_PATHS.messages)}
      actions={schedule}
    />
  )
}

export function DoctorPatientsPage() {
  const navigate = useNavigate()
  const schedule = useDoctorSchedule()
  const patients = generateDoctorPatients(schedule.visits)

  return (
    <DoctorPatientsScreen
      patients={patients}
      onSelectPatient={(patient) => navigate(doctorPortalPatientPath(patient.id))}
      onMessagePatient={(patient) =>
        navigate(DOCTOR_PATHS.messages, { state: { patientId: patient.id } })
      }
    />
  )
}

export function DoctorPatientPage() {
  const navigate = useNavigate()
  const { patientId } = useParams()
  const schedule = useDoctorSchedule()
  const patients = generateDoctorPatients(schedule.visits)
  const patient = patients.find((item) => item.id === patientId)

  if (!patient) {
    return <Navigate to={DOCTOR_PATHS.patients} replace />
  }

  return (
    <DoctorPatientDetailScreen
      patient={patient}
      visits={generatePatientChartVisits(schedule.visits, patient)}
      actions={schedule}
      onBack={() => navigate(DOCTOR_PATHS.patients)}
      onMessage={() => navigate(DOCTOR_PATHS.messages, { state: { patientId: patient.id } })}
    />
  )
}

export function DoctorConsultPage() {
  const navigate = useNavigate()
  const schedule = useDoctorSchedule()

  return (
    <DoctorConsultScreen
      visit={schedule.nextVisit}
      onBack={() => navigate(DOCTOR_PATHS.home)}
      onJoin={() => navigate(DOCTOR_PATHS.home)}
    />
  )
}

export function DoctorClinicToolPage() {
  const navigate = useNavigate()
  const { tool } = useParams()
  const data = generateDoctorClinicTool(tool)

  if (!data) {
    return <Navigate to={DOCTOR_PATHS.home} replace />
  }

  return (
    <DoctorClinicToolScreen
      key={tool}
      title={data.title}
      subtitle={data.subtitle}
      listTitle={data.listTitle}
      actionLabel={data.actionLabel}
      instructionsLabel={data.instructionsLabel}
      planLabel={data.planLabel}
      viewReportLabel={data.viewReportLabel}
      backToOrderLabel={data.backToOrderLabel}
      empty={data.empty}
      stats={data.stats}
      tasks={data.tasks}
      onBack={() => navigate(DOCTOR_PATHS.home)}
      onSelectTask={(task) => navigate(doctorPortalPatientPath(task.patientId))}
    />
  )
}

export function DoctorMessagesPage() {
  return <MessagesScreen />
}

export function DoctorNotificationsPage() {
  return <NotificationsScreen />
}

export function DoctorProfilePage() {
  const navigate = useNavigate()
  const profile = useDoctorProfile()

  return (
    <ProfileScreen
      details={profile.details}
      stats={profile.stats}
      infoRows={profile.infoRows}
      fields={profile.fields}
      menu={profile.menu}
      careCircle={profile.careCircle}
      prefs={profile.prefs}
      isEditing={profile.isEditing}
      draft={profile.draft}
      onStartEdit={profile.startEdit}
      onChange={profile.updateDraft}
      onSave={profile.saveEdit}
      onCancel={profile.cancelEdit}
      onAvatarChange={profile.updateAvatar}
      onMenu={(pathKey) => navigate(doctorMenuRoutes[pathKey] || DOCTOR_PATHS.home)}
      onTogglePref={profile.togglePref}
      onLogout={() => {
        profile.logoutUser()
        navigate(PATHS.login)
      }}
    />
  )
}
