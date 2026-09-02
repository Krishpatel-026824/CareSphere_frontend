import { Pill } from 'lucide-react'

const sizes = {
  sm: 'w-9 h-9 rounded-lg',
  md: 'w-11 h-11 rounded-xl',
  lg: 'w-14 h-14 rounded-xl',
}

export default function MedicineThumb({ src, size = 'md', className = '' }) {
  return (
    <span
      className={`${sizes[size] || sizes.md} overflow-hidden shrink-0 border border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-center ${className}`}
    >
      {src ? (
        <img src={src} alt="" className="w-full h-full object-contain p-0.5" />
      ) : (
        <Pill className="w-4 h-4 text-teal" strokeWidth={1.85} />
      )}
    </span>
  )
}
