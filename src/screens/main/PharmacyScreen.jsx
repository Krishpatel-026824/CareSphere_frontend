import { useMemo, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import PharmacyItemCard from '../../components/pharmacy/PharmacyItemCard'
import { generatePharmacyData } from '../../data/generators/quickActionsGenerator'

export default function PharmacyScreen({ onBack }) {
  const { items } = generatePharmacyData()
  const [cart, setCart] = useState({})

  const cartCount = useMemo(
    () => Object.values(cart).reduce((total, count) => total + count, 0),
    [cart],
  )

  function addToCart(itemId) {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <QuickActionHeader
          title="Pharmacy"
          subtitle="Order medicines and refills from CareSphere Pharmacy"
          onBack={onBack}
        />

        {cartCount > 0 ? (
          <div className="rounded-2xl border border-teal/25 bg-teal-light/60 px-4 py-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
              <ShoppingCart className="w-4 h-4 text-teal" strokeWidth={1.75} />
              {cartCount} item{cartCount === 1 ? '' : 's'} in cart
            </span>
            <span className="text-xs text-body-gray">Ready to checkout</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <PharmacyItemCard
              key={item.id}
              item={item}
              quantity={cart[item.id] || 0}
              onAdd={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
