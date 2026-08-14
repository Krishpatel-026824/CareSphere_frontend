import { Search } from 'lucide-react'

export default function PharmacyToolbar({ query, onQueryChange }) {
  return (
    <label className="w-full flex items-center gap-2 rounded-full border border-border-gray bg-white px-4 min-h-11">
      <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search medicines..."
        className="flex-1 min-w-0 bg-transparent outline-none text-sm text-navy placeholder:text-body-gray/60"
      />
    </label>
  )
}
