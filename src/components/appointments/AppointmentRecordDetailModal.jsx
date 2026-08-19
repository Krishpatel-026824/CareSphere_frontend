import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { CalendarDays, MapPin, Star, X } from 'lucide-react'
import AppointmentDetailHero from './AppointmentDetailHero'

export default function AppointmentRecordDetailModal({ open, appointment, doctor, onClose, onOpenDoctor }) {
  if (!appointment) return null

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <h2 className="text-lg font-bold text-[#0F172A]">Appointment Details</h2>
        <IconButton onClick={onClose} size="small">
          <X className="w-5 h-5 text-[#64748B]" />
        </IconButton>
      </div>
      <DialogContent sx={{ pt: 1 }}>
        <div className="flex flex-col gap-4 pb-2">
          <AppointmentDetailHero appointment={appointment} />

          <div className="rounded-2xl border border-[#E6EBF1] bg-[#F8FAFC] p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoRow icon={MapPin} label="Clinic" value={appointment.fullAddress || appointment.address} />
            <InfoRow
              icon={CalendarDays}
              label="Schedule"
              value={`${appointment.dateLabel} • ${appointment.timeLabel}`}
            />
            <InfoRow icon={Star} label="Rating" value={`${doctor?.rating || 0} (${doctor?.reviewCount || 0})`} />
            <InfoRow label="Fee" value={`₹${doctor?.fee || '—'}`} />
          </div>

          {appointment.prepItems?.length ? (
            <div className="rounded-2xl border border-[#E6EBF1] bg-white p-4">
              <p className="text-sm font-bold text-navy mb-2">Preparation</p>
              <ul className="text-sm text-body-gray space-y-1">
                {appointment.prepItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onOpenDoctor?.(appointment, doctor)}
              className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
            >
              View Doctor Profile
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-white px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-[0.03em] text-[#7A8794]">{label}</p>
      <p className="text-sm text-navy font-medium mt-0.5 inline-flex items-center gap-1.5">
        {Icon ? <Icon className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} /> : null}
        {value}
      </p>
    </div>
  )
}
