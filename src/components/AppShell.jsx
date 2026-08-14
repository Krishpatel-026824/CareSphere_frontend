import BottomNav from './BottomNav'
import AppSidebar from './sidebar/AppSidebar'

export default function AppShell({ activeTab, onTabChange, messagesBadge = 0, children }) {
  return (
    <div className="app-viewport bg-bg-gray flex overflow-hidden">
      <AppSidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        messagesBadge={messagesBadge}
      />

      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain">
          <div className="min-h-full">{children}</div>
        </main>
        <div className="lg:hidden shrink-0 mt-auto">
          <BottomNav activeTab={activeTab} onChange={onTabChange} messagesBadge={messagesBadge} />
        </div>
      </div>
    </div>
  )
}
