import { useMemo, useState } from 'react'
import { CalendarDays, Clock, FlaskConical, MapPin, Search, Trash2 } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import AppointmentPageHeader from '../appointments/AppointmentPageHeader'
import { formatLabBookingDate } from '../../data/generators/labBookingNotificationGenerator'

const muiFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#F8FAFC',
  },
}

export default function LabMyBookings({
  bookings = [],
  tests = [],
  onBookNew,
  onRemove,
}) {
  const safeBookings = Array.isArray(bookings) ? bookings : []
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return safeBookings
    return safeBookings.filter((item) => {
      const haystack = [
        item.test?.name,
        item.name,
        item.mobile,
        item.collectionType,
        item.address,
        item.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [safeBookings, query])

  function resolveThumb(booking) {
    if (booking.test?.thumbnail) return booking.test.thumbnail
    if (booking.test?.image) return booking.test.image
    const match = tests.find((item) => item.id === booking.test?.id)
    return match?.thumbnail || match?.background || ''
  }

  return (
    <div className="w-full min-h-full lg:h-[100dvh] lg:max-h-[100dvh] bg-bg-gray flex flex-col overflow-x-hidden lg:overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4">
        <AppointmentPageHeader
          icon={FlaskConical}
          iconTone="bg-amber-100 text-amber-600"
          title="Lab tests"
          subtitle={
            safeBookings.length
              ? `${safeBookings.length} booking${safeBookings.length === 1 ? '' : 's'} saved`
              : 'Book home sample collection or visit a partner lab'
          }
          count={safeBookings.length}
          upcomingCount={safeBookings.length}
          newLabel="Book new lab test"
          onNewAppointment={onBookNew}
        />

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm flex flex-col overflow-hidden">
          <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-[#E6EBF1]">
            <span className="text-[11px] font-semibold text-[#374151] mb-1 block">Search</span>
            <TextField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Test name, patient, collection..."
              size="small"
              fullWidth
              sx={muiFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.8} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-center">
                <p className="text-sm text-body-gray">
                  {safeBookings.length === 0
                    ? 'No lab bookings yet. Tap “Book new lab test” to get started.'
                    : 'No bookings match your search.'}
                </p>
                {safeBookings.length === 0 && onBookNew ? (
                  <button
                    type="button"
                    onClick={onBookNew}
                    className="mt-3 h-10 px-4 rounded-full bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
                  >
                    Book new lab test
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {filtered.map((booking) => {
                  const thumb = resolveThumb(booking)
                  return (
                  <article
                    key={booking.id}
                    className="rounded-xl border border-[#E6EBF1] bg-[#FAFBFC] hover:bg-white px-4 py-3 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-amber-50 border border-[#E6EBF1]">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <FlaskConical className="w-5 h-5" strokeWidth={1.75} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-navy truncate">{booking.test?.name}</h3>
                        <p className="text-xs text-body-gray mt-0.5 truncate">
                          {booking.name} • {booking.mobile || 'No mobile'}
                        </p>
                        <p className="text-xs text-body-gray mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
                            {formatLabBookingDate(booking.date) || booking.date || '—'}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
                            {booking.timeSlot || '—'}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
                            {booking.collectionType}
                            {booking.address ? ` · ${booking.address}` : ''}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5">
                        {onRemove ? (
                          <button
                            type="button"
                            onClick={() => onRemove(booking.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
                            aria-label="Remove booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        ) : null}
                      </div>
                      <span className="text-[12px] font-bold text-navy">₹{booking.test?.price ?? '—'}</span>
                    </div>
                  </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
