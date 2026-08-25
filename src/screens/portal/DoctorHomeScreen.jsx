import { Bell } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import DoctorHomeStatStrip from '../../components/portal/DoctorHomeStatStrip'
import DoctorNextVisitPanel from '../../components/portal/DoctorNextVisitPanel'
import DoctorQueuePanel from '../../components/portal/DoctorQueuePanel'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'
import DoctorHomeStatusScreen from './DoctorHomeStatusScreen'
import { generateDoctorHomeData } from '../../data/generators/doctorHomeGenerator'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'

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
  onClearVisit,
  onClearStat,
  onMessage,
  onActionClick,
  actions,
  dialog,
  onCloseDialog,
  onSubmitDialog,
}) {
  const data = generateDoctorHomeData(visits, nextVisit)
  const bp = useBreakpoint()
  const now = new Date()
  const queueVisits = nextVisit
    ? data.queue.filter((visit) => visit.id !== nextVisit.id)
    : data.queue

  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col overflow-hidden">
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
        <div className="w-full h-full min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-3 sm:gap-4 max-w-[1440px] mx-auto">
          <header className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex items-center gap-3">
              <div className="min-w-0">
                <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-navy tracking-tight leading-tight">
                  {getTimeGreeting(now)}, {data.greetingName}
                </h1>
                <p className="text-sm text-body-gray mt-0.5">{formatTodayLabel(now)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <DoctorHomeStatStrip stats={data.stats} onSelect={onStatClick} />
              <button
                type="button"
                onClick={onBellClick}
                aria-label="Notifications"
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/85 border border-white flex items-center justify-center cursor-pointer shadow-sm hover:border-teal hover:bg-teal-light shrink-0"
              >
                <Bell className="w-5 h-5 text-navy" strokeWidth={1.75} />
              </button>
            </div>
          </header>

          <div className="flex-1 min-h-0 flex flex-col xl:flex-row gap-4 overflow-hidden">
            <div className="min-w-0 xl:w-[58%] 2xl:w-[60%] shrink-0 flex flex-col min-h-0 h-[auto] xl:h-full">
              {selectedVisit ? (
                <DoctorVisitPanel
                  visit={selectedVisit}
                  fillHeight={bp.xl}
                  canAccept={actions.canAccept(selectedVisit)}
                  canDecline={actions.canDecline(selectedVisit)}
                  canComplete={actions.canComplete(selectedVisit)}
                  onAccept={() => actions.requestAction('accept', selectedVisit)}
                  onDecline={() => actions.requestAction('decline', selectedVisit)}
                  onComplete={() => actions.requestAction('complete', selectedVisit)}
                  onMessage={() => onMessage?.(selectedVisit)}
                  onBack={onClearVisit}
                />
              ) : (
                <DoctorNextVisitPanel
                  visit={nextVisit}
                  fillHeight={bp.xl}
                  onOpen={onOpenVisit}
                  onAccept={onAcceptVisit}
                  quickActions={data.quickActions}
                  onActionClick={onActionClick}
                />
              )}
            </div>
            <div className="min-w-0 flex-1 flex flex-col min-h-[280px] xl:min-h-0 xl:h-full">
              <DoctorQueuePanel
                visits={queueVisits}
                nextId={selectedVisit?.id}
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
