import { ArrowLeft } from 'lucide-react'

const statusStyles = {
  Upcoming: 'bg-sky-100 text-sky-700 border-sky-200',
  Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border-slate-200',
}

export default function DoctorPatientHeader({ patient, onBack }) {
  const next = patient?.nextVisit
  const statusClass = statusStyles[next?.status] || statusStyles.Completed
  const demographics = [patient.ageLabel, patient.gender, patient.city].filter(Boolean).join(' · ')

  return (
    <section className="shrink-0 rounded-2xl border border-white bg-white/90 shadow-[0_12px_28px_-20px_rgba(7,26,47,0.28)] px-3.5 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={onBack}
        className="w-10 h-10 rounded-xl border border-[#E6EBF1] bg-[#F7FAFC] text-navy flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="w-4.5 h-4.5" strokeWidth={2} />
      </button>

      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
          <h1 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-navy tracking-tight truncate leading-tight">
            {patient.name}
          </h1>
          {next?.status ? (
            <span
              className={`inline-flex font-sans text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border ${statusClass}`}
            >
              {next.status}
            </span>
          ) : null}
        </div>
        {demographics ? (
          <p className="font-sans text-sm sm:text-[15px] text-body-gray tracking-wide truncate mt-1.5 leading-snug">
            {demographics}
          </p>
        ) : null}
      </div>
    </section>
  )
}
