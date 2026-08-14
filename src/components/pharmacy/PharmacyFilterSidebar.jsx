import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { pharmacyBrandOptionsMock, pharmacyFilterOptionsMock } from '../../data/mocks/pharmacy'
import PharmacyRecentOrders from './PharmacyRecentOrders'

function FilterGroup({ title, options, selected, onToggle, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="rounded-2xl border border-border-gray bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between text-sm font-bold text-navy cursor-pointer"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-body-gray transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open ? (
        <ul className="mt-3 flex flex-col gap-1">
          {options.map((option) => {
            const checked = selected.includes(option.id)
            return (
              <li key={option.id}>
                <label className="flex items-center gap-2 rounded-lg px-1 py-1.5 text-sm text-navy cursor-pointer hover:bg-bg-gray">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(option.id)}
                    className="accent-teal w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="flex-1">{option.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-body-gray" strokeWidth={1.75} />
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}
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
    <aside className="w-full xl:w-[220px] shrink-0 flex flex-col gap-4">
      <FilterGroup
        title="Filters"
        options={pharmacyFilterOptionsMock}
        selected={selectedFilters}
        onToggle={onToggleFilter}
      />
      <FilterGroup
        title="Brands"
        options={pharmacyBrandOptionsMock}
        selected={selectedBrands}
        onToggle={onToggleBrand}
      />
      <PharmacyRecentOrders />
    </aside>
  )
}
