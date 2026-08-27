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
        <div className="p-4 flex-1 flex flex-col justify-between gap-3 min-h-0">
          <div className="rounded-xl border border-teal/15 bg-gradient-to-r from-[#F0FDFA] to-white p-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-teal text-white flex items-center justify-center shrink-0">
              <CalendarPlus className="w-5 h-5" strokeWidth={1.85} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold text-navy leading-tight">No visit booked</p>
              <p className="text-[13px] text-body-gray mt-1 leading-snug">
                Pick a doctor and time — your next visit summary appears here.
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="shrink-0 min-h-10 px-4 rounded-xl bg-teal text-white text-[14px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
            >
              <CalendarPlus className="w-4 h-4" strokeWidth={1.85} />
              Book
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['Choose doctor', 'Pick slot', 'Get reminder'].map((step) => (
              <span
                key={step}
                className="rounded-lg bg-[#F8FAFC] border border-[#E6EBF1] px-2 py-2 text-[12px] font-medium text-body-gray text-center"
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
      <div className="h-1 bg-gradient-to-r from-teal to-[#14B8A6] shrink-0" />
      <CardHeader
        title="Upcoming appointment"
        badge={getPatientAppointmentStatusLabel(appointment.status)}
        badgeTone={getPatientAppointmentStatusStyle(appointment.status)}
      />

      <button
        type="button"
        onClick={onOpenPage}
        className="px-4 py-3 text-left flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer shrink-0"
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-teal-light shrink-0 bg-teal-light">
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold text-navy truncate">{appointment.doctorName}</p>
          <p className="text-[14px] text-body-gray truncate mt-0.5">
            {appointment.specialty}
            {clinic ? ` · ${clinic}` : ''}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
      </button>

      <div className="px-4 flex flex-col gap-2.5 flex-1 min-h-0">
        <div className="grid grid-cols-2 gap-2">
          <InfoChip icon={CalendarDays} label="Date" value={dateLabel} />
          <InfoChip icon={Clock} label="Time" value={timeLabel} />
        </div>

        {placeLine || appointment.phone ? (
          <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] px-3 py-2.5 space-y-1.5">
            {placeLine ? (
              <p className="flex items-start gap-2 text-[13px] text-navy leading-snug">
                <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.85} />
                {placeLine}
              </p>
            ) : null}
            {appointment.phone ? (
              <p className="flex items-center gap-2 text-[13px] font-semibold text-navy">
                <Phone className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
                {appointment.phone}
              </p>
            ) : null}
          </div>
        ) : null}

        {prepLabels.length ? (
          <p className="text-[12px] text-body-gray">Prep: {prepLabels.slice(0, 2).join(' · ')}</p>
        ) : null}
      </div>

      <div className="px-4 pb-4 pt-3 mt-auto shrink-0 flex gap-2">
        <button
          type="button"
          onClick={onReschedule}
          className="flex-1 h-11 rounded-xl border border-[#E6EBF1] bg-white text-navy text-[14px] font-semibold cursor-pointer hover:bg-bg-gray"
        >
          Reschedule
        </button>
        <button
          type="button"
          onClick={onOpenPage}
          className="flex-[1.15] h-11 rounded-xl bg-teal text-white text-[14px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
        >
          Open appointment
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  )
}

function CardHeader({ title, badge, badgeTone }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-[#E6EBF1] shrink-0">
      <h2 className="font-display text-[17px] sm:text-[18px] font-bold text-navy">{title}</h2>
      <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${badgeTone}`}>
        {badge}
      </span>
    </div>
  )
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="text-[14px] font-semibold text-navy inline-flex items-center gap-1.5 mt-1 min-w-0">
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
