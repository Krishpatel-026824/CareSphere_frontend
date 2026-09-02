import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import { IndianRupee, Star, X } from 'lucide-react'
import {
  APPOINTMENT_FLOW_MODAL_BODY,
  APPOINTMENT_FLOW_MODAL_HEADER,
  APPOINTMENT_FLOW_MODAL_PROPS,
  APPOINTMENT_FLOW_MODAL_SHELL,
} from './appointmentFlowModalLayout'
import AppointmentDetailHero from './AppointmentDetailHero'

function DetailMetaCard({ icon: Icon, label, value }) {
  if (!value || value === '—') return null

  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-white px-3.5 py-3 min-h-[72px] flex flex-col justify-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-body-gray">{label}</p>
      <p className="mt-1.5 text-[15px] sm:text-base font-semibold text-navy leading-snug inline-flex items-center gap-2">
        <Icon className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
        {value}
      </p>
    </div>
  )
}

export default function AppointmentRecordDetailModal({ open, appointment, doctor, onClose, onOpenDoctor }) {
  if (!appointment) return null

  const ratingValue =
    doctor?.rating != null
      ? `${doctor.rating} (${doctor.reviewCount || 0} reviews)`
      : null

  return (
    <Dialog open={open} onClose={onClose} {...APPOINTMENT_FLOW_MODAL_PROPS}>
      <div className={APPOINTMENT_FLOW_MODAL_SHELL}>
        <div className={APPOINTMENT_FLOW_MODAL_HEADER}>
          <h2 className="text-base sm:text-lg font-bold text-navy tracking-tight">Appointment Details</h2>
          <IconButton onClick={onClose} size="small" aria-label="Close">
            <X className="w-5 h-5 text-body-gray" />
          </IconButton>
        </div>

        <div className={APPOINTMENT_FLOW_MODAL_BODY}>
          <AppointmentDetailHero appointment={appointment} showPhoto={false} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DetailMetaCard icon={Star} label="Rating" value={ratingValue} />
            <DetailMetaCard
              icon={IndianRupee}
              label="Consultation fee"
              value={doctor?.fee != null ? `₹${doctor.fee}` : null}
            />
          </div>

          {appointment.prepItems?.length ? (
            <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/70 px-4 py-3.5">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-amber-800">
                Preparation
              </p>
              <p className="text-[15px] sm:text-base text-[#78350F] leading-relaxed mt-2">
                {appointment.prepItems.join(' • ')}
              </p>
            </div>
          ) : null}

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => onOpenDoctor?.(appointment, doctor)}
              className="min-h-11 px-5 rounded-xl bg-teal text-white text-sm sm:text-[15px] font-semibold cursor-pointer hover:bg-teal-dark transition-colors shadow-sm"
            >
              View Doctor Profile
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
