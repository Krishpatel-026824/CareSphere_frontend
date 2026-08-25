import { Bell, HeartPulse } from 'lucide-react'
import HealthTipCard from '../../components/home/HealthTipCard'
import LabBookingPanel from '../../components/home/LabBookingPanel'
import MedicineReminderCard from '../../components/home/MedicineReminderCard'
import UpcomingAppointmentPanel from '../../components/home/UpcomingAppointmentPanel'
import { generateHomeData } from '../../data/generators/homeGenerator'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'

export default function HomeDashboard({
  onBellClick,
  onActionClick,
  onRescheduleAppointment,
  onAppointmentDetails,
  onBookAppointment,
  onBookLabTest,
  onViewLabBookings,
  upcomingAppointment,
  latestLabBooking,
  visitSignals,
}) {
  const homeData = generateHomeData()
  const appointment = upcomingAppointment
  const now = new Date()
  const greeting = getTimeGreeting(now)
  const todayLabel = formatTodayLabel(now)

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full min-h-full page-pad py-4 sm:py-5 lg:py-5 xl:py-6 flex flex-col gap-4 sm:gap-5 max-w-[1440px] mx-auto">
        <header className="flex items-start justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal text-white shadow-sm flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </div>
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 min-w-0 items-stretch">
          <UpcomingAppointmentPanel
            key={
              appointment
                ? `${appointment.id}-${appointment.status}-${appointment.dateLabel}-${appointment.timeLabel}`
                : 'empty'
            }
            appointment={appointment}
            visitSignals={visitSignals}
            onReschedule={() => onRescheduleAppointment?.(appointment)}
            onJoinDetails={() => onAppointmentDetails?.(appointment)}
            onBook={onBookAppointment}
          />
          <MedicineReminderCard />
          <LabBookingPanel
            booking={latestLabBooking}
            onBook={() => onBookLabTest?.() || onActionClick?.('labTests')}
            onViewBookings={() => onViewLabBookings?.() || onActionClick?.('labTests')}
          />
          <HealthTipCard tips={homeData.healthTips} loopMs={homeData.healthTipLoopMs} />
        </div>
      </div>
    </div>
  )
}
