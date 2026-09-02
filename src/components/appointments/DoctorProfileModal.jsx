import Dialog from '@mui/material/Dialog'
import { ArrowLeft } from 'lucide-react'
import {
  APPOINTMENT_FLOW_MODAL_BODY,
  APPOINTMENT_FLOW_MODAL_PROPS,
  APPOINTMENT_FLOW_MODAL_SHELL,
} from './appointmentFlowModalLayout'
import AppointmentDoctorTab from './AppointmentDoctorTab'

export default function DoctorProfileModal({ open, appointment, doctor, onClose }) {
  if (!appointment) return null

  return (
    <Dialog open={open} onClose={onClose} {...APPOINTMENT_FLOW_MODAL_PROPS}>
      <div className={APPOINTMENT_FLOW_MODAL_SHELL}>
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#E6EBF1] bg-white/80">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#F3F4F6] flex items-center justify-center cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-navy" strokeWidth={2} />
          </button>
          <h2 className="text-base sm:text-lg font-bold text-navy tracking-tight">Doctor Profile</h2>
        </div>

        <div className={APPOINTMENT_FLOW_MODAL_BODY}>
          <AppointmentDoctorTab appointment={appointment} doctor={doctor} embedded />
        </div>
      </div>
    </Dialog>
  )
}
