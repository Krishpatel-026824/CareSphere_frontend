import { CheckCircle2 } from 'lucide-react'
import { pharmacyBillingMock } from '../../data/mocks/pharmacyBilling'

function rupee(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function PharmacyBillingCard({ bill, paymentMethod, onPaymentChange, paid, onPay }) {
  if (bill.itemCount === 0) return null

  return (
    <section className="rounded-2xl border border-border-gray bg-white p-4 sm:p-5 shadow-sm flex flex-col gap-4">
      <h2 className="text-base font-bold text-navy">Billing summary</h2>

      <ul className="flex flex-col gap-2">
        {bill.lines.map((line) => (
          <li key={line.id} className="flex items-start justify-between gap-3 text-sm">
            <span className="text-body-gray min-w-0">
              {line.name} × {line.quantity}
            </span>
            <span className="font-semibold text-navy shrink-0">{rupee(line.lineTotal)}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border-gray pt-3 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-body-gray">
          <span>Medicine total</span>
          <span>{rupee(bill.subtotal)}</span>
        </div>
        <div className="flex justify-between text-body-gray">
          <span>Delivery</span>
          <span>{bill.deliveryFee === 0 ? 'Free' : rupee(bill.deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-body-gray">
          <span>GST ({bill.taxPercent}%)</span>
          <span>{rupee(bill.tax)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-navy pt-1">
          <span>Amount to pay</span>
          <span className="text-teal">{rupee(bill.total)}</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-navy mb-2">Payment</p>
        <div className="flex flex-col gap-2">
          {pharmacyBillingMock.paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm cursor-pointer ${
                paymentMethod === method.id ? 'border-teal bg-teal-light/50 text-navy' : 'border-border-gray text-body-gray'
              }`}
            >
              <input
                type="radio"
                name="pharmacy-payment"
                checked={paymentMethod === method.id}
                onChange={() => onPaymentChange(method.id)}
                className="accent-teal w-4 h-4"
              />
              {method.label}
            </label>
          ))}
        </div>
      </div>

      {paid ? (
        <p className="inline-flex items-center justify-center gap-2 min-h-11 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
          Payment successful · {rupee(bill.total)}
        </p>
      ) : (
        <button
          type="button"
          onClick={onPay}
          className="min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
        >
          Pay {rupee(bill.total)}
        </button>
      )}
    </section>
  )
}
