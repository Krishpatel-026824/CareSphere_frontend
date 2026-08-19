import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { AUTH_ROLE_DOCTOR } from '../data/mocks/authRoles'
import { DOCTOR_PATHS, TAB_PATHS } from '../routes/paths'
import { useAppSelector } from '../store/hooks'
import { useAppStore } from '../store/useAppStore'

function getActiveTab(pathname) {
  if (pathname.startsWith('/appointments')) return 'appointments'
  if (pathname.startsWith('/pharmacy')) return 'pharmacy'
  if (pathname.startsWith('/lab-tests')) return 'labTests'
  if (pathname.startsWith('/health-records')) return 'health'
  if (pathname.startsWith('/messages')) return 'messages'
  if (pathname.startsWith('/profile')) return 'profile'
  return 'home'
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { messagesBadge } = useAppStore()
  const roleType = useAppSelector((state) => state.auth.user?.roleType)
  const activeTab = getActiveTab(location.pathname)

  if (roleType === AUTH_ROLE_DOCTOR) {
    return <Navigate to={DOCTOR_PATHS.home} replace />
  }

  function handleTabChange(tabId) {
    const path = TAB_PATHS[tabId] || TAB_PATHS.home
    navigate(path)
  }

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={handleTabChange}
      messagesBadge={messagesBadge}
    >
      <Outlet />
    </AppShell>
  )
}
