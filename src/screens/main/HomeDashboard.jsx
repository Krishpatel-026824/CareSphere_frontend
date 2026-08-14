import { Bell } from 'lucide-react'
import HealthOverviewGrid from '../../components/home/HealthOverviewGrid'
import InsightsPanel from '../../components/home/InsightsPanel'
import QuickActionsRow from '../../components/home/QuickActionsRow'
import UpcomingAppointmentPanel from '../../components/home/UpcomingAppointmentPanel'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { generateHomeData } from '../../data/generators/homeGenerator'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'

export default function HomeDashboard({
  onBellClick,
  onActionClick,
  onRescheduleAppointment,
  onAppointmentDetails,
  upcomingAppointment,
  visitSignals,
}) {
  const homeData = generateHomeData()
  const appointment = upcomingAppointment || homeData.upcomingAppointment
  const { sm, xl } = useBreakpoint()
  const now = new Date()
  const greeting = getTimeGreeting(now)
  const todayLabel = formatTodayLabel(now)
  const gaugeSize = xl ? 108 : sm ? 96 : 84

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full min-h-full page-pad py-4 sm:py-5 lg:py-5 xl:py-6 flex flex-col gap-4 sm:gap-5 max-w-[1440px] mx-auto">
        <header className="flex items-start justify-between gap-3 sm:gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] font-bold text-navy tracking-tight leading-tight">
                {greeting}, {homeData.greetingName}
              </h1>
              <span className="inline-flex items-center rounded-full bg-navy text-white px-3 py-1 text-[11px] sm:text-xs font-semibold">
                {todayLabel}
              </span>
            </div>
            <p className="text-sm text-body-gray mt-1">Here&apos;s your health summary</p>
          </div>

          <button
            type="button"
            onClick={onBellClick}
            aria-label="Notifications"
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-border-gray flex items-center justify-center cursor-pointer shadow-sm hover:border-teal hover:bg-teal-light shrink-0"
          >
            <Bell className="w-5 h-5 text-navy" strokeWidth={1.75} />
          </button>
        </header>

        <HealthOverviewGrid
          cards={homeData.healthOverview}
          gaugeSize={gaugeSize}
          visibleCount={homeData.healthOverviewVisibleCount}
        />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 lg:gap-5 min-w-0 xl:items-stretch">
          <div className="xl:col-span-3 min-w-0">
            <UpcomingAppointmentPanel
              key={`${appointment.id}-${appointment.doctorId}-${appointment.dateLabel}-${appointment.timeLabel}`}
              appointment={appointment}
              visitSignals={visitSignals}
              onReschedule={() => onRescheduleAppointment?.(appointment)}
              onJoinDetails={() => onAppointmentDetails?.(appointment)}
            />
          </div>
          <div className="xl:col-span-2 min-w-0">
            <InsightsPanel
              tips={homeData.healthTips}
              loopMs={homeData.healthTipLoopMs}
            />
          </div>
        </div>

        <QuickActionsRow actions={homeData.quickActions} onActionClick={onActionClick} />
      </div>
    </div>
  )
}
