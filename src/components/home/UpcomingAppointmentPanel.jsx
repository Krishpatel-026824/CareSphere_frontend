import { ArrowRight, CalendarDays, CalendarPlus, Clock, MapPin, Phone } from 'lucide-react'
import { getPatientAppointmentStatusLabel, getPatientAppointmentStatusStyle } from '../../data/mocks/appointmentActions'

export default function UpcomingAppointmentPanel({
  appointment,
  visitSignals,
  onReschedule,
  onOpenPage,
  onBook,
}) {
  if (!appointment) {
    return (
      <section className="h-full min-h-0 bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden flex flex-col">
        <CardHeader title="Upcoming appointment" badge="None yet" badgeTone="bg-slate-100 text-slate-600" />
        <div className="p-3 flex-1 flex flex-col justify-between gap-2.5 min-h-0">
          <div className="rounded-xl border border-teal/15 bg-gradient-to-r from-[#F0FDFA] to-white p-3 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center shrink-0">
              <CalendarPlus className="w-4 h-4" strokeWidth={1.85} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-navy leading-tight">No visit booked</p>
              <p className="text-[12px] text-body-gray mt-0.5 leading-snug">
                Pick a doctor and time — your next visit summary appears here.
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="shrink-0 h-9 px-3.5 rounded-lg bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
            >
              <CalendarPlus className="w-3.5 h-3.5" strokeWidth={1.85} />
              Book
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Choose doctor', 'Pick slot', 'Get reminder'].map((step) => (
              <span
                key={step}
                className="rounded-lg bg-[#F8FAFC] border border-[#E6EBF1] px-2 py-1.5 text-[11px] font-medium text-body-gray text-center"
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const photo = appointment.doctorPhoto || appointment.photo
  const dateLabel = appointment.dateLabel || appointment.date || '—'
  const timeLabel = appointment.timeLabel || appointment.time || '—'
  const clinic = appointment.clinic || appointment.hospital || ''
  const location = appointment.location || ''
  const placeLine = buildPlaceLine(clinic, location, appointment.address)
  const prepLabels = visitSignals?.prepLabels || []

  return (
    <section className="h-full min-h-0 bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden flex flex-col">
      <div className="h-0.5 bg-gradient-to-r from-teal to-[#14B8A6] shrink-0" />
      <CardHeader
        title="Upcoming appointment"
        badge={getPatientAppointmentStatusLabel(appointment.status)}
        badgeTone={getPatientAppointmentStatusStyle(appointment.status)}
      />

      <button
        type="button"
        onClick={onOpenPage}
        className="px-3.5 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer shrink-0"
      >
        <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-teal-light shrink-0 bg-teal-light">
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-navy truncate">{appointment.doctorName}</p>
          <p className="text-[12px] text-body-gray truncate">
            {appointment.specialty}
            {clinic ? ` · ${clinic}` : ''}
          </p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={2} />
      </button>

      <div className="px-3.5 flex flex-col gap-2 flex-1 min-h-0">
        <div className="grid grid-cols-2 gap-1.5">
          <InfoChip icon={CalendarDays} label="Date" value={dateLabel} />
          <InfoChip icon={Clock} label="Time" value={timeLabel} />
        </div>

        {placeLine || appointment.phone ? (
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E6EBF1] px-2.5 py-2 space-y-1">
            {placeLine ? (
              <p className="flex items-start gap-1.5 text-[12px] text-navy leading-snug">
                <MapPin className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" strokeWidth={1.85} />
                {placeLine}
              </p>
            ) : null}
            {appointment.phone ? (
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-navy">
                <Phone className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.85} />
                {appointment.phone}
              </p>
            ) : null}
          </div>
        ) : null}

        {prepLabels.length ? (
          <p className="text-[11px] text-body-gray">Prep: {prepLabels.slice(0, 2).join(' · ')}</p>
        ) : null}
      </div>

      <div className="px-3.5 pb-3 pt-2.5 mt-auto shrink-0 flex gap-2">
        <button
          type="button"
          onClick={onReschedule}
          className="flex-1 h-9 rounded-lg border border-[#E6EBF1] bg-white text-navy text-[13px] font-semibold cursor-pointer hover:bg-bg-gray"
        >
          Reschedule
        </button>
        <button
          type="button"
          onClick={onOpenPage}
          className="flex-[1.15] h-9 rounded-lg bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
        >
          Open appointment
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </section>
  )
}

function CardHeader({ title, badge, badgeTone }) {
  return (
    <div className="px-3.5 py-2 flex items-center justify-between gap-2 border-b border-[#E6EBF1] shrink-0">
      <h2 className="font-display text-[15px] sm:text-[16px] font-bold text-navy">{title}</h2>
      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badgeTone}`}>
        {badge}
      </span>
    </div>
  )
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="text-[13px] font-semibold text-navy inline-flex items-center gap-1 mt-0.5 min-w-0">
        <Icon className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={2} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}

function buildPlaceLine(clinic, location, address) {
  const parts = []
  if (clinic) parts.push(clinic)
  if (location && !clinic?.toLowerCase().includes(location.toLowerCase())) {
    parts.push(location)
  }
  if (!parts.length && address) return address
  return parts.join(', ')
}
