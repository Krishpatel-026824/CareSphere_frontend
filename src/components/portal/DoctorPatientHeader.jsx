import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  FileHeart,
  Phone,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react'
import { generateDoctorPatientProfile } from '../../data/generators/doctorPatientProfileGenerator'

const statusStyles = {
  Upcoming: 'bg-sky-50 text-sky-700 border-sky-200',
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Completed: 'bg-slate-50 text-slate-600 border-slate-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function DoctorPatientHeader({ patient, visitCount = 0, onBack }) {
  const profile = generateDoctorPatientProfile(patient)
  if (!profile) return null

  const next = patient?.nextVisit
  const statusClass = statusStyles[next?.status] || statusStyles.Completed
  const demographics = [profile.ageLabel, profile.gender, profile.city].filter(Boolean).join(' · ')
  const allergyAlert = profile.allergies && !/none|not on file/i.test(profile.allergies)

  const facts = [
    { icon: Droplets, label: 'Blood group', value: profile.bloodGroup, tone: 'teal' },
    { icon: Stethoscope, label: 'Primary concern', value: profile.primaryConcern },
    { icon: Phone, label: 'Phone', value: profile.phone },
    {
      icon: ShieldAlert,
      label: 'Allergies',
      value: profile.allergies,
      tone: allergyAlert ? 'alert' : 'default',
    },
    { icon: FileHeart, label: 'Insurance', value: profile.insurance, tone: 'care' },
    {
      icon: CalendarDays,
      label: 'Last checkup',
      value: profile.lastCheckup && profile.lastCheckup !== '—' ? profile.lastCheckup : null,
    },
  ].filter((item) => item.value)

  return (
    <section className="shrink-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-[#0D9488]" />

      <div className="px-4 sm:px-5 py-4 flex items-start gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] text-navy flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0 shadow-sm">
          <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-navy tracking-tight truncate leading-tight">
              {patient.name}
            </h1>
            {next?.status ? (
              <span
                className={`inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}
              >
                {next.status}
              </span>
            ) : null}
            <span className="text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full tabular-nums">
              {visitCount} visit{visitCount === 1 ? '' : 's'}
            </span>
          </div>
          {demographics ? (
            <p className="text-[14px] sm:text-[15px] text-body-gray mt-1 leading-snug">{demographics}</p>
          ) : null}
        </div>
      </div>

      {facts.length ? (
        <div className="px-4 sm:px-5 pb-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
          {facts.map((fact) => (
            <FactCard key={fact.label} {...fact} />
          ))}
        </div>
      ) : null}

      {profile.careNote ? (
        <div className="mx-4 sm:mx-5 mb-4 rounded-xl border border-teal/15 bg-gradient-to-r from-[#F0FDFA] to-white px-4 py-3">
          <p className="text-[14px] sm:text-[15px] text-navy leading-relaxed">
            <span className="font-bold text-teal">Care note · </span>
            {profile.careNote}
          </p>
        </div>
      ) : null}
    </section>
  )
}

function FactCard({ icon: Icon, label, value, tone = 'default' }) {
  const tones = {
    default: 'bg-[#F8FAFC] border-[#EAF0F5] text-navy',
    teal: 'bg-[#F0FDFA] border-teal/15 text-teal',
    care: 'bg-[#F0FDFA] border-teal/15 text-teal',
    alert: 'bg-rose-50 border-rose-100 text-rose-700',
  }

  return (
    <div
      className={`rounded-xl border px-3 py-2.5 min-w-0 ${tones[tone] || tones.default}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" strokeWidth={2} />
        <p className="text-[10px] font-bold uppercase tracking-[0.06em] opacity-70 truncate">
          {label}
        </p>
      </div>
      <p className="text-[13px] sm:text-[14px] font-semibold leading-snug truncate">{value}</p>
    </div>
  )
}
