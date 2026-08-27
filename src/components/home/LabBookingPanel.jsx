import { ArrowRight, CalendarDays, Clock, FlaskConical, MapPin, Plus } from 'lucide-react'
import { formatLabBookingDate } from '../../data/generators/labBookingNotificationGenerator'

export default function LabBookingPanel({ booking, onBook, onOpenPage }) {
  if (!booking) {
    return (
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden h-full">
        <CardHeader title="Lab test booking" badge="None yet" badgeTone="bg-amber-50 text-amber-700" />
        <div className="p-4">
          <div className="rounded-xl border border-amber-200/60 bg-gradient-to-r from-[#FFFBEB] to-white p-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <FlaskConical className="w-5 h-5" strokeWidth={1.85} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-navy leading-tight">No lab test booked</p>
              <p className="text-[12px] text-body-gray mt-1 leading-snug">
                Home collection or clinic visit — booking details show here.
              </p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="shrink-0 min-h-10 px-4 rounded-xl bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" strokeWidth={1.85} />
              Book
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {['Pick test', 'Choose slot', 'Track booking'].map((step) => (
              <span
                key={step}
                className="rounded-lg bg-[#F8FAFC] border border-[#E6EBF1] px-2 py-2 text-[11px] font-medium text-body-gray text-center"
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
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden h-full flex flex-col">
      <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
      <CardHeader title="Lab test booking" badge="Booked" badgeTone="bg-amber-50 text-amber-700" />

      <button
        type="button"
        onClick={onOpenPage}
        className="px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
      >
        <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-amber-100 shrink-0 bg-amber-50">
          {thumb ? (
            <img src={thumb} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-amber-600">
              <FlaskConical className="w-5 h-5" strokeWidth={1.85} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold text-navy truncate">{booking.test?.name || 'Lab test'}</p>
          <p className="text-[13px] text-body-gray truncate mt-0.5">
            {booking.name}
            {booking.mobile ? ` · ${booking.mobile}` : ''}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-teal shrink-0" strokeWidth={2} />
      </button>

      <div className="px-4 pb-4 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2">
          <InfoChip icon={CalendarDays} label="Date" value={dateLabel} />
          <InfoChip icon={Clock} label="Time" value={booking.timeSlot || '—'} />
        </div>

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EBF1] px-3 py-2.5">
          <p className="flex items-start gap-2 text-[12px] text-navy leading-snug">
            <MapPin className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" strokeWidth={1.85} />
            {placeLine}
          </p>
          {booking.test?.price != null ? (
            <p className="text-[12px] font-bold text-navy mt-1.5 pl-5">₹{booking.test.price}</p>
          ) : null}
        </div>

        <div className="flex gap-2 pt-0.5">
          <button
            type="button"
            onClick={onBook}
            className="flex-1 h-10 rounded-xl border border-[#E6EBF1] bg-white text-navy text-[13px] font-semibold cursor-pointer hover:bg-bg-gray"
          >
            Book new
          </button>
          <button
            type="button"
            onClick={onOpenPage}
            className="flex-[1.15] h-10 rounded-xl bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
          >
            Open lab page
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}

function CardHeader({ title, badge, badgeTone }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-[#E6EBF1]">
      <h2 className="font-display text-[15px] sm:text-base font-bold text-navy">{title}</h2>
      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${badgeTone}`}>
        {badge}
      </span>
    </div>
  )
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="text-[12px] font-semibold text-navy inline-flex items-center gap-1 mt-0.5 min-w-0">
        <Icon className="w-3 h-3 text-amber-600 shrink-0" strokeWidth={2} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}
