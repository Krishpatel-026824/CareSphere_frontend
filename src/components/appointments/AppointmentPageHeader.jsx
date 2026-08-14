import { CalendarCheck, Plus } from 'lucide-react'

export default function AppointmentPageHeader({ count = 0, onNewAppointment }) {
  return (
    <header className="shrink-0 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0">
          <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
            Appointments
          </h1>
          <p className="text-sm text-body-gray mt-1">{count} total appointments</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onNewAppointment}
        className="inline-flex items-center justify-center gap-1.5 min-h-10 sm:min-h-11 px-3.5 sm:px-5 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark shrink-0"
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline">New appointment</span>
        <span className="sm:hidden">New</span>
      </button>
    </header>
  )
}
