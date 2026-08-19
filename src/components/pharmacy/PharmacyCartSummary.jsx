import { ShoppingCart } from 'lucide-react'

export default function PharmacyCartSummary({ itemCount, subtotal, onCheckout }) {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-teal/5 to-white border border-teal/20 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
          <ShoppingCart className="w-5 h-5 text-teal" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-navy">Cart Summary</h2>
          <p className="text-[13px] text-gray-500 mt-0.5">
            <span className="font-semibold text-navy">{itemCount}</span> items &nbsp;•&nbsp; Total: <span className="font-bold text-teal">₹{subtotal.toLocaleString('en-IN')}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full sm:w-auto sm:min-w-[160px] h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Go to Checkout
      </button>
    </section>
  )
}
