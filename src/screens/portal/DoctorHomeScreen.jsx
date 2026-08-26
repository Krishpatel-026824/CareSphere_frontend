import { Bell, HeartPulse } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import DoctorHomeAppointmentsTable from '../../components/portal/DoctorHomeAppointmentsTable'
import DoctorScheduleVisitModal from '../../components/portal/DoctorScheduleVisitModal'
import DoctorHomeStatusScreen from './DoctorHomeStatusScreen'
import { generateDoctorHomeData } from '../../data/generators/doctorHomeGenerator'
import { useAppSelector } from '../../store/hooks'
import { selectActiveNotifications } from '../../store/slices/notificationsSlice'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'

export default function DoctorHomeScreen({
  visits,
  selectedVisit,
  homeStat,
  onBellClick,
  onOpenVisit,
  onAcceptVisit,
  onDeclineVisit,
  onSelectVisit,
  onClearVisit,
  onClearStat,
  actions,
  dialog,
  onCloseDialog,
  onSubmitDialog,
}) {
  const data = generateDoctorHomeData(visits)
  const now = new Date()
  const greeting = getTimeGreeting(now)
  const todayLabel = formatTodayLabel(now)
  const unreadNotices = useAppSelector(selectActiveNotifications).filter((item) => item.unread)
    .length

  const modalVisit = !homeStat ? selectedVisit : null

  function handleConfirmDialog() {
    const type = dialog?.type
    onSubmitDialog?.()
    if (type === 'complete' || type === 'decline') onClearVisit?.()
  }

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      {homeStat ? (
        <DoctorHomeStatusScreen
          statId={homeStat}
          visits={visits}
          selectedVisit={selectedVisit}
          onBack={onClearStat}
          onSelectVisit={onSelectVisit}
          actions={actions}
        />
      ) : (
        <div className="w-full h-full min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto overflow-y-auto scroll-y">
          <header className="shrink-0 flex items-start justify-between gap-3">
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
                <p className="text-xs sm:text-sm text-body-gray mt-1 truncate">
                  Review patient bookings, accept requests, and open past records
                </p>
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
          </header>

          <DoctorHomeAppointmentsTable
            visits={visits}
            onAccept={onAcceptVisit}
            onDecline={onDeclineVisit}
            onView={onOpenVisit}
          />
        </div>
      )}

      <DoctorScheduleVisitModal
        open={Boolean(modalVisit)}
        visit={modalVisit}
        canAccept={modalVisit ? actions.canAccept(modalVisit) : false}
        canDecline={modalVisit ? actions.canDecline(modalVisit) : false}
        canComplete={modalVisit ? actions.canComplete(modalVisit) : false}
        onAccept={() => modalVisit && actions.requestAction('accept', modalVisit)}
        onDecline={() => modalVisit && actions.requestAction('decline', modalVisit)}
        onComplete={() => modalVisit && actions.requestAction('complete', modalVisit)}
        onClose={onClearVisit}
      />

      <AppointmentActionDialog
        open={Boolean(dialog)}
        copy={dialog?.copy}
        onClose={onCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </div>
  )
}
