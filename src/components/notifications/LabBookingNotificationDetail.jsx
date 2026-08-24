import { CalendarDays, CheckCircle2, Clock3, FlaskConical, Home, MapPin, Phone, Timer, UserRound, Wallet } from 'lucide-react'

const iconStroke = 1.75

const highlightStyles = [
  { label: 'Price', key: 'price', icon: Wallet, wrap: 'bg-[#ECFDF5] border-[#A7F3D0]', iconWrap: 'bg-[#10B981] text-white', value: 'text-[#047857]' },
  { label: 'Results', key: 'turnaround', icon: Timer, wrap: 'bg-[#FFF7ED] border-[#FED7AA]', iconWrap: 'bg-[#F97316] text-white', value: 'text-[#C2410C]' },
  { label: 'Date', key: 'date', icon: CalendarDays, wrap: 'bg-[#EFF6FF] border-[#BFDBFE]', iconWrap: 'bg-[#3B82F6] text-white', value: 'text-[#1D4ED8]' },
  { label: 'Time', key: 'time', icon: Clock3, wrap: 'bg-[#F5F3FF] border-[#DDD6FE]', iconWrap: 'bg-[#8B5CF6] text-white', value: 'text-[#6D28D9]' },
]

const rowStyles = {
  Patient: { wrap: 'bg-[#ECFEFF]', icon: 'text-[#0891B2]', iconBg: 'bg-[#CFFAFE]' },
  Mobile: { wrap: 'bg-[#F0FDF4]', icon: 'text-[#16A34A]', iconBg: 'bg-[#DCFCE7]' },
  Collection: { wrap: 'bg-[#FFFBEB]', icon: 'text-[#D97706]', iconBg: 'bg-[#FEF3C7]' },
  Address: { wrap: 'bg-[#FEF2F2]', icon: 'text-[#DC2626]', iconBg: 'bg-[#FEE2E2]' },
  Schedule: { wrap: 'bg-[#EEF2FF]', icon: 'text-[#4F46E5]', iconBg: 'bg-[#E0E7FF]' },
  Turnaround: { wrap: 'bg-[#FFF7ED]', icon: 'text-[#EA580C]', iconBg: 'bg-[#FFEDD5]' },
}

export function parseLabBookingDetails(item) {
  if (item?.details?.kind === 'labBooking') return item.details
  if (item?.type !== 'lab' || !String(item?.title || '').startsWith('Lab Booking:')) return null

  const lines = String(item.message || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const map = {}
  lines.forEach((line) => {
    const index = line.indexOf(':')
    if (index === -1) return
    map[line.slice(0, index).trim().toLowerCase()] = line.slice(index + 1).trim()
  })

  if (!map.test && !map.price) return null

  return {
    kind: 'labBooking',
    testName: map.test || String(item.title).replace(/^Lab Booking:\s*/i, ''),
    description: map.about || '',
    price: map.price || '—',
    turnaround: map['results in'] || '—',
    patient: map.patient || '—',
    mobile: map.mobile || '—',
    date: map.date || '—',
    time: map.time || '—',
    collection: map.collection || '—',
    address: map.address || '',
  }
}

export default function LabBookingNotificationDetail({ details, statusLabel }) {
  if (!details) return null

  return (
    <div className="mt-1 overflow-hidden rounded-2xl border border-teal/20 shadow-[0_12px_28px_rgba(14,165,160,0.12)]">
      <div className="relative px-4 py-3.5 bg-gradient-to-r from-[#0EA5A0] via-[#14B8A6] to-[#0D9488] text-white">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 88% 20%, rgba(255,255,255,0.35) 0%, transparent 42%), radial-gradient(circle at 12% 80%, rgba(255,255,255,0.16) 0%, transparent 40%)',
          }}
        />
        <div className="relative flex items-start gap-3">
          <span className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 ring-1 ring-white/30">
            <FlaskConical className="w-5 h-5 text-white" strokeWidth={iconStroke} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.25} />
              Booking confirmed
            </span>
            <h4 className="text-[16px] font-bold leading-snug mt-1.5">{details.testName}</h4>
            {details.description ? (
              <p className="text-[12px] text-white/85 leading-snug mt-1">{details.description}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#F0FDFA] to-white p-3.5 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {highlightStyles.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className={`rounded-xl border px-2.5 py-2.5 min-w-0 ${item.wrap}`}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${item.iconWrap}`}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">{item.label}</p>
                </div>
                <p className={`text-[13px] font-bold truncate ${item.value}`}>{details[item.key]}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DetailRow icon={UserRound} label="Patient" value={details.patient} />
          <DetailRow icon={Phone} label="Mobile" value={details.mobile} />
          <DetailRow
            icon={details.collection === 'Home Collection' ? Home : FlaskConical}
            label="Collection"
            value={details.collection}
          />
          <DetailRow icon={Clock3} label="Turnaround" value={details.turnaround} />
          <DetailRow
            icon={CalendarDays}
            label="Schedule"
            value={`${details.date} • ${details.time}`}
            wide
          />
          {details.address ? <DetailRow icon={MapPin} label="Address" value={details.address} wide /> : null}
        </div>

        <p className="text-[11px] text-body-gray/70 mt-3">{statusLabel}</p>
      </div>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value, wide = false }) {
  const style = rowStyles[label] || rowStyles.Patient
  return (
    <div className={`flex items-center gap-2.5 min-w-0 rounded-xl border border-transparent px-2.5 py-2 ${style.wrap} ${wide ? 'sm:col-span-2' : ''}`}>
      <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg} ${style.icon}`}>
        <Icon className="w-4 h-4" strokeWidth={iconStroke} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">{label}</p>
        <p className="text-[13px] font-bold text-navy leading-snug break-words">{value}</p>
      </div>
    </div>
  )
}
