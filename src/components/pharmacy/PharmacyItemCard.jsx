import { useState } from 'react'
import { Pill, ShoppingBag } from 'lucide-react'

export default function PharmacyItemCard({ item, quantity = 0, onAdd }) {
  const [imageError, setImageError] = useState(false)
  const showImage = item.image && !imageError

  return (
    <article className="bg-white border border-border-gray rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-center gap-3.5">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 ring-1 ring-border-gray bg-orange-50">
        {showImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-orange-600">
            <Pill className="w-6 h-6" strokeWidth={1.75} />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-sm sm:text-[15px] font-semibold text-navy leading-snug">{item.name}</h2>
        <p className="text-xs text-body-gray mt-0.5">{item.subtitle}</p>
        <p className="text-sm font-bold text-navy mt-1.5">₹{item.price}</p>
      </div>

      <button
        type="button"
        disabled={!item.inStock}
        onClick={() => onAdd?.(item.id)}
        className={`min-h-10 px-3.5 sm:px-4 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 transition-colors ${
          !item.inStock
            ? 'bg-bg-gray text-body-gray cursor-not-allowed'
            : quantity > 0
              ? 'bg-teal-dark text-white cursor-pointer hover:bg-teal'
              : 'bg-teal text-white cursor-pointer hover:bg-teal-dark'
        }`}
      >
        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
        {!item.inStock ? 'Out of stock' : quantity > 0 ? `Added (${quantity})` : 'Add'}
      </button>
    </article>
  )
}
