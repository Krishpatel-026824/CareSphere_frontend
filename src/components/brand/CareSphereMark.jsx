import { useId } from 'react'

export default function CareSphereMark({ className = '', tone = 'solid' }) {
  const uid = useId().replace(/:/g, '')
  const gradId = `cs-premium-${uid}`
  const shineId = `cs-shine-${uid}`
  const isSoft = tone === 'soft'

  if (isSoft) {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="42" height="42" rx="12" className="fill-teal/10 stroke-teal/25" strokeWidth="1.5" />
        <path
          fill="currentColor"
          className="text-teal"
          d="M24 32.8c-.4-.35-7.8-5.8-10.7-9.8-2.1-2.9-1.7-6.6 1-8.4 2.2-1.7 5.3-1.4 7 0.9L24 19.2l2.7-3.7c1.7-2.3 4.8-2.6 7-.9 2.7 1.8 3.1 5.5 1 8.4-2.9 4-10.3 9.45-10.7 9.8Z"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1ECFC5" />
          <stop offset="0.45" stopColor="#0EA5A0" />
          <stop offset="1" stopColor="#087A74" />
        </linearGradient>
        <linearGradient id={shineId} x1="24" y1="4" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#${gradId})`} />
      <rect x="2.75" y="2.75" width="42.5" height="42.5" rx="11.25" stroke="white" strokeOpacity="0.14" strokeWidth="1" />

      <path
        d="M4 16C14 6 34 6 44 16V22C34 12 14 12 4 22V16Z"
        fill={`url(#${shineId})`}
      />

      <path
        fill="#FFFFFF"
        d="M24 32.4c-.4-.34-7.6-5.6-10.4-9.4-2.05-2.85-1.65-6.45 0.95-8.2 2.15-1.65 5.15-1.35 6.85 0.95L24 19l2.55-3.5c1.7-2.3 4.7-2.65 6.85-.95 2.6 1.75 3 5.35 0.95 8.2-2.8 3.8-10 9.06-10.4 9.4Z"
      />

      <path
        fill="none"
        stroke="#0EA5A0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 24.8h3.8l1.35-3.2 1.85 6.1 1.35-3.1H33.5"
      />
    </svg>
  )
}
