import { useState } from 'react'
import { Pill } from 'lucide-react'
import { resolveMedicineImage } from '../../data/generators/medicineImageResolver'

const sizes = {
  sm: 'w-10 h-10 rounded-lg',
  md: 'w-11 h-11 rounded-xl',
  lg: 'w-14 h-14 rounded-xl',
}

export default function MedicineThumb({
  src,
  name = '',
  pharmacyId,
  size = 'md',
  className = '',
}) {
  const [failed, setFailed] = useState(false)
  const resolved = src || resolveMedicineImage(name, pharmacyId)
  const showImage = Boolean(resolved) && !failed

  return (
    <span
      className={`${sizes[size] || sizes.md} overflow-hidden shrink-0 border border-[#E6EBF1] bg-white shadow-sm flex items-center justify-center ${className}`}
    >
      {showImage ? (
        <img
          src={resolved}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
          <Pill className="w-4 h-4 text-orange-400" strokeWidth={1.75} />
        </span>
      )}
    </span>
  )
}
