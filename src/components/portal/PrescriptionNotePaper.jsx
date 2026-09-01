import { ChevronRight } from 'lucide-react'
import { buildVisitSummary, normalizePrescriptionNote } from '../../utils/prescriptionNoteFormat'
import PrescriptionMedicineBlock from './PrescriptionMedicineBlock'

function MetaRow({ label, value }) {
  if (!value || value === '—') return null

  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-body-gray">{label}</p>
      <p className="text-sm font-semibold text-navy mt-1 break-words">{value}</p>
    </div>
  )
}

function CompactPrescriptionRow({ rx, className = '' }) {
  const when = [rx.dateLabel, rx.timeLabel].filter((value) => value && value !== '—').join(' · ')
  const visit = buildVisitSummary(rx)

  return (
    <article
      className={`rounded-xl border border-[#E6EBF1] bg-white px-3 py-2.5 flex items-center gap-3 ${className}`}
    >
      <div className="shrink-0 w-[92px] sm:w-[108px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-teal leading-none">
          Prescription
        </p>
        <p className="text-[13px] font-semibold text-navy mt-1 leading-snug tabular-nums">{when}</p>
      </div>

      <div className="min-w-0 flex-1 border-l border-[#EEF2F6] pl-3">
        {visit ? (
          <p className="text-[13px] font-semibold text-navy leading-snug line-clamp-2">{visit}</p>
        ) : null}
        {rx.clinic ? (
          <p className="text-[12px] text-body-gray mt-0.5 truncate">{rx.clinic}</p>
        ) : null}
      </div>

      <ChevronRight
        className="w-4 h-4 text-teal/70 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
        aria-hidden
      />
    </article>
  )
}

export default function PrescriptionNotePaper({ note, compact = false, className = '' }) {
  const rx = normalizePrescriptionNote(note)
  if (!rx) return null

  if (compact) {
    return <CompactPrescriptionRow rx={rx} className={className} />
  }

  return (
    <article
      className={`rounded-2xl border border-[#E6EBF1] bg-white overflow-hidden ${className}`}
    >
      <header className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] flex flex-wrap items-start justify-between gap-2 bg-[#F8FAFC]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal">Prescription</p>
          <p className="text-sm text-body-gray mt-0.5">
            {[rx.dateLabel, rx.timeLabel].filter((value) => value && value !== '—').join(' · ')}
          </p>
        </div>
        <p className="text-sm font-semibold text-navy">{rx.doctor}</p>
      </header>

      <div className="px-4 sm:px-5 py-4 border-b border-[#E6EBF1] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-white">
        <MetaRow label="Date" value={rx.dateLabel} />
        <MetaRow label="Time" value={rx.timeLabel} />
        <MetaRow label="Visit" value={buildVisitSummary(rx)} />
        <MetaRow label="Clinic" value={rx.clinic} />
      </div>

      <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-[#E6EBF1] bg-white">
          <div className="rounded-xl border border-[#E6EBF1] bg-white px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal mb-1">
              Prescription details
            </p>
            <p className="text-xs text-body-gray mb-3">Medicines and instructions for this visit</p>

            <div>
              {rx.medicines.map((medicine, index) => (
                <PrescriptionMedicineBlock
                  key={medicine.id || `${medicine.name}-${index}`}
                  medicine={medicine}
                  index={index}
                />
              ))}
            </div>

            {rx.note ? (
              <div className="pt-3 mt-1 border-t border-dashed border-[#E6EBF1]">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-body-gray">
                  Note
                </p>
                <p className="text-sm text-navy leading-relaxed mt-1.5 whitespace-pre-wrap">{rx.note}</p>
              </div>
            ) : null}
          </div>
        </div>

      <footer className="px-4 sm:px-5 py-3 border-t border-[#E6EBF1] bg-white">
        <p className="text-sm font-medium text-navy">{rx.doctor}</p>
      </footer>
    </article>
  )
}
