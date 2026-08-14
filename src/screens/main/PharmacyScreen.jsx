import { useRef } from 'react'
import { Pill } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import ServicePageHeading from '../../components/ServicePageHeading'
import PharmacyCartSummary from '../../components/pharmacy/PharmacyCartSummary'
import PharmacyCheckoutSection from '../../components/pharmacy/PharmacyCheckoutSection'
import PharmacyFilterSidebar from '../../components/pharmacy/PharmacyFilterSidebar'
import PharmacyItemCard from '../../components/pharmacy/PharmacyItemCard'
import PharmacyToolbar from '../../components/pharmacy/PharmacyToolbar'
import { pharmacyFooterMock } from '../../data/mocks/pharmacy'
import { usePharmacyCatalog } from '../../hooks/usePharmacyCatalog'
import { usePharmacyCart } from '../../hooks/usePharmacyCart'

export default function PharmacyScreen({ onBack }) {
  const checkoutRef = useRef(null)
  const catalogRef = useRef(null)
  const cartState = usePharmacyCart()
  const catalog = usePharmacyCatalog(cartState.items)

  function handleCheckout() {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleAddMore() {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="w-full min-h-full bg-[#F4F7F8]">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-6">
        <header>
          <BackHomeButton onClick={onBack} />
          <ServicePageHeading
            icon={Pill}
            tone="bg-orange-100 text-orange-600"
            title="Pharmacy"
            subtitle="Order medicines and refills from CareSphere Pharmacy"
          />
        </header>

        <div className="flex flex-col xl:flex-row items-start gap-5">
          <PharmacyFilterSidebar
            selectedFilters={catalog.selectedFilters}
            onToggleFilter={catalog.toggleFilter}
            selectedBrands={catalog.selectedBrands}
            onToggleBrand={catalog.toggleBrand}
          />

          <div ref={catalogRef} className="flex-1 min-w-0 w-full flex flex-col gap-5">
            <PharmacyToolbar
              query={catalog.query}
              onQueryChange={catalog.setQuery}
            />
            <PharmacyCartSummary
              itemCount={cartState.bill.itemCount}
              subtotal={cartState.bill.subtotal}
              onCheckout={handleCheckout}
            />

            {catalog.catalogItems.length ? (
              <section className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
                {catalog.catalogItems.map((item) => (
                  <PharmacyItemCard
                    key={item.id}
                    item={item}
                    quantity={cartState.cart[item.id] || 0}
                    restockRequested={Boolean(cartState.restockRequests[item.id])}
                    onAdd={cartState.addToCart}
                    onRemove={cartState.removeFromCart}
                    onRequestRestock={cartState.requestRestock}
                    onRestock={cartState.restockItem}
                  />
                ))}
              </section>
            ) : (
              <p className="text-sm text-body-gray py-8 text-center">
                No medicines found for “{catalog.query.trim()}”.
              </p>
            )}
          </div>
        </div>

        <div ref={checkoutRef}>
          <PharmacyCheckoutSection
            bill={cartState.bill}
            paymentMethod={cartState.paymentMethod}
            onPaymentChange={cartState.setPaymentMethod}
            paid={cartState.paid}
            onPay={cartState.payBill}
            onAddMore={handleAddMore}
          />
        </div>

        <footer className="pt-2 border-t border-border-gray text-center">
          <p className="text-xs text-body-gray">{pharmacyFooterMock}</p>
        </footer>
      </div>
    </div>
  )
}
