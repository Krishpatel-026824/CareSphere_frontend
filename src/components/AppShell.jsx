import {
  Calendar,
  ChevronRight,
  CircleUser,
  Headphones,
  Heart,
  HeartPulse,
  Home,
  MessageSquare,
} from 'lucide-react'
import BottomNav from './BottomNav'
import { userProfileMock } from '../data/mocks/home'

const sidebarTabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: CircleUser },
]

function SidebarNavItem({ tab, isActive, badge, onSelect }) {
  const Icon = tab.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(tab.id)}
      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-[#0A7A75] to-[#0EA5A0] text-white shadow-[0_2px_12px_rgba(14,165,160,0.25)]'
          : 'text-white/65 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={isActive ? 2 : 1.75} />
      <span className={`flex-1 text-left text-[14px] truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>
        {tab.label}
      </span>
      {badge > 0 ? (
        <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      ) : null}
    </button>
  )
}

export default function AppShell({ activeTab, onTabChange, messagesBadge = 0, children }) {
  return (
    <div className="app-viewport bg-bg-gray flex overflow-hidden">
      <aside className="hidden lg:flex w-[260px] xl:w-[280px] shrink-0 flex-col h-full bg-[#071A2F]">
        {/* Logo */}
        <div className="px-6 pt-8 pb-6 shrink-0">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Heart className="w-5 h-5 text-teal fill-teal" strokeWidth={1.4} />
            </div>
            <p className="mt-3.5 font-display text-[22px] font-bold text-white leading-none">CareSphere</p>
            <p className="mt-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-teal">Health Dashboard</p>
          </div>
        </div>

        {/* Nav — compact group with comfortable spacing */}
        <nav className="px-4 flex flex-col gap-2.5 shrink-0">
          {sidebarTabs.map((tab) => (
            <SidebarNavItem
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              badge={tab.id === 'messages' ? messagesBadge : 0}
              onSelect={onTabChange}
            />
          ))}
        </nav>

        <div className="flex-1" aria-hidden="true" />

        {/* Footer */}
        <div className="px-4 pb-6 shrink-0">
          <button
            type="button"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 flex items-center gap-3 text-left cursor-pointer hover:bg-white/[0.07] transition-colors"
          >
            <span className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
              <Headphones className="w-[18px] h-[18px] text-teal" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white">Need help?</p>
              <p className="text-[11px] text-white/45 mt-0.5 truncate">Talk to Care Support</p>
            </div>
            <ChevronRight className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
          </button>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => onTabChange('profile')}
              className="w-full flex items-center gap-3 cursor-pointer rounded-lg py-1 hover:bg-white/[0.04] transition-colors"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-[13px] font-bold text-white">
                  {userProfileMock.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#071A2F]" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-white truncate">{userProfileMock.name}</p>
                <p className="text-[11px] text-white/45 mt-0.5">{userProfileMock.role}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 shrink-0" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain">
          <div className="min-h-full">{children}</div>
        </main>
        <div className="lg:hidden shrink-0 safe-bottom">
          <BottomNav activeTab={activeTab} onChange={onTabChange} messagesBadge={messagesBadge} />
        </div>
      </div>
    </div>
  )
}
