import { rupee } from '../../utils/rupee'

export default function BillingPayConfirm({ total, onAddMore, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-border-gray p-5 shadow-lg">
        <h3 className="text-base font-bold text-navy">Confirm payment</h3>
        <p className="text-sm text-body-gray mt-2">
          Pay {rupee(total)} now, add more items to this order, or cancel.
        </p>
        <div className="flex flex-col gap-2 mt-5">
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-11 rounded-xl bg-gradient-to-r from-teal to-[#0F766E] text-white text-sm font-semibold cursor-pointer hover:opacity-95"
          >
            Confirm Pay {rupee(total)}
          </button>
          <button
            type="button"
            onClick={onAddMore}
            className="min-h-11 rounded-xl border border-teal text-teal text-sm font-semibold cursor-pointer hover:bg-teal-light"
          >
            Add more
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-xl border border-border-gray bg-bg-gray text-navy text-sm font-semibold cursor-pointer hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
