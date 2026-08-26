import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import NotificationsScreen from '../../screens/main/NotificationsScreen'
import MessagesScreen from '../../screens/main/MessagesScreen'
import ProfileScreen from '../../screens/main/ProfileScreen'
import DoctorClinicToolScreen from '../../screens/portal/DoctorClinicToolScreen'
import DoctorConsultScreen from '../../screens/portal/DoctorConsultScreen'
import DoctorHomeScreen from '../../screens/portal/DoctorHomeScreen'
import DoctorLabReportsScreen from '../../screens/portal/DoctorLabReportsScreen'
import DoctorPatientDetailScreen from '../../screens/portal/DoctorPatientDetailScreen'
import DoctorPatientsScreen from '../../screens/portal/DoctorPatientsScreen'
import DoctorScheduleScreen from '../../screens/portal/DoctorScheduleScreen'
import DoctorSignedRxScreen from '../../screens/portal/DoctorSignedRxScreen'
import { generateDoctorClinicTool } from '../../data/generators/doctorClinicToolsGenerator'
import { generateDoctorPatientLabReports } from '../../data/generators/doctorLabReportsGenerator'
import { doctorHomeStatFilters, filterDoctorHomeQueue } from '../../data/generators/doctorHomeGenerator'
import { generatePatientChartVisits } from '../../data/generators/doctorPatientHistoryGenerator'
import { generateDoctorPatients } from '../../data/generators/doctorPatientsGenerator'
import { useDoctorProfile } from '../../hooks/useDoctorProfile'
import { useDoctorSchedule } from '../../hooks/useDoctorSchedule'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addSignedRx,
  selectSignedRxIds,
} from '../../store/slices/doctorSignedRxSlice'
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

  function openVisitModal(visit) {
    if (!visit?.id) return
    setSelectedId(visit.id)
  }

  return (
    <DoctorHomeScreen
      visits={schedule.visits}
      selectedVisit={selectedVisit}
      homeStat={homeStat}
      onBellClick={() => navigate(DOCTOR_PATHS.notifications)}
      onOpenVisit={openVisitModal}
      onSelectVisit={openVisitModal}
      onClearVisit={() => setSelectedId(null)}
      onClearStat={() => {
        setHomeStat(null)
        setSelectedId(null)
      }}
      onAcceptVisit={(visit) => schedule.requestAction('accept', visit)}
      onDeclineVisit={(visit) => schedule.requestAction('decline', visit)}
      onStatClick={(id) => {
        const match = filterDoctorHomeQueue(schedule.visits, doctorHomeStatFilters[id])[0]
        setHomeStat(id)
        setSelectedId(match?.id || null)
      }}
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
      onClearVisit={() => navigate(DOCTOR_PATHS.schedule, { replace: true })}
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
      onBack={() => navigate(DOCTOR_PATHS.patients)}
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

export function DoctorLabReportsPage() {
  const navigate = useNavigate()
  const data = generateDoctorPatientLabReports()

  return (
    <DoctorLabReportsScreen
      title={data.title}
      subtitle={data.subtitle}
      listTitle={data.listTitle}
      empty={data.empty}
      reports={data.reports}
      onBack={() => navigate(DOCTOR_PATHS.home)}
    />
  )
}

export function DoctorSignedRxPage() {
  const navigate = useNavigate()

  return (
    <DoctorSignedRxScreen
      onBack={() => navigate(DOCTOR_PATHS.prescribe)}
      onContinue={() => navigate(DOCTOR_PATHS.prescribe, { state: { startProcess: true } })}
      onOpenPatient={(item) => {
        if (item?.patientId) navigate(doctorPortalPatientPath(item.patientId))
      }}
    />
  )
}

export function DoctorClinicToolPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const signedIds = useAppSelector(selectSignedRxIds)
  const { tool: toolParam } = useParams()
  const tool =
    toolParam ||
    (location.pathname.startsWith('/doctor/tools/')
      ? location.pathname.split('/').filter(Boolean).pop()
      : null)
  const data = useMemo(() => generateDoctorClinicTool(tool), [tool])
  const waitingTasks = useMemo(() => {
    if (!data) return []
    if (tool !== 'prescribe') return data.tasks
    return data.tasks.filter((task) => !signedIds.includes(task.id))
  }, [data, signedIds, tool])

  if (!data) {
    return <Navigate to={DOCTOR_PATHS.home} replace />
  }

  function handleSignComplete(task) {
    const now = new Date()
    dispatch(
      addSignedRx({
        ...task,
        signedAt: now.getTime(),
        signedAtLabel: now.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }),
    )
    navigate(DOCTOR_PATHS.signedRx)
  }

  return (
    <DoctorClinicToolScreen
      key={`${tool}-${autoStartKey(location.state)}`}
      tool={tool}
      title={data.title}
      subtitle={data.subtitle}
      listTitle={data.listTitle}
      actionLabel={data.actionLabel}
      instructionsLabel={data.instructionsLabel}
      planLabel={data.planLabel}
      viewReportLabel={data.viewReportLabel}
      backToOrderLabel={data.backToOrderLabel}
      empty={data.empty}
      tasks={waitingTasks}
      autoStart={Boolean(location.state?.startProcess)}
      onBack={() => navigate(DOCTOR_PATHS.home)}
      onSelectTask={(task) => navigate(doctorPortalPatientPath(task.patientId))}
      onSignComplete={tool === 'prescribe' ? handleSignComplete : undefined}
      onOpenSigned={tool === 'prescribe' ? () => navigate(DOCTOR_PATHS.signedRx) : undefined}
    />
  )
}

function autoStartKey(state) {
  return state?.startProcess ? 'start' : 'idle'
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
