import { buildVisitSummary, normalizePrescriptionNote } from '../../utils/prescriptionNoteFormat'
import PrescriptionMedicineList from './PrescriptionMedicineList'

function MetaRow({ label, value, className = '' }) {
  if (!value || value === '—') return null

  return (
    <div
      className={`min-w-0 rounded-lg bg-[#E8F7F6]/80 border border-teal/10 px-3 py-2.5 h-full ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-teal-dark">{label}</p>
      <p className="text-[15px] font-semibold text-navy mt-1 break-words leading-snug">{value}</p>
    </div>
  )
}

export default function PrescriptionNotePaper({ note, className = '' }) {
  const rx = normalizePrescriptionNote(note)
  if (!rx) return null

  return (
    <article
      className={`rounded-2xl border border-teal/15 bg-white overflow-hidden shadow-sm ${className}`}
    >
      <header className="px-4 sm:px-5 py-3.5 border-b border-teal/15 bg-gradient-to-r from-teal-dark via-teal to-[#14B8A6]">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/90">Prescription</p>
        <p className="text-sm text-white font-medium mt-0.5">
          {[rx.dateLabel, rx.timeLabel].filter((value) => value && value !== '—').join(' · ')}
        </p>
      </header>

      <div className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] grid grid-cols-2 lg:grid-cols-4 gap-2 bg-[#F4FAF9]">
        <MetaRow label="Date" value={rx.dateLabel} />
        <MetaRow label="Time" value={rx.timeLabel} />
        <MetaRow label="Visit" value={buildVisitSummary(rx)} className="col-span-2 lg:col-span-1" />
        <MetaRow label="Clinic" value={rx.clinic} className="col-span-2 lg:col-span-1" />
      </div>

      <div className="bg-white border-t border-[#E6EBF1]">
        <PrescriptionMedicineList medicines={rx.medicines} />

        {rx.note ? (
          <div className="mx-4 sm:mx-5 mb-4 rounded-lg border border-amber-200/80 bg-amber-50/80 px-3.5 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-amber-800">
              Additional note
            </p>
            <p className="text-[15px] text-navy leading-relaxed mt-1.5 whitespace-pre-wrap">{rx.note}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
