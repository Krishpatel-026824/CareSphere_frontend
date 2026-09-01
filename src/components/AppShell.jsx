import BottomNav from './BottomNav'
import AppSidebar from './sidebar/AppSidebar'

export default function AppShell({
  activeTab,
  activeQuickAction = '',
  onTabChange,
  messagesBadge = 0,
  tabs,
  bottomTabs,
  profileTab,
  sidebarUser,
  quickActions,
  onQuickAction,
  pageSurface = 'page-surface',
  children,
}) {
  return (
    <div className="app-viewport bg-bg-gray flex overflow-hidden">
      <AppSidebar
        activeTab={activeTab}
        activeQuickAction={activeQuickAction}
        onTabChange={onTabChange}
        messagesBadge={messagesBadge}
        tabs={tabs}
        profileTab={profileTab}
        sidebarUser={sidebarUser}
        quickActions={quickActions}
        onQuickAction={onQuickAction}
      />

      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <main
          className={`flex-1 min-h-0 overflow-x-hidden overscroll-y-contain ${pageSurface} ${
            pageSurface.includes('messages') ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          <div className="min-h-full h-full flex flex-col">{children}</div>
        </main>
        <div className="lg:hidden shrink-0 mt-auto safe-bottom">
          <BottomNav
            activeTab={activeTab}
            onChange={onTabChange}
            messagesBadge={messagesBadge}
            tabs={bottomTabs || tabs}
          />
        </div>
      </div>
    </div>
  )
}
