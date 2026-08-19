import { CalendarDays, Clock, MapPin, Phone } from 'lucide-react'

export default function LabMyBookings({ bookings }) {
  if (!bookings.length) return null

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[16px] font-bold text-navy">My Bookings</h2>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,360px),1fr))]">
        {bookings.map((b, i) => (
          <div key={i} className="bg-white border border-border-gray rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-navy">{b.test.name}</h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600">Pending</span>
            </div>
            <p className="text-[13px] text-gray-500">{b.name} • {b.mobile}</p>
            <div className="text-[13px] text-gray-600 space-y-1">
              <p className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 text-teal" />{b.date} • {b.timeSlot}</p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-teal" />{b.collectionType}{b.address ? ` • ${b.address}` : ''}</p>
            </div>
            <p className="text-[13px] font-bold text-navy mt-1">₹{b.test.price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
