import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { doctorScheduleFilters } from '../../data/mocks/doctorVisits'
import { groupVisitsByDate, visitDayHeading } from '../../utils/appointmentFormat'
import DoctorScheduleListCard from './DoctorScheduleListCard'

export default function DoctorScheduleVisitList({ visits = [], selectedId, onSelect, onOpenMenu }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return visits.filter((visit) => {
      if (status !== 'All' && visit.status !== status) return false
      if (!q) return true
      return [visit.patientName, visit.clinic, visit.visitType, visit.room]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    })
  }, [query, status, visits])

  const groups = useMemo(() => groupVisitsByDate(filtered), [filtered])

  return (
    <section className="w-full xl:w-[360px] 2xl:w-[400px] shrink-0 bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-[0_18px_40px_-28px_rgba(7,26,47,0.35)] p-3.5 flex flex-col min-h-0 h-[300px] sm:h-[360px] xl:h-full">
      <div className="shrink-0 flex flex-col gap-3 pb-3">
        <div className="flex items-end justify-between gap-2 px-1">
          <div>
            <h2 className="text-base font-bold text-navy">Visits</h2>
            <p className="text-xs text-body-gray mt-0.5">{filtered.length} in view</p>
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-2xl bg-[#F4F7FA] px-3 min-h-11">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patient or room"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
          />
        </label>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {doctorScheduleFilters.map((item) => {
            const active = status === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStatus(item.id)}
                className={`shrink-0 min-h-8 px-3 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  active ? 'bg-navy text-white' : 'bg-[#F4F7FA] text-body-gray hover:bg-teal-light hover:text-teal'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="scroll-y flex-1 min-h-0 pr-1">
        {groups.length === 0 ? (
          <p className="rounded-2xl bg-[#F4F7FA] px-4 py-6 text-sm text-body-gray text-center">
            No visits match this filter.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <p className="px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-body-gray">
                  {visitDayHeading(group.label)}
                </p>
                {group.visits.map((visit) => (
                  <DoctorScheduleListCard
                    key={visit.id}
                    visit={visit}
                    selected={selectedId === visit.id}
                    onSelect={onSelect}
                    onOpenMenu={onOpenMenu}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
