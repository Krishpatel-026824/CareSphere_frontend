import {
  ArrowLeft,
  Droplets,
  FileHeart,
  Phone,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react'
import { generateDoctorPatientProfile } from '../../data/generators/doctorPatientProfileGenerator'

const statusStyles = {
  Upcoming: 'bg-sky-100 text-sky-700 border-sky-200',
  Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border-slate-200',
  Cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
}

export default function DoctorPatientHeader({ patient, visitCount = 0, onBack }) {
  const profile = generateDoctorPatientProfile(patient)
  if (!profile) return null

  const next = patient?.nextVisit
  const statusClass = statusStyles[next?.status] || statusStyles.Completed
  const demographics = [profile.ageLabel, profile.gender, profile.city].filter(Boolean).join(' · ')
  const allergyAlert = profile.allergies && !/none|not on file/i.test(profile.allergies)

  return (
    <section className="shrink-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-11 h-11 rounded-xl border border-[#E6EBF1] bg-[#F7FAFC] text-navy flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
          <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <h1 className="font-display text-[22px] sm:text-[26px] font-bold text-navy tracking-tight truncate leading-none">
              {patient.name}
            </h1>
            {next?.status ? (
              <span
                className={`inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}
              >
                {next.status}
              </span>
            ) : null}
            <span className="text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full">
              {visitCount} visit{visitCount === 1 ? '' : 's'}
            </span>
          </div>
          {demographics ? (
            <p className="text-[14px] sm:text-[15px] text-body-gray truncate mt-1.5 leading-snug">
              {demographics}
            </p>
          ) : null}
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-3.5 flex flex-wrap gap-2 border-t border-[#F0F4F8] pt-3">
        <Chip icon={Droplets} label={profile.bloodGroup} tone="teal" />
        <Chip icon={Stethoscope} label={profile.primaryConcern} />
        <Chip icon={Phone} label={profile.phone} />
        <Chip
          icon={ShieldAlert}
          label={profile.allergies}
          tone={allergyAlert ? 'alert' : 'default'}
        />
        <Chip icon={FileHeart} label={profile.insurance} tone="care" />
        {profile.lastCheckup && profile.lastCheckup !== '—' ? (
          <Chip label={`Last checkup · ${profile.lastCheckup}`} />
        ) : null}
      </div>

      {profile.careNote ? (
        <div className="px-4 sm:px-5 py-3 bg-[#E8F7F6] border-t border-teal/15">
          <p className="text-[14px] sm:text-[15px] text-navy leading-relaxed">
            <span className="font-bold text-teal">Care note · </span>
            {profile.careNote}
          </p>
        </div>
      ) : null}
    </section>
  )
}

function Chip({ icon: Icon, label, tone = 'default' }) {
  if (!label) return null
  const tones = {
    default: 'bg-[#F7FAFC] text-navy border-[#EAF0F5]',
    teal: 'bg-[#E8F7F6] text-teal border-teal/20',
    care: 'bg-[#E8F7F6] text-teal border-teal/20',
    alert: 'bg-rose-50 text-rose-700 border-rose-100',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] sm:text-[13px] font-semibold max-w-full ${
        tones[tone] || tones.default
      }`}
    >
      {Icon ? <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} /> : null}
      <span className="truncate">{label}</span>
    </span>
  )
}
