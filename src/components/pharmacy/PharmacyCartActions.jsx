import { Bell, Minus, PackagePlus, Plus } from 'lucide-react'

const actionBtn =
  'h-8 px-3 rounded-full text-xs font-semibold inline-flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap'

export default function PharmacyCartActions({
  inStock,
  quantity,
  restockRequested,
  restockEta,
  onAdd,
  onRemove,
  onRequestRestock,
  onRestock,
}) {
  if (!inStock) {
    return (
      <div className="flex flex-col items-end gap-1">
        {restockRequested ? (
          <button
            type="button"
            onClick={onRestock}
            className={`${actionBtn} bg-amber-100 text-amber-800 hover:bg-amber-200`}
          >
            <PackagePlus className="w-3.5 h-3.5" strokeWidth={1.75} />
            Restock
          </button>
        ) : (
          <button
            type="button"
            onClick={onRequestRestock}
            className={`${actionBtn} bg-white border border-teal text-teal hover:bg-teal-light`}
          >
            <Bell className="w-3.5 h-3.5" strokeWidth={1.75} />
            Restock
          </button>
        )}
        {restockEta ? <span className="text-[10px] text-body-gray">Back in {restockEta}</span> : null}
      </div>
    )
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`${actionBtn} bg-white border border-teal text-teal hover:bg-teal-light`}
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
        Add
      </button>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="inline-flex items-center h-8 rounded-full bg-teal text-white overflow-hidden">
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove one"
          className="w-7 h-full flex items-center justify-center cursor-pointer hover:bg-teal-dark"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2.25} />
        </button>
        <span className="min-w-5 text-center text-xs font-bold tabular-nums">{quantity}</span>
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add one"
          className="w-7 h-full flex items-center justify-center cursor-pointer hover:bg-teal-dark"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
        </button>
      </div>
      <span className="text-[10px] font-semibold text-teal">Added ({quantity})</span>
    </div>
  )
}
