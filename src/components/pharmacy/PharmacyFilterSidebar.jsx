import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { pharmacyFilterOptionsMock } from '../../data/mocks/pharmacy'

function FilterGroup({ title, options, selected, onToggle, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-[14px] font-bold text-navy cursor-pointer"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <ul className="mt-3 flex flex-col gap-0.5">
          {options.map((option) => {
            const checked = selected.includes(option.id)
            return (
              <li key={option.id}>
                <label className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] cursor-pointer transition-colors ${checked ? 'bg-teal/5 text-teal font-semibold' : 'text-navy hover:bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(option.id)}
                    className="accent-teal w-4 h-4 cursor-pointer rounded"
                  />
                  <span className="flex-1">{option.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" strokeWidth={2} />
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default function PharmacyFilterSidebar({
  selectedFilters,
  onToggleFilter,
  selectedBrands,
  onToggleBrand,
}) {
  return (
    <aside className="w-full xl:w-[240px] shrink-0 flex flex-col gap-4">
      <FilterGroup
        title="Filters"
        options={pharmacyFilterOptionsMock}
        selected={selectedFilters}
        onToggle={onToggleFilter}
      />
    </aside>
  )
}
