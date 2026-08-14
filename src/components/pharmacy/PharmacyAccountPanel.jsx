import { MapPin, CreditCard } from 'lucide-react'
import {
  pharmacyPaymentMethodsMock,
  pharmacySavedAddressesMock,
} from '../../data/mocks/pharmacy'

export default function PharmacyAccountPanel({
  activePanel,
  defaultAddressId,
  defaultPaymentId,
  onSetDefaultAddress,
  onSetDefaultPayment,
}) {
  if (!activePanel) return null

  if (activePanel === 'addresses') {
    return (
      <section className="rounded-2xl border border-border-gray bg-white p-4 shadow-sm flex flex-col gap-3">
        <h3 className="text-sm font-bold text-navy flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal" strokeWidth={1.75} />
          Saved Addresses
        </h3>
        {pharmacySavedAddressesMock.map((address) => {
          const isDefault = defaultAddressId === address.id

          return (
            <article
              key={address.id}
              className={`rounded-xl border p-3.5 ${
                isDefault ? 'border-teal bg-teal-light/30' : 'border-border-gray'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-navy">{address.label}</p>
                  <p className="text-xs text-body-gray mt-1">{address.line1}</p>
                  <p className="text-xs text-body-gray">{address.line2}</p>
                  <p className="text-xs text-body-gray mt-1">{address.phone}</p>
                </div>
                {isDefault ? (
                  <span className="text-[10px] font-semibold uppercase text-teal shrink-0">Default</span>
                ) : null}
              </div>
              {!isDefault ? (
                <button
                  type="button"
                  onClick={() => onSetDefaultAddress?.(address.id)}
                  className="mt-3 text-xs font-semibold text-teal cursor-pointer hover:opacity-70"
                >
                  Set as default
                </button>
              ) : null}
            </article>
          )
        })}
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-border-gray bg-white p-4 shadow-sm flex flex-col gap-3">
      <h3 className="text-sm font-bold text-navy flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-teal" strokeWidth={1.75} />
        Payment Methods
      </h3>
      {pharmacyPaymentMethodsMock.map((method) => {
        const isDefault = defaultPaymentId === method.id

        return (
          <article
            key={method.id}
            className={`rounded-xl border p-3.5 ${
              isDefault ? 'border-teal bg-teal-light/30' : 'border-border-gray'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-navy">{method.label}</p>
                <p className="text-xs text-body-gray mt-1">{method.detail}</p>
              </div>
              {isDefault ? (
                <span className="text-[10px] font-semibold uppercase text-teal shrink-0">Default</span>
              ) : null}
            </div>
            {!isDefault ? (
              <button
                type="button"
                onClick={() => onSetDefaultPayment?.(method.id)}
                className="mt-3 text-xs font-semibold text-teal cursor-pointer hover:opacity-70"
              >
                Use for checkout
              </button>
            ) : null}
          </article>
        )
      })}
    </section>
  )
}
