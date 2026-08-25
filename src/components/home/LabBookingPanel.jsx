import { CalendarDays, Clock, FlaskConical, MapPin, Plus } from 'lucide-react'
import { formatLabBookingDate } from '../../data/generators/labBookingNotificationGenerator'

export default function LabBookingPanel({ booking, onBook, onViewBookings }) {
  if (!booking) {
    return (
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-5 sm:p-6 flex flex-col h-full min-h-[280px]">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-display text-lg font-bold text-navy">Lab test booking</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
            None yet
          </span>
        </div>

        <div className="flex-1 flex flex-col items-start justify-center gap-3 py-2">
          <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FlaskConical className="w-6 h-6" strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-base font-bold text-navy">No lab bookings</h3>
          <p className="text-sm text-body-gray max-w-md leading-relaxed">
            Book a lab test for home collection or a partner lab visit. Your next booking will show up here.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="mt-1 min-h-11 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={1.75} />
            Book lab test
          </button>
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
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm overflow-hidden flex flex-col h-full min-h-[280px]">
      <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />

      <div className="px-5 py-4 flex flex-col gap-4 h-full justify-between">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-navy">Lab test booking</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 shrink-0">
            Booked
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-amber-100 shadow-sm shrink-0 bg-amber-50">
            {thumb ? (
              <img src={thumb} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-600">
                <FlaskConical className="w-6 h-6" strokeWidth={1.75} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display text-[17px] font-bold text-navy leading-tight truncate">
              {booking.test?.name || 'Lab test'}
            </p>
            <p className="text-[14px] text-body-gray truncate mt-0.5">
              {booking.name}
              {booking.mobile ? ` • ${booking.mobile}` : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <InfoChip icon={CalendarDays} label="Date" value={dateLabel} />
          <InfoChip icon={Clock} label="Time" value={booking.timeSlot || '—'} />
        </div>

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-3 space-y-2.5">
          <p className="flex items-start gap-2.5 text-[13px] text-navy">
            <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
            <span className="min-w-0 leading-snug">{placeLine}</span>
          </p>
          {booking.test?.price != null ? (
            <p className="text-[13px] font-bold text-navy pl-6">₹{booking.test.price}</p>
          ) : null}
        </div>

        <div className="flex gap-3 pt-0.5">
          <button
            type="button"
            onClick={onBook}
            className="flex-1 h-11 rounded-xl border border-border-gray bg-white text-navy text-sm font-semibold cursor-pointer hover:bg-bg-gray transition-colors"
          >
            Book new
          </button>
          <button
            type="button"
            onClick={onViewBookings}
            className="flex-[1.2] h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5" strokeWidth={1.75} />
            View bookings
          </button>
        </div>
      </div>
    </section>
  )
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B] mb-1">{label}</p>
      <p className="text-[13px] font-semibold text-navy inline-flex items-center gap-1.5 min-w-0">
        <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2} />
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}
