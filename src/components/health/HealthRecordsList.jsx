import { useState } from 'react'
import { Eye, FileText, FlaskConical, LayoutGrid, Search } from 'lucide-react'
import {
  filterHealthRecords,
  filterHealthRecordsByKind,
  isLabHealthRecord,
} from '../../data/generators/healthRecordsGenerator'
import { healthRecordRowActionsMock } from '../../data/mocks/healthRecords'
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
  const [activeFilter, setActiveFilter] = useState('all')
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
    <section className="rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col min-h-0 max-h-[min(48rem,calc(100dvh-10rem))]">
      <div className="shrink-0 px-4 sm:px-5 pt-4 pb-4 border-b border-[#E6EBF1] bg-[#F8FAFC]">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 min-w-0 rounded-xl bg-white border border-[#E6EBF1] px-3.5 h-11 flex items-center gap-2.5">
            <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records"
              className="w-full text-sm text-navy outline-none bg-transparent placeholder:text-body-gray"
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:justify-end shrink-0">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id
              const chip = healthRecordFilterStyles[filter.id]
              const Icon = filter.icon
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1.5 h-11 px-3 rounded-xl text-[12px] font-semibold cursor-pointer transition-all whitespace-nowrap ${
                    isActive ? chip.active : chip.idle
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
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
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        {filtered.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm font-semibold text-navy">
              {records.length === 0
                ? emptyText
                : scoped.length === 0
                  ? 'No records in this category yet.'
                  : 'No records match your search.'}
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead className="sticky top-0 z-[1] bg-[#CBD5E1]">
              <tr>
                <th className="px-3 sm:px-4 py-3 w-14 text-[11px] font-bold uppercase tracking-[0.08em] text-navy border-b-2 border-r border-[#94A3B8] text-center">
                  No.
                </th>
                <th className="px-4 sm:px-5 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-navy border-b-2 border-r border-[#94A3B8]">
                  Record
                </th>
                <th className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-navy w-[110px] border-b-2 border-r border-[#94A3B8]">
                  Type
                </th>
                <th className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-navy hidden sm:table-cell border-b-2 border-r border-[#94A3B8]">
                  Provider
                </th>
                <th className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-navy w-[120px] border-b-2 border-r border-[#94A3B8]">
                  Date
                </th>
                <th className="px-4 sm:px-5 py-3 w-16 text-[11px] font-bold uppercase tracking-[0.08em] text-navy border-b-2 border-[#94A3B8] text-center">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record, index) => {
                const kindLabel = isLabHealthRecord(record) ? 'Lab' : record.type || 'Record'
                const provider = [record.doctorName, record.specialty].filter(Boolean).join(' · ')

                return (
                  <tr
                    key={record.id}
                    onClick={() => onSelect?.(record)}
                    onContextMenu={(event) => {
                      event.preventDefault()
                      openMenu(record, event)
                    }}
                    className="hover:bg-[#F0FDFA] cursor-pointer transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-3 border-b border-r border-[#D5DEE8] text-center">
                      <span className="text-[13px] font-semibold text-navy tabular-nums">{index + 1}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 border-b border-r border-[#D5DEE8]">
                      <p className="text-sm font-semibold text-navy leading-snug">{record.title}</p>
                      <p className="text-[12px] text-body-gray mt-0.5 sm:hidden truncate">{provider}</p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8]">
                      <span className="text-[12px] font-semibold uppercase tracking-wide text-navy">
                        {kindLabel}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell border-b border-r border-[#D5DEE8]">
                      <p className="text-[13px] text-body-gray truncate max-w-[280px]">{provider}</p>
                    </td>
                    <td className="px-3 py-3 border-b border-r border-[#D5DEE8]">
                      <p className="text-[13px] font-semibold text-navy tabular-nums whitespace-nowrap">
                        {record.dateLabel}
                      </p>
                    </td>
                    <td className="px-4 sm:px-5 py-3 text-center border-b border-[#D5DEE8]">
                      <Eye className="w-4 h-4 text-navy/60 inline-block" strokeWidth={2} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
