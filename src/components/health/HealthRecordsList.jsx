import { useState } from 'react'
import { FlaskConical, Search } from 'lucide-react'
import {
  filterHealthRecords,
  filterHealthRecordsByKind,
  isLabHealthRecord,
} from '../../data/generators/healthRecordsGenerator'
import { healthRecordRowActionsMock } from '../../data/mocks/healthRecords'
import HealthRecordCard from './HealthRecordCard'
import HealthRecordRowActions from './HealthRecordRowActions'

const filters = [
  { id: 'all', label: 'All records' },
  { id: 'lab', label: 'Lab reports' },
  { id: 'other', label: 'Other records' },
]

export default function HealthRecordsList({
  records = [],
  variant = 'list',
  emptyText = 'No health records yet.',
  onSelect,
  onAction,
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('lab')
  const [menu, setMenu] = useState(null)
  const scoped = filterHealthRecordsByKind(records, activeFilter)
  const filtered = filterHealthRecords(scoped, query)
  const labCount = records.filter(isLabHealthRecord).length
  const otherCount = records.length - labCount
  const counts = { all: records.length, lab: labCount, other: otherCount }
  const options = healthRecordRowActionsMock[variant] || healthRecordRowActionsMock.list

  function openMenu(record, event) {
    setMenu({
      record,
      x: Math.min(event.clientX, window.innerWidth - 200),
      y: Math.min(event.clientY, window.innerHeight - 96),
    })
  }

  return (
    <section className="rounded-[20px] border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col min-h-0 max-h-[min(48rem,calc(100dvh-10rem))]">
      <div className="shrink-0 px-4 sm:px-5 xl:px-6 pt-4 pb-3 border-b border-[#F1F4F7]">
        <div className="rounded-full bg-[#F4F6F8] px-4 h-11 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            className="w-full text-sm text-navy outline-none bg-transparent placeholder:text-body-gray"
          />
        </div>

        <p className="text-[12px] text-body-gray px-1 pt-3">
          {filtered.length} of {scoped.length} records
          {activeFilter === 'all' && labCount > 0 ? ` • ${labCount} lab reports saved` : ''}
        </p>

        <div className="flex flex-wrap gap-2 pt-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-semibold cursor-pointer transition-all ${
                  isActive
                    ? 'bg-teal text-white shadow-sm'
                    : 'bg-[#F4F6F8] text-navy hover:bg-teal-light hover:text-teal'
                }`}
              >
                {filter.label}
                <span
                  className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold tabular-nums flex items-center justify-center ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-body-gray'
                  }`}
                >
                  {counts[filter.id]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain">
        {filtered.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <span className="w-12 h-12 rounded-full bg-teal-light text-teal inline-flex items-center justify-center mb-3">
              <FlaskConical className="w-6 h-6" strokeWidth={1.75} />
            </span>
            <p className="text-sm font-semibold text-navy">
              {records.length === 0
                ? emptyText
                : scoped.length === 0
                  ? 'No records in this category yet.'
                  : 'No records match your search.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {filtered.map((record) => (
              <HealthRecordCard
                key={record.id}
                record={record}
                onSelect={onSelect}
                onOpenMenu={openMenu}
              />
            ))}
          </div>
        )}
      </div>

      <HealthRecordRowActions
        open={Boolean(menu)}
        x={menu?.x}
        y={menu?.y}
        options={options}
        onClose={() => setMenu(null)}
        onAction={(actionId) => {
          if (menu?.record) onAction?.(actionId, menu.record)
          setMenu(null)
        }}
      />
    </section>
  )
}
