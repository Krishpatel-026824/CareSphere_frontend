import {
  Building2,
  CalendarDays,
  Droplets,
  FileHeart,
  Languages,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { generateDoctorPatientProfile } from '../../data/generators/doctorPatientProfileGenerator'

function FactTile({ icon: Icon, label, value, tone = 'default' }) {
  if (!value) return null
  const tones = {
    default: 'from-[#F7FAFC] to-white border-[#EAF0F5] text-teal',
    alert: 'from-[#FFF7F7] to-white border-rose-100 text-rose-500',
    care: 'from-[#E8F7F6] to-white border-teal/20 text-teal',
  }

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br border px-3.5 py-3 min-w-0 flex items-center gap-3 ${tones[tone] || tones.default}`}
    >
      <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
        <Icon className="w-[18px] h-[18px]" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-body-gray leading-none">
          {label}
        </p>
        <p className="text-[13px] sm:text-sm font-bold text-navy mt-1.5 leading-snug break-words">
          {value}
        </p>
      </div>
    </div>
  )
}

export default function DoctorPatientInfoCard({ patient, visitCount = 0 }) {
  const profile = generateDoctorPatientProfile(patient)
  if (!profile) return null

  const allergyTone =
    profile.allergies && !/none|not on file/i.test(profile.allergies) ? 'alert' : 'default'

  return (
    <section className="h-full min-h-0 rounded-2xl border border-white bg-white/95 shadow-[0_12px_28px_-20px_rgba(7,26,47,0.28)] p-4 sm:p-5 flex flex-col gap-3.5 overflow-hidden">
      <div className="shrink-0 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-lg sm:text-xl font-bold text-navy tracking-tight">
            Patient info
          </h2>
          <p className="text-[12px] text-body-gray mt-1">Clinical profile and contact details</p>
        </div>
        <span className="text-[11px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full shrink-0">
          {visitCount} visit{visitCount === 1 ? '' : 's'}
        </span>
      </div>

      <div className="shrink-0 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F7F6] text-teal px-2.5 py-1 text-[11px] font-bold">
          <Droplets className="w-3.5 h-3.5" strokeWidth={2} />
          {profile.bloodGroup}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7FAFC] text-navy px-2.5 py-1 text-[11px] font-semibold border border-[#EAF0F5]">
          <Stethoscope className="w-3.5 h-3.5 text-teal" strokeWidth={2} />
          {profile.primaryConcern}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7FAFC] text-navy px-2.5 py-1 text-[11px] font-semibold border border-[#EAF0F5]">
          <Languages className="w-3.5 h-3.5 text-teal" strokeWidth={2} />
          {profile.preferredLanguage}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
        <FactTile icon={UserRound} label="Full name" value={profile.name} />
        <FactTile
          icon={CalendarDays}
          label="Demographics"
          value={[profile.ageLabel, profile.gender].filter(Boolean).join(' · ')}
        />
        <FactTile icon={MapPin} label="City" value={profile.city} />
        <FactTile icon={Phone} label="Phone" value={profile.phone} />
        <FactTile icon={Mail} label="Email" value={profile.email} />
        <FactTile icon={CalendarDays} label="Last checkup" value={profile.lastCheckup} />
        <FactTile icon={ShieldAlert} label="Allergies" value={profile.allergies} tone={allergyTone} />
        <FactTile icon={FileHeart} label="Insurance" value={profile.insurance} tone="care" />
      </div>

      <div className="mt-auto shrink-0 rounded-2xl bg-gradient-to-br from-[#0EA5A0] to-[#0B6E6A] text-white p-4">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">Care note</p>
            <p className="text-[13px] sm:text-sm font-semibold leading-snug mt-1">{profile.careNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
