import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Avatar from '@mui/material/Avatar'
import { ArrowLeft, Award, Briefcase, Clock, Heart, Hospital, IndianRupee, Languages, MapPin, Star, Stethoscope, Users, Video, X } from 'lucide-react'

export default function DoctorProfileModal({ open, appointment, doctor, onClose }) {
  const [showPhoto, setShowPhoto] = useState(false)
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px' } }}>
      <div className="bg-gradient-to-br from-[#F0FDFA] via-white to-[#F0F9FF]">
        <div className="border-b border-[#E6EBF1] px-4 py-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-[#F3F4F6] flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#334155]" strokeWidth={2} />
          </button>
          <h2 className="text-sm font-bold text-[#0F172A]">Doctor Profile</h2>
        </div>

        <div className="px-4 py-4 max-h-[75vh] overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-3.5">
            <Avatar
              src={doc.avatar || appointment.doctorPhoto}
              alt={doc.name}
              sx={{ width: 68, height: 68, cursor: 'pointer', boxShadow: '0 4px 14px rgba(14,165,160,0.2)' }}
              onClick={() => setShowPhoto(true)}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-[17px] font-bold text-[#0F172A] leading-tight">{doc.name}</h3>
              <p className="text-[13px] text-[#475569] mt-0.5 flex items-center gap-1">
                <Stethoscope className="w-3 h-3 text-[#0EA5A0]" strokeWidth={2} />
                {doc.specialty}
              </p>
              <p className="text-[12px] text-[#64748B] mt-0.5 flex items-center gap-1">
                <Hospital className="w-3 h-3 text-[#64748B]" strokeWidth={1.75} />
                {doc.hospital}
              </p>
              {doc.qualification ? (
                <p className="text-[11px] text-[#94A3B8] mt-0.5 flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#94A3B8]" strokeWidth={1.75} />
                  {doc.qualification}
                </p>
              ) : null}
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-3.5 grid grid-cols-4 gap-1.5">
            <StatBadge label="Exp" value={`${doc.experience || '--'}yr`} color="bg-[#ECFDF5]" textColor="text-[#065F46]" />
            <StatBadge label="Rating" value={`★ ${doc.rating || '--'}`} color="bg-[#FEF3C7]" textColor="text-[#92400E]" />
            <StatBadge label="Fee" value={`₹${doc.fee || '--'}`} color="bg-[#EDE9FE]" textColor="text-[#5B21B6]" />
            <StatBadge label="Patients" value={doc.patientsCount || '—'} color="bg-[#DBEAFE]" textColor="text-[#1E40AF]" />
          </div>

          {/* Details */}
          <div className="mt-3.5 space-y-2">
            <DetailRow icon={Briefcase} label="Experience" value={`${doc.experience || '--'} years of practice`} />
            <DetailRow icon={Star} label="Rating" value={`${doc.rating || '--'} (${doc.reviewCount || 0} patient reviews)`} />
            <DetailRow icon={IndianRupee} label="Consultation Fee" value={`₹${doc.fee || '--'} per visit`} />
            <DetailRow icon={Video} label="Consult Type" value={doc.videoConsult ? 'Video Consultation + In-clinic' : 'In-clinic only'} />
            {doc.languages?.length ? (
              <DetailRow icon={Languages} label="Languages" value={doc.languages.join(', ')} />
            ) : null}
            {doc.distanceKm ? (
              <DetailRow icon={MapPin} label="Distance" value={`${doc.distanceKm} km from you`} />
            ) : null}
            {doc.availableToday !== undefined ? (
              <DetailRow icon={Clock} label="Availability" value={doc.availableToday ? 'Available today' : 'Next available soon'} />
            ) : null}
          </div>

          {/* Expertise */}
          {doc.expertise?.length ? (
            <div className="mt-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7A8794] mb-1.5">Expertise</p>
              <div className="flex flex-wrap gap-1.5">
                {doc.expertise.map((item) => (
                  <span key={item} className="px-2 py-0.5 rounded-full bg-[#F0FDFA] border border-[#0EA5A0]/20 text-[11px] font-medium text-[#0F766E]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* About */}
          {doc.bio ? (
            <div className="mt-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase text-[#7A8794]">About</p>
              <p className="text-[12px] text-[#334155] mt-1 leading-relaxed">{doc.bio}</p>
            </div>
          ) : null}
        </div>
      </div>

      {showPhoto && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center" onClick={() => setShowPhoto(false)}>
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40"
            onClick={() => setShowPhoto(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img
            src={doc.avatar || appointment.doctorPhoto}
            alt={doc.name}
            className="w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] rounded-2xl shadow-2xl object-cover"
          />
        </div>
      )}
    </Dialog>
  )
}

function StatBadge({ label, value, color, textColor }) {
  return (
    <div className={`rounded-lg ${color} px-2 py-1.5 text-center`}>
      <p className="text-[9px] uppercase tracking-wide text-[#64748B] font-medium">{label}</p>
      <p className={`text-[12px] font-bold ${textColor} mt-0.5`}>{value}</p>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-[#0EA5A0] mt-0.5 shrink-0" strokeWidth={1.75} />
      <p className="text-[12px] text-[#334155]">
        <span className="font-semibold text-[#0F172A]">{label}:</span> {value}
      </p>
    </div>
  )
}
