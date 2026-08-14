import { useState } from 'react'
import { Search } from 'lucide-react'
import { filterHealthRecords } from '../../data/generators/healthRecordsGenerator'
import { healthRecordRowActionsMock } from '../../data/mocks/healthRecords'
import HealthRecordCard from './HealthRecordCard'
import HealthRecordRowActions from './HealthRecordRowActions'

export default function HealthRecordsList({
  records = [],
  variant = 'list',
  emptyText = 'No health records yet.',
  onSelect,
  onAction,
}) {
  const [query, setQuery] = useState('')
  const [menu, setMenu] = useState(null)
  const filtered = filterHealthRecords(records, query)
  const options = healthRecordRowActionsMock[variant] || healthRecordRowActionsMock.list

  function openMenu(record, event) {
    setMenu({
      record,
      x: Math.min(event.clientX, window.innerWidth - 200),
      y: Math.min(event.clientY, window.innerHeight - 96),
    })
  }

  return (
    <section className="rounded-2xl border border-border-gray bg-white overflow-hidden shadow-sm flex flex-col min-h-0 max-h-[min(36rem,calc(100dvh-13rem))]">
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div className="rounded-lg bg-[#F0F2F5] px-3 py-2 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-[#667781] shrink-0" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            className="w-full text-sm text-[#111b21] outline-none bg-transparent placeholder:text-[#667781]"
          />
        </div>
        <p className="text-[12px] text-[#667781] px-1 pt-2">
          {filtered.length} of {records.length} records
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain">
        {filtered.length === 0 ? (
          <p className="px-5 py-10 text-sm text-[#667781] text-center">
            {records.length === 0 ? emptyText : 'No records match your search.'}
          </p>
        ) : (
          filtered.map((record, index) => (
            <HealthRecordCard
              key={record.id}
              record={record}
              showDivider={index < filtered.length - 1}
              onSelect={onSelect}
              onOpenMenu={openMenu}
            />
          ))
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
