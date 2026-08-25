import { Bell, HeartPulse } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import DoctorHomeStatStrip from '../../components/portal/DoctorHomeStatStrip'
import DoctorNextVisitPanel from '../../components/portal/DoctorNextVisitPanel'
import DoctorQueuePanel from '../../components/portal/DoctorQueuePanel'
import DoctorTodayGlance from '../../components/portal/DoctorTodayGlance'
import DoctorHomeStatusScreen from './DoctorHomeStatusScreen'
import { generateDoctorHomeData } from '../../data/generators/doctorHomeGenerator'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { useAppSelector } from '../../store/hooks'
import { selectActiveNotifications } from '../../store/slices/notificationsSlice'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'
import { visitDayHeading } from '../../utils/appointmentFormat'

export default function DoctorHomeScreen({
  visits,
  nextVisit,
  selectedVisit,
  homeStat,
  onBellClick,
  onOpenVisit,
  onAcceptVisit,
  onStatClick,
  onSelectVisit,
  onClearStat,
  onMessage,
  actions,
  dialog,
  onCloseDialog,
  onSubmitDialog,
}) {
  const data = generateDoctorHomeData(visits, nextVisit)
  const bp = useBreakpoint()
  const now = new Date()
  const greeting = getTimeGreeting(now)
  const todayLabel = formatTodayLabel(now)
  const queueVisits = nextVisit
    ? data.queue.filter((visit) => visit.id !== nextVisit.id)
    : data.queue
  const glanceVisits = queueVisits
    .filter((visit) => visitDayHeading(visit.dateLabel) === 'Today')
    .slice(0, 3)
  const unreadNotices = useAppSelector(selectActiveNotifications).filter((item) => item.unread).length

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      {homeStat ? (
        <DoctorHomeStatusScreen
          statId={homeStat}
          visits={visits}
          selectedVisit={selectedVisit}
          onBack={onClearStat}
          onSelectVisit={onSelectVisit}
          onMessage={onMessage}
          actions={actions}
        />
      ) : (
        <div className="w-full h-full min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto">
          <header className="shrink-0 flex flex-col gap-3 sm:gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-teal text-white shadow-sm flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h1 className="font-display text-[20px] sm:text-[26px] lg:text-[28px] xl:text-[32px] font-bold text-navy tracking-tight leading-tight">
                      <span className="sm:hidden">{greeting}</span>
                      <span className="hidden sm:inline">
                        {greeting}, {data.greetingName}
                      </span>
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-navy text-white px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold">
                      {todayLabel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-body-gray mt-1 truncate">{data.subtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onBellClick}
                aria-label="Notifications"
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-border-gray flex items-center justify-center cursor-pointer shadow-sm hover:border-teal hover:bg-teal-light shrink-0"
              >
                <Bell className="w-5 h-5 text-navy" strokeWidth={1.75} />
                {unreadNotices > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F97316] text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotices > 9 ? '9+' : unreadNotices}
                  </span>
                ) : null}
              </button>
            </div>

            <div className="w-full min-w-0 overflow-x-auto scroll-x pb-0.5 -mx-0.5 px-0.5">
              <DoctorHomeStatStrip stats={data.stats} onSelect={onStatClick} />
            </div>
          </header>

          <div className="flex-1 min-h-0 flex flex-col xl:flex-row gap-3 overflow-hidden">
            <div className="min-w-0 xl:w-[58%] 2xl:w-[60%] shrink-0 flex flex-col gap-3 min-h-0 overflow-y-auto scroll-y pb-2">
              <DoctorNextVisitPanel
                visit={nextVisit}
                onOpen={onOpenVisit}
                onAccept={onAcceptVisit}
              />
              <DoctorTodayGlance visits={glanceVisits} onSelect={onSelectVisit} />
            </div>

            <div className="min-w-0 flex-1 flex flex-col min-h-[280px] xl:min-h-0 xl:h-full">
              <DoctorQueuePanel
                visits={queueVisits}
                nextId={nextVisit?.id}
                onSelect={onSelectVisit}
                fill={bp.xl}
              />
            </div>
          </div>
        </div>
      )}
      <AppointmentActionDialog
        open={Boolean(dialog)}
        copy={dialog?.copy}
        onClose={onCloseDialog}
        onConfirm={onSubmitDialog}
      />
    </div>
  )
}
