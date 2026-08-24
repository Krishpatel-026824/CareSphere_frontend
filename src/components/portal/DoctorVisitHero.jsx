import { ArrowLeft } from 'lucide-react'

export default function DoctorVisitHero({ visit, detail, hideIdentity = false, onBack }) {
  if (!visit) return null

  const note = detail?.visitReason || visit.prepNote

  return (
    <div className="shrink-0 rounded-3xl bg-gradient-to-br from-[#0EA5A0] via-[#0C948E] to-[#0B6E6A] p-4 sm:p-5 text-white shadow-[0_18px_40px_-24px_rgba(7,26,47,0.55)]">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mb-3 w-fit inline-flex items-center gap-2 min-h-9 px-3 rounded-full bg-white/12 text-sm font-semibold text-white cursor-pointer hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Back
        </button>
      ) : null}

      <div className="flex items-start gap-3.5">
        {hideIdentity ? null : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white/20 ring-2 ring-white/40 shrink-0">
            <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-[22px] sm:text-[26px] font-bold tracking-tight leading-tight truncate">
                {hideIdentity ? visit.visitType : visit.patientName}
              </h2>
              <p className="text-sm text-white/80 mt-1 truncate">
                {hideIdentity ? visit.clinic : `${visit.visitType} · ${visit.clinic}`}
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 bg-white/16 text-white border border-white/30">
              {visit.status}
            </span>
          </div>
          <p className="mt-3 font-display text-[28px] sm:text-[34px] font-bold leading-none tracking-tight">
            {visit.timeLabel}
          </p>
          <p className="text-sm text-white/80 mt-1.5 truncate">
            {visit.dateLabel}
            {detail?.weekday ? ` · ${detail.weekday}` : ''}
            {detail?.duration ? ` · ${detail.duration}` : ''}
          </p>
        </div>
      </div>

      {note ? (
        <p className="mt-4 text-sm leading-relaxed text-white/90 bg-white/10 rounded-2xl px-3.5 py-3">
          {note}
        </p>
      ) : null}
    </div>
  )
}
