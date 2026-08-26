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
      <circle cx="24" cy="24" r="22" className={isSoft ? 'fill-teal/15' : 'fill-teal'} />
      {isSoft ? (
        <circle cx="24" cy="24" r="21.25" className="stroke-teal/40" strokeWidth="1.5" />
      ) : null}

      {/* Open sphere = “C” */}
      <path
        d="M33.4 15.2a13 13 0 1 0 0 17.6"
        className={isSoft ? 'stroke-teal' : 'stroke-white'}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Care heart in the sphere opening */}
      <path
        d="M34.1 20.35c-1.05-1.2-2.95-1.3-4.05-.2l-.55.6-.55-.6c-1.1-1.1-3-.995-4.05.2-1.25 1.4-1.05 3.5.45 4.7l3.7 3c.25.2.65.2.9 0l3.7-3c1.5-1.2 1.7-3.3.45-4.7Z"
        className={isSoft ? 'fill-teal' : 'fill-white'}
      />
    </svg>
  )
}
