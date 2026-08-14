import { Bell } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import DoctorNextVisitPanel from '../../components/portal/DoctorNextVisitPanel'
import DoctorQueuePanel from '../../components/portal/DoctorQueuePanel'
import DoctorStatRow from '../../components/portal/DoctorStatRow'
import QuickActionsRow from '../../components/home/QuickActionsRow'
import { generateDoctorHomeData } from '../../data/generators/doctorHomeGenerator'
import { formatTodayLabel, getTimeGreeting } from '../../utils/greeting'

export default function DoctorHomeScreen({
  visits,
  nextVisit,
  onBellClick,
  onOpenVisit,
  onAcceptVisit,
  onActionClick,
  dialog,
  onCloseDialog,
  onSubmitDialog,
}) {
  const data = generateDoctorHomeData(visits, nextVisit)
  const now = new Date()

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full min-h-full page-pad py-4 sm:py-5 lg:py-6 flex flex-col gap-4 sm:gap-5 max-w-[1440px] mx-auto">
        <header className="flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[32px] font-bold text-navy tracking-tight leading-tight">
                {getTimeGreeting(now)}, {data.greetingName}
              </h1>
              <span className="inline-flex items-center rounded-full bg-navy text-white px-3 py-1 text-[11px] sm:text-xs font-semibold">
                {formatTodayLabel(now)}
              </span>
            </div>
            <p className="text-sm text-body-gray mt-1">{data.subtitle}</p>
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

        <DoctorStatRow stats={data.stats} onSelect={() => onActionClick?.('schedule')} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 lg:gap-5 min-w-0 xl:items-stretch flex-1">
          <div className="xl:col-span-3 min-w-0 h-full">
            <DoctorNextVisitPanel visit={nextVisit} onOpen={onOpenVisit} onAccept={onAcceptVisit} />
          </div>
          <div className="xl:col-span-2 min-w-0 h-full">
            <DoctorQueuePanel visits={data.queue} nextId={nextVisit?.id} onSelect={onOpenVisit} />
          </div>
        </div>

        <QuickActionsRow actions={data.quickActions} onActionClick={onActionClick} />
      </div>
      <AppointmentActionDialog
        open={Boolean(dialog)}
        copy={dialog?.copy}
        onClose={onCloseDialog}
        onConfirm={onSubmitDialog}
      />
    </div>
  )
}
