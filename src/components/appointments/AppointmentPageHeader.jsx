import { CalendarCheck, Plus, Trash2 } from 'lucide-react'

export default function AppointmentPageHeader({
  count = 0,
  upcomingCount = 0,
  onNewAppointment,
  onClearAll,
  recycleBinCount = 0,
  title = 'Appointments',
  subtitle,
  newLabel = 'New appointment',
}) {
  const resolvedSubtitle =
    subtitle ??
    (count > 0 || upcomingCount > 0 ? `${upcomingCount} upcoming · ${count} total` : null)

  return (
    <header className="shrink-0 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0">
          <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
        </div>
        <div className={`min-w-0 ${resolvedSubtitle ? '' : 'flex items-center min-h-11 sm:min-h-12'}`}>
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
            {title}
          </h1>
          {resolvedSubtitle ? (
            <p className="text-sm text-body-gray mt-1">{resolvedSubtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {onClearAll ? (
          <button
            type="button"
            onClick={onClearAll}
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-white border border-[#E6EBF1] text-[#475569] text-sm font-semibold cursor-pointer hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            aria-label="Recycle bin"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Recycle bin</span>
          </button>
        ) : null}
        {onNewAppointment ? (
          <button
            type="button"
            onClick={onNewAppointment}
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark transition-colors inline-flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">{newLabel}</span>
            <span className="sm:hidden">New</span>
          </button>
        ) : null}
      </div>
    </header>
  )
}
