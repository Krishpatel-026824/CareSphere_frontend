import { buildVisitSummary, normalizePrescriptionNote } from '../../utils/prescriptionNoteFormat'
import PrescriptionMedicineBlock from './PrescriptionMedicineBlock'

function MetaRow({ label, value }) {
  if (!value || value === '—') return null

  return (
    <div className="min-w-0 rounded-xl bg-[#E8F7F6]/80 border border-teal/10 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-teal-dark">{label}</p>
      <p className="text-sm font-semibold text-navy mt-1 break-words">{value}</p>
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
      <header className="px-4 sm:px-5 py-3.5 border-b border-teal/15 flex flex-wrap items-start justify-between gap-2 bg-gradient-to-r from-teal-dark via-teal to-[#14B8A6]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/90">Prescription</p>
          <p className="text-sm text-white font-medium mt-0.5">
            {[rx.dateLabel, rx.timeLabel].filter((value) => value && value !== '—').join(' · ')}
          </p>
        </div>
        <p className="text-sm font-semibold text-white">{rx.doctor}</p>
      </header>

      <div className="px-4 sm:px-5 py-4 border-b border-[#E6EBF1] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-[#F4FAF9]">
        <MetaRow label="Date" value={rx.dateLabel} />
        <MetaRow label="Time" value={rx.timeLabel} />
        <MetaRow label="Visit" value={buildVisitSummary(rx)} />
        <MetaRow label="Clinic" value={rx.clinic} />
      </div>

      <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-[#E6EBF1] bg-white">
        <div className="rounded-xl border border-teal/15 bg-gradient-to-b from-[#F0FAF9] to-white px-4 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-teal-dark mb-1">
            Prescription details
          </p>
          <p className="text-xs text-body-gray mb-3">Medicines and instructions for this visit</p>

          <div className="rounded-xl border border-[#E6EBF1] bg-white/90 divide-y divide-[#E6EBF1]">
            {rx.medicines.map((medicine, index) => (
              <PrescriptionMedicineBlock
                key={medicine.id || `${medicine.name}-${index}`}
                medicine={medicine}
                index={index}
              />
            ))}
          </div>

          {rx.note ? (
            <div className="pt-3 mt-3 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3.5 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-amber-800">
                Note
              </p>
              <p className="text-sm text-navy leading-relaxed mt-1.5 whitespace-pre-wrap">{rx.note}</p>
            </div>
          ) : null}
        </div>
      </div>

      <footer className="px-4 sm:px-5 py-3 border-t border-teal/10 bg-[#E8F7F6]/60 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal shrink-0" aria-hidden />
        <p className="text-sm font-semibold text-teal-dark">{rx.doctor}</p>
      </footer>
    </article>
  )
}
