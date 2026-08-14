import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, FlaskConical } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import ServicePageHeading from '../../components/ServicePageHeading'
import LabReportsList from '../../components/lab/LabReportsList'
import LabTestCard from '../../components/lab/LabTestCard'
import LabTestsBookingSummary from '../../components/lab/LabTestsBookingSummary'
import LabTestsCheckoutSection from '../../components/lab/LabTestsCheckoutSection'
import LabTestsFooter from '../../components/lab/LabTestsFooter'
import { useLabTestsBooking } from '../../hooks/useLabTestsBooking'

export default function LabTestsScreen({ onBack, onReportsGenerated }) {
  const checkoutRef = useRef(null)
  const catalogRef = useRef(null)
  const [activeFooterLink, setActiveFooterLink] = useState(null)
  const [expandedReportId, setExpandedReportId] = useState(null)
  const [showAllTests, setShowAllTests] = useState(false)
  const booking = useLabTestsBooking({ onReportsGenerated })
  const visibleTests = showAllTests ? booking.tests : booking.tests.slice(0, 5)
  const extraCount = Math.max(0, booking.tests.length - 5)

  useEffect(() => {
    if (booking.reports.length) setExpandedReportId(booking.reports[0].id)
  }, [booking.reports])

  function handleCheckout() {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleAddMore() {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="w-full min-h-full bg-[#F4F7F8]">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-7 flex flex-col gap-5">
        <header>
          <BackHomeButton onClick={onBack} />
          <ServicePageHeading
            icon={FlaskConical}
            tone="bg-amber-100 text-amber-600"
            title="Lab tests"
            subtitle="Book home sample collection or visit a partner lab"
          />
        </header>

        {booking.reports.length ? (
          <LabReportsList
            reports={booking.reports}
            expandedId={expandedReportId}
            onToggle={setExpandedReportId}
          />
        ) : null}

        <div ref={catalogRef} className="flex flex-col gap-3.5">
          <LabTestsBookingSummary
            itemCount={booking.bill.itemCount}
            subtotal={booking.bill.subtotal}
            onCheckout={handleCheckout}
          />

          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
              {visibleTests.map((test) => (
                <LabTestCard
                  key={test.id}
                  test={test}
                  booked={Boolean(booking.cart[test.id])}
                  onBook={booking.bookTest}
                  onRemove={booking.removeTest}
                />
              ))}
            </div>

            {extraCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowAllTests((open) => !open)}
                className="w-full min-h-11 rounded-xl bg-[#EEF1F4] text-sm font-semibold text-navy inline-flex items-center justify-center gap-2 cursor-pointer hover:bg-border-gray"
              >
                {showAllTests ? 'View less' : `View more (${extraCount} tests)`}
                {showAllTests ? (
                  <ChevronUp className="w-4 h-4" strokeWidth={1.75} />
                ) : (
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                )}
              </button>
            ) : null}
        </div>

        <div ref={checkoutRef}>
          <LabTestsCheckoutSection
            bill={booking.bill}
            paymentMethod={booking.paymentMethod}
            onPaymentChange={booking.setPaymentMethod}
            paid={booking.paid}
            onPay={booking.payBill}
            onAddMore={handleAddMore}
          />
        </div>

        <LabTestsFooter
          activeLink={activeFooterLink}
          onLinkClick={setActiveFooterLink}
        />
      </div>
    </div>
  )
}
