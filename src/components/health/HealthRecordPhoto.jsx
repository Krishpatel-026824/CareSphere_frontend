export default function HealthRecordPhoto({ src, position = 'object-center', widthClass = 'w-[40%]' }) {
  if (!src) return null

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`health-photo-fade pointer-events-none absolute inset-y-0 right-0 h-full ${widthClass} object-cover ${position}`}
    />
  )
}
