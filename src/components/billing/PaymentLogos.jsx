import { paymentLogoMap } from '../../data/mocks/paymentLogos'

export default function PaymentLogos({ logos = [] }) {
  if (!logos.length) return null

  return (
    <span className="flex items-center gap-1 shrink-0 self-center">
      {logos.map((logo) => (
        <span
          key={logo}
          className="h-6 w-10 rounded bg-white border border-border-gray inline-flex items-center justify-center overflow-hidden"
        >
          <img src={paymentLogoMap[logo]} alt={logo} className="h-3.5 w-8 object-contain" />
        </span>
      ))}
    </span>
  )
}
