import { useState } from 'react'
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react'
import { rupee } from '../../utils/rupee'
import BillingPayConfirm from './BillingPayConfirm'
import PaymentLogos from './PaymentLogos'

export default function BillingPaymentCard({
  total,
  methods,
  paymentMethod,
  onPaymentChange,
  paid,
  onPay,
  onAddMore,
  radioName,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <section className="rounded-2xl bg-white border border-border-gray p-4 sm:p-5 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-bold text-navy">Payment</h3>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal bg-teal-light px-2 py-1 rounded-full">
          <ShieldCheck className="w-3 h-3" strokeWidth={2} />
          Secure Checkout
        </span>
      </div>
      <p className="text-xs text-body-gray">Amount to pay</p>
      <p className="text-[28px] font-bold text-navy leading-tight mb-3">{rupee(total)}</p>

      <div className="flex flex-col gap-2 mb-3">
        {methods.map((method) => {
          const selected = paymentMethod === method.id
          return (
            <label
              key={method.id}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 cursor-pointer ${
                selected ? 'border-teal bg-teal-light/40' : 'border-border-gray'
              }`}
            >
              <input
                type="radio"
                name={radioName}
                checked={selected}
                onChange={() => onPaymentChange(method.id)}
                className="accent-teal w-4 h-4 shrink-0"
              />
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-navy whitespace-nowrap">
                  {method.label}
                </span>
                {method.detail ? (
                  <span className="block text-[11px] text-body-gray mt-0.5 whitespace-nowrap truncate">
                    {method.detail}
                  </span>
                ) : null}
              </span>
              {method.icon === 'truck' ? (
                <Truck className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
              ) : null}
              {method.logos ? <PaymentLogos logos={method.logos} /> : null}
            </label>
          )
        })}
      </div>

      {paid ? (
        <p className="inline-flex items-center justify-center gap-2 min-h-11 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
          Payment successful · {rupee(total)}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="min-h-11 rounded-xl bg-gradient-to-r from-teal to-[#0F766E] text-white text-sm font-semibold cursor-pointer hover:opacity-95"
        >
          Pay {rupee(total)}
        </button>
      )}
      {confirmOpen ? (
        <BillingPayConfirm
          total={total}
          onAddMore={() => {
            setConfirmOpen(false)
            onAddMore?.()
          }}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false)
            onPay?.()
          }}
        />
      ) : null}
    </section>
  )
}
