import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import { CalendarDays, IndianRupee, MapPin, Star, X } from 'lucide-react'
import AppointmentDetailHero from './AppointmentDetailHero'

export default function AppointmentRecordDetailModal({ open, appointment, doctor, onClose, onOpenDoctor }) {
  if (!appointment) return null

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '14px' } }}>
      <div className="bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0F9FF]">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E6EBF1]">
          <h2 className="text-sm font-bold text-[#0F172A]">Appointment Details</h2>
          <IconButton onClick={onClose} size="small">
            <X className="w-4 h-4 text-[#64748B]" />
          </IconButton>
        </div>

        <div className="px-4 py-3 flex flex-col gap-2.5">
          <AppointmentDetailHero appointment={appointment} />

          <div className="text-[12px] text-[#334155] space-y-1 pl-1">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0EA5A0]" strokeWidth={1.75} />
              <span className="font-medium">Clinic:</span> {appointment.fullAddress || appointment.address}
            </p>
            <p className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-[#0EA5A0]" strokeWidth={1.75} />
              <span className="font-medium">Schedule:</span> {appointment.dateLabel} • {appointment.timeLabel}
            </p>
            <p className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#0EA5A0]" strokeWidth={1.75} />
              <span className="font-medium">Rating:</span> {doctor?.rating || '—'} ({doctor?.reviewCount || 0} reviews)
            </p>
            <p className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#0EA5A0]" strokeWidth={1.75} />
              <span className="font-medium">Fee:</span> ₹{doctor?.fee || '—'}
            </p>
          </div>

          {appointment.prepItems?.length ? (
            <div className="rounded-lg bg-[#FFFBEB] border border-[#FDE68A]/60 px-3 py-2">
              <p className="text-[11px] font-bold text-[#92400E] mb-1">Preparation</p>
              <p className="text-[11px] text-[#78350F]">
                {appointment.prepItems.join(' • ')}
              </p>
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onOpenDoctor?.(appointment, doctor)}
              className="h-8 px-3.5 rounded-lg bg-[#0EA5A0] text-white text-[12px] font-semibold cursor-pointer hover:bg-[#0D9490] transition-colors shadow-sm"
            >
              View Doctor Profile
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
