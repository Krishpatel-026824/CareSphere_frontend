import CareSphereLogo from '../brand/CareSphereLogo'
import { mainNavTabs, profileNavTab as defaultProfileTab } from '../../data/mocks/sidebarNav'
import { useAppSelector } from '../../store/hooks'
import { selectProfileDetails } from '../../store/slices/profileSlice'
import SidebarFooterCard from './SidebarFooterCard'
import SidebarNavItem from './SidebarNavItem'
import SidebarQuickActions from './SidebarQuickActions'

export default function AppSidebar({
  activeTab,
  onTabChange,
  messagesBadge = 0,
  tabs,
  profileTab,
  sidebarUser,
  quickActions,
  onQuickAction,
}) {
  const profile = useAppSelector(selectProfileDetails)
  const navTabs = tabs || mainNavTabs
  const profileItem = profileTab || defaultProfileTab
  const user = sidebarUser || profile

  return (
    <aside className="hidden lg:flex w-[220px] xl:w-[252px] shrink-0 flex-col h-full bg-[#1E2124]">
      <div className="p-4 shrink-0">
        <CareSphereLogo variant="dark" size="md" />
      </div>

      <nav className="p-3 flex flex-col gap-1 overflow-y-auto">
        {navTabs.map((tab) => (
          <SidebarNavItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            badge={tab.id === 'messages' ? messagesBadge : 0}
            onSelect={onTabChange}
          />
        ))}

        {quickActions?.length ? (
          <>
            <div className="my-3 border-t border-white/10" />
            <SidebarQuickActions actions={quickActions} onActionClick={onQuickAction} />
          </>
        ) : null}

        <div className="my-3 border-t border-white/10" />

        <SidebarNavItem
          tab={profileItem}
          isActive={activeTab === profileItem.id}
          onSelect={onTabChange}
        />
      </nav>

      <div className="shrink-0 mt-auto p-3 flex flex-col gap-3">
        <SidebarFooterCard onClick={() => onTabChange('profile')}>
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-[13px] font-bold text-white shrink-0 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              user.initials
            )}
          </div>
          <div className="min-w-0 flex-1 ">
            <p className="text-[14px] font-semibold text-white truncate leading-tight">{user.name}</p>
            <p className="text-[12px] text-white/50 mt-1 truncate leading-tight">{user.role}</p>
          </div>
        </SidebarFooterCard>
      </div>
    </aside>
  )
}
