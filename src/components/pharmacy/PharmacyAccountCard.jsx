import { CreditCard, MapPin, UserRound } from 'lucide-react'
import { pharmacyAccountLinksMock } from '../../data/mocks/pharmacy'
import { userProfileMock } from '../../data/mocks/home'

const linkIcons = {
  addresses: MapPin,
  payments: CreditCard,
}

export default function PharmacyAccountCard({ activeLink = null, onLinkClick }) {
  function handleClick(linkId) {
    onLinkClick?.(activeLink === linkId ? null : linkId)
  }

  return (
    <section className="rounded-[16px] border border-border-gray bg-white p-5">
      <h2 className="text-base font-bold text-navy mb-4">My Account</h2>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-teal-light overflow-hidden shrink-0">
          {userProfileMock.avatar ? (
            <img src={userProfileMock.avatar} alt={userProfileMock.name} className="w-full h-full object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center">
              <UserRound className="w-6 h-6 text-teal" strokeWidth={1.75} />
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">{userProfileMock.name}</p>
          <p className="text-xs text-body-gray mt-0.5">{userProfileMock.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {pharmacyAccountLinksMock.map((link) => {
          const Icon = linkIcons[link.id]
          const active = activeLink === link.id
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => handleClick(link.id)}
              className={`rounded-xl border px-2 py-3 flex flex-col items-center gap-1.5 text-center cursor-pointer ${
                active ? 'border-teal bg-teal-light/40 text-navy' : 'border-border-gray text-navy hover:bg-bg-gray'
              }`}
            >
              {Icon ? <Icon className="w-4 h-4 text-teal" strokeWidth={1.75} /> : null}
              <span className="text-[11px] font-semibold leading-tight">{link.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
