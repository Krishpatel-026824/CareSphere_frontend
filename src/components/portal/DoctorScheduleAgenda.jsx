import { Search } from 'lucide-react'
import { doctorScheduleFilters } from '../../data/mocks/doctorVisits'
import DoctorScheduleListCard from './DoctorScheduleListCard'

export default function DoctorScheduleAgenda({
  visits = [],
  selectedId,
  dayLabel,
  query,
  status,
  onQueryChange,
  onStatusChange,
  onSelect,
  onOpenMenu,
}) {
  return (
    <section className="flex-1 min-h-0 min-w-0 bg-white/85 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-4 sm:p-5 flex flex-col h-full">
      <div className="shrink-0 flex flex-col gap-3 pb-3.5">
        <div className="flex items-end justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-navy">Day agenda</h2>
            <p className="text-sm text-body-gray mt-0.5 truncate">
              {dayLabel} · {visits.length} visit{visits.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-2xl bg-[#F4F7FA] px-3.5 min-h-11">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
          <input
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder="Search patient or room"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
          />
        </label>

        <div className="flex items-center gap-2.5 overflow-x-auto">
          {doctorScheduleFilters.map((item) => {
            const active = status === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onStatusChange?.(item.id)}
                className={`shrink-0 min-h-11 px-4 rounded-full text-[14px] font-semibold cursor-pointer transition-colors inline-flex items-center gap-2 ${
                  active ? item.active : item.idle
                }`}
              >
                {Icon ? <Icon className="w-4 h-4 shrink-0" strokeWidth={2} /> : null}
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="scroll-y flex-1 min-h-0 pr-1">
        {visits.length === 0 ? (
          <div className="rounded-2xl bg-[#F4F7FA] px-4 py-10 text-center">
            <p className="text-sm font-semibold text-navy">No visits this day</p>
            <p className="text-xs text-body-gray mt-1">Pick another date or clear filters.</p>
          </div>
        ) : (
          <div className="relative flex flex-col gap-3">
            <div className="absolute left-[34px] top-4 bottom-4 w-px bg-[#E6EBF1]" aria-hidden="true" />
            {visits.map((visit) => (
              <DoctorScheduleListCard
                key={visit.id}
                visit={visit}
                selected={selectedId === visit.id}
                onSelect={onSelect}
                onOpenMenu={onOpenMenu}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
