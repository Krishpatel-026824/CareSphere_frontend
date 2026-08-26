export default function CareSphereMark({ className = '', tone = 'solid' }) {
  const isSoft = tone === 'soft'

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="14"
        className={isSoft ? 'fill-teal/15 stroke-teal/40' : 'fill-teal'}
        strokeWidth={isSoft ? 1.5 : 0}
      />
      <circle
        cx="24"
        cy="24"
        r="16"
        className={isSoft ? 'stroke-teal/50' : 'stroke-white/55'}
        strokeWidth="1.75"
      />
      <circle
        cx="24"
        cy="24"
        r="11.5"
        className={isSoft ? 'stroke-teal/30' : 'stroke-white/30'}
        strokeWidth="1.4"
      />
      <path
        d="M24 34.2c-.4-.35-7.6-5.55-10.45-9.5-2.05-2.85-1.7-6.45.9-8.55 2.2-1.8 5.25-1.5 6.95.7L24 20.4l2.6-3.55c1.7-2.2 4.75-2.5 6.95-.7 2.6 2.1 2.95 5.7.9 8.55-2.85 3.95-10.05 9.15-10.45 9.5Z"
        className={isSoft ? 'fill-teal' : 'fill-white'}
      />
    </svg>
  )
}
