import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { pharmacyRecentOrdersMock } from '../../data/mocks/pharmacy'
import { rupee } from '../../utils/rupee'

function RecentOrderBill({ bill }) {
  return (
    <div className="mt-2 ml-6 rounded-xl border border-border-gray overflow-hidden text-xs">
      <ul className="flex flex-col gap-1 px-3 py-2">
        {bill.lines.map((line) => (
          <li key={line.id} className="flex items-center justify-between text-navy">
            <span className="font-medium pr-2">
              {line.name.replace(/\s+\d+mg$/, '')} x{line.quantity}
            </span>
            <span className="font-semibold shrink-0">{rupee(line.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border-gray text-body-gray">
        <div className="flex justify-between px-3 py-1.5 border-b border-border-gray">
          <span>Medicine total</span>
          <span>{rupee(bill.subtotal)}</span>
        </div>
        <div className="flex justify-between px-3 py-1.5 border-b border-border-gray">
          <span>Delivery</span>
          <span>{rupee(bill.deliveryFee)}</span>
        </div>
        <div className="flex justify-between px-3 py-1.5 border-b border-border-gray">
          <span>GST ({bill.taxPercent}%)</span>
          <span>{rupee(bill.tax)}</span>
        </div>
        <div className="flex justify-between px-3 py-2 font-bold text-navy">
          <span>Amount paid</span>
          <span>{rupee(bill.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default function PharmacyRecentOrders() {
  const [open, setOpen] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  return (
    <section className="rounded-2xl border border-border-gray bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between text-sm font-bold text-navy cursor-pointer"
      >
        Recent Orders
        <ChevronDown className={`w-4 h-4 text-body-gray transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open ? (
        <ul className="mt-3 flex flex-col gap-1">
          {pharmacyRecentOrdersMock.map((order) => {
            const checked = selectedId === order.id
            return (
              <li key={order.id}>
                <label className="flex items-center gap-2 rounded-lg px-1 py-1.5 text-sm text-navy cursor-pointer hover:bg-bg-gray">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setSelectedId(checked ? null : order.id)}
                    className="accent-teal w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block truncate">{order.label}</span>
                    <span className="block text-[11px] text-body-gray">{order.date} · {rupee(order.bill.total)}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-body-gray shrink-0" strokeWidth={1.75} />
                </label>
                {checked ? <RecentOrderBill bill={order.bill} /> : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )
}
