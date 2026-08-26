import { History } from 'lucide-react'
import DoctorPatientVisitCard from './DoctorPatientVisitCard'

function VisitGroup({ title, visits, displayOnly, selectedId, onSelect }) {
  if (!visits.length) return null

  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-[9px] font-bold uppercase tracking-[0.12em] text-body-gray/80 px-0.5">
        {title}
      </h3>
      <div className="flex flex-col gap-1.5">
        {visits.map((visit) => (
          <DoctorPatientVisitCard
            key={visit.id}
            visit={visit}
            displayOnly={displayOnly}
            selected={!displayOnly && selectedId === visit.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default function DoctorPatientVisitList({
  upcoming = [],
  history = [],
  selectedId,
  onSelect,
  displayOnly = false,
  fill = false,
}) {
  const empty = upcoming.length === 0 && history.length === 0
  const total = upcoming.length + history.length

  const shellClass = fill
    ? 'h-full'
    : displayOnly
      ? 'w-full'
      : 'xl:w-[340px] 2xl:w-[380px] shrink-0 h-[280px] sm:h-[340px] xl:h-full'

  return (
    <section
      className={`w-full rounded-2xl border border-white bg-white/95 shadow-[0_12px_28px_-20px_rgba(7,26,47,0.28)] p-3 sm:p-3.5 flex flex-col gap-2.5 ${shellClass}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-[#E8F7F6] text-teal flex items-center justify-center shrink-0">
            <History className="w-4 h-4" strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-base sm:text-lg font-bold text-navy tracking-tight leading-tight">
              Visit history
            </h2>
            <p className="font-sans text-[11px] text-body-gray mt-0.5">
              {total} total · clinic timeline
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-body-gray bg-[#F7FAFC] border border-[#EAF0F5] px-2 py-0.5 rounded-full shrink-0">
          {upcoming.length} upcoming · {history.length} past
        </span>
      </div>

      {empty ? (
        <div className="rounded-xl border border-dashed border-[#D0D9E3] bg-[#F7FAFC] flex items-center justify-center px-4 py-6">
          <p className="font-sans text-sm text-body-gray text-center">
            No visits on file for this patient yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <VisitGroup
            title="Upcoming"
            visits={upcoming}
            displayOnly={displayOnly}
            selectedId={selectedId}
            onSelect={onSelect}
          />
          <VisitGroup
            title="Past visits"
            visits={history}
            displayOnly={displayOnly}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </div>
      )}
    </section>
  )
}
