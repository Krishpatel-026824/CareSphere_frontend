import { Search } from 'lucide-react'
import DoctorLabReportCard from './DoctorLabReportCard'
import DoctorLabReportQueueFilters from './DoctorLabReportQueueFilters'

export default function DoctorLabReportsListPanel({
  listTitle,
  filtered,
  filter,
  filterCounts,
  query,
  selectedId,
  caughtUp,
  onFilterChange,
  onQueryChange,
  onSelect,
}) {
  return (
    <section className="xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-4 flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-2 shrink-0 mb-3">
        <h2 className="text-lg font-bold text-navy">{listTitle}</h2>
        <span className="text-sm text-body-gray">{filtered.length}</span>
      </div>

      <DoctorLabReportQueueFilters
        value={filter}
        counts={filterCounts}
        onChange={onFilterChange}
      />

      <label className="shrink-0 mb-3 flex items-center gap-2.5 rounded-xl bg-[#F4F7FA] border border-[#E6EBF1] px-3 min-h-11">
        <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
        <input
          value={query}
          onChange={(event) => onQueryChange?.(event.target.value)}
          placeholder="Search patient or test"
          className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-body-gray/70"
        />
      </label>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 max-h-[280px] xl:max-h-none">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] p-4 text-sm text-body-gray text-center">
            {query.trim() ? 'No reports match your search.' : caughtUp}
          </p>
        ) : (
          filtered.map((item) => (
            <DoctorLabReportCard
              key={item.id}
              item={item}
              selected={selectedId === item.id}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </section>
  )
}
