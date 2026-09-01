import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  FileHeart,
  Phone,
  ShieldAlert,
} from 'lucide-react'
import { generateDoctorPatientProfile } from '../../data/generators/doctorPatientProfileGenerator'

function toTelHref(phone) {
  if (!phone) return null
  const digits = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}

export default function DoctorPatientHeader({ patient }) {
  const profile = generateDoctorPatientProfile(patient)
  if (!profile) return null

  const allergyAlert = profile.allergies && !/none|not on file/i.test(profile.allergies)
  const lastCheckup =
    profile.lastCheckup && profile.lastCheckup !== '—' ? profile.lastCheckup : null
  const demographics = [profile.ageLabel, profile.gender, profile.city].filter(Boolean)

  const facts = [
    { icon: Phone, label: 'Phone', value: profile.phone, href: toTelHref(profile.phone) },
    { icon: ShieldAlert, label: 'Allergies', value: profile.allergies, alert: allergyAlert },
    { icon: FileHeart, label: 'Insurance', value: profile.insurance },
    { icon: CalendarDays, label: 'Last checkup', value: lastCheckup },
  ].filter((item) => item.value)

  return (
    <section className="shrink-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-[#0D9488]" />

      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
            <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <h1 className="text-xl sm:text-[22px] font-bold text-navy tracking-tight leading-tight">
                {patient.name}
              </h1>
              {profile.bloodGroup ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F7F6] text-teal px-2.5 py-0.5 text-xs font-bold">
                  <Droplets className="w-3.5 h-3.5" strokeWidth={2} />
                  {profile.bloodGroup}
                </span>
              ) : null}
            </div>

            {demographics.length ? (
              <p className="text-[13px] sm:text-sm text-body-gray mt-1.5 leading-relaxed">
                {demographics.join(' · ')}
              </p>
            ) : null}
          </div>
        </div>

        {facts.length ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3">
            {facts.map((fact) => (
              <FactCell key={fact.label} {...fact} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function FactCell({ icon: Icon, label, value, href, alert = false }) {
  const valueClass = `text-[13px] sm:text-sm font-semibold leading-snug break-words ${
    href ? 'text-teal hover:text-teal-dark' : alert ? 'text-rose-700' : 'text-navy'
  }`

  return (
    <div
      className={`rounded-xl border px-3.5 py-3 flex items-start gap-3 min-w-0 h-full ${
        alert ? 'border-rose-200 bg-rose-50' : 'border-[#E6EBF1] bg-[#F8FAFC]'
      }`}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          alert ? 'bg-rose-100 text-rose-600' : 'bg-[#E8F7F6] text-teal'
        }`}
      >
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-body-gray leading-none">
          {label}
        </p>
        {href ? (
          <a href={href} className={`${valueClass} block mt-1.5`}>
            {value}
          </a>
        ) : (
          <p className={`${valueClass} mt-1.5`}>{value}</p>
        )}
      </div>
    </div>
  )
}

export function DoctorPatientDetailBack({ onBack, label = 'Back to patients' }) {
  if (!onBack) return null

  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark cursor-pointer transition-colors"
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={2} />
      {label}
    </button>
  )
}
