import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'
import { doctorBottomNavTabs, doctorMainNavTabs, doctorProfileNavTab, doctorSidebarQuickActions } from '../data/mocks/doctorNav'
import { doctorProfileDetailsMock } from '../data/mocks/doctorProfile'
import { DOCTOR_PATHS, DOCTOR_TAB_PATHS, PATHS } from '../routes/paths'
import { useAppSelector } from '../store/hooks'
import { DOCTOR_AVATAR_KEY, readStoredAvatar } from '../utils/profileAvatarStorage'

function getActiveTab(pathname) {
  if (pathname.startsWith('/doctor/schedule')) return 'schedule'
  if (pathname.startsWith('/doctor/patients')) return 'patients'
  if (pathname.startsWith('/doctor/messages')) return 'messages'
  if (pathname.startsWith('/doctor/profile')) return 'profile'
  return 'home'
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

  function handleTabChange(tabId) {
    navigate(DOCTOR_TAB_PATHS[tabId] || DOCTOR_TAB_PATHS.home)
  }

  function handleQuickAction(key) {
    const path = DOCTOR_PATHS[key]
    if (path) navigate(path)
  }

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={handleTabChange}
      messagesBadge={messagesBadge}
      tabs={doctorMainNavTabs}
      bottomTabs={doctorBottomNavTabs}
      profileTab={doctorProfileNavTab}
      quickActions={doctorSidebarQuickActions}
      onQuickAction={handleQuickAction}
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
