import Dialog from '@mui/material/Dialog'
import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import { ArrowLeft, Star, Video } from 'lucide-react'

export default function DoctorProfileModal({ open, appointment, doctor, onClose }) {
  if (!appointment) return null
  const doc = doctor || {
    name: appointment.doctorName || 'Doctor',
    specialty: appointment.specialty || '',
    hospital: appointment.clinicName || appointment.address || '',
    avatar: appointment.doctorPhoto || '',
    rating: appointment.rating || '--',
    fee: appointment.fee || '--',
    experience: '--',
    bio: '',
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={{ p: 0 }}>
        <div className="border-b border-[#E6EBF1] px-4 sm:px-5 py-3.5 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#F3F4F6] flex items-center justify-center cursor-pointer"
            aria-label="Back to appointment details"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-navy" strokeWidth={1.9} />
          </button>
          <h2 className="text-lg font-bold text-navy">Doctor Profile</h2>
        </div>

        <div className="max-h-[72vh] overflow-y-auto px-4 sm:px-5 py-4">
          <div className="rounded-2xl border border-[#E6EBF1] bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <Avatar src={doc.avatar || appointment.doctorPhoto} alt={doc.name} sx={{ width: 64, height: 64 }} />
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-navy leading-tight">{doc.name}</h3>
                <p className="text-sm text-body-gray mt-1">
                  {doc.specialty} • {doc.hospital}
                </p>
                <p className="text-sm text-body-gray mt-1">{doc.qualification || 'Doctor'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <Stat label="Experience" value={`${doc.experience || '--'} yrs`} />
              <Stat label="Rating" value={`${doc.rating || '--'}`} icon={Star} />
              <Stat label="Fee" value={`₹${doc.fee || '--'}`} />
              <Stat label="Consult" value={doc.videoConsult ? 'Video + Clinic' : 'In-clinic'} icon={Video} />
            </div>

            <div className="mt-4 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3.5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#7A8794]">About</p>
              <p className="text-sm text-navy mt-1.5 leading-relaxed">
                {doc.bio || 'Experienced doctor available for your care.'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-[0.03em] text-[#7A8794]">{label}</p>
      <p className="text-sm font-semibold text-navy mt-1 inline-flex items-center gap-1.5">
        {Icon ? <Icon className="w-3.5 h-3.5 text-teal" strokeWidth={1.8} /> : null}
        {value}
      </p>
    </div>
  )
}
