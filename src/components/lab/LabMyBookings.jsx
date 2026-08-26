import { useMemo, useState } from 'react'
import { FlaskConical, Search } from 'lucide-react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import AppointmentPageHeader from '../appointments/AppointmentPageHeader'
import { formatLabBookingDate } from '../../data/generators/labBookingNotificationGenerator'

const muiFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#F8FAFC',
    minHeight: '48px',
    fontSize: '0.95rem',
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '0.95rem',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  '& .MuiInputBase-input::placeholder': {
    fontSize: '0.95rem',
    opacity: 0.75,
  },
}

export default function LabMyBookings({
  bookings = [],
  tests = [],
  onBookNew,
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
    <div className="w-full min-h-full bg-bg-gray">
      <div className="page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
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

        <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC]">
            <span className="text-[13px] font-semibold text-[#374151] mb-1.5 block">Search</span>
            <TextField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Test name, patient, collection..."
              size="medium"
              fullWidth
              sx={muiFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-body-gray shrink-0" strokeWidth={1.8} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
                {safeBookings.length === 0
                  ? 'No lab bookings yet. Tap “Book new lab test” to get started.'
                  : 'No bookings match your search.'}
              </p>
            ) : (
              <table className="w-full min-w-[780px] border-collapse text-left">
                <thead className="bg-[#CBD5E1]">
                  <tr>
                    <th className="px-3 py-4 w-14 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      No.
                    </th>
                    <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      Test
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      Patient
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                      Time
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle hidden md:table-cell">
                      Collection
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 text-center align-middle">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking, index) => {
                    const thumb = resolveThumb(booking)
                    return (
                      <tr key={booking.id} className="hover:bg-[#F0FDFA] transition-colors">
                        <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                          <span className="text-[13px] font-semibold text-navy tabular-nums">{index + 1}</span>
                        </td>
                        <td className="px-4 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-amber-50 border border-[#E6EBF1]">
                              {thumb ? (
                                <img src={thumb} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-amber-600">
                                  <FlaskConical className="w-5 h-5" strokeWidth={1.75} />
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-navy truncate leading-snug">
                              {booking.test?.name || 'Lab test'}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                          <p className="text-[13px] font-semibold text-navy truncate">{booking.name}</p>
                          <p className="text-[12px] text-body-gray mt-0.5 truncate">{booking.mobile || '—'}</p>
                        </td>
                        <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                          <p className="text-[13px] font-semibold text-navy whitespace-nowrap">
                            {formatLabBookingDate(booking.date) || booking.date || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center">
                          <p className="text-[13px] font-semibold text-navy whitespace-nowrap">
                            {booking.timeSlot || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle text-center hidden md:table-cell">
                          <p className="text-[13px] text-body-gray truncate">
                            {booking.collectionType || '—'}
                          </p>
                        </td>
                        <td className="px-3 py-3.5 border-b border-[#D5DEE8] align-middle text-center">
                          <p className="text-[13px] font-bold text-navy">
                            ₹{booking.test?.price ?? '—'}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
