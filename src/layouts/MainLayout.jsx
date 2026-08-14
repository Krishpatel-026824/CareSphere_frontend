import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { useAppStore } from '../store/useAppStore'
import { TAB_PATHS } from '../routes/paths'

function getActiveTab(pathname) {
  if (pathname.startsWith('/appointments')) return 'appointments'
  if (pathname.startsWith('/health-records')) return 'health'
  if (pathname.startsWith('/messages')) return 'messages'
  if (pathname.startsWith('/profile')) return 'profile'
  return 'home'
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { messagesBadge } = useAppStore()
  const activeTab = getActiveTab(location.pathname)

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
