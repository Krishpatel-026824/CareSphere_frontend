import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  FileHeart,
  NotebookPen,
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

const statusDot = {
  Upcoming: 'bg-sky-500',
  Confirmed: 'bg-emerald-500',
  Completed: 'bg-slate-400',
  Cancelled: 'bg-rose-500',
}

function toTelHref(phone) {
  if (!phone) return null
  const digits = phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}

export default function DoctorPatientHeader({ patient, visitCount = 0, onBack }) {
  const profile = generateDoctorPatientProfile(patient)
  if (!profile) return null

  const next = patient?.nextVisit
  const statusClass = statusStyles[next?.status] || statusStyles.Completed
  const dotClass = statusDot[next?.status] || statusDot.Completed
  const allergyAlert = profile.allergies && !/none|not on file/i.test(profile.allergies)
  const lastCheckup =
    profile.lastCheckup && profile.lastCheckup !== '—' ? profile.lastCheckup : null
  const demographics = [profile.ageLabel, profile.gender, profile.city].filter(Boolean).join(' · ')

  const facts = [
    { icon: Phone, label: 'Phone', value: profile.phone, href: toTelHref(profile.phone) },
    { icon: ShieldAlert, label: 'Allergies', value: profile.allergies, alert: allergyAlert },
    { icon: FileHeart, label: 'Insurance', value: profile.insurance },
    { icon: CalendarDays, label: 'Last checkup', value: lastCheckup },
  ].filter((item) => item.value)

  return (
    <section className="shrink-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-[#0D9488]" />

      <div className="px-4 sm:px-5 pt-4 pb-3.5 flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E6EBF1] bg-[#F8FAFC] text-navy flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal hover:bg-[#E8F7F6] shrink-0 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
        </button>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
          <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
        </div>

        <div className="min-w-0 flex-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-[20px] sm:text-[22px] font-bold text-navy tracking-tight leading-none truncate">
              {patient.name}
            </h1>
            {demographics ? (
              <p className="text-[13px] text-body-gray mt-1.5 leading-snug truncate">{demographics}</p>
            ) : null}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {profile.bloodGroup ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F7F6] text-teal px-2 py-0.5 text-[12px] font-bold">
                  <Droplets className="w-3.5 h-3.5" strokeWidth={2} />
                  {profile.bloodGroup}
                </span>
              ) : null}
              {profile.primaryConcern ? (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy min-w-0">
                  <Stethoscope className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={2} />
                  <span className="truncate">{profile.primaryConcern}</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {next?.status ? (
              <span
                className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                {next.status}
              </span>
            ) : null}
            <span className="text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full tabular-nums">
              {visitCount} visit{visitCount === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      {facts.length ? (
        <div className="px-4 sm:px-5 pb-3.5">
          <div className="rounded-xl border border-[#E6EBF1] overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E6EBF1]">
            {facts.map((fact) => (
              <FactCell key={fact.label} {...fact} />
            ))}
          </div>
        </div>
      ) : null}

      {profile.careNote ? (
        <div className="border-t border-[#EAF0F5] bg-[#F4FBFA] px-4 sm:px-5 py-3 flex items-start gap-3">
          <span className="w-8 h-8 rounded-lg bg-white border border-teal/15 text-teal flex items-center justify-center shrink-0 mt-0.5">
            <NotebookPen className="w-4 h-4" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-teal">Care note</p>
            <p className="text-[13px] sm:text-[14px] text-navy leading-relaxed mt-0.5">
              {profile.careNote}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function FactCell({ icon: Icon, label, value, href, alert = false }) {
  const valueClass = `text-[13px] sm:text-[14px] font-semibold leading-snug mt-1 break-words ${
    href ? 'text-teal hover:text-teal-dark' : alert ? 'text-rose-700' : 'text-navy'
  }`

  return (
    <div className={`px-3.5 py-3 flex items-start gap-2.5 min-w-0 ${alert ? 'bg-rose-50' : 'bg-white'}`}>
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          alert ? 'bg-rose-100 text-rose-600' : 'bg-[#E8F7F6] text-teal'
        }`}
      >
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-body-gray leading-none">{label}</p>
        {href ? (
          <a href={href} className={valueClass}>
            {value}
          </a>
        ) : (
          <p className={valueClass}>{value}</p>
        )}
      </div>
    </div>
  )
}
