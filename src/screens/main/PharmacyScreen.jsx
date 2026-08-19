import { useState } from 'react'
import { Pill } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import ServicePageHeading from '../../components/ServicePageHeading'
import PharmacyItemCard from '../../components/pharmacy/PharmacyItemCard'
import PharmacyToolbar from '../../components/pharmacy/PharmacyToolbar'
import MedicineDetailModal from '../../components/pharmacy/MedicineDetailModal'
import { pharmacyFooterMock } from '../../data/mocks/pharmacy'
import { usePharmacyCatalog } from '../../hooks/usePharmacyCatalog'
import { usePharmacyCart } from '../../hooks/usePharmacyCart'

export default function PharmacyScreen({ onBack }) {
  const cartState = usePharmacyCart()
  const catalog = usePharmacyCatalog(cartState.items)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  return (
    <div className="w-full min-h-full bg-gradient-to-b from-[#F0F9F8] to-[#F4F7F8]">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-6">
        <header>
          <BackHomeButton onClick={onBack} />
          <ServicePageHeading
            icon={Pill}
            tone="bg-orange-100 text-orange-600"
            title="Pharmacy"
            subtitle="Browse medicines and refills from CareSphere Pharmacy"
          />
        </header>

        <PharmacyToolbar
          query={catalog.query}
          onQueryChange={catalog.setQuery}
          selectedFilters={catalog.selectedFilters}
          onToggleFilter={catalog.toggleFilter}
        />

        {catalog.catalogItems.length ? (
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalog.catalogItems.map((item) => (
              <div key={item.id} onClick={() => setSelectedMedicine(item)} className="cursor-pointer">
                <PharmacyItemCard item={item} />
              </div>
            ))}
          </section>
        ) : (
          <div className="rounded-2xl bg-white border border-gray-100 py-12 text-center">
            <Pill className="w-10 h-10 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm text-gray-500">
              No medicines found for "<span className="font-semibold text-navy">{catalog.query.trim()}</span>"
            </p>
          </div>
        )}

        <MedicineDetailModal
          open={Boolean(selectedMedicine)}
          onClose={() => setSelectedMedicine(null)}
          item={selectedMedicine}
        />

        <footer className="pt-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">{pharmacyFooterMock}</p>
        </footer>
      </div>
    </div>
  )
}
