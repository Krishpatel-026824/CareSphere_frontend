import { ArrowRight, CalendarDays, Clock, FlaskConical, MapPin, Plus } from 'lucide-react'
import { formatLabBookingDate } from '../../data/generators/labBookingNotificationGenerator'

export default function LabBookingPanel({ booking, onBook, onOpenPage }) {
  if (!booking) {
    return (
      <section className="h-full min-h-0 bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden flex flex-col">
        <CardHeader title="Lab test booking" badge="None yet" badgeTone="bg-amber-50 text-amber-700" />
        <div className="p-3 flex-1 flex flex-col justify-between gap-2.5 min-h-0">
          <div className="rounded-xl border border-amber-200/60 bg-gradient-to-r from-[#FFFBEB] to-white p-3 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4" strokeWidth={1.85} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-navy leading-tight">No lab test booked</p>
              <p className="text-[12px] text-body-gray mt-0.5 leading-snug">
                Home collection or clinic visit — booking details show here.
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="shrink-0 h-9 px-3.5 rounded-lg bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.85} />
              Book
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Pick test', 'Choose slot', 'Track booking'].map((step) => (
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

  const thumb = booking.test?.thumbnail || booking.test?.image
  const dateLabel = formatLabBookingDate(booking.date) || booking.date || '—'
  const placeLine =
    booking.collectionType === 'Home Collection' && booking.address
      ? `Home · ${booking.address}`
      : booking.collectionType || 'Lab visit'

  return (
    <section className="h-full min-h-0 bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden flex flex-col">
      <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 shrink-0" />
      <CardHeader title="Lab test booking" badge="Booked" badgeTone="bg-amber-50 text-amber-700" />

      <button
        type="button"
        onClick={onOpenPage}
        className="px-3.5 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer shrink-0"
      >
        <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-amber-100 shrink-0 bg-amber-50">
          {thumb ? (
            <img src={thumb} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-600">
              <FlaskConical className="w-4 h-4" strokeWidth={1.85} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-navy truncate">{booking.test?.name || 'Lab test'}</p>
          <p className="text-[12px] text-body-gray truncate">
            {booking.name}
            {booking.mobile ? ` · ${booking.mobile}` : ''}
          </p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={2} />
      </button>

      <div className="px-3.5 flex flex-col gap-2 flex-1 min-h-0">
        <div className="grid grid-cols-2 gap-1.5">
          <InfoChip icon={CalendarDays} label="Date" value={dateLabel} />
          <InfoChip icon={Clock} label="Time" value={booking.timeSlot || '—'} />
        </div>

        <div className="rounded-lg bg-[#F8FAFC] border border-[#E6EBF1] px-2.5 py-2">
          <p className="flex items-start gap-1.5 text-[12px] text-navy leading-snug">
            <MapPin className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" strokeWidth={1.85} />
            {placeLine}
          </p>
          {booking.test?.price != null ? (
            <p className="text-[13px] font-bold text-navy mt-1 pl-5">₹{booking.test.price}</p>
          ) : null}
        </div>
      </div>

      <div className="px-3.5 pb-3 pt-2.5 mt-auto shrink-0 flex gap-2">
        <button
          type="button"
          onClick={onBook}
          className="flex-1 h-9 rounded-lg border border-[#E6EBF1] bg-white text-navy text-[13px] font-semibold cursor-pointer hover:bg-bg-gray"
        >
          Book new
        </button>
        <button
          type="button"
          onClick={onOpenPage}
          className="flex-[1.15] h-9 rounded-lg bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
        >
          Open lab page
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
    <div className="rounded-lg bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="text-[13px] font-semibold text-navy inline-flex items-center gap-1 mt-0.5 min-w-0">
        <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}
