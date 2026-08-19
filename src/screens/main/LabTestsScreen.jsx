import { useEffect, useMemo, useRef, useState } from 'react'
import { FlaskConical, Search, SlidersHorizontal } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import ServicePageHeading from '../../components/ServicePageHeading'
import LabReportsList from '../../components/lab/LabReportsList'
import LabTestCard from '../../components/lab/LabTestCard'
import LabTestDetailModal from '../../components/lab/LabTestDetailModal'
import LabBookingFormModal from '../../components/lab/LabBookingFormModal'
import LabTestsFooter from '../../components/lab/LabTestsFooter'
import { useLabTestsBooking } from '../../hooks/useLabTestsBooking'

export default function LabTestsScreen({ onBack, onReportsGenerated, onNavigateBookings }) {
  const catalogRef = useRef(null)
  const [activeFooterLink, setActiveFooterLink] = useState(null)
  const [expandedReportId, setExpandedReportId] = useState(null)
  const [selectedTest, setSelectedTest] = useState(null)
  const [bookingTest, setBookingTest] = useState(null)
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState('all')
  const [turnaround, setTurnaround] = useState('all')
  const booking = useLabTestsBooking({ onReportsGenerated })

  const filteredTests = useMemo(() => {
    let list = booking.tests
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    if (priceRange === 'under500') list = list.filter((t) => t.price < 500)
    else if (priceRange === '500to1000') list = list.filter((t) => t.price >= 500 && t.price <= 1000)
    else if (priceRange === 'above1000') list = list.filter((t) => t.price > 1000)
    if (turnaround === '6h') list = list.filter((t) => t.turnaround.includes('6'))
    else if (turnaround === '24h') list = list.filter((t) => t.turnaround.includes('24'))
    else if (turnaround === '48h') list = list.filter((t) => t.turnaround.includes('48'))
    if (sortBy === 'priceLow') list = [...list].sort((a, b) => a.price - b.price)
    else if (sortBy === 'priceHigh') list = [...list].sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [booking.tests, query, sortBy, priceRange, turnaround])

  useEffect(() => {
    if (booking.reports.length) setExpandedReportId(booking.reports[0].id)
  }, [booking.reports])

  function handleBookSubmit(data) {
    const existing = JSON.parse(localStorage.getItem('labBookings') || '[]')
    const updated = [data, ...existing]
    localStorage.setItem('labBookings', JSON.stringify(updated))
    onNavigateBookings?.()
  }

  return (
    <div className="w-full min-h-full bg-[#F4F7F8]">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-7 flex flex-col gap-5">
        <header>
          <ServicePageHeading
            icon={FlaskConical}
            tone="bg-amber-100 text-amber-600"
            title="Lab tests"
            subtitle="Book home sample collection or visit a partner lab"
          />
        </header>

        <div className="bg-white rounded-xl border border-[#E6EBF1] shadow-sm px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" strokeWidth={2} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lab tests..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-[#E6EBF1] bg-[#F8FAFC] text-sm text-navy placeholder:text-[#94A3B8] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((p) => !p)}
              className={`h-10 px-4 rounded-lg border text-[13px] font-semibold cursor-pointer inline-flex items-center gap-2 transition-colors shrink-0 ${
                showFilters || priceRange !== 'all' || turnaround !== 'all' || sortBy !== 'default'
                  ? 'border-teal bg-teal-light text-teal'
                  : 'border-[#E6EBF1] bg-white text-[#475569] hover:border-teal/40'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              Filters
            </button>
          </div>

          {showFilters ? (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E6EBF1]">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="h-8 px-2.5 rounded-lg border border-[#E6EBF1] bg-[#F8FAFC] text-[12px] font-medium text-[#475569] cursor-pointer focus:outline-none focus:border-teal"
              >
                <option value="all">All prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500to1000">₹500 – ₹1000</option>
                <option value="above1000">Above ₹1000</option>
              </select>
              <select
                value={turnaround}
                onChange={(e) => setTurnaround(e.target.value)}
                className="h-8 px-2.5 rounded-lg border border-[#E6EBF1] bg-[#F8FAFC] text-[12px] font-medium text-[#475569] cursor-pointer focus:outline-none focus:border-teal"
              >
                <option value="all">All turnaround</option>
                <option value="6h">6 hours</option>
                <option value="24h">24 hours</option>
                <option value="48h">48 hours</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 px-2.5 rounded-lg border border-[#E6EBF1] bg-[#F8FAFC] text-[12px] font-medium text-[#475569] cursor-pointer focus:outline-none focus:border-teal"
              >
                <option value="default">Sort: Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              {(priceRange !== 'all' || turnaround !== 'all' || sortBy !== 'default') ? (
                <button
                  type="button"
                  onClick={() => { setPriceRange('all'); setTurnaround('all'); setSortBy('default') }}
                  className="h-8 px-2.5 rounded-lg text-[12px] font-semibold text-red-500 cursor-pointer hover:bg-red-50 transition-colors"
                >
                  Clear
                </button>
              ) : null}
              <span className="text-[11px] text-[#94A3B8] ml-auto">{filteredTests.length} results</span>
            </div>
          ) : null}
        </div>

        {booking.reports.length ? (
          <LabReportsList
            reports={booking.reports}
            expandedId={expandedReportId}
            onToggle={setExpandedReportId}
          />
        ) : null}

        <div ref={catalogRef} className="flex flex-col gap-3.5">
          {filteredTests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E6EBF1] bg-white px-6 py-12 text-center">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm font-medium text-navy">No tests match your filters</p>
              <button type="button" onClick={() => { setQuery(''); setPriceRange('all'); setTurnaround('all'); setSortBy('default') }} className="mt-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-80">Clear filters</button>
            </div>
          ) : null}
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
            {filteredTests.map((test) => (
              <LabTestCard
                key={test.id}
                test={test}
                booked={false}
                onBook={() => setBookingTest(test)}
                onRemove={() => {}}
                onInfo={(t) => setSelectedTest(t)}
              />
            ))}
          </div>
        </div>

        <LabTestsFooter
          activeLink={activeFooterLink}
          onLinkClick={setActiveFooterLink}
        />
      </div>

      <LabTestDetailModal
        open={Boolean(selectedTest)}
        onClose={() => setSelectedTest(null)}
        test={selectedTest}
      />

      <LabBookingFormModal
        open={Boolean(bookingTest)}
        onClose={() => setBookingTest(null)}
        test={bookingTest}
        onSubmit={handleBookSubmit}
      />
    </div>
  )
}
