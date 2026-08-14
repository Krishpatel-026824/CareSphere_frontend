export default function PharmacyCartSummary({ itemCount, subtotal, onCheckout }) {
  return (
    <section className="rounded-2xl border border-border-gray bg-white px-5 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-base font-bold text-navy">Cart Summary</h2>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-body-gray">
          <p>
            Items in Cart: <span className="font-semibold text-navy">{itemCount}</span>
          </p>
          <p>
            Cart Total: <span className="font-semibold text-navy">₹{subtotal.toLocaleString('en-IN')}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full sm:w-auto sm:min-w-[168px] min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Go to Checkout
      </button>
    </section>
  )
}
