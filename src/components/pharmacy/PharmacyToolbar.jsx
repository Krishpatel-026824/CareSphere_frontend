import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { pharmacyFilterOptionsMock } from '../../data/mocks/pharmacy'

export default function PharmacyToolbar({ query, onQueryChange, selectedFilters, onToggleFilter }) {
  const [showFilter, setShowFilter] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilter(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeCount = selectedFilters?.length || 0

  return (
    <div className="flex items-center gap-3">
      <label className="flex-1 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 min-h-12 shadow-sm focus-within:border-teal/40 focus-within:shadow-[0_0_0_3px_rgba(0,191,165,0.08)] transition-all">
        <Search className="w-5 h-5 text-teal shrink-0" strokeWidth={2} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search medicines..."
          className="flex-1 min-w-0 bg-transparent outline-none text-sm font-medium text-navy placeholder:text-gray-400"
        />
      </label>

      <div className="relative" ref={filterRef}>
        <button
          type="button"
          onClick={() => setShowFilter((v) => !v)}
          className={`h-12 px-5 rounded-2xl border flex items-center gap-2.5 text-[14px] font-semibold cursor-pointer transition-all shadow-sm ${
            activeCount > 0
              ? 'bg-teal text-white border-teal shadow-teal/20'
              : 'bg-white border-gray-200 text-navy hover:border-teal hover:text-teal'
          }`}
        >
          <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
          <span>Filter</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-teal text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {showFilter && (
          <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl p-4 animate-[fadeIn_150ms_ease]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-bold text-navy">Categories</p>
              <button onClick={() => setShowFilter(false)} className="p-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {pharmacyFilterOptionsMock.map((opt) => {
                const checked = selectedFilters?.includes(opt.id)
                return (
                  <li key={opt.id}>
                    <label className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] cursor-pointer transition-colors ${checked ? 'bg-teal/5 text-teal font-semibold' : 'text-navy hover:bg-gray-50'}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleFilter(opt.id)}
                        className="accent-teal w-4 h-4 cursor-pointer rounded"
                      />
                      <span>{opt.label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
