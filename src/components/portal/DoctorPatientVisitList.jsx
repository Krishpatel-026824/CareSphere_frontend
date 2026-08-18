import DoctorPatientVisitCard from './DoctorPatientVisitCard'

function VisitGroup({ title, visits, selectedId, onSelect, onOpenMenu }) {
  if (!visits.length) return null

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-body-gray px-1">
        {title}
      </h3>
      {visits.map((visit) => (
        <DoctorPatientVisitCard
          key={visit.id}
          visit={visit}
          selected={selectedId === visit.id}
          onSelect={onSelect}
          onOpenMenu={onOpenMenu}
        />
      ))}
    </div>
  )
}

export default function DoctorPatientVisitList({
  upcoming = [],
  history = [],
  selectedId,
  onSelect,
  onOpenMenu,
}) {
  const empty = upcoming.length === 0 && history.length === 0

  return (
    <section className="w-full xl:w-[340px] 2xl:w-[380px] shrink-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-3 flex flex-col min-h-0 h-[280px] sm:h-[340px] xl:h-full">
      <div className="px-1 pb-2 shrink-0 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-navy">Visit history</h2>
        <span className="text-[11px] text-body-gray">
          {upcoming.length} upcoming · {history.length} past
        </span>
      </div>
      <div className="scroll-y flex-1 min-h-0 pr-2">
        {empty ? (
          <p className="rounded-xl border border-border-gray bg-[#F3F4F6] p-4 text-sm text-body-gray">
            No visits on file for this patient yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <VisitGroup
              title="Upcoming"
              visits={upcoming}
              selectedId={selectedId}
              onSelect={onSelect}
              onOpenMenu={onOpenMenu}
            />
            <VisitGroup
              title="Past visits"
              visits={history}
              selectedId={selectedId}
              onSelect={onSelect}
              onOpenMenu={onOpenMenu}
            />
          </div>
        )}
      </div>
    </section>
  )
}
