import { rupee } from '../../utils/rupee'

export default function BillingBillDetails({
  lines,
  breakdown,
  itemCount,
  itemCountLabel,
  total,
}) {
  return (
    <section className="rounded-2xl bg-white border border-border-gray p-4 sm:p-5 flex flex-col">
      <h3 className="text-sm font-bold text-navy mb-3">Order & Bill Details</h3>
      <ul className="flex flex-col gap-2 mb-3">
        {lines.map((line) => (
          <li key={line.id} className="flex items-start justify-between gap-3 text-sm">
            <span className="text-navy font-medium min-w-0">
              {line.label}
              <span className="text-body-gray font-normal"> (Qty: {line.quantity})</span>
            </span>
            <span className="font-semibold text-navy shrink-0">{rupee(line.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <div className="border border-border-gray rounded-xl overflow-hidden text-sm">
        {breakdown.map((row, index) => (
          <div
            key={row.label}
            className={`flex justify-between px-3 py-2 text-body-gray ${
              index < breakdown.length - 1 ? 'border-b border-border-gray' : ''
            }`}
          >
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border-gray flex items-center justify-between text-sm">
        <span className="text-body-gray">{itemCountLabel}: {itemCount}</span>
        <span className="font-bold text-navy">Bill Amount: {rupee(total)}</span>
      </div>
    </section>
  )
}
