import { useState } from 'react'
import { Pill } from 'lucide-react'
import PharmacyCartActions from './PharmacyCartActions'

function splitSubtitle(subtitle = '') {
  const parts = subtitle.split(/\s+[-•]\s+/)
  return {
    useCase: parts[0] || subtitle,
    packSize: parts[1] || '',
  }
}

export default function PharmacyItemCard({
  item,
  quantity = 0,
  restockRequested = false,
  onAdd,
  onRemove,
  onRequestRestock,
  onRestock,
}) {
  const [imageError, setImageError] = useState(false)
  const showImage = item.image && !imageError
  const outOfStock = !item.inStock
  const { useCase, packSize } = splitSubtitle(item.subtitle)

  return (
    <article
      className={`rounded-2xl border p-3 sm:p-3.5 bg-white min-w-0 ${
        outOfStock ? 'border-amber-200 bg-amber-50' : quantity > 0 ? 'border-teal/40' : 'border-border-gray'
      }`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] overflow-hidden shrink-0 border border-border-gray bg-[#F8F9FA]">
          {showImage ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
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
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm sm:text-[15px] font-bold text-navy leading-snug break-words">
              {item.name}
            </h2>
            <div className="shrink-0 pt-0.5">
              <PharmacyCartActions
                inStock={item.inStock}
                quantity={quantity}
                restockRequested={restockRequested}
                restockEta={item.restockEta}
                onAdd={() => onAdd?.(item.id)}
                onRemove={() => onRemove?.(item.id)}
                onRequestRestock={() => onRequestRestock?.(item.id)}
                onRestock={() => onRestock?.(item.id)}
              />
            </div>
          </div>
          <p className="text-xs text-body-gray leading-snug mt-0.5 break-words">{useCase}</p>
          {packSize ? <p className="text-xs text-body-gray leading-snug">- {packSize}</p> : null}
          <p className="text-sm font-bold text-navy mt-1.5">₹{item.price}</p>
        </div>
      </div>
    </article>
  )
}
