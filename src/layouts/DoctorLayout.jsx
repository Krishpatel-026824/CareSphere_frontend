import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'
import { doctorBottomNavTabs, doctorMainNavTabs, doctorProfileNavTab, doctorSidebarQuickActions } from '../data/mocks/doctorNav'
import { doctorProfileDetailsMock } from '../data/mocks/doctorProfile'
import { DOCTOR_PATHS, DOCTOR_TAB_PATHS, PATHS } from '../routes/paths'
import { useAppSelector } from '../store/hooks'
import { getDoctorPageSurface } from '../utils/doctorPageSurface'
import { DOCTOR_AVATAR_KEY, readStoredAvatar } from '../utils/profileAvatarStorage'

function getActiveTab(pathname) {
  if (pathname.startsWith('/doctor/schedule')) return 'schedule'
  if (pathname.startsWith('/doctor/patients')) return 'patients'
  if (pathname.startsWith('/doctor/messages')) return 'messages'
  if (pathname.startsWith('/doctor/profile')) return 'profile'
  if (
    pathname.startsWith('/doctor/tools') ||
    pathname.startsWith('/doctor/lab-reports') ||
    pathname.startsWith('/doctor/notifications')
  ) {
    return ''
  }
  return 'home'
}

function getActiveQuickAction(pathname) {
  if (pathname.startsWith('/doctor/tools/prescribe')) return 'prescribe'
  if (pathname.startsWith('/doctor/lab-reports')) return 'labReports'
  if (pathname.startsWith('/doctor/tools/labs')) return 'labs'
  if (pathname.startsWith('/doctor/tools/notes')) return 'notes'
  return ''
}

export default function DoctorLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const messagesBadge = useAppSelector((state) =>
    state.messages.doctorConversations.filter((item) => item.unread).length,
  )

  if (!isAuthenticated || user?.roleType !== AUTH_ROLE_DOCTOR) {
    return <Navigate to={PATHS.login} replace />
  }

  const activeTab = getActiveTab(location.pathname)
  const activeQuickAction = getActiveQuickAction(location.pathname)

  function handleTabChange(tabId) {
    navigate(DOCTOR_TAB_PATHS[tabId] || DOCTOR_TAB_PATHS.home)
  }

  function handleQuickAction(key) {
    if (key === 'prescribe') {
      navigate(DOCTOR_PATHS.prescribe)
      return
    }
    if (key === 'labReports') {
      navigate(DOCTOR_PATHS.labReports)
      return
    }
    const path = DOCTOR_PATHS[key]
    if (path && !String(path).includes(':')) navigate(path)
  }

  return (
    <AppShell
      activeTab={activeTab}
      activeQuickAction={activeQuickAction}
      onTabChange={handleTabChange}
      messagesBadge={messagesBadge}
      tabs={doctorMainNavTabs}
      bottomTabs={doctorBottomNavTabs}
      profileTab={doctorProfileNavTab}
      quickActions={doctorSidebarQuickActions}
      onQuickAction={handleQuickAction}
      pageSurface={getDoctorPageSurface(location.pathname)}
      sidebarUser={{
        name: user.name,
        role: user.role,
        initials: user.initials || doctorProfileDetailsMock.initials,
        avatar: readStoredAvatar(DOCTOR_AVATAR_KEY, doctorProfileDetailsMock.avatar),
      }}
    >
      <Outlet />
    </AppShell>
  )
}
