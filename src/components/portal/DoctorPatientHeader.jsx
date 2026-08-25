import { ArrowLeft, MessageCircle, Phone } from 'lucide-react'

export default function DoctorPatientHeader({ patient, visitCount = 0, onBack, onMessage }) {
  return (
    <section className="shrink-0 rounded-2xl border border-white bg-white/90 shadow-[0_12px_28px_-20px_rgba(7,26,47,0.28)] px-3.5 sm:px-4 py-3.5 flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="w-10 h-10 rounded-xl border border-[#E6EBF1] bg-[#F7FAFC] text-navy flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="w-4.5 h-4.5" strokeWidth={2} />
      </button>

      <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="font-display text-xl sm:text-[22px] font-bold text-navy tracking-tight truncate leading-tight">
          {patient.name}
        </h1>
        <p className="text-[13px] text-body-gray truncate mt-1">
          {[patient.ageLabel, patient.gender, patient.city].filter(Boolean).join(' · ')}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="rounded-xl bg-[#F7FAFC] px-3 py-2 text-right min-w-[64px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-body-gray">Visits</p>
          <p className="font-display text-lg font-bold text-navy leading-none mt-1 tabular-nums">{visitCount}</p>
        </div>
        {patient.phone ? (
          <div className="hidden md:flex rounded-xl bg-[#F7FAFC] px-3 py-2 items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-white text-teal flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-body-gray">Phone</p>
              <p className="text-[13px] font-bold text-navy mt-0.5 tabular-nums">{patient.phone}</p>
            </div>
          </div>
        ) : null}
      </div>

      {onMessage ? (
        <button
          type="button"
          onClick={onMessage}
          className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-teal-dark shadow-[0_8px_16px_-8px_rgba(14,165,160,0.7)] transition-colors"
          aria-label={`Chat with ${patient.name}`}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.9} />
        </button>
      ) : null}
    </section>
  )
}
