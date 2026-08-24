import { useState } from 'react'
import { FileText, FlaskConical, LayoutGrid, Search } from 'lucide-react'
import {
  filterHealthRecords,
  filterHealthRecordsByKind,
  isLabHealthRecord,
} from '../../data/generators/healthRecordsGenerator'
import { healthRecordRowActionsMock } from '../../data/mocks/healthRecords'
import HealthRecordCard from './HealthRecordCard'
import HealthRecordRowActions from './HealthRecordRowActions'
import { healthRecordFilterStyles } from './healthIcons'

const filters = [
  { id: 'all', label: 'All records', icon: LayoutGrid },
  { id: 'lab', label: 'Lab reports', icon: FlaskConical },
  { id: 'other', label: 'Other records', icon: FileText },
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
    <section className="rounded-[24px] border border-teal/20 bg-white/80 shadow-[0_16px_40px_rgba(14,165,160,0.12)] overflow-hidden flex flex-col min-h-0 max-h-[min(48rem,calc(100dvh-10rem))]">
      <div className="shrink-0 px-4 sm:px-5 xl:px-6 pt-4 pb-4 bg-gradient-to-r from-[#D8F4F1] via-[#E0F2FE] to-[#EDE9FE] border-b border-white/60">
        <div className="rounded-full bg-white border border-teal/20 shadow-sm px-4 h-11 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            className="w-full text-sm text-navy outline-none bg-transparent placeholder:text-body-gray"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-3">
          <p className="text-[12px] font-semibold text-navy/70">
            {filtered.length} of {scoped.length} records
            {activeFilter === 'all' && labCount > 0 ? ` • ${labCount} lab reports saved` : ''}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id
            const chip = healthRecordFilterStyles[filter.id]
            const Icon = filter.icon
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-semibold cursor-pointer transition-all ${
                  isActive ? chip.active : chip.idle
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {filter.label}
                <span
                  className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold tabular-nums flex items-center justify-center ${
                    isActive ? 'bg-white/25 text-white' : chip.countIdle
                  }`}
                >
                  {counts[filter.id]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain bg-gradient-to-b from-[#F0FDFA] to-[#EEF2FF]">
        {filtered.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <span className="w-12 h-12 rounded-2xl bg-teal text-white inline-flex items-center justify-center mb-3 shadow-md shadow-teal/30">
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 p-4">
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
